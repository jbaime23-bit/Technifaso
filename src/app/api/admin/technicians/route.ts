import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";

export const runtime = "nodejs";

export async function GET() {
  try {
    if (!(await isAdminAuthenticated())) {
      return NextResponse.json({ error: "Session administrateur absente ou expirée. Reconnectez-vous." }, { status: 401 });
    }

    const url = process.env.SUPABASE_URL?.trim().replace(/\/$/, "");
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
    if (!url || !key) {
      console.error("[api/admin/technicians] SUPABASE_URL ou SUPABASE_SERVICE_ROLE_KEY manquante.");
      return NextResponse.json({ error: "Configuration Supabase manquante sur Vercel." }, { status: 503 });
    }

    const response = await fetch(`${url}/rest/v1/technicians?select=*&order=created_at.desc`, {
      cache: "no-store",
      signal: AbortSignal.timeout(12_000),
      headers: { apikey: key, Authorization: `Bearer ${key}` },
    });

    if (!response.ok) {
      const details = await response.text();
      console.error(`[api/admin/technicians] Supabase HTTP ${response.status}: ${details.slice(0, 1200)}`);
      return NextResponse.json({ error: "Lecture des profils impossible. Vérifiez la table technicians et la clé Supabase dans les journaux Vercel." }, { status: 503 });
    }

    return NextResponse.json(await response.json(), {
      headers: { "Cache-Control": "private, no-store" },
    });
  } catch (error) {
    console.error("[api/admin/technicians] GET impossible:", error);
    return NextResponse.json({ error: "Erreur serveur lors du chargement Admin. Consultez les journaux Vercel." }, { status: 503 });
  }
}
