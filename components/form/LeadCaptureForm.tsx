"use client";

import { useState, useCallback, type FormEvent, type FocusEvent } from "react";
import { Clock } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { FormSuccess } from "./FormSuccess";

type FormState = "idle" | "loading" | "success" | "error" | "rate-limited";

interface FieldErrors {
  nom?: string;
  prenom?: string;
  telephone?: string;
  email?: string;
  codePostal?: string;
  consent?: string;
}

const REGEX = {
  name: /^[a-zA-ZÀ-ÿ\s'-]+$/,
  phone: /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/,
  postalCode: /^\d{5}$/,
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
} as const;

function validateField(name: string, value: string): string | undefined {
  switch (name) {
    case "nom":
      if (!value.trim()) return "Le nom est requis";
      if (value.length > 100) return "Le nom est trop long";
      if (!REGEX.name.test(value)) return "Le nom contient des caractères invalides";
      return undefined;
    case "prenom":
      if (!value.trim()) return "Le prénom est requis";
      if (value.length > 100) return "Le prénom est trop long";
      if (!REGEX.name.test(value)) return "Le prénom contient des caractères invalides";
      return undefined;
    case "telephone":
      if (!value.trim()) return "Le téléphone est requis";
      if (!REGEX.phone.test(value)) return "Format: 06 12 34 56 78 ou +33 6 12 34 56 78";
      return undefined;
    case "email":
      if (!value.trim()) return "L'email est requis";
      if (value.length > 254) return "L'email est trop long";
      if (!REGEX.email.test(value)) return "Format: exemple@email.fr";
      return undefined;
    case "codePostal":
      if (!value.trim()) return "Le code postal est requis";
      if (!REGEX.postalCode.test(value)) return "5 chiffres requis (ex: 80100)";
      return undefined;
    default:
      return undefined;
  }
}

function validateForm(formData: {
  nom: string;
  prenom: string;
  telephone: string;
  email: string;
  codePostal: string;
  consent: boolean;
}): FieldErrors {
  return {
    nom: validateField("nom", formData.nom),
    prenom: validateField("prenom", formData.prenom),
    telephone: validateField("telephone", formData.telephone),
    email: validateField("email", formData.email),
    codePostal: validateField("codePostal", formData.codePostal),
    consent: !formData.consent ? "Le consentement est requis" : undefined,
  };
}

function isFormValid(errors: FieldErrors): boolean {
  return Object.values(errors).every((e) => !e);
}

export function LeadCaptureForm() {
  const [state, setState] = useState<FormState>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    telephone: "",
    email: "",
    codePostal: "",
    quand: "matin",
    consent: false,
  });

  const handleBlur = useCallback(
    (e: FocusEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setTouched((prev) => ({ ...prev, [name]: true }));
      const error = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    },
    []
  );

  const handleChange = useCallback(
    (name: string, value: string) => {
      setFormData((prev) => ({ ...prev, [name]: value }));
      if (touched[name]) {
        const error = validateField(name, value);
        setErrors((prev) => ({ ...prev, [name]: error }));
      }
    },
    [touched]
  );

  const handleConsentChange = useCallback((checked: boolean) => {
    setFormData((prev) => ({ ...prev, consent: checked }));
    setErrors((prev) => ({ ...prev, consent: !checked ? "Le consentement est requis" : undefined }));
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const allTouched: Record<string, boolean> = {
      nom: true,
      prenom: true,
      telephone: true,
      email: true,
      codePostal: true,
    };
    setTouched(allTouched);

    const formErrors = validateForm(formData);
    setErrors(formErrors);

    if (!isFormValid(formErrors)) return;

    setState("loading");

    try {
      const res = await fetch("/api/form-submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.status === 429) {
        setState("rate-limited");
        return;
      }

      if (!res.ok) throw new Error("Erreur");

      setState("success");
    } catch {
      setState("error");
    }
  };

  const allErrors = validateForm(formData);
  const formValid = isFormValid(allErrors);

  if (state === "success") {
    return <FormSuccess prenom={formData.prenom} />;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="nom" className="block text-sm font-medium text-neutral-700 mb-1">
            Nom <span className="text-red-500">*</span>
          </label>
          <input
            id="nom"
            name="nom"
            type="text"
            required
            autoComplete="family-name"
            value={formData.nom}
            onChange={(e) => handleChange("nom", e.target.value)}
            onBlur={handleBlur}
            aria-invalid={!!errors.nom}
            aria-describedby={errors.nom ? "nom-error" : undefined}
            className={`w-full px-4 py-3 rounded-lg border focus:ring-2 outline-none transition-all min-h-[48px] ${
              errors.nom && touched.nom
                ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                : "border-neutral-300 focus:border-primary-500 focus:ring-primary-200"
            }`}
          />
          {errors.nom && touched.nom && (
            <p id="nom-error" className="mt-1 text-sm text-red-600" role="alert">
              {errors.nom}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="prenom" className="block text-sm font-medium text-neutral-700 mb-1">
            Prénom <span className="text-red-500">*</span>
          </label>
          <input
            id="prenom"
            name="prenom"
            type="text"
            required
            autoComplete="given-name"
            value={formData.prenom}
            onChange={(e) => handleChange("prenom", e.target.value)}
            onBlur={handleBlur}
            aria-invalid={!!errors.prenom}
            aria-describedby={errors.prenom ? "prenom-error" : undefined}
            className={`w-full px-4 py-3 rounded-lg border focus:ring-2 outline-none transition-all min-h-[48px] ${
              errors.prenom && touched.prenom
                ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                : "border-neutral-300 focus:border-primary-500 focus:ring-primary-200"
            }`}
          />
          {errors.prenom && touched.prenom && (
            <p id="prenom-error" className="mt-1 text-sm text-red-600" role="alert">
              {errors.prenom}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="telephone" className="block text-sm font-medium text-neutral-700 mb-1">
            Téléphone <span className="text-red-500">*</span>
          </label>
          <input
            id="telephone"
            name="telephone"
            type="tel"
            required
            pattern="(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}"
            inputMode="tel"
            autoComplete="tel"
            value={formData.telephone}
            onChange={(e) => handleChange("telephone", e.target.value)}
            onBlur={handleBlur}
            aria-invalid={!!errors.telephone}
            aria-describedby={errors.telephone ? "telephone-error" : undefined}
            className={`w-full px-4 py-3 rounded-lg border focus:ring-2 outline-none transition-all min-h-[48px] ${
              errors.telephone && touched.telephone
                ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                : "border-neutral-300 focus:border-primary-500 focus:ring-primary-200"
            }`}
          />
          {errors.telephone && touched.telephone && (
            <p id="telephone-error" className="mt-1 text-sm text-red-600" role="alert">
              {errors.telephone}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            inputMode="email"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            onBlur={handleBlur}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={`w-full px-4 py-3 rounded-lg border focus:ring-2 outline-none transition-all min-h-[48px] ${
              errors.email && touched.email
                ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                : "border-neutral-300 focus:border-primary-500 focus:ring-primary-200"
            }`}
          />
          {errors.email && touched.email && (
            <p id="email-error" className="mt-1 text-sm text-red-600" role="alert">
              {errors.email}
            </p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="codePostal" className="block text-sm font-medium text-neutral-700 mb-1">
          Code postal <span className="text-red-500">*</span>
        </label>
        <input
          id="codePostal"
          name="codePostal"
          type="text"
          required
          pattern="[0-9]{5}"
          maxLength={5}
          autoComplete="postal-code"
          inputMode="numeric"
          value={formData.codePostal}
          onChange={(e) => handleChange("codePostal", e.target.value)}
          onBlur={handleBlur}
          aria-invalid={!!errors.codePostal}
          aria-describedby={errors.codePostal ? "codePostal-error" : undefined}
          className={`w-full px-4 py-3 rounded-lg border focus:ring-2 outline-none transition-all min-h-[48px] ${
            errors.codePostal && touched.codePostal
              ? "border-red-400 focus:border-red-500 focus:ring-red-100"
              : "border-neutral-300 focus:border-primary-500 focus:ring-primary-200"
          }`}
        />
        {errors.codePostal && touched.codePostal && (
          <p id="codePostal-error" className="mt-1 text-sm text-red-600" role="alert">
            {errors.codePostal}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="quand" className="block text-sm font-medium text-neutral-700 mb-1">
          Quand souhaitez-vous être recontacté ?
        </label>
        <select
          id="quand"
          name="quand"
          value={formData.quand}
          onChange={(e) => setFormData({ ...formData, quand: e.target.value })}
          className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all min-h-[48px]"
        >
          <option value="matin">Matin (9h-12h)</option>
          <option value="apres-midi">Après-midi (14h-17h)</option>
          <option value="fin-journee">Fin de journée (17h-19h)</option>
        </select>
      </div>

      <div className="flex items-start gap-3">
        <input
          id="consent"
          name="consent"
          type="checkbox"
          required
          checked={formData.consent}
          onChange={(e) => handleConsentChange(e.target.checked)}
          aria-invalid={!!errors.consent}
          aria-describedby={errors.consent ? "consent-error" : undefined}
          className="mt-1 w-5 h-5 rounded border-neutral-300 text-primary-600 focus:ring-primary-200"
        />
        <label htmlFor="consent" className="text-sm text-neutral-600">
          J&apos;accepte d&apos;être contacté(e) pour une étude personnalisée conformément à la{" "}
          <a href="/cgu" className="underline hover:text-primary-600">
            politique de confidentialité
          </a>
          .
        </label>
      </div>
      {errors.consent && (
        <p id="consent-error" className="text-sm text-red-600" role="alert">
          {errors.consent}
        </p>
      )}

      <div className="flex items-center gap-3 bg-primary-50 border border-primary-100 rounded-xl px-4 py-3">
        <Clock className="w-5 h-5 text-primary-600 shrink-0" />
        <p className="text-sm font-medium text-primary-700">
          Nous vous recontacterons sous 48h.
        </p>
      </div>

      <div role="alert" aria-live="assertive">
        {state === "error" && (
          <p className="text-red-600 text-sm">
            Une erreur est survenue. Veuillez réessayer ou nous appeler au{" "}
            <a href="tel:+33183759325" className="underline">
              01 83 75 93 25
            </a>
          </p>
        )}
        {state === "rate-limited" && (
          <p className="text-amber-600 text-sm">
            Trop de tentatives. Veuillez patienter quelques minutes avant de réessayer.
          </p>
        )}
      </div>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="w-full"
        disabled={state === "loading" || state === "rate-limited"}
      >
        {state === "loading" ? (
          <span className="flex items-center gap-2">
            <LoadingSpinner /> Envoi en cours...
          </span>
        ) : (
          "Envoyer ma demande"
        )}
      </Button>
    </form>
  );
}
