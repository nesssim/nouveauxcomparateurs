import Link from "next/link";

export default function NotFound() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-neutral-50 pt-20">
      <div className="text-center px-4">
        <p className="text-8xl font-display font-bold text-primary-600 mb-4">
          404
        </p>
        <h1 className="text-2xl font-bold text-neutral-900 mb-4">
          Page introuvable
        </h1>
        <p className="text-neutral-600 mb-8 max-w-md mx-auto">
          La page que vous recherchez n&apos;existe pas ou a été déplacée.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center px-6 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors min-h-[48px]"
        >
          Retour à l&apos;accueil
        </Link>
      </div>
    </section>
  );
}
