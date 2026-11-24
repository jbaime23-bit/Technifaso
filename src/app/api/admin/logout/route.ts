import { NextResponse } from "next/server";
import { adminCookieOptions } from "@/lib/admin-auth";

export async function POST() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set(adminCookieOptions.name, "", {
    ...adminCookieOptions,
    maxAge: 0,
  });
  return response;
}
