import type { Metadata } from "next";
import { ConseillerContent } from "@/components/conseiller/ConseillerContent";

export const metadata: Metadata = {
  title: "Votre conseiller personnel",
  description:
    "Un conseiller dédié se déplace à votre domicile pour vous aider à trouver la mutuelle idéale. Service gratuit et sans engagement.",
};

export default function ConseillerPersonnelPage() {
  return <ConseillerContent />;
}
