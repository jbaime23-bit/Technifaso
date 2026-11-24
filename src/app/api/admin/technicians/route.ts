import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";

export const runtime = "nodejs";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  const url = process.env.SUPABASE_URL?.replace(/\/$/, "");
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    return NextResponse.json({ error: "Configuration Supabase manquante." }, { status: 503 });
  }

  const response = await fetch(
    `${url}/rest/v1/technicians?select=*&order=created_at.desc`,
    {
      cache: "no-store",
      headers: { apikey: key, Authorization: `Bearer ${key}` },
    },
  );

  if (!response.ok) {
    return NextResponse.json({ error: "Lecture des profils impossible." }, { status: 503 });
  }

  return NextResponse.json(await response.json(), {
    headers: { "Cache-Control": "private, no-store" },
  });
}
