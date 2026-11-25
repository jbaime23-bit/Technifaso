import { NextResponse } from "next/server";
import { TRADES } from "@/lib/types";

export const runtime = "nodejs";

const MAX_PHOTO_BYTES = 1_500_000;
const PHOTO_BUCKET = "technician-photos";

function supabaseConfig() {
  const url = process.env.SUPABASE_URL?.trim();
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
  if (!url || !key) throw new Error("Configuration Supabase manquante : SUPABASE_URL ou SUPABASE_SERVICE_ROLE_KEY.");
  let parsedUrl: URL;
  try {
    parsedUrl = new URL(url);
  } catch {
    throw new Error("SUPABASE_URL n'est pas une URL valide.");
  }
  if (parsedUrl.protocol !== "https:" && parsedUrl.hostname !== "localhost") {
    throw new Error("SUPABASE_URL doit utiliser HTTPS.");
  }
  return { url: url.replace(/\/$/, ""), key };
}

function logSupabaseFailure(operation: string, status: number, details: string) {
  // Ne jamais journaliser l'URL complète ni les clés d'accès.
  console.error(`[api/technicians] ${operation} échoué (HTTP ${status}): ${details.slice(0, 1200)}`);
}

async function supabaseFetch(path: string, init?: RequestInit) {
  const { url, key } = supabaseConfig();
  return fetch(`${url}/rest/v1/${path}`, {
    ...init,
    cache: "no-store",
    signal: AbortSignal.timeout(12_000),
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      ...init?.headers,
    },
  });
}

async function uploadProfilePhoto(dataUrl: unknown) {
  if (typeof dataUrl !== "string" || !dataUrl) return null;
  const match = dataUrl.match(/^data:(image\/(?:jpeg|png|webp));base64,([A-Za-z0-9+/]+={0,2})$/);
  if (!match) throw new Error("Format de photo non accepté. Choisissez une image JPEG, PNG ou WebP.");

  const mimeType = match[1];
  const bytes = Buffer.from(match[2], "base64");
  if (!bytes.length || bytes.length > MAX_PHOTO_BYTES) {
    throw new Error("La photo est trop volumineuse. Choisissez une image plus légère.");
  }

  const extension = mimeType === "image/jpeg" ? "jpg" : mimeType === "image/png" ? "png" : "webp";
  const objectPath = `${crypto.randomUUID()}.${extension}`;
  const { url, key } = supabaseConfig();
  const response = await fetch(`${url}/storage/v1/object/${PHOTO_BUCKET}/${objectPath}`, {
    method: "POST",
    cache: "no-store",
    signal: AbortSignal.timeout(12_000),
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": mimeType,
      "x-upsert": "false",
    },
    body: bytes,
  });
  if (!response.ok) {
    logSupabaseFailure("Upload Storage", response.status, await response.text());
    throw new Error("Envoi de la photo impossible. Vérifiez le bucket technician-photos dans Supabase.");
  }
  return `${url}/storage/v1/object/public/${PHOTO_BUCKET}/${objectPath}`;
}

export async function GET() {
  try {
    const response = await supabaseFetch(
      "technicians?select=id,name,trade,city,neighborhood,phone,experience,emergency,description,profile_photo,verified,recommended,status,created_at&status=eq.published&order=recommended.desc,verified.desc,created_at.desc",
    );
    if (!response.ok) {
      logSupabaseFailure("Lecture des techniciens", response.status, await response.text());
      return NextResponse.json(
        { error: "Impossible de lire les profils. Vérifiez la table technicians et les colonnes city/profile_photo dans le projet Supabase configuré sur Vercel.", code: "TECHNICIANS_READ_FAILED" },
        { status: 503, headers: { "Cache-Control": "no-store" } },
      );
    }
    return NextResponse.json(await response.json(), {
      headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300" },
    });
  } catch (error) {
    console.error("[api/technicians] GET impossible:", error);
    return NextResponse.json(
      { error: "Service Supabase temporairement indisponible. Consultez les journaux Vercel pour le détail.", code: "TECHNICIANS_SERVICE_UNAVAILABLE" },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const trade = typeof body.trade === "string" ? body.trade : "";
    const city = typeof body.city === "string" ? body.city.trim() : "";
    const neighborhood = typeof body.neighborhood === "string" ? body.neighborhood.trim() : "";
    const phone = typeof body.phone === "string" ? body.phone.trim() : "";
    const description = typeof body.description === "string" ? body.description.trim() : "";
    const experience = Number(body.experience);

    if (
      name.length < 2 || name.length > 100 ||
      !TRADES.includes(trade) ||
      city.length < 2 || city.length > 100 ||
      neighborhood.length < 2 || neighborhood.length > 100 ||
      phone.length < 6 || phone.length > 30 ||
      !Number.isInteger(experience) || experience < 0 || experience > 60 ||
      description.length < 5 || description.length > 500
    ) {
      return NextResponse.json({ error: "Vérifiez les champs du formulaire." }, { status: 400 });
    }

    const profilePhoto = await uploadProfilePhoto(body.profilePhoto);
    const response = await supabaseFetch("technicians", {
      method: "POST",
      headers: { Prefer: "return=minimal" },
      body: JSON.stringify({
        name,
        trade,
        city,
        neighborhood,
        phone,
        experience,
        emergency: body.emergency === true,
        description,
        profile_photo: profilePhoto,
        status: "pending",
        verified: false,
        recommended: false,
      }),
    });

    if (!response.ok) {
      logSupabaseFailure("Création du profil", response.status, await response.text());
      return NextResponse.json({ error: "Enregistrement impossible. Vérifiez le schéma technicians et les journaux Vercel.", code: "TECHNICIAN_CREATE_FAILED" }, { status: 503 });
    }
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (error) {
    console.error("[api/technicians] POST impossible:", error);
    if (error instanceof Error && (error.message.startsWith("Format de photo") || error.message.startsWith("La photo") || error.message.startsWith("Envoi de la photo"))) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json({ error: "Envoi impossible pour le moment. Consultez les journaux Vercel.", code: "TECHNICIAN_SUBMISSION_UNAVAILABLE" }, { status: 503 });
  }
}
