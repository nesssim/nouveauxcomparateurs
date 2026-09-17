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
      /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/,
      "Téléphone invalide"
    ),
  email: z.string().email("Email invalide").max(254),
  codePostal: z.string().regex(/^\d{5}$/, "Code postal invalide"),
  quand: z.enum(["matin", "apres-midi", "fin-journee"]).optional(),
  consent: z.literal(true).refine((v) => v === true, { message: "Consentement requis" }),
});

const QUAND_LABELS: Record<string, string> = {
  matin: "Matin (9h-12h)",
  "apres-midi": "Après-midi (14h-17h)",
  "fin-journee": "Fin de journée (17h-19h)",
};

async function sendToEndpoint(data: z.infer<typeof leadSchema>) {
  const endpoint = process.env.FORM_SUBMIT_ENDPOINT;

  const now = new Date();
  const dateStr = now.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  const timeStr = now.toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const payload = {
    date: dateStr,
    heure: timeStr,
    nom: data.nom,
    prenom: data.prenom,
    telephone: data.telephone,
    email: data.email,
    codePostal: data.codePostal,
    quand: QUAND_LABELS[data.quand ?? ""] || "",
  };

  if (!endpoint) {
    console.log("═══════════════════════════════════════");
    console.log("  NOUVEAU LEAD (FORM_SUBMIT_ENDPOINT non configuré)");
    console.log("═══════════════════════════════════════");
    console.log(`  Date: ${dateStr} ${timeStr}`);
    console.log(`  Nom: ${data.prenom} ${data.nom}`);
    console.log(`  Tél: ${data.telephone}`);
    console.log(`  Email: ${data.email}`);
    console.log(`  CP: ${data.codePostal}`);
    console.log(`  Créneau: ${QUAND_LABELS[data.quand ?? ""] || "Non précisé"}`);
    console.log("═══════════════════════════════════════");
    return;
  }

  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error(`Endpoint returned ${res.status}`);
  }
}

export async function POST(request: NextRequest) {
  try {
    const origin = request.headers.get("origin");
    const host = request.headers.get("host");
    if (origin && host && !origin.endsWith(host)) {
      return NextResponse.json({ error: "Requête invalide" }, { status: 403 });
    }

    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
    const rateLimit = checkRateLimit(ip);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          error: "Trop de requêtes. Veuillez patienter avant de réessayer.",
          retryAfter: rateLimit.retryAfter,
        },
        {
          status: 429,
          headers: { "Retry-After": String(rateLimit.retryAfter ?? 60) },
        }
      );
    }

    const body = await request.json();

    const parsed = leadSchema.safeParse(body);
    if (!parsed.success) {
      const firstError = parsed.error.issues[0]?.message ?? "Données invalides";
      return NextResponse.json({ error: firstError }, { status: 400 });
    }

    await sendToEndpoint(parsed.data);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Form submission error:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
