# Make My Marriage — Design Guidelines

**Version:** 1.0  
**Status:** Initial design foundation; refine against approved Google Stitch screens  
**Product:** Make My Marriage — wedding planning and management workspace

## 1. Design vision

**Your wedding. Beautifully organized.**

Create a modern, warm, trustworthy, premium SaaS experience for Indian couples and their families. The product should feel like **quiet luxury × calm productivity × human warmth**. Functionality and clarity take priority over ornament.

This is a wedding management application—not a wedding invitation site, matchmaking platform, wedding agency, or vendor marketplace.

### Principles

1. **Product-first:** Make it obvious what users can do and what needs attention.
2. **Elegant restraint:** Use whitespace, typography, subtle borders, and deliberate accents rather than decoration.
3. **Accessible to families:** Clear labels, predictable actions, readable type, mobile-friendly controls, and plain language.
4. **Trust by design:** Show permissions and financial visibility accurately; never imply fake security certifications.
5. **Consistency:** Share design tokens and components across marketing, authentication, and workspace pages.
6. **Responsive by intent:** Compose mobile layouts thoughtfully instead of shrinking desktop screens.

## 2. Brand palette

| Token | Hex | Primary use |
|---|---|---|
| Burgundy | `#542C3A` | Primary buttons, sidebar, active navigation, key accents |
| Dark Wine | `#39212D` | Dark branded surfaces and selected headings |
| Warm Ivory | `#FAF7F3` | Main application and marketing background |
| Champagne Taupe | `#C4A88E` | Sparse decorative accents and subtle emphasis |
| Dusty Mauve | `#E9DFE2` | Soft surfaces, separators, selected backgrounds |
| White | `#FFFFFF` | Cards, inputs, elevated content |
| Charcoal | `#292529` | Primary readable text |

### Usage rules

- Prefer warm ivory backgrounds and white cards for working screens.
- Use burgundy for primary calls to action and application navigation; avoid making every card burgundy.
- Use champagne sparingly. Do not use it for small, low-contrast body text.
- Derive secondary text, borders, hover, focus, and semantic status tokens from an accessible palette during implementation; verify contrast rather than assuming these hex values satisfy every combination.
- Status colors (success, warning, error, info) should be semantic and distinct; do not encode every status in burgundy.
- Do not use saturated pink, bright red/yellow, heavy gold gradients, floral patterns, mandalas, paisley, or ornamental wedding-invitation styling.

## 3. Typography

- **Display:** DM Serif Display, reserved for selected editorial headlines, hero copy, and occasional wedding titles.
- **Interface:** Manrope for navigation, cards, forms, tables, labels, buttons, and body text.
- Use a clear hierarchy and comfortable line-height; do not use decorative script fonts.
- Use tabular numerals for budgets, counts, and other aligned data where possible.
- Keep labels visible; placeholders are hints, not replacements for labels.

## 4. Layout and spacing

- Use an **8px-based spacing rhythm**, allowing 4px increments for compact details.
- Prefer a marketing content max-width around **1200–1280px**.
- Desktop workspace sidebar: approximately **240–260px**; content uses a flexible grid.
- Use **12–16px** card radii as a starting point; keep input/button radii consistent.
- Use fine borders and restrained shadows to define surfaces.
- Avoid overly tall empty sections and dense dashboards with tiny labels.
- At mobile widths, prioritize the current wedding context, key action, upcoming events, and urgent tasks.

These are initial design targets, not immutable values. Adjust after reviewing Stitch output and accessibility tests.

## 5. Reusable components

Establish shared patterns for:

- Primary, secondary, ghost, and destructive buttons
- Inputs, selects, checkboxes, textareas, validation messages, and password visibility
- Cards and metric summaries
- Status badges and progress indicators
- Tables, lists, filters, search, pagination, and empty states
- Dialogs, drawers, dropdown menus, tooltips, and notifications
- Sidebar, top bar, breadcrumbs, workspace selector, and account menu
- Event rows, task rows, collaborator avatars, and activity items
- Loading skeletons, error states, and permission-restricted states

Prefer accessible primitives and consistent tokens over one-off styling. Do not add a large component library until the initial needs are clear.

## 6. Marketing landing page

**Hero headline:** Your wedding. Beautifully organized.

**Supporting copy:** From celebrations and guest lists to budgets and family coordination, bring every detail together in one beautiful workspace.

**Primary CTA:** Start Planning Your Wedding  
**Secondary CTA:** Explore Features

Use a product-dashboard-led hero, not a large generic wedding photo. Recommended sections:

1. Navigation and hero
2. Wedding planning challenge
3. Wedding command center / product showcase
4. Core features: events, guests and RSVPs, budgets, tasks
5. Family collaboration
6. How it works
7. Trust and control
8. FAQs
9. Final CTA and footer

Use realistic **fictional** sample data; do not fabricate testimonials, certifications, usage metrics, or customer logos.

## 7. Authentication pages

Desktop: refined split layout with a deep burgundy brand/product-preview panel and an ivory form area. Mobile: form-first single column; reduce or remove the brand panel.

- Sign-in: email, password, show/hide password, forgot-password link, primary Sign In, optional provider-based Google sign-in, Create Account link.
- Sign-up: minimal account fields; wedding-specific setup belongs in onboarding.
- Password reset: neutral confirmation messages that do not reveal account existence.
- Invitation-aware sign-in: preserve valid invitation context and return the user to invitation review after authentication.
- Loading, errors, focus, autofill, and password-manager support are mandatory UX considerations.

**Important:** Screens are not security controls. Do not depict placeholder authentication as real protection.

## 8. Workspace overview dashboard

The dashboard should quickly answer:

1. **What's next?** Upcoming events and dates.
2. **What needs attention?** Pending tasks and guest responses.
3. **How are we progressing?** Guest, task, and budget summaries.

### Desktop shell

- Burgundy sidebar with Make My Marriage brand and wedding workspace selector.
- Navigation: Overview, Events, Tasks, Guests & RSVPs, Budget & Expenses, Team & Family, Notifications, Settings.
- Clean top bar with breadcrumbs, notifications, and user account controls.
- Warm ivory content canvas and white cards.

### Recommended content order

1. Compact welcome and wedding context
2. Four summary cards: events, RSVPs, budget, tasks
3. Upcoming celebrations and needs-attention tasks
4. Budget and RSVP snapshots
5. Planning together and recent activity

For mockups, use fictional workspace **Aanya & Arjun's Wedding**. INR amounts use Indian digit grouping, e.g. `₹25,00,000`.

### Critical product accuracy

- A wedding can have multiple independently managed events.
- One wedding guest record can have multiple event invitations and independent event RSVPs.
- Both partners have distinct accounts; users can belong to multiple wedding workspaces.
- Wedding and event permissions are separate concepts.
- Hide financial data from users without appropriate access, including summary cards and activity entries.
- Expense ownership (bride side, groom side, shared) is distinct from actual payer.
- Sample counts must have clear labels and must not conflate unique guests with event invitations.

## 9. Responsive behavior

- **Desktop:** fixed sidebar, four-up summary cards when space permits, multi-column content.
- **Tablet:** collapsible navigation and fewer columns.
- **Mobile:** compact header/workspace selector, navigation drawer, readable single-column sections or two-up compact metrics only when legible.
- Target touch controls of at least approximately **44×44px**.
- No horizontal overflow or unreadably shrunken desktop previews.
- Preserve important actions near the top and reduce decorative content on small screens.

## 10. Accessibility and interaction

- Target **WCAG 2.2 AA** where applicable.
- Verify text and UI contrast; use visible keyboard focus indicators.
- Ensure keyboard-operable navigation, dialogs, menus, and forms.
- Provide meaningful labels, validation feedback, and status text—not color alone.
- Support reduced motion; keep transitions subtle and purposeful.
- Use proper headings and semantic HTML.
- Keep destructive actions explicit and confirmation proportional to risk.
- Never make controls look interactive unless they perform an action.

## 11. Content and tone

Write concise, reassuring, plain-English UI copy. Be warm without sounding overly romantic or ceremonial. Prefer concrete labels such as **Add Event**, **Invite Family**, **Manage Guests**, and **View Budget**.

Avoid jargon for family users. Show clear date, time, and currency formatting appropriate to the wedding locale. Default currency is INR; store monetary amounts as integer minor units in the backend, not floating-point values.

## 12. Stitch-to-code workflow

1. Finalize the Overview Dashboard visual language first.
2. Use its shell, tokens, components, and interaction patterns as references for Events, Guests, Tasks, Finance, and Settings.
3. Preserve the shared brand system across landing, authentication, and workspace screens.
4. Treat Stitch designs as **visual references**, not as proof of implemented functionality, permissions, or data correctness.
5. Check desktop and mobile compositions before implementing.
6. Review generated code for accessibility, maintainability, responsive behavior, and adherence to the PRD/API/database rules.

## 13. Engineering handoff

Suggested token organization:

- `color.brand.primary`, `color.brand.dark`, `color.background`, `color.surface`, `color.text`, `color.border`
- `color.status.success|warning|error|info`
- `font.display`, `font.ui`
- `radius.card`, `radius.control`
- `space.*`, `shadow.*`, `motion.*`

Implement via Tailwind/theme CSS variables or an equivalent centralized token layer. Avoid duplicating raw hex values across components.

The initial scaffold only needs the foundation: fonts, tokens, global styles, basic page shell, and a few reusable primitives. Implement feature-specific components as real modules are built.

## 14. Open design decisions

- Final logo/wordmark asset and favicon
- Exact semantic status colors and verified contrast pairs
- Final desktop/mobile breakpoint choices
- Whether Google sign-in is enabled by the selected managed auth provider
- Final approved Stitch screenshots and component specifications
- Dark mode (not required for initial MVP)

Update this document when these decisions are approved; do not silently invent them.
