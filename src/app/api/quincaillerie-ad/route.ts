import { NextResponse } from "next/server";
import { readFile, writeFile } from "node:fs/promises";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import type { QuincaillerieAd } from "@/components/BanniereQuincaillerie";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const filePath = "/tmp/technifaso-quincaillerie-ad.json";
const defaults: QuincaillerieAd = { active: false, mode: "image", imageUrl: "", videoUrl: "", destinationUrl: "" };

async function getConfig(): Promise<QuincaillerieAd> {
  try {
    return { ...defaults, ...JSON.parse(await readFile(filePath, "utf8")) };
  } catch {
    return defaults;
  }
}

function validUrl(value: unknown): value is string {
  if (typeof value !== "string" || !value.trim()) return value === "";
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}

export async function GET() {
  return NextResponse.json(await getConfig(), { headers: { "Cache-Control": "no-store" } });
}

export async function PUT(request: Request) {
  if (!(await isAdminAuthenticated())) return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  try {
    const input = await request.json();
    if (!input || !["image", "video", "both"].includes(input.mode) || typeof input.active !== "boolean" || !validUrl(input.imageUrl) || !validUrl(input.videoUrl) || !validUrl(input.destinationUrl)) {
      return NextResponse.json({ error: "Paramètres invalides. Utilisez des URL HTTP(S) valides." }, { status: 400 });
    }
    const value: QuincaillerieAd = {
      active: input.active,
      mode: input.mode,
      imageUrl: input.imageUrl.trim(),
      videoUrl: input.videoUrl.trim(),
      destinationUrl: input.destinationUrl.trim(),
    };
    await writeFile(filePath, JSON.stringify(value, null, 2), { encoding: "utf8", mode: 0o600 });
    return NextResponse.json(value, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return NextResponse.json({ error: "Enregistrement impossible." }, { status: 500 });
  }
}
