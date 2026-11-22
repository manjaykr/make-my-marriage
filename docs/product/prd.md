# Make My Marriage --- Product Requirements Document (PRD)

**Version:** 1.0\
**Status:** Product baseline\
**Product type:** Wedding management web application\
**Primary market:** India\
**Primary audience:** Couples planning their wedding, with family
collaboration\
**Platform:** Responsive web application\
**Initial goal:** Portfolio project\
**Initial release:** MVP

------------------------------------------------------------------------

## 1. Product overview

### 1.1 Product vision

Make My Marriage is an all-in-one digital wedding planning and
management platform designed for Indian weddings. It gives couples and
their families a shared workspace to organize wedding events, coordinate
responsibilities, manage budgets, track guests, and collect RSVPs.

Over time, the platform can expand to support wedding websites, vendors,
hospitality, wedding-day coordination, livestreaming, and shared photo
galleries.

### 1.2 Problem statement

Planning an Indian wedding can involve multiple ceremonies, large guest
lists, multiple family members, separate and shared budgets, vendors,
invitations, travel arrangements, and frequent last-minute changes.

Today, this work is often scattered across spreadsheets, WhatsApp
groups, phone calls, notebooks, and separate applications. This makes it
difficult to understand what needs to happen, who is responsible, and
what remains incomplete.

**Make My Marriage aims to centralize wedding planning and collaboration
in one place.**

### 1.3 Product objectives

1.  Simplify planning and coordination for Indian weddings.
2.  Let couples and family members collaborate in one workspace.
3.  Manage multiple wedding events independently.
4.  Track tasks, responsibilities, deadlines, and progress.
5.  Track combined, bride-side, and groom-side budgets and expenses.
6.  Maintain a central guest directory and event-specific invitations.
7.  Collect and report event-specific RSVP responses.
8.  Provide a responsive experience across desktop, tablet, and mobile.

### 1.4 Product positioning

**Make My Marriage is the digital workspace for Indian weddings --- one
place to plan, coordinate, manage, and celebrate.**

------------------------------------------------------------------------

## 2. Target users and roles

### 2.1 Primary user: Bride or groom

The couple are the primary users and owners of the wedding workspace.
They can create the workspace, invite one another, invite family
members, create events, manage finances, oversee guests, and monitor
progress.

### 2.2 Collaborators: Family members and organizers

Parents, siblings, relatives, and friends can be invited to collaborate.
Their access depends on their assigned role and permissions.

### 2.3 Guests

Guests receive invitations and access information intended for them.
They can view the events they are invited to and submit RSVP responses
without needing a full organizer account.

### 2.4 Proposed roles

  -----------------------------------------------------------------------
  Role                                Intended access
  ----------------------------------- -----------------------------------
  Wedding owner                       Full workspace management

  Co-owner                            Broad management access, subject to
                                      protected ownership controls

  Admin                               Manage most workspace activities

  Organizer                           Manage assigned events and tasks

  Contributor                         Update assigned tasks or permitted
                                      information

  Guest                               View invitation and event
                                      information intended for them
  -----------------------------------------------------------------------

Roles should be supplemented by configurable permissions. For example,
an organizer may be allowed to manage a guest list without being allowed
to view financial information.

### 2.5 Account and workspace model

-   Bride and groom use separate individual accounts.
-   Both accounts can be members of the same wedding workspace.
-   Workspace access is granted through invitations.
-   A user may belong to multiple wedding workspaces.
-   A user's role and permissions are assigned per workspace, not
    globally.
-   A guest does not need an organizer account to RSVP.

------------------------------------------------------------------------

## 3. MVP scope

The MVP should deliver one complete, usable wedding-planning journey
rather than many disconnected features.

### 3.1 MVP modules

  Module                                MVP priority
  ------------------------------------- ------------------
  Authentication and user profiles      P0 --- Essential
  Wedding workspace creation            P0 --- Essential
  Couple details                        P0 --- Essential
  Member invitations and permissions    P0 --- Essential
  Wedding dashboard                     P0 --- Essential
  Event management                      P0 --- Essential
  Task and organizer management         P0 --- Essential
  Basic budget and expense management   P0 --- Essential
  Guest management                      P0 --- Essential
  Event-specific invitations and RSVP   P0 --- Essential

### 3.2 Later phases

**Phase 2 --- Wedding experience** - Vendor management - Wedding website
builder - Digital invitation templates - Email and WhatsApp sharing
improvements - Advanced payment tracking - Accommodation and
transportation

**Phase 3 --- Wedding-day operations** - Wedding-day command center -
Seating arrangements - Live announcements - Photo and video gallery -
Guest photo uploads - Livestreaming

**Phase 4 --- Smart wedding platform** - AI wedding assistant -
Automated planning checklists - Vendor marketplace - Professional
wedding planner workspace - Advanced analytics

### 3.3 MVP exclusions

The following are out of scope for the initial release: - Online payment
gateway and vendor payments - Automated WhatsApp Business API
messaging - AI-based planning - Vendor discovery marketplace -
Livestreaming infrastructure - Advanced seating chart editor - Native
Android and iOS applications - Automated hotel or flight bookings

The architecture should leave room for future expansion without
implementing these features in the MVP.

------------------------------------------------------------------------

## 4. Functional requirements

### 4.1 Authentication and account management

**Priority:** P0

-   AUTH-01: Users can register using email and password.
-   AUTH-02: Users can log in and log out.
-   AUTH-03: Users can request a password reset.
-   AUTH-04: Users can verify their email address.
-   AUTH-05: Users can manage their profile.
-   AUTH-06: Users can view pending wedding invitations.
-   AUTH-07: Users can accept or decline workspace invitations.
-   AUTH-08: Users can manage account security.

Google sign-in and phone OTP may be considered later.

### 4.2 Wedding workspace management

**Priority:** P0

Users can: - Create a wedding workspace. - Enter the couple's details. -
Add a wedding title and profile photographs. - Set wedding start and end
dates. - Set the wedding location. - Enter an estimated guest count. -
Set an initial wedding budget. - Invite the other partner. - Invite
family members and organizers. - Edit wedding details. - Archive a
completed wedding.

Each wedding is an independent workspace with its own members, events,
tasks, guests, financial records, and settings.

### 4.3 Wedding dashboard

**Priority:** P0

The dashboard should show: - Wedding details and countdown. - Overall
planning progress. - Upcoming events. - Pending and overdue tasks. -
Budget versus actual expenses. - Guest and RSVP summary. - Recent
workspace activity. - Organizer overview. - Important notifications.

Dashboard metrics must be calculated from application records rather
than maintained as unrelated manual values.

### 4.4 Event management

**Priority:** P0

Users can: - Create, view, edit, and delete wedding events. - Set event
name, category, description, date, and start/end time. - Add venue name,
address, and map location. - Add an event cover image. - Set an event
budget. - Manage event-specific guests. - Manage event-specific tasks. -
Associate vendors in a later phase. - Assign event organizers. - Define
an event schedule or timeline.

Suggested event categories: - Roka or engagement - Mehendi - Haldi -
Sangeet - Cocktail party - Wedding ceremony - Reception - Custom event

**Business rule:** Each event has independent management data but
belongs to one wedding workspace. Wedding-level views can aggregate
event data. A guest may be invited to selected events rather than
automatically being invited to all events.

### 4.5 Task and organizer management

**Priority:** P0

Task functionality: - Create, edit, and delete tasks. - Assign tasks to
one or more users. - Associate tasks with a wedding or event. - Set
priority and due date. - Add descriptions and subtasks. - Upload
attachments. - Add comments. - Update task status. - View task history.

Suggested statuses: - To Do - In Progress - Pending - Completed -
Cancelled

Suggested priorities: - Low - Medium - High - Urgent

Organizer functionality: - Invite members by email. - Assign roles and
permissions. - Configure event access. - View pending invitations. -
Revoke invitations. - Remove members. - Review relevant activity
history.

A user can belong to multiple wedding workspaces and have different
permissions in each.

### 4.6 Budget and expense management

**Priority:** P0

Budget functionality: - Set an overall wedding budget. - Set
event-specific budgets. - Create budget categories. - Compare planned
and actual spending. - Calculate remaining budget and utilization.

Expense functionality: - Create, edit, and delete expenses. - Record
description, amount, date, and category. - Associate an expense with an
event. - Associate an expense with a vendor when applicable. - Record
payment status and payment method. - Upload receipts. - Add notes. -
Record one or more payments against an expense.

Expense ownership: - Bride's side - Groom's side - Shared

The system must distinguish: 1. Who is responsible for the expense. 2.
Which side owns or is allocated the expense. 3. Who actually paid. 4.
How much has been paid. 5. How much remains outstanding.

Suggested payment statuses: - Unpaid - Partially paid - Paid - Overdue

The MVP should provide basic expense entry and budget summaries, while
the data model should support more advanced payment and contribution
tracking.

### 4.7 Guest management

**Priority:** P0

Users can: - Add guests manually. - Import guests from CSV or Excel. -
Edit and delete guest records. - Search and filter guests. - Group
guests by family. - Categorize guests by bride's or groom's side. -
Record relationship and category. - Store phone and optional email. -
Record dietary preferences. - Record accommodation requirements. - Add
private notes. - View invitation and RSVP status.

A guest is stored once in the wedding-level guest directory. Event
participation is managed separately through event-specific invitation
records.

### 4.8 Invitations and RSVP

**Priority:** P0

Users can: - Select guests for an event. - Generate event-specific
invitation links. - Share links through available channels. - Track
invitation status. - Collect RSVP responses. - Record accompanying
guests where supported. - View attendance by event. - Send or share
reminders. - Export RSVP reports.

Suggested RSVP statuses: - Not invited - Invited - Pending - Accepted -
Declined

A guest's response to one event must not automatically change their
response to another event.

For the MVP, use secure, shareable invitation links and native WhatsApp
sharing. Automated WhatsApp Business messaging can be added later.

### 4.9 Vendor management

**Priority:** Phase 2

-   Store vendor name, category, and contact details.
-   Upload quotations and contracts.
-   Track booking status.
-   Record booking amount and payment milestones.
-   Associate vendors with events.
-   Track vendor-specific tasks.

### 4.10 Wedding website builder

**Priority:** Phase 2

-   Generate a public wedding page.
-   Provide a customizable wedding URL.
-   Display couple information and story.
-   Display event schedules and venue details.
-   Provide map directions.
-   Display dress code and contact information.
-   Link guests to relevant RSVP pages.
-   Support mobile-friendly templates.

### 4.11 Accommodation and transportation

**Priority:** Phase 2

-   Record hotel and accommodation details.
-   Allocate rooms to guests.
-   Track check-in and check-out.
-   Record airport and railway station arrivals.
-   Assign vehicles and drivers.
-   Maintain guest travel notes.

### 4.12 Wedding-day command center

**Priority:** Phase 3

-   Display live event timelines.
-   Track vendor arrivals.
-   Monitor task completion.
-   Publish announcements.
-   Display emergency contacts.
-   Communicate schedule changes.
-   Highlight urgent issues.

### 4.13 Memories and livestream

**Priority:** Phase 3

-   Provide private livestream access.
-   Organize event-specific photo and video galleries.
-   Allow controlled guest photo uploads.
-   Generate QR codes for photo sharing.
-   Support media downloads.

Use a dedicated streaming provider rather than building video
infrastructure from scratch.

------------------------------------------------------------------------

## 5. Primary user journeys

### 5.1 Create a wedding

1.  User registers or logs in.
2.  User selects Create Wedding.
3.  User enters couple details.
4.  User sets wedding dates and location.
5.  User enters an initial budget.
6.  Application creates the wedding workspace.
7.  User invites their partner.
8.  User opens the wedding dashboard.

### 5.2 Invite family members

1.  Wedding owner opens Organizer Management.
2.  Owner enters invitee email.
3.  Owner selects a role.
4.  Owner configures permissions and event access.
5.  Application sends an invitation.
6.  Invitee registers or logs in.
7.  Invitee accepts the invitation.
8.  Invitee accesses the authorized workspace.

### 5.3 Manage an event

1.  User opens Events.
2.  User creates an event.
3.  User enters event date and venue.
4.  User sets an event budget.
5.  User assigns organizers.
6.  User creates event tasks.
7.  User selects event guests.
8.  User manages the event independently.

### 5.4 Invite guests and collect RSVP

1.  Organizer adds or imports guests.
2.  Organizer selects an event.
3.  Organizer selects guests for that event.
4.  Application generates invitation links.
5.  Organizer shares invitations.
6.  Guest opens the invitation.
7.  Guest submits an RSVP.
8.  Application updates event attendance and reporting.

### 5.5 Record an expense

1.  User opens Budget and Expenses.
2.  User creates an expense.
3.  User enters amount and category.
4.  User selects the related event.
5.  User selects expense ownership.
6.  User records the actual payer.
7.  User adds receipt or notes.
8.  Application updates financial summaries.

------------------------------------------------------------------------

## 6. Application sitemap

### Authentication

-   Login
-   Register
-   Forgot password
-   Reset password

### Onboarding

-   Create wedding
-   Enter couple details
-   Set wedding date and location
-   Invite partner
-   Workspace setup

### Workspace

-   Dashboard
-   Wedding details
-   Workspace settings
-   Members and invitations
-   Activity and notifications

### Events

-   Event list
-   Create event
-   Event details
-   Event schedule
-   Event tasks
-   Event guests

### Tasks

-   Task board
-   My tasks
-   Task details
-   Comments and attachments

### Organizers

-   Member list
-   Pending invitations
-   Roles and permissions

### Finance

-   Budget overview
-   Budget categories
-   Expense list
-   Expense details
-   Payments
-   Financial reports

### Guests and RSVP

-   Guest list
-   Guest details
-   Guest import
-   Event invitations
-   RSVP responses
-   RSVP reports

### Future modules

-   Vendors
-   Wedding website
-   Hospitality
-   Wedding-day command center
-   Gallery and livestream
-   Documents

------------------------------------------------------------------------

## 7. Logical data architecture

Use a relational database such as PostgreSQL.

Proposed entities:

  Entity              Purpose
  ------------------- ----------------------------------------
  users               Individual user accounts
  weddings            Wedding workspaces
  wedding_members     User membership, role, and permissions
  invitations         Workspace invitations
  events              Wedding ceremonies and events
  event_members       Event-specific organizer access
  tasks               Wedding and event tasks
  task_assignees      Task assignments
  task_comments       Task discussions
  budgets             Wedding and event budgets
  expenses            Expense records
  payments            Payments against expenses
  guests              Wedding-level guest directory
  event_invitations   Guest-event invitation records
  rsvps               Event-specific RSVP responses
  vendors             Vendor records
  vendor_bookings     Vendor-event relationships
  notifications       User notifications
  documents           Uploaded documents
  activity_logs       Important workspace activity

### Core relationships

-   A wedding has many members.
-   A wedding has many events.
-   A wedding has many guests.
-   A wedding has budgets and expenses.
-   An event belongs to one wedding.
-   An event has tasks and event-specific members.
-   A guest belongs to one wedding.
-   A guest can receive invitations to many events.
-   An event can have many invited guests.
-   An invitation can have an RSVP response.
-   An expense can have multiple payment records.
-   A vendor can be associated with multiple event bookings.

### Data integrity rules

1.  Every wedding-related record must be associated with the correct
    workspace.
2.  A user can belong to multiple weddings.
3.  A user's role is scoped to a wedding.
4.  Event records must reference their parent wedding.
5.  Guest records are not duplicated for each event.
6.  Guest-event participation is stored separately.
7.  Expense ownership and actual payer are separate fields or
    relationships.
8.  Backend authorization must protect every sensitive operation.
9.  Archiving a wedding must preserve its records.
10. Files and media must use controlled access.

**Tenant isolation is mandatory:** users must never be able to access
another wedding's private records by changing an identifier in a URL or
API request.

------------------------------------------------------------------------

## 8. Non-functional requirements

  -----------------------------------------------------------------------
  Category                            Requirement
  ----------------------------------- -----------------------------------
  Responsiveness                      Support mobile, tablet, and desktop

  Security                            Secure authentication and
                                      authorization

  Privacy                             Restrict access to private wedding
                                      and guest data

  Performance                         Aim for common page loads under 2
                                      seconds under normal conditions

  Scalability                         Support multiple independent
                                      wedding workspaces

  Reliability                         Avoid losing saved information
                                      during failures

  Usability                           Support non-technical family
                                      members

  Accessibility                       Keyboard accessibility and readable
                                      contrast

  Data integrity                      Validate records and financial
                                      calculations

  Backup                              Regular database backups

  Auditability                        Track important changes to tasks,
                                      members, and finances
  -----------------------------------------------------------------------

Additional requirements: - INR is the default currency. - Support Indian
phone number formats. - Store timestamps consistently and display them
in the wedding's configured timezone. - Support English initially. -
Keep the architecture ready for additional Indian languages.

------------------------------------------------------------------------

## 9. Business rules and edge cases

  -----------------------------------------------------------------------
  Scenario                            Expected behavior
  ----------------------------------- -----------------------------------
  Partner has not accepted invitation Creator can continue setting up the
                                      wedding

  Organizer leaves workspace          Access is revoked; historical
                                      activity remains

  Event date changes                  Relevant members can be notified

  Guest attends multiple events       One guest record, multiple event
                                      invitations

  Guest declines one event            Other event responses remain
                                      unchanged

  Expense is partially paid           Outstanding balance is calculated

  Two people edit a task              Conflicting changes should not
                                      silently overwrite one another

  Wedding is completed                Workspace can be archived and
                                      retained

  User belongs to multiple weddings   User can switch workspaces

  Organizer lacks financial           Financial data and APIs remain
  permission                          inaccessible
  -----------------------------------------------------------------------

Additional privacy requirements: - Guest invitation links must use
secure, unpredictable tokens. - Public wedding pages must not expose the
private guest directory. - Sensitive documents must not be publicly
accessible by default. - Permission checks must happen on the backend,
not only in the UI.

------------------------------------------------------------------------

## 10. Success metrics

Initial usability-testing targets:

  Metric                                     Initial target
  -------------------------- ------------------------------
  Create wedding workspace                  Under 3 minutes
  Invite another member                      Under 1 minute
  Create an event                            Under 1 minute
  Add and assign a task                      Under 1 minute
  Import guest list                         Under 3 minutes
  Submit an RSVP                             Under 1 minute
  Complete core flows          100% without critical errors

Qualitative validation: - Can a non-technical parent use the
application? - Can two families collaborate without confusion? - Can a
guest RSVP without creating an organizer account? - Are financial
calculations accurate? - Does event-level access work correctly? - Is
the application usable on a mobile phone?

------------------------------------------------------------------------

## 11. Proposed technology stack

The following is a recommendation for the portfolio implementation, not
a final infrastructure decision.

  Layer            Proposed technology
  ---------------- -------------------------------------------
  Frontend         Next.js
  Language         TypeScript
  Styling          Tailwind CSS
  Backend          Next.js API routes / server-side actions
  Database         PostgreSQL
  ORM              Prisma
  Authentication   Auth.js or managed authentication
  File storage     Supabase Storage or S3-compatible storage
  Email            Resend or similar provider
  Hosting          Vercel and managed PostgreSQL

The final providers should be selected during technical architecture
planning.

------------------------------------------------------------------------

## 12. Assumptions and decisions to validate

  -----------------------------------------------------------------------
  Topic                               Current proposal
  ----------------------------------- -----------------------------------
  Workspace ownership                 Bride and groom can be owners

  Co-owner privileges                 Broad access with protected
                                      ownership controls

  Workspace invitations               Email-based initially

  Guest RSVP                          Secure event-specific invitation
                                      links

  Notifications                       In-app first, email next

  Currency                            INR default

  Language                            English initially

  Storage                             Private cloud storage for documents

  Wedding website                     Public pages with configurable
                                      privacy

  Account deletion                    Preserve or safely transfer shared
                                      wedding records
  -----------------------------------------------------------------------

These proposals should be validated during design and implementation.

------------------------------------------------------------------------

## 13. Release roadmap

### Phase 1 --- Core wedding management (MVP)

-   Authentication and profiles
-   Wedding workspace
-   Couple accounts
-   Member invitations
-   Role-based permissions
-   Wedding dashboard
-   Event management
-   Task management
-   Basic budget and expenses
-   Guest management
-   Event-specific invitations and RSVP

### Phase 2 --- Wedding experience

-   Vendor management
-   Wedding website builder
-   Digital invitation templates
-   Email and WhatsApp sharing
-   Advanced payment tracking
-   Accommodation and transportation

### Phase 3 --- Wedding-day operations

-   Wedding-day command center
-   Seating arrangements
-   Live announcements
-   Photo gallery
-   Guest photo uploads
-   Livestreaming

### Phase 4 --- Smart wedding platform

-   AI wedding assistant
-   Automated planning checklists
-   Vendor marketplace
-   Professional wedding planner workspace
-   Advanced analytics

------------------------------------------------------------------------

## 14. Next steps

The recommended product-development sequence is:

1.  **Application sitemap:** Define all pages, subpages, navigation, and
    user experiences.
2.  **User flows and wireframes:** Design login, wedding creation,
    dashboard, events, tasks, expenses, and guest management.
3.  **Design system:** Establish typography, colors, spacing, buttons,
    forms, tables, cards, and responsive behavior.
4.  **Database schema:** Convert the logical data model into PostgreSQL
    tables, relationships, constraints, and indexes.
5.  **Technical architecture:** Finalize authentication, storage,
    hosting, API patterns, and security.
6.  **Development:** Implement authentication and workspace creation
    first, then build the MVP modules incrementally.
7.  **Testing:** Validate permissions, financial calculations, RSVP
    flows, responsiveness, and tenant isolation.

------------------------------------------------------------------------

## 15. Product baseline and change management

This PRD is the baseline for Make My Marriage version 1.0.

It captures the agreed product direction: - Primary audience: Couples -
Initial market: India - Platform: Responsive web application - Project
ambition: Portfolio project - Product vision: Complete wedding
management platform - Workspace creation: Couple/family-led - Accounts:
Separate bride and groom accounts - Workspace access: Invitation-based -
Event structure: Independent event management within one wedding - Guest
invitations: Event-specific - Budget model: Combined, bride-side, and
groom-side tracking

Changes discovered during wireframing, architecture, or testing should
be recorded as PRD updates rather than silently changing requirements.

**End of PRD v1.0**
