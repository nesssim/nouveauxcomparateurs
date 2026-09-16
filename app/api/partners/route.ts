import { readdir } from "fs/promises";
import { join } from "path";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const dir = join(process.cwd(), "public", "images", "partners");
  try {
    const files = await readdir(dir);
    const images = files
      .filter((f) => /\.(png|jpg|jpeg|webp|svg)$/i.test(f))
      .map((f) => ({
        name: f.replace(/\.[^.]+$/, "").replace(/-/g, " "),
        file: f,
      }));
    return NextResponse.json(images);
  } catch {
    return NextResponse.json([]);
  }
}
