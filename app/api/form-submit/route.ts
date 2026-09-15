import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { checkRateLimit } from "@/lib/rate-limit";

const leadSchema = z.object({
  nom: z
    .string()
    .trim()
    .min(1, "Nom requis")
    .max(100)
    .regex(/^[a-zA-ZÀ-ÿ\s'-]+$/, "Nom invalide"),
  prenom: z
    .string()
    .trim()
    .min(1, "Prénom requis")
    .max(100)
    .regex(/^[a-zA-ZÀ-ÿ\s'-]+$/, "Prénom invalide"),
  telephone: z
    .string()
    .regex(
      /^(?:(?:\+|00)33[\s.-]?\(0\)[\s.-]?\d{1,4}|0\d{1,4})[\s.-]?\d{1,4}[\s.-]?\d{1,4}[\s.-]?\d{1,4}$/,
      "Téléphone invalide"
    ),
  email: z.string().email("Email invalide").max(254),
  codePostal: z.string().regex(/^\d{5}$/, "Code postal invalide"),
  quand: z.enum(["bientot", "cette-semaine", "ce-mois-ci"]).optional(),
});

export async function POST(request: NextRequest) {
  try {
    // Origin check (CSRF protection)
    const origin = request.headers.get("origin");
    const host = request.headers.get("host");
    if (origin && host && !origin.endsWith(host)) {
      return NextResponse.json(
        { error: "Requête invalide" },
        { status: 403 }
      );
    }

    // Rate limiting
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      "unknown";
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Trop de requêtes. Réessayez plus tard." },
        { status: 429 }
      );
    }

    const body = await request.json();

    // Zod validation
    const parsed = leadSchema.safeParse(body);
    if (!parsed.success) {
      const firstError = parsed.error.issues[0]?.message ?? "Données invalides";
      return NextResponse.json({ error: firstError }, { status: 400 });
    }

    // TODO: Send email notification via Resend/SendGrid
    // TODO: Store in database

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}
