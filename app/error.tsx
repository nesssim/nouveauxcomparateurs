"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="min-h-screen flex items-center justify-center bg-neutral-50 pt-20">
      <div className="text-center px-4">
        <p className="text-6xl mb-4">⚠️</p>
        <h1 className="text-2xl font-bold text-neutral-900 mb-4">
          Une erreur est survenue
        </h1>
        <p className="text-neutral-600 mb-8 max-w-md mx-auto">
          Nous nous excusons pour ce désagrément. Veuillez réessayer ou nous
          contacter si le problème persiste.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center px-6 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors min-h-[48px]"
          >
            Réessayer
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 border border-neutral-300 text-neutral-700 font-semibold rounded-lg hover:border-primary-600 transition-colors min-h-[48px]"
          >
            Retour à l&apos;accueil
          </a>
        </div>
      </div>
    </section>
  );
}
