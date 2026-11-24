import { NextResponse } from "next/server";
import { NEIGHBORHOODS, TRADES } from "@/lib/types";

export const runtime = "nodejs";

function supabaseConfig() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("Configuration Supabase manquante.");
  return { url: url.replace(/\/$/, ""), key };
}

async function supabaseFetch(path: string, init?: RequestInit) {
  const { url, key } = supabaseConfig();
  return fetch(`${url}/rest/v1/${path}`, {
    ...init,
    cache: "no-store",
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      ...init?.headers,
    },
  });
}

export async function GET() {
  try {
    const response = await supabaseFetch(
      "technicians?select=id,name,trade,neighborhood,phone,experience,emergency,description,verified,recommended,status,created_at&status=eq.published&order=recommended.desc,verified.desc,created_at.desc",
  );
    if (!response.ok) throw new Error("Erreur de lecture Supabase.");
    return NextResponse.json(await response.json(), {
      headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300" },
    });
  } catch {
    return NextResponse.json({ error: "Service temporairement indisponible." }, { status: 503 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const trade = typeof body.trade === "string" ? body.trade : "";
    const neighborhood = typeof body.neighborhood === "string" ? body.neighborhood : "";
    const phone = typeof body.phone === "string" ? body.phone.trim() : "";
    const description = typeof body.description === "string" ? body.description.trim() : "";
    const experience = Number(body.experience);

    if (
      name.length < 2 || name.length > 100 ||
      !TRADES.includes(trade as (typeof TRADES)[number]) ||
      !NEIGHBORHOODS.includes(neighborhood as (typeof NEIGHBORHOODS)[number]) ||
      phone.length < 6 || phone.length > 30 ||
      !Number.isInteger(experience) || experience < 0 || experience > 60 ||
      description.length < 5 || description.length > 500
    ) {
      return NextResponse.json({ error: "Vérifiez les champs du formulaire." }, { status: 400 });
    }

    const response = await supabaseFetch("technicians", {
      method: "POST",
      headers: { Prefer: "return=minimal" },
      body: JSON.stringify({
        name,
        trade,
        neighborhood,
        phone,
        experience,
        emergency: body.emergency === true,
        description,
        status: "pending",
        verified: false,
        recommended: false,
      }),
    });

    if (!response.ok) throw new Error("Insertion impossible.");
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Envoi impossible pour le moment." }, { status: 503 });
  }
}
