"use client";

import { useState, type FormEvent } from "react";
import { Clock } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";

type FormState = "idle" | "loading" | "success" | "error";

export function LeadCaptureForm() {
  const [state, setState] = useState<FormState>("idle");
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    telephone: "",
    email: "",
    codePostal: "",
    quand: "matin",
    consent: true,
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setState("loading");

    try {
      const res = await fetch("/api/form-submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Erreur");
      setState("success");
    } catch {
      setState("error");
    }
  };

  if (state === "success") {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-3xl">✓</span>
        </div>
        <h3 className="font-display text-2xl font-bold text-neutral-900 mb-3">
          Merci !
        </h3>
        <p className="text-lg text-neutral-600 max-w-md mx-auto">
          Un conseiller vous recontacte sous 24h pour planifier un rendez-vous
          à domicile.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="nom" className="block text-sm font-medium text-neutral-700 mb-1">
            Nom <span className="text-red-500">*</span>
          </label>
          <input
            id="nom"
            type="text"
            required
            autoComplete="family-name"
            value={formData.nom}
            onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all min-h-[48px]"
          />
        </div>
        <div>
          <label htmlFor="prenom" className="block text-sm font-medium text-neutral-700 mb-1">
            Prénom <span className="text-red-500">*</span>
          </label>
          <input
            id="prenom"
            type="text"
            required
            autoComplete="given-name"
            value={formData.prenom}
            onChange={(e) => setFormData({ ...formData, prenom: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all min-h-[48px]"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="telephone" className="block text-sm font-medium text-neutral-700 mb-1">
            Téléphone <span className="text-red-500">*</span>
          </label>
          <input
            id="telephone"
            type="tel"
            required
            pattern="(?:(?:\+|00)33[\s.-]?\(0\)[\s.-]?\d{1,4}|0\d{1,4})[\s.-]?\d{1,4}[\s.-]?\d{1,4}[\s.-]?\d{1,4}"
            inputMode="tel"
            autoComplete="tel"
            value={formData.telephone}
            onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all min-h-[48px]"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            type="email"
            required
            autoComplete="email"
            inputMode="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all min-h-[48px]"
          />
        </div>
      </div>

      <div>
        <label htmlFor="codePostal" className="block text-sm font-medium text-neutral-700 mb-1">
          Code postal <span className="text-red-500">*</span>
        </label>
        <input
          id="codePostal"
          type="text"
          required
          pattern="[0-9]{5}"
          maxLength={5}
          autoComplete="postal-code"
          inputMode="numeric"
          value={formData.codePostal}
          onChange={(e) => setFormData({ ...formData, codePostal: e.target.value })}
          className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all min-h-[48px]"
        />
      </div>

      <div>
        <label htmlFor="quand" className="block text-sm font-medium text-neutral-700 mb-1">
          Quand souhaitez-vous être recontacté ?
        </label>
        <select
          id="quand"
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
          type="checkbox"
          required
          checked={formData.consent}
          onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
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
      </div>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="w-full"
        disabled={state === "loading"}
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
