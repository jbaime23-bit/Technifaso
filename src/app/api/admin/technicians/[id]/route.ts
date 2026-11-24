import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import type { TechnicianStatus } from "@/lib/types";

export const runtime = "nodejs";

type RouteContext = { params: Promise<{ id: string }> };

function config() {
  const url = process.env.SUPABASE_URL?.replace(/\/$/, "");
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("Configuration Supabase manquante.");
  return { url, key };
}

export async function PATCH(request: Request, context: RouteContext) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  try {
    const { id } = await context.params;
    const input = await request.json();
    const patch: Record<string, unknown> = {};

    for (const field of ["name", "trade", "neighborhood", "phone", "description"] as const) {
      if (typeof input[field] === "string") patch[field] = input[field].trim();
    }
    if (typeof input.experience === "number" && Number.isInteger(input.experience)) {
      patch.experience = Math.min(60, Math.max(0, input.experience));
    }
    if (typeof input.emergency === "boolean") patch.emergency = input.emergency;
    if (typeof input.verified === "boolean") patch.verified = input.verified;
    if (typeof input.recommended === "boolean") patch.recommended = input.recommended;
    if (["pending", "published", "hidden"].includes(input.status)) {
      patch.status = input.status as TechnicianStatus;
    }

    if (!Object.keys(patch).length) {
      return NextResponse.json({ error: "Aucune modification valide." }, { status: 400 });
    }

    const { url, key } = config();
    const response = await fetch(`${url}/rest/v1/technicians?id=eq.${encodeURIComponent(id)}`, {
      method: "PATCH",
      cache: "no-store",
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
        Prefer: "return=representation",
      },
      body: JSON.stringify(patch),
    });

    if (!response.ok) throw new Error("Modification Supabase impossible.");
    const rows = await response.json();
    if (!rows.length) return NextResponse.json({ error: "Profil introuvable." }, { status: 404 });
    return NextResponse.json(rows[0]);
  } catch {
    return NextResponse.json({ error: "Modification impossible." }, { status: 503 });
  }
}

export async function DELETE(_: Request, context: RouteContext) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  try {
    const { id } = await context.params;
    const { url, key } = config();
    const response = await fetch(`${url}/rest/v1/technicians?id=eq.${encodeURIComponent(id)}`, {
      method: "DELETE",
      cache: "no-store",
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        Prefer: "return=minimal",
      },
    });

    if (!response.ok) throw new Error("Suppression impossible.");
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Suppression impossible." }, { status: 503 });
  }
}
