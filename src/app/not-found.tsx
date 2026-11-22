import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-screen max-w-xl flex-col items-start justify-center px-6">
      <p className="text-sm font-semibold uppercase tracking-wider text-burgundy">
        Page not found
      </p>
      <h1 className="mt-3 font-display text-4xl text-dark-wine">
        We could not find that page.
      </h1>
      <p className="mt-4 leading-7 text-muted">
        The address may have changed, or the page may not exist yet.
      </p>
      <Link
        className="mt-7 rounded-full bg-burgundy px-5 py-3 text-sm font-semibold text-white hover:bg-dark-wine"
        href="/"
      >
        Back to homepage
      </Link>
    </main>
  );
}
