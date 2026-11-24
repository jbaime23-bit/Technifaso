import { NextResponse } from "next/server";
import { adminCookieOptions, createAdminToken, safeStringEqual } from "@/lib/admin-auth";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const configuredPassword = process.env.ADMIN_PASSWORD;
  if (!configuredPassword) {
    return NextResponse.json({ error: "Administration non configurée." }, { status: 503 });
  }

  let password = "";
  try {
    const body = await request.json();
    password = typeof body.password === "string" ? body.password : "";
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  if (!safeStringEqual(password, configuredPassword)) {
    return NextResponse.json({ error: "Mot de passe incorrect." }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(adminCookieOptions.name, createAdminToken(), adminCookieOptions);
  return response;
}
