const featureCards = [
  {
    number: "01",
    title: "A plan everyone can follow",
    description:
      "Keep dates, decisions, and next steps together so your family knows what is happening and when.",
    icon: "✳",
  },
  {
    number: "02",
    title: "The details, in their place",
    description:
      "Bring your guest list, budget, and vendor notes into one thoughtful view of the celebration.",
    icon: "⌂",
  },
  {
    number: "03",
    title: "Room for every tradition",
    description:
      "Make space for the people, rituals, and little moments that make your wedding yours.",
    icon: "♡",
  },
];

const principles = [
  [
    "Thoughtful by design",
    "A calmer place to plan, with only the details you need in view.",
  ],
  [
    "Built around your people",
    "A shared planning experience for the families and friends involved.",
  ],
  [
    "Your day, your decisions",
    "Keep your priorities at the center as plans take shape.",
  ],
];

const faqs = [
  [
    "Can both families manage the same wedding?",
    "The product is being designed around shared planning. This preview shows the direction; family workspaces are not available yet.",
  ],
  [
    "Can I plan multiple events?",
    "The homepage concept includes a place for ceremonies, celebrations, and the events around them. Event planning features are still being built.",
  ],
  [
    "Can I manage guests and RSVPs?",
    "Guest planning is part of the product direction. RSVP collection is not connected in this preview.",
  ],
  [
    "Can I share plans with my family?",
    "This design is intended for collaborative planning. Sharing and account features are not implemented yet.",
  ],
];

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.22em] text-burgundy/65">
      {children}
    </p>
  );
}

function DashboardPreview() {
  return (
    <div
      aria-label="Illustrative wedding planning dashboard with fictional sample details"
      className="relative mx-auto mt-14 max-w-5xl rounded-[1.35rem] border border-burgundy/10 bg-white p-2 shadow-[0_28px_70px_-36px_rgba(67,25,39,0.38)] sm:mt-16 sm:p-3"
    >
      <div className="overflow-hidden rounded-[0.95rem] border border-[#eee5e2] bg-[#fffdfc]">
        <div className="flex items-center justify-between border-b border-[#eee5e2] bg-white px-4 py-3 sm:px-6">
          <div className="flex items-center gap-2.5">
            <span className="grid size-7 place-items-center rounded-lg bg-[#f8e7e8] text-xs text-burgundy">
              ✿
            </span>
            <div>
              <p className="text-[11px] font-bold text-charcoal">
                Aanya &amp; Arjun
              </p>
              <p className="text-[9px] text-muted">
                Wedding workspace · sample
              </p>
            </div>
          </div>
          <div className="flex -space-x-2" aria-label="Fictional collaborators">
            {["A", "M", "R"].map((initial, index) => (
              <span
                key={initial}
                className={`grid size-7 place-items-center rounded-full border-2 border-white text-[9px] font-bold text-burgundy ${index === 1 ? "bg-[#f3dfd6]" : "bg-[#f4e9ec]"}`}
              >
                {initial}
              </span>
            ))}
          </div>
        </div>
        <div className="grid min-h-[340px] sm:grid-cols-[150px_1fr]">
          <aside className="hidden border-r border-[#f0e7e4] bg-[#fff8f7] p-4 sm:block">
            <p className="mb-4 px-2 text-[8px] font-bold uppercase tracking-[0.15em] text-muted/70">
              Workspace
            </p>
            {[
              ["▦", "Overview", true],
              ["♡", "Guest list", false],
              ["◷", "Events", false],
              ["✓", "Tasks", false],
              ["▤", "Budget", false],
              ["⌂", "Vendors", false],
            ].map(([icon, label, active]) => (
              <div
                key={label as string}
                className={`mb-1 flex items-center gap-2 rounded-md px-2 py-2 text-[9px] ${active ? "bg-[#f7e6e7] font-bold text-burgundy" : "text-muted"}`}
              >
                <span>{icon}</span>
                <span>{label}</span>
              </div>
            ))}
          </aside>
          <div className="p-4 sm:p-6">
            <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-[9px] uppercase tracking-[0.15em] text-muted">
                  A little at a time
                </p>
                <h2 className="mt-1 font-display text-xl text-dark-wine sm:text-2xl">
                  Your wedding, at a glance
                </h2>
              </div>
              <span className="rounded-full bg-[#f8eeee] px-3 py-1.5 text-[9px] font-semibold text-burgundy">
                Illustrative sample
              </span>
            </div>
            <div className="grid gap-3 sm:grid-cols-4">
              {[
                ["NEXT EVENT", "Mehendi", "12 February 2027"],
                ["GUESTS", "285", "Sample count"],
                ["PLANNED BUDGET", "₹21,40,000", "Example only"],
                ["OPEN TASKS", "18", "A sample checklist"],
              ].map(([label, value, note]) => (
                <div
                  key={label}
                  className="rounded-lg border border-[#eee5e2] bg-white p-3"
                >
                  <p className="text-[8px] font-bold tracking-[0.12em] text-muted/75">
                    {label}
                  </p>
                  <p className="mt-2 truncate font-display text-lg text-dark-wine">
                    {value}
                  </p>
                  <p className="mt-0.5 text-[8px] text-muted">{note}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 grid gap-3 md:grid-cols-[1.15fr_0.85fr]">
              <div className="rounded-lg border border-[#eee5e2] bg-white p-4">
                <div className="mb-4 flex items-center justify-between">
                  <p className="text-[10px] font-bold text-charcoal">
                    A few upcoming moments
                  </p>
                  <span className="text-[8px] text-muted">Sample schedule</span>
                </div>
                {[
                  ["12 FEB", "Mehendi", "Garden courtyard · 4:00 PM"],
                  [
                    "13 FEB",
                    "Sangeet evening",
                    "The family celebration · 7:00 PM",
                  ],
                  [
                    "14 FEB",
                    "Wedding ceremony",
                    "A day to remember · 10:30 AM",
                  ],
                ].map(([date, title, info]) => (
                  <div
                    key={date}
                    className="flex items-center gap-3 border-t border-[#f3ece9] py-2.5 first:border-0"
                  >
                    <span className="w-11 shrink-0 rounded bg-[#fbf1f0] px-1.5 py-1 text-center text-[8px] font-bold text-burgundy">
                      {date}
                    </span>
                    <div>
                      <p className="text-[9px] font-semibold text-charcoal">
                        {title}
                      </p>
                      <p className="text-[8px] text-muted">{info}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="rounded-lg border border-[#eee5e2] bg-white p-4">
                <p className="text-[10px] font-bold text-charcoal">
                  A gentle next step
                </p>
                <p className="mt-1 text-[8px] text-muted">
                  Example tasks for the planning journey
                </p>
                {[
                  ["Confirm the venue shortlist", true],
                  ["Gather family guest lists", true],
                  ["Choose ceremony music", false],
                  ["Review invitation wording", false],
                ].map(([task, done]) => (
                  <div
                    key={task as string}
                    className="flex items-center gap-2 border-t border-[#f3ece9] py-2.5 first:mt-3"
                  >
                    <span
                      className={`grid size-3.5 place-items-center rounded border text-[8px] ${done ? "border-burgundy bg-burgundy text-white" : "border-[#d9caca] text-transparent"}`}
                    >
                      ✓
                    </span>
                    <span
                      className={`text-[8px] ${done ? "text-muted line-through" : "text-charcoal"}`}
                    >
                      {task}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <main>
      <header className="sticky top-0 z-20 border-b border-burgundy/10 bg-[#fff9f8]/95 backdrop-blur">
        <nav
          aria-label="Main navigation"
          className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8"
        >
          <a
            href="#home"
            className="font-display text-base text-dark-wine sm:text-lg"
          >
            Make My Marriage
          </a>
          <div className="hidden items-center gap-7 text-[11px] font-semibold text-muted md:flex">
            <a className="transition hover:text-burgundy" href="#features">
              Features
            </a>
            <a className="transition hover:text-burgundy" href="#how-it-works">
              How it works
            </a>
            <a className="transition hover:text-burgundy" href="#faqs">
              FAQs
            </a>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="/sign-in"
              className="hidden text-[11px] font-semibold text-muted hover:text-burgundy sm:inline"
            >
              Sign in
            </a>
            <a
              href="#get-started"
              className="rounded-full bg-dark-wine px-4 py-2.5 text-[10px] font-bold text-white transition hover:bg-burgundy sm:px-5"
            >
              Start planning
            </a>
          </div>
        </nav>
      </header>

      <section
        id="home"
        className="overflow-hidden bg-[#fff8f7] px-5 pb-16 pt-16 text-center sm:px-8 sm:pb-20 sm:pt-24"
      >
        <div className="mx-auto max-w-3xl">
          <span className="inline-flex rounded-full border border-[#ead3d4] bg-white/80 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.17em] text-burgundy">
            A thoughtful way to plan together
          </span>
          <h1 className="mx-auto mt-6 max-w-2xl font-display text-4xl leading-[1.08] text-dark-wine sm:text-6xl">
            Your wedding. <span className="italic">Beautifully</span>
            <br className="hidden sm:block" /> organized.
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-muted sm:text-[15px]">
            From meaningful traditions to the little details, bring your wedding
            plans into one calm, considered place.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <a
              href="#get-started"
              className="rounded-full bg-dark-wine px-6 py-3 text-[11px] font-bold text-white shadow-sm transition hover:bg-burgundy"
            >
              Begin your wedding plans <span aria-hidden="true">→</span>
            </a>
            <a
              href="#features"
              className="rounded-full border border-[#dfc9c8] bg-white px-6 py-3 text-[11px] font-bold text-burgundy transition hover:bg-[#fcf0ef]"
            >
              Explore the space
            </a>
          </div>
        </div>
        <DashboardPreview />
      </section>

      <section
        id="features"
        className="bg-[#fbeff0] px-5 py-16 sm:px-8 sm:py-24"
      >
        <div className="mx-auto max-w-6xl">
          <SectionEyebrow>A little less to juggle</SectionEyebrow>
          <div className="grid gap-8 md:grid-cols-[0.9fr_1.1fr] md:items-end">
            <h2 className="max-w-lg font-display text-3xl leading-tight text-dark-wine sm:text-4xl">
              A thousand details. One unforgettable celebration.
            </h2>
            <p className="max-w-xl text-sm leading-7 text-muted">
              Planning a wedding brings together many people, plans, and small
              decisions. Make My Marriage is being shaped to help you see the
              whole celebration in one place.
            </p>
          </div>
          <div className="mt-9 grid gap-4 md:grid-cols-3">
            {featureCards.map((card) => (
              <article
                key={card.number}
                className="rounded-xl border border-[#f0dfdf] bg-white p-6 sm:p-7"
              >
                <div className="flex items-center justify-between">
                  <span className="grid size-9 place-items-center rounded-lg bg-[#fae9e9] font-display text-lg text-burgundy">
                    {card.icon}
                  </span>
                  <span className="text-[9px] font-bold tracking-[0.15em] text-muted/55">
                    {card.number}
                  </span>
                </div>
                <h3 className="mt-6 font-display text-xl text-dark-wine">
                  {card.title}
                </h3>
                <p className="mt-3 text-xs leading-6 text-muted">
                  {card.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#fff9f8] px-5 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <SectionEyebrow>Designed around your day</SectionEyebrow>
          <div className="mb-9 grid gap-5 md:grid-cols-2 md:items-end">
            <h2 className="font-display text-3xl leading-tight text-dark-wine sm:text-4xl">
              One beautiful space for every wedding detail.
            </h2>
            <p className="max-w-lg text-sm leading-7 text-muted md:justify-self-end">
              A considered home for your plans, from the first conversation to
              the last dance.
            </p>
          </div>
          <div className="grid gap-5 lg:grid-cols-2">
            <article className="rounded-xl border border-[#eee1df] bg-white p-5 sm:p-7">
              <div className="flex items-center justify-between border-b border-[#f0e8e6] pb-4">
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-muted">
                    Your wedding
                  </p>
                  <h3 className="mt-1 font-display text-xl text-dark-wine">
                    Events &amp; moments
                  </h3>
                </div>
                <span className="rounded-full bg-[#f9ecec] px-3 py-1.5 text-[8px] font-bold text-burgundy">
                  SAMPLE VIEW
                </span>
              </div>
              <div className="mt-3 space-y-2">
                {[
                  ["12 Feb", "Mehendi", "Garden courtyard"],
                  ["13 Feb", "Sangeet", "An evening with everyone"],
                  [
                    "14 Feb",
                    "Wedding ceremony",
                    "The day we've been waiting for",
                  ],
                ].map(([date, title, text]) => (
                  <div
                    key={date}
                    className="grid grid-cols-[54px_1fr_auto] items-center gap-3 rounded-lg bg-[#fff9f8] px-3 py-3"
                  >
                    <span className="text-[9px] font-bold text-burgundy">
                      {date}
                    </span>
                    <div>
                      <p className="text-[10px] font-bold text-charcoal">
                        {title}
                      </p>
                      <p className="mt-0.5 text-[8px] text-muted">{text}</p>
                    </div>
                    <span className="text-xs text-burgundy/60">⌄</span>
                  </div>
                ))}
              </div>
            </article>
            <article className="rounded-xl border border-[#eee1df] bg-white p-5 sm:p-7">
              <div className="flex items-center justify-between border-b border-[#f0e8e6] pb-4">
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-muted">
                    Keep everyone in view
                  </p>
                  <h3 className="mt-1 font-display text-xl text-dark-wine">
                    A guest list with context
                  </h3>
                </div>
                <span className="rounded-full bg-[#f9ecec] px-3 py-1.5 text-[8px] font-bold text-burgundy">
                  SAMPLE VIEW
                </span>
              </div>
              <div className="mt-3 space-y-2">
                {[
                  ["AS", "Aarav Sharma", "Bride's family", "Mehendi"],
                  ["NK", "Neha Kapoor", "Friends", "Wedding"],
                  ["RM", "Rohan Mehta", "Groom's family", "All events"],
                ].map(([initials, name, group, event]) => (
                  <div
                    key={name}
                    className="grid grid-cols-[30px_1fr_auto] items-center gap-3 border-b border-[#f3ecea] py-3 last:border-0"
                  >
                    <span className="grid size-8 place-items-center rounded-full bg-[#f7e9e9] text-[8px] font-bold text-burgundy">
                      {initials}
                    </span>
                    <div>
                      <p className="text-[10px] font-bold text-charcoal">
                        {name}
                      </p>
                      <p className="mt-0.5 text-[8px] text-muted">{group}</p>
                    </div>
                    <span className="rounded-full border border-[#eee1df] px-2 py-1 text-[8px] text-muted">
                      {event}
                    </span>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="bg-[#fbeff0] px-5 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto mb-9 max-w-xl text-center">
            <SectionEyebrow>Thoughtfully connected</SectionEyebrow>
            <h2 className="font-display text-3xl text-dark-wine sm:text-4xl">
              Everything you need. Beautifully connected.
            </h2>
            <p className="mt-3 text-sm leading-6 text-muted">
              A shared view of the details helps everyone feel part of the plan.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {[
              [
                "GUESTS & CELEBRATIONS",
                "Plan every celebration independently",
                "Keep the right guest details and event notes together as your plans grow.",
              ],
              [
                "GUESTS & RSVPS",
                "Make space for every guest",
                "A home for the people you want beside you on the day.",
              ],
              [
                "BUDGET & TRANSPARENCY",
                "Budgets without the guesswork",
                "See example categories for venues, food, outfits, and the finishing touches.",
              ],
              [
                "FAMILY & HARMONY",
                "Everyone knows their part",
                "Keep shared decisions and helpful reminders close at hand.",
              ],
            ].map(([eyebrow, title, text], index) => (
              <article
                key={title}
                className="rounded-xl border border-[#f0dfdf] bg-white p-5 sm:p-7"
              >
                <div className="flex items-center gap-2 text-[8px] font-bold tracking-[0.14em] text-burgundy">
                  <span className="grid size-6 place-items-center rounded-md bg-[#fae9e9]">
                    {["♡", "✉", "₹", "⌂"][index]}
                  </span>
                  {eyebrow}
                </div>
                <h3 className="mt-4 font-display text-xl text-dark-wine">
                  {title}
                </h3>
                <p className="mt-2 max-w-md text-xs leading-6 text-muted">
                  {text}
                </p>
                <div className="mt-5 rounded-lg border border-[#f0e6e4] bg-[#fffafa] p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[8px] text-muted">
                      Illustrative planning preview
                    </span>
                    <span className="text-[8px] font-semibold text-burgundy">
                      IN PROGRESS
                    </span>
                  </div>
                  <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[#f1e5e4]">
                    <div
                      className={`h-full rounded-full bg-[#b77b83] ${["w-2/3", "w-1/2", "w-3/4", "w-1/3"][index]}`}
                    />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#fff9f8] px-5 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto grid max-w-6xl gap-9 md:grid-cols-2 md:items-center">
          <div>
            <SectionEyebrow>Two families, one flow</SectionEyebrow>
            <h2 className="font-display text-3xl leading-tight text-dark-wine sm:text-4xl">
              Two families. One beautifully coordinated celebration.
            </h2>
            <p className="mt-4 max-w-lg text-sm leading-7 text-muted">
              Bring the people who matter into the planning journey, and make
              each decision with a little more clarity.
            </p>
            <ul className="mt-6 space-y-3 text-xs text-muted">
              {[
                "Keep tasks and decisions in one shared view",
                "See the next steps for each celebration",
                "Make room for family traditions and ideas",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="text-burgundy">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-[#eddddb] bg-white p-4 shadow-sm sm:p-6">
            <div className="flex items-center justify-between border-b border-[#f0e8e6] pb-4">
              <div>
                <p className="text-[8px] font-bold uppercase tracking-[0.14em] text-muted">
                  A shared planning view
                </p>
                <p className="mt-1 font-display text-lg text-dark-wine">
                  People &amp; plans
                </p>
              </div>
              <span className="rounded-full bg-[#f9ecec] px-2.5 py-1 text-[8px] font-bold text-burgundy">
                SAMPLE
              </span>
            </div>
            {[
              ["AM", "Ananya Mehta", "Bride's family", "Venue shortlist"],
              ["RK", "Rishi Kapoor", "Groom's family", "Guest list"],
              ["SM", "Sunita Mehta", "Bride's family", "Ceremony details"],
              ["VK", "Vikram Kapoor", "Groom's family", "Menu options"],
            ].map(([initials, name, group, task]) => (
              <div
                key={name}
                className="flex items-center gap-3 border-b border-[#f4edeb] py-3 last:border-0"
              >
                <span className="grid size-9 place-items-center rounded-full bg-[#f8e9e9] text-[9px] font-bold text-burgundy">
                  {initials}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-bold text-charcoal">{name}</p>
                  <p className="mt-0.5 text-[8px] text-muted">{group}</p>
                </div>
                <span className="max-w-[110px] truncate rounded-full bg-[#fff8f7] px-2.5 py-1.5 text-[8px] text-muted">
                  {task}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="how-it-works"
        className="bg-[#fbeff0] px-5 py-16 sm:px-8 sm:py-24"
      >
        <div className="mx-auto max-w-6xl">
          <div className="mb-9 text-center">
            <SectionEyebrow>A more considered way to plan</SectionEyebrow>
            <h2 className="font-display text-3xl text-dark-wine sm:text-4xl">
              From the first plan to the final celebration.
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              [
                "01",
                "Create your starting point",
                "Gather your dates, people, and priorities in one place.",
              ],
              [
                "02",
                "Organize as you go",
                "Shape your schedule and keep the next steps easy to find.",
              ],
              [
                "03",
                "Celebrate with confidence",
                "Spend less time searching for details and more time together.",
              ],
            ].map(([number, title, text]) => (
              <article
                key={number}
                className="rounded-xl border border-[#f0dfdf] bg-white p-6 sm:p-7"
              >
                <span className="font-display text-3xl text-[#c58d92]">
                  {number}
                </span>
                <h3 className="mt-4 font-display text-xl text-dark-wine">
                  {title}
                </h3>
                <p className="mt-2 text-xs leading-6 text-muted">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#fff9f8] px-5 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <SectionEyebrow>Principles in progress</SectionEyebrow>
          <div className="mb-8 grid gap-4 md:grid-cols-2 md:items-end">
            <h2 className="font-display text-3xl text-dark-wine sm:text-4xl">
              Your wedding plans, in thoughtful hands.
            </h2>
            <p className="max-w-lg text-sm leading-7 text-muted md:justify-self-end">
              We are shaping a planning experience that respects your time, your
              people, and the meaning behind every choice.
            </p>
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            {principles.map(([title, text], index) => (
              <article
                key={title}
                className="rounded-xl border border-[#eee1df] bg-[#fffdfc] p-5"
              >
                <span className="text-sm text-burgundy">
                  {["✧", "♡", "✳"][index]}
                </span>
                <h3 className="mt-3 text-xs font-bold text-charcoal">
                  {title}
                </h3>
                <p className="mt-2 text-[10px] leading-5 text-muted">{text}</p>
              </article>
            ))}
          </div>
          <p className="mt-4 text-[9px] text-muted">
            Product principles shown for direction; account, access, and privacy
            controls are not available in this preview.
          </p>
        </div>
      </section>

      <section id="faqs" className="bg-[#fbeff0] px-5 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-2xl">
          <div className="mb-8 text-center">
            <SectionEyebrow>A little more clarity</SectionEyebrow>
            <h2 className="font-display text-3xl text-dark-wine sm:text-4xl">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="space-y-2">
            {faqs.map(([question, answer]) => (
              <details
                key={question}
                className="group rounded-lg border border-[#efdfdf] bg-white px-4 py-4 open:bg-[#fffdfc]"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[11px] font-bold text-charcoal marker:hidden">
                  {question}
                  <span className="text-sm text-burgundy transition group-open:rotate-180">
                    ⌄
                  </span>
                </summary>
                <p className="max-w-xl pt-3 text-[10px] leading-5 text-muted">
                  {answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section
        id="get-started"
        className="bg-dark-wine px-5 py-16 text-center text-white sm:px-8 sm:py-24"
      >
        <div className="mx-auto max-w-2xl">
          <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#e7c9cb]">
            Your next chapter starts here
          </p>
          <h2 className="mx-auto mt-4 max-w-xl font-display text-4xl leading-tight sm:text-5xl">
            Make room for the moments that matter.
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-xs leading-6 text-white/75">
            A more thoughtful way to bring wedding plans together is taking
            shape.
          </p>
          <a
            href="#faqs"
            className="mt-7 inline-flex rounded-full bg-white px-6 py-3 text-[10px] font-bold text-dark-wine transition hover:bg-[#f8e8e8]"
          >
            See what is taking shape{" "}
            <span className="ml-2" aria-hidden="true">
              →
            </span>
          </a>
          <p className="mt-4 text-[9px] text-white/60">
            The planning workspace is currently in development.
          </p>
        </div>
      </section>

      <footer className="bg-[#fff9f8] px-5 py-9 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 border-b border-[#eee1df] pb-8 sm:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <a href="#home" className="font-display text-lg text-dark-wine">
              Make My Marriage
            </a>
            <p className="mt-2 text-[10px] text-muted">
              Your wedding, thoughtfully brought together.
            </p>
          </div>
          <div>
            <p className="text-[8px] font-bold uppercase tracking-[0.16em] text-muted">
              Explore
            </p>
            <div className="mt-3 flex flex-col gap-2 text-[10px] text-muted">
              <a href="#features" className="hover:text-burgundy">
                Features
              </a>
              <a href="#how-it-works" className="hover:text-burgundy">
                How it works
              </a>
              <a href="#faqs" className="hover:text-burgundy">
                FAQs
              </a>
            </div>
          </div>
          <div>
            <p className="text-[8px] font-bold uppercase tracking-[0.16em] text-muted">
              Coming soon
            </p>
            <p className="mt-3 text-[10px] text-muted">
              The planning workspace is in development.
            </p>
          </div>
        </div>
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-2 pt-5 text-[8px] text-muted sm:flex-row">
          <span>© 2026 Make My Marriage. A product in progress.</span>
          <span>Made for the moments that matter.</span>
        </div>
      </footer>
    </main>
  );
}
