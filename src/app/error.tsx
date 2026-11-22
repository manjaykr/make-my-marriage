"use client";

export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="mx-auto flex min-h-screen max-w-xl flex-col items-start justify-center px-6">
      <p className="text-sm font-semibold uppercase tracking-wider text-burgundy">
        Something went wrong
      </p>
      <h1 className="mt-3 font-display text-4xl text-dark-wine">
        This page could not load.
      </h1>
      <p className="mt-4 leading-7 text-muted">
        Try again. If the problem continues, return to the homepage.
      </p>
      <button
        className="mt-7 rounded-full bg-burgundy px-5 py-3 text-sm font-semibold text-white hover:bg-dark-wine"
        onClick={reset}
        type="button"
      >
        Try again
      </button>
    </main>
  );
}
