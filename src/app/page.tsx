import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-hidden">
      <header className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-6 sm:px-10 lg:px-12">
        <Link
          className="text-sm font-semibold tracking-wide text-burgundy"
          href="/"
        >
          MAKE MY MARRIAGE
        </Link>
        <Link
          className="rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-burgundy transition hover:bg-dusty-mauve"
          href="/sign-in"
        >
          Sign in
        </Link>
      </header>

      <section className="mx-auto grid min-h-[72vh] w-full max-w-7xl items-center gap-12 px-6 pb-20 pt-10 sm:px-10 lg:grid-cols-[1.05fr_0.95fr] lg:px-12 lg:pb-28 lg:pt-16">
        <div className="max-w-2xl">
          <p className="mb-6 text-xs font-semibold uppercase tracking-[0.22em] text-burgundy/75">
            A calmer way to plan together
          </p>
          <h1 className="font-display text-5xl leading-[1.06] tracking-tight text-dark-wine sm:text-6xl lg:text-7xl">
            Your wedding.
            <br />
            Beautifully organized.
          </h1>
          <p className="mt-7 max-w-xl text-base leading-7 text-muted sm:text-lg sm:leading-8">
            Bring celebrations, guest lists, budgets, and family coordination
            together in one thoughtful workspace.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link
              className="rounded-full bg-burgundy px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-dark-wine"
              href="/sign-in"
            >
              Start planning
            </Link>
            <a
              className="rounded-full px-5 py-3.5 text-sm font-semibold text-burgundy transition hover:bg-dusty-mauve/70"
              href="#features"
            >
              Explore the workspace
            </a>
          </div>
          <p className="mt-5 text-xs leading-5 text-muted">
            A project in progress. Account sign-in is not available yet.
          </p>
        </div>

        <div
          aria-label="Illustration of a wedding planning workspace"
          className="relative mx-auto w-full max-w-xl"
          role="img"
        >
          <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-dusty-mauve/70 blur-3xl" />
          <div className="relative rounded-[2rem] border border-border bg-white p-5 shadow-[0_24px_80px_-40px_rgba(57,33,45,0.4)] sm:p-7">
            <div className="flex items-center justify-between border-b border-border pb-5">
              <div>
                <p className="text-xs font-medium text-muted">
                  Wedding workspace
                </p>
                <h2 className="mt-1 font-display text-2xl text-dark-wine">
                  Aanya &amp; Arjun
                </h2>
              </div>
              <span className="rounded-full bg-dusty-mauve px-3 py-1.5 text-xs font-semibold text-burgundy">
                Planning together
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 py-5">
              <div className="rounded-2xl bg-warm-ivory p-4">
                <p className="text-xs text-muted">Next celebration</p>
                <p className="mt-2 text-sm font-semibold text-charcoal">
                  Mehendi
                </p>
                <p className="mt-1 text-xs text-muted">Saturday, 14 March</p>
              </div>
              <div className="rounded-2xl bg-warm-ivory p-4">
                <p className="text-xs text-muted">This week</p>
                <p className="mt-2 text-sm font-semibold text-charcoal">
                  3 tasks
                </p>
                <p className="mt-1 text-xs text-muted">Ready to take care of</p>
              </div>
            </div>

            <div className="rounded-2xl border border-border p-4 sm:p-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-charcoal">
                    A little progress, together
                  </p>
                  <p className="mt-1 text-xs text-muted">
                    Events, people, and plans in one place
                  </p>
                </div>
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-dusty-mauve text-lg text-burgundy">
                  ✦
                </span>
              </div>
              <div className="mt-5 h-2 overflow-hidden rounded-full bg-warm-ivory">
                <div className="h-full w-2/3 rounded-full bg-burgundy" />
              </div>
            </div>

            <p className="mt-4 text-right text-[11px] text-muted">
              Sample workspace · fictional details
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-white/70" id="features">
        <div className="mx-auto grid w-full max-w-7xl gap-8 px-6 py-12 sm:grid-cols-3 sm:px-10 lg:px-12">
          {[
            ["Events", "Keep each celebration and its details in view."],
            ["Guests", "Bring your guest list and event responses together."],
            ["Shared plans", "Make tasks and budgets easier to coordinate."],
          ].map(([title, description]) => (
            <article className="max-w-sm" key={title}>
              <h2 className="font-display text-2xl text-dark-wine">{title}</h2>
              <p className="mt-2 text-sm leading-6 text-muted">{description}</p>
            </article>
          ))}
        </div>
      </section>

      <footer className="mx-auto flex w-full max-w-7xl flex-col gap-2 px-6 py-7 text-xs text-muted sm:flex-row sm:items-center sm:justify-between sm:px-10 lg:px-12">
        <span>Make My Marriage</span>
        <span>Thoughtful planning, together.</span>
      </footer>
    </main>
  );
}
