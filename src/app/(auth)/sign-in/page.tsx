import Link from "next/link";

export default function SignInPlaceholderPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-16">
      <section className="w-full max-w-lg rounded-3xl border border-border bg-white p-8 shadow-sm sm:p-10">
        <Link
          className="text-xs font-semibold uppercase tracking-[0.18em] text-burgundy"
          href="/"
        >
          Make My Marriage
        </Link>
        <h1 className="mt-8 font-display text-4xl text-dark-wine">Sign in</h1>
        <p className="mt-4 leading-7 text-muted">
          Account access is not set up yet. This page does not sign you in or
          protect a workspace.
        </p>
        <Link
          className="mt-8 inline-flex rounded-full border border-border px-5 py-3 text-sm font-semibold text-burgundy transition hover:bg-dusty-mauve"
          href="/"
        >
          Back to homepage
        </Link>
      </section>
    </main>
  );
}
