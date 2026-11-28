import { NextResponse } from "next/server";
import { readFile, writeFile } from "node:fs/promises";
import { isAdminAuthenticated } from "@/lib/admin-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type AdMode = "image" | "video" | "both";
type AdConfig = { active: boolean; mode: AdMode; imageUrl: string; videoUrl: string; whatsappUrl: string };
const defaults: AdConfig = { active: false, mode: "image", imageUrl: "", videoUrl: "", whatsappUrl: "" };
// Vercel functions expose /tmp as writable, but ephemeral storage; configure an external persistent store for cross-instance durability.
const filePath = "/tmp/technifaso-quincaillerie-ad.json";

async function readConfig(): Promise<AdConfig> {
  try { return { ...defaults, ...JSON.parse(await readFile(filePath, "utf8")) } as AdConfig; }
  catch { return defaults; }
}

function validOptionalUrl(value: unknown): value is string {
  if (typeof value !== "string") return false;
  if (!value.trim()) return true;
  try { const url = new URL(value); return url.protocol === "https:" || url.protocol === "http:"; }
  catch { return false; }
}

export async function GET() {
  return NextResponse.json(await readConfig(), { headers: { "Cache-Control": "no-store" } });
}

export async function PUT(request: Request) {
  if (!(await isAdminAuthenticated())) return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  try {
    const input = await request.json();
    if (!input || typeof input.active !== "boolean" || !["image", "video", "both"].includes(input.mode) || !validOptionalUrl(input.imageUrl) || !validOptionalUrl(input.videoUrl) || !validOptionalUrl(input.whatsappUrl)) {
      return NextResponse.json({ error: "Paramètres invalides. Saisissez des URL HTTP(S) valides." }, { status: 400 });
    }
    const config: AdConfig = { active: input.active, mode: input.mode, imageUrl: input.imageUrl.trim(), videoUrl: input.videoUrl.trim(), whatsappUrl: input.whatsappUrl.trim() };
    await writeFile(filePath, JSON.stringify(config, null, 2), { encoding: "utf8", mode: 0o600 });
    return NextResponse.json(config, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return NextResponse.json({ error: "Enregistrement impossible. Consultez les journaux du serveur." }, { status: 500 });
  }
}
