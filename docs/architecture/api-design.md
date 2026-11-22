# Make My Marriage — API Design & Contracts

**Version:** 1.0 (proposed)  
**Status:** Implementation-ready draft; open decisions listed at end  
**Product:** Make My Marriage  
**Architecture:** Next.js App Router modular monolith, Node.js runtime, MongoDB Atlas, managed authentication

## 1. Purpose and scope

This document defines the public-facing and authenticated HTTP API contracts for the Make My Marriage MVP. It is aligned with the Product Requirements, System Design & Architecture, and Database Design documents. It establishes resource conventions, endpoint inventory, representative request/response payloads, authorization requirements, validation, errors, pagination, idempotency, and operational safeguards.

**In scope:** identity/profile, weddings, membership/invites, events, event organizers, tasks, budgets, expenses/payments, guests/import, event invitations/RSVP, uploads, notifications, dashboard, and audit history. **Deferred:** vendor marketplace, wedding website, transport/accommodation, seating, gallery, livestream, realtime collaboration, and AI.

## 2. API principles

1. Version all stable HTTP endpoints under `/api/v1`.
2. Authenticate protected endpoints using a managed provider's session. The server derives the user identity from the verified session, never from request JSON.
3. Enforce wedding membership and event-level permissions in the application service layer on **every** read and mutation.
4. Scope all tenant queries by `weddingId`, and event-scoped queries by both `weddingId` and `eventId`.
5. Keep guests as wedding-level resources; invitations and RSVPs are event-level associations.
6. Treat finance permissions separately from generic event-management permissions.
7. Use MongoDB `ObjectId` values serialized as 24-character lowercase hex strings; validate their format before database access. Do not assume an ID's validity establishes authorization.
8. Use ISO 8601 UTC timestamps for instants, `YYYY-MM-DD` for date-only fields, and an IANA timezone on the wedding.
9. Use currency `INR` by default; represent all amounts as **integer paise**, named `amountMinor`, `plannedAmountMinor`, etc.
10. Use consistent response envelopes, error codes, request IDs, pagination, and optimistic concurrency for sensitive updates.
11. External email, SMS, and file operations must not occur inside database transactions; use an outbox where reliable delivery matters.
12. Prefer Route Handlers for stable APIs, guest endpoints, callbacks, and integrations. Next.js Server Actions may call the **same services** for UI mutations; they do not bypass validation or authorization.

## 3. Transport, authentication, and headers

- **Base path:** `/api/v1`
- **Content type:** `application/json; charset=utf-8`, except multipart import or direct upload flows.
- **Authentication:** provider-managed secure session cookie for browser clients. Do not invent or accept a custom bearer token in MVP without a documented integration use case.
- **CSRF:** validate origin and use provider/framework protections for cookie-authenticated state-changing requests; do not rely on `SameSite` alone.
- **Request tracing:** server returns `X-Request-Id`; clients may supply `X-Request-Id` subject to validation or server replacement.
- **Idempotency:** `Idempotency-Key` for retryable create/payment/import operations where specified; scope keys to user, wedding, route, and normalized payload, with a documented retention period.
- **Conditional update:** `If-Match: "<version>"` for critical edits; respond `412 PRECONDITION_FAILED` on stale versions. The version is an integer stored on the resource.
- **No caching of private data:** `Cache-Control: private, no-store` for sensitive financial, membership, guest, and invitation responses.

## 4. Common response conventions

### 4.1 Success

```json
{
  "data": { "id": "673f00000000000000000001", "name": "Wedding" },
  "meta": { "requestId": "req_01J..." }
}
```

For list responses:

```json
{
  "data": [{ "id": "673f00000000000000000001" }],
  "page": { "nextCursor": null, "limit": 25, "hasMore": false },
  "meta": { "requestId": "req_01J..." }
}
```

For deletes, use `204 No Content` unless returning a status-bearing archive operation. Do not return a body with 204.

### 4.2 Error

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "One or more fields are invalid.",
    "details": [{ "path": "startAt", "message": "Must be a valid ISO timestamp" }],
    "requestId": "req_01J..."
  }
}
```

| HTTP | Code | Meaning |
|---|---|---|
| 400 | `VALIDATION_ERROR` | Malformed input or invalid field values |
| 401 | `UNAUTHENTICATED` | Missing or invalid session |
| 403 | `FORBIDDEN` | Insufficient permissions on an accessible resource |
| 404 | `NOT_FOUND` | Missing resource or intentionally concealed cross-tenant resource |
| 409 | `CONFLICT` | Duplicate membership, duplicate RSVP, invalid state transition |
| 410 | `TOKEN_EXPIRED` | Public invitation link no longer usable |
| 412 | `PRECONDITION_FAILED` | Stale resource version |
| 413 | `PAYLOAD_TOO_LARGE` | Upload/import exceeds limit |
| 415 | `UNSUPPORTED_MEDIA_TYPE` | Unsupported file type |
| 422 | `BUSINESS_RULE_VIOLATION` | Valid shape but disallowed business action |
| 429 | `RATE_LIMITED` | Too many attempts; include `Retry-After` |
| 500 | `INTERNAL_ERROR` | Unexpected server failure; no sensitive details |
| 503 | `SERVICE_UNAVAILABLE` | Transient provider/dependency outage |

Use 404 rather than confirming existence of another wedding's records. Never expose raw database errors, stack traces, token hashes, or authorization internals.

## 5. IDs, dates, money, and field semantics

- `id`, `weddingId`, `eventId`, `guestId`, `expenseId`, etc.: MongoDB ID string.
- `createdAt`, `updatedAt`, `paidAt`, `startAt`, `endAt`: ISO UTC instants, e.g. `2027-02-10T12:30:00.000Z`.
- `dueDate`, `weddingDate`: date-only `YYYY-MM-DD` when a clock time is not needed.
- `timezone`: e.g. `Asia/Kolkata`.
- `currency`: ISO 4217 code; MVP supports `INR`, with schema ready for future currencies.
- Money: integer minor units; `15000000` means INR 150,000.00.
- Optional relationships use `null` when explicitly unassigned; omitted fields in PATCH mean unchanged.
- Sensitive fields (phone/email) should be normalized on the server and masked in logs.

## 6. Roles and authorization model

**Wedding roles:** `OWNER`, `CO_OWNER`, `ADMIN`, `ORGANIZER`, `CONTRIBUTOR`, `GUEST`. A wedding membership is independent of the authenticated user record. Event permissions can narrow or extend designated event capabilities within policy, but never override explicit finance restrictions or owner-only actions.

Recommended permissions: `wedding.read`, `wedding.manage`, `members.read`, `members.manage`, `events.read`, `events.manage`, `tasks.read`, `tasks.manage`, `guests.read`, `guests.manage`, `invitations.manage`, `finance.read`, `finance.manage`, `payments.manage`, `audit.read`.

**Policy guidance:** owners/co-owners can administer the workspace; admins have delegated workspace administration; organizers can manage assigned events; contributors operate on assigned tasks and allowed event areas; guests do not receive internal workspace access solely by RSVP invitation. Define a permission matrix in code and test it; avoid relying on role labels alone.

For each endpoint below, `W` means an authenticated wedding member with the named permission, `E` means a wedding member with permission for the specified event, `O` means owner/co-owner or delegated admin according to policy, `P` means public invitation token, and `SELF` means the authenticated user.

## 7. Endpoint catalog

### 7.1 Identity and profile

| Method | Path | Access | Purpose |
|---|---|---|---|
| GET | `/me` | SELF | Current profile and membership summary |
| PATCH | `/me` | SELF | Update display name, phone, preferences |
| GET | `/me/weddings` | SELF | List wedding workspaces |

Authentication sign-in, sign-out, and provider callbacks are owned by the managed authentication integration and are not duplicated as custom password endpoints.

### 7.2 Weddings and membership

| Method | Path | Access | Purpose |
|---|---|---|---|
| POST | `/weddings` | Authenticated | Create wedding and owner membership atomically |
| GET | `/weddings` | Authenticated | List user's workspaces |
| GET | `/weddings/{weddingId}` | W: `wedding.read` | Wedding details |
| PATCH | `/weddings/{weddingId}` | W: `wedding.manage` | Update metadata |
| POST | `/weddings/{weddingId}/archive` | O | Archive workspace; preserve history |
| GET | `/weddings/{weddingId}/members` | W: `members.read` | List members |
| PATCH | `/weddings/{weddingId}/members/{memberId}` | O | Change role/permissions |
| DELETE | `/weddings/{weddingId}/members/{memberId}` | O | Revoke access; cannot remove last owner |
| POST | `/weddings/{weddingId}/member-invitations` | W: `members.manage` | Invite collaborator |
| GET | `/weddings/{weddingId}/member-invitations` | W: `members.read` | List pending invites (no raw tokens) |
| DELETE | `/weddings/{weddingId}/member-invitations/{invitationId}` | W: `members.manage` | Revoke invitation |
| POST | `/member-invitations/accept` | Authenticated + valid invite | Accept invite |

### 7.3 Events and organizers

| Method | Path | Access | Purpose |
|---|---|---|---|
| POST | `/weddings/{weddingId}/events` | W: `events.manage` | Create event |
| GET | `/weddings/{weddingId}/events` | W: `events.read` | List events |
| GET | `/weddings/{weddingId}/events/{eventId}` | E: `events.read` | Event detail |
| PATCH | `/weddings/{weddingId}/events/{eventId}` | E: `events.manage` | Update event |
| POST | `/weddings/{weddingId}/events/{eventId}/archive` | E: `events.manage` | Archive event |
| GET | `/weddings/{weddingId}/events/{eventId}/organizers` | E: `events.read` | List assigned organizers |
| PUT | `/weddings/{weddingId}/events/{eventId}/organizers/{userId}` | E: `events.manage` | Assign/update organizer |
| DELETE | `/weddings/{weddingId}/events/{eventId}/organizers/{userId}` | E: `events.manage` | Remove organizer |

### 7.4 Tasks and comments

| Method | Path | Access | Purpose |
|---|---|---|---|
| POST | `/weddings/{weddingId}/tasks` | W/E: `tasks.manage` | Create wedding-wide or event task |
| GET | `/weddings/{weddingId}/tasks` | W/E: `tasks.read` | Filter by event, assignee, status, due date |
| GET | `/weddings/{weddingId}/tasks/{taskId}` | W/E: `tasks.read` | Task detail |
| PATCH | `/weddings/{weddingId}/tasks/{taskId}` | W/E: `tasks.manage` | Update task |
| DELETE | `/weddings/{weddingId}/tasks/{taskId}` | W/E: `tasks.manage` | Soft delete task |
| GET | `/weddings/{weddingId}/tasks/{taskId}/comments` | W/E: `tasks.read` | Comments |
| POST | `/weddings/{weddingId}/tasks/{taskId}/comments` | W/E: `tasks.manage` | Add comment |

### 7.5 Budgets, expenses, and payments

| Method | Path | Access | Purpose |
|---|---|---|---|
| GET | `/weddings/{weddingId}/budgets` | W: `finance.read` | Wedding/event budgets |
| PUT | `/weddings/{weddingId}/budgets/{budgetId}` | W: `finance.manage` | Update planned budget |
| POST | `/weddings/{weddingId}/budgets` | W: `finance.manage` | Create budget bucket |
| GET | `/weddings/{weddingId}/finance/summary` | W: `finance.read` | Planned, committed, paid, remaining |
| POST | `/weddings/{weddingId}/expenses` | W: `finance.manage` | Create expense |
| GET | `/weddings/{weddingId}/expenses` | W: `finance.read` | Filter by event, ownership, status |
| GET | `/weddings/{weddingId}/expenses/{expenseId}` | W: `finance.read` | Expense detail and payment totals |
| PATCH | `/weddings/{weddingId}/expenses/{expenseId}` | W: `finance.manage` | Edit expense |
| POST | `/weddings/{weddingId}/expenses/{expenseId}/archive` | W: `finance.manage` | Archive expense; retain payment history |
| POST | `/weddings/{weddingId}/expenses/{expenseId}/payments` | W: `payments.manage` | Record partial/full payment |
| GET | `/weddings/{weddingId}/expenses/{expenseId}/payments` | W: `finance.read` | Payment history |
| POST | `/weddings/{weddingId}/expenses/{expenseId}/payments/{paymentId}/void` | W: `payments.manage` | Reverse erroneous payment with audit reason |

**Do not** trust client-provided totals. Calculate `paidAmountMinor` from active payments, and `balanceAmountMinor = max(0, expense.amountMinor - paidAmountMinor)`. Define overpayment policy; MVP rejects a payment exceeding the remaining balance. `ownershipSide` (`BRIDE`, `GROOM`, `SHARED`) describes responsibility, while `paidByUserId` identifies the payer; these are different fields.

### 7.6 Guests, invitations, and RSVPs

| Method | Path | Access | Purpose |
|---|---|---|---|
| POST | `/weddings/{weddingId}/guests` | W: `guests.manage` | Create guest |
| GET | `/weddings/{weddingId}/guests` | W: `guests.read` | Search/filter guest directory |
| GET | `/weddings/{weddingId}/guests/{guestId}` | W: `guests.read` | Guest detail with event associations |
| PATCH | `/weddings/{weddingId}/guests/{guestId}` | W: `guests.manage` | Update guest |
| POST | `/weddings/{weddingId}/guests/{guestId}/archive` | W: `guests.manage` | Archive guest, preserve history |
| POST | `/weddings/{weddingId}/guest-imports` | W: `guests.manage` | Start validated CSV import |
| GET | `/weddings/{weddingId}/guest-imports/{importId}` | W: `guests.read` | Import status/errors |
| POST | `/weddings/{weddingId}/events/{eventId}/invitations` | E: `invitations.manage` | Invite selected wedding guests to event |
| GET | `/weddings/{weddingId}/events/{eventId}/invitations` | E: `guests.read` | List invitations and RSVP status |
| PATCH | `/weddings/{weddingId}/events/{eventId}/invitations/{invitationId}` | E: `invitations.manage` | Update invitation settings |
| POST | `/weddings/{weddingId}/events/{eventId}/invitations/{invitationId}/revoke` | E: `invitations.manage` | Revoke token/access |
| GET | `/public/invitations/{token}` | P | Show event invitation details, limited PII |
| PUT | `/public/invitations/{token}/rsvp` | P | Submit/change RSVP for this invitation only |

**Isolation invariant:** a guest can be invited to several events; the response for one event never modifies any other event invitation or RSVP. Use unique indexes on `(weddingId, eventId, guestId)` for event invitations and RSVPs.

### 7.7 Files, notifications, dashboard, audit

| Method | Path | Access | Purpose |
|---|---|---|---|
| POST | `/weddings/{weddingId}/files/upload-intents` | W/E resource permission | Request short-lived signed upload URL |
| POST | `/weddings/{weddingId}/files/{fileId}/complete` | W/E resource permission | Verify upload and finalize metadata |
| GET | `/weddings/{weddingId}/files/{fileId}/download-url` | W/E resource permission | Short-lived signed download URL |
| DELETE | `/weddings/{weddingId}/files/{fileId}` | W/E resource permission | Soft delete/revoke file access |
| GET | `/notifications` | SELF | User notifications |
| PATCH | `/notifications/{notificationId}` | SELF | Mark read/unread |
| GET | `/weddings/{weddingId}/dashboard` | W: `wedding.read` | Permission-filtered overview |
| GET | `/weddings/{weddingId}/activity` | W: `audit.read` | Paginated audit activity |

## 8. Representative contracts

### 8.1 Create wedding

`POST /api/v1/weddings`

```json
{
  "title": "Aarav & Meera Wedding",
  "weddingDate": "2027-02-12",
  "timezone": "Asia/Kolkata",
  "currency": "INR",
  "couple": { "partnerOneName": "Aarav", "partnerTwoName": "Meera" }
}
```

`201 Created`

```json
{
  "data": {
    "id": "673f00000000000000000001",
    "title": "Aarav & Meera Wedding",
    "weddingDate": "2027-02-12",
    "timezone": "Asia/Kolkata",
    "currency": "INR",
    "status": "ACTIVE",
    "myRole": "OWNER",
    "version": 1
  },
  "meta": { "requestId": "req_example" }
}
```

**Validation:** title 1–120 chars; valid date; valid IANA timezone; supported currency. **Atomicity:** create wedding and owner membership in one MongoDB transaction.

### 8.2 Create event

`POST /api/v1/weddings/{weddingId}/events`

```json
{
  "name": "Sangeet",
  "category": "SANGEET",
  "startAt": "2027-02-10T13:30:00.000Z",
  "endAt": "2027-02-10T18:00:00.000Z",
  "venue": { "name": "Celebration Hall", "city": "Bengaluru" },
  "description": "Music and dancing"
}
```

`201 Created` returns the persisted event including `id`, `weddingId`, `status`, `version`, and timestamps. Validate `endAt > startAt`. Do not infer date-only wedding dates from event timestamps.

### 8.3 Create task

`POST /api/v1/weddings/{weddingId}/tasks`

```json
{
  "eventId": "673f00000000000000000002",
  "title": "Confirm stage lighting",
  "description": "Check setup with the venue",
  "status": "TODO",
  "priority": "HIGH",
  "dueDate": "2027-02-01",
  "assigneeIds": ["673f00000000000000000003"]
}
```

`201 Created`. Check that the event belongs to the same wedding and assignees have appropriate membership. An omitted or null `eventId` creates a wedding-wide task.

### 8.4 Create expense and record payment

`POST /api/v1/weddings/{weddingId}/expenses`

```json
{
  "eventId": "673f00000000000000000002",
  "budgetId": "673f00000000000000000004",
  "title": "Sangeet sound system",
  "category": "ENTERTAINMENT",
  "amountMinor": 8500000,
  "currency": "INR",
  "ownershipSide": "SHARED",
  "incurredAt": "2027-01-15T10:00:00.000Z",
  "notes": "Deposit due before event"
}
```

`201 Created`. Ensure event and budget belong to the wedding. Use integer arithmetic; reject negative values and unsupported currencies.

`POST /api/v1/weddings/{weddingId}/expenses/{expenseId}/payments` with `Idempotency-Key: <unique-key>`:

```json
{
  "amountMinor": 2500000,
  "currency": "INR",
  "paidAt": "2027-01-20T10:00:00.000Z",
  "method": "UPI",
  "paidByUserId": "673f00000000000000000003",
  "reference": "Manual payment reference"
}
```

`201 Created`:

```json
{
  "data": {
    "id": "673f00000000000000000005",
    "expenseId": "673f00000000000000000006",
    "amountMinor": 2500000,
    "status": "RECORDED",
    "expenseTotals": {
      "amountMinor": 8500000,
      "paidAmountMinor": 2500000,
      "balanceAmountMinor": 6000000
    }
  },
  "meta": { "requestId": "req_example" }
}
```

Payment creation must be concurrency-safe: use a transaction with a guarded update/version check or equivalent atomic strategy to prevent two concurrent requests from overpaying. Duplicate idempotency keys with identical payload return the original result; conflicting payloads return 409.

### 8.5 Create guest and event invitation

`POST /api/v1/weddings/{weddingId}/guests`

```json
{
  "fullName": "Priya Sharma",
  "phone": "+919876543210",
  "email": "priya@example.com",
  "side": "BRIDE",
  "groupLabel": "Family",
  "partySizeAllowed": 2,
  "dietaryNotes": "Vegetarian"
}
```

`201 Created`. Guest records belong to the wedding, not an event. Validate Indian phone numbers using E.164 where available; optional contact information may be omitted under defined invite-delivery rules.

`POST /api/v1/weddings/{weddingId}/events/{eventId}/invitations`

```json
{
  "guestIds": ["673f00000000000000000007"],
  "deliveryChannel": "EMAIL",
  "sendNow": false
}
```

`202 Accepted` for asynchronous delivery, or `201 Created` when only creating invitation records. Suggested MVP response:

```json
{
  "data": {
    "createdCount": 1,
    "alreadyInvitedCount": 0,
    "deliveryStatus": "NOT_REQUESTED"
  },
  "meta": { "requestId": "req_example" }
}
```

Verify every guest belongs to the wedding. Do not expose raw invitation tokens in list endpoints or logs. If delivery is requested, enqueue an outbox message after committing invitation records.

### 8.6 Public RSVP

`GET /api/v1/public/invitations/{token}` returns only the invitation's event, greeting, RSVP status, permitted party size, and fields explicitly approved for public display. The token is high entropy, stored hashed, scoped to one invitation, revocable, and rate-limited.

`PUT /api/v1/public/invitations/{token}/rsvp`

```json
{
  "response": "ACCEPTED",
  "partySize": 2,
  "message": "Looking forward to celebrating!"
}
```

`200 OK`:

```json
{
  "data": {
    "eventId": "673f00000000000000000002",
    "response": "ACCEPTED",
    "partySize": 2,
    "respondedAt": "2027-01-22T11:00:00.000Z"
  },
  "meta": { "requestId": "req_example" }
}
```

**Validation:** `response` is `ACCEPTED`, `DECLINED`, or `MAYBE`; `partySize` is 0 for declined and between 1 and invitation limit for accepted; define `MAYBE` party-size policy before release. `PUT` is idempotent for the same submitted RSVP state. Updating one event RSVP must never touch another event's RSVP. Token expiry, editing cutoff, and revocation behavior are open product decisions.

### 8.7 File upload intent

`POST /api/v1/weddings/{weddingId}/files/upload-intents`

```json
{
  "fileName": "venue-receipt.pdf",
  "contentType": "application/pdf",
  "sizeBytes": 482100,
  "resourceType": "EXPENSE",
  "resourceId": "673f00000000000000000006"
}
```

`201 Created` returns `fileId`, an expiring signed `uploadUrl`, required upload headers, and `expiresAt`. Validate ownership and finance access before issuing URLs. On `/complete`, verify actual object size/type and existence before marking the file available. Do not persist file bytes in MongoDB.

## 9. Query parameters, pagination, and sorting

List endpoints accept `limit` (default 25, max 100), `cursor`, and a small allowlist of filter/sort keys. Prefer cursor pagination with a stable compound ordering such as `(createdAt DESC, _id DESC)`; encode the cursor opaquely and validate it. Do not expose raw MongoDB query operators from the browser.

Examples:

```text
GET /api/v1/weddings/{weddingId}/tasks?eventId=...&status=TODO&assigneeId=...&limit=25
GET /api/v1/weddings/{weddingId}/expenses?ownershipSide=BRIDE&eventId=...&limit=25
GET /api/v1/weddings/{weddingId}/guests?search=sharma&side=GROOM&limit=25
GET /api/v1/weddings/{weddingId}/events/{eventId}/invitations?rsvp=ACCEPTED&limit=25
```

Search must be indexed appropriately and bounded. Reject unknown sort keys and cap query complexity. A list's cursor must remain valid only for the same filter/sort combination.

## 10. Dashboard contract

`GET /api/v1/weddings/{weddingId}/dashboard?eventId={optional}`

Suggested response:

```json
{
  "data": {
    "events": { "upcomingCount": 3 },
    "tasks": { "openCount": 24, "overdueCount": 4 },
    "guests": { "totalCount": 250, "invitedToSelectedEvents": 180 },
    "rsvp": { "acceptedCount": 130, "declinedCount": 12, "pendingCount": 38 },
    "finance": null
  },
  "meta": { "requestId": "req_example" }
}
```

`finance` is **null or omitted** when the user lacks `finance.read`; never fetch and then merely hide it in the frontend. Counts for RSVPs must be labeled clearly as invitation-level counts, not necessarily distinct wedding-level guests. Filter all aggregates by the permitted wedding/events.

## 11. Imports and asynchronous processing

CSV guest import uses a staged process: upload validated CSV → parse/preview or report errors → confirm import (if preview is implemented) → execute import job → retrieve status and row errors. For MVP, `POST /guest-imports` may accept multipart CSV directly with strict size/row limits. The server must normalize names/contact fields, validate duplicates according to a documented strategy, and provide partial-success counts without silently dropping rows.

Example import status: `QUEUED`, `PROCESSING`, `COMPLETED`, `COMPLETED_WITH_ERRORS`, `FAILED`. Store import job metadata and row errors separately or with bounded retention; never expose a guest import across weddings.

Email invitations and notifications use an outbox record committed alongside domain changes. A worker retries delivery with bounded exponential backoff, deduplicates deliveries, and records terminal failure. HTTP success indicates resource creation/queueing, **not** that an email was delivered.

## 12. Database transaction boundaries

Use MongoDB transactions for:

1. Wedding creation + initial owner membership.
2. Member invitation acceptance + membership activation + invitation consumption.
3. Event invitation creation + associated outbox delivery request, where appropriate.
4. Payment recording + any denormalized balance/version update.
5. Multi-document operations requiring a strict invariant.

Use atomic single-document updates where sufficient. Avoid long-running transactions and never call external providers inside them. Add unique indexes to enforce membership and invitation invariants even under races.

## 13. Security controls by surface

| Surface | Controls |
|---|---|
| Authenticated API | Verified session, backend RBAC, tenant scoping, input validation, audit logs |
| Member invites | High-entropy single-use token, hashed at rest, expiry, revocation, rate limit |
| Public RSVP | Per-invitation token, scoped event, limited PII, expiry/revocation, rate limit |
| Finance | Dedicated permission checks for reads and writes; audit payment changes |
| File access | Private buckets, short-lived signed URLs, MIME/size checks, object ownership verification |
| CSV import | Limits, safe parsing, formula-injection protection for exports, sanitized error messages |
| Notifications | Avoid sensitive content in email previews and logs; retry/dedupe |
| Audit | Immutable or append-only activity records, redaction of sensitive fields |

Rate-limit by a combination of IP, session/user, wedding, and token as applicable. Use consistent limits across deployments via a shared store, not only in-memory counters. Never accept client-supplied `weddingId` as proof of membership.

## 14. Indexes supporting API access patterns

Recommended initial indexes (finalize with the Database Design document and query plans):

- `users`: unique `(authProvider, authSubject)`.
- `weddingMembers`: unique `(weddingId, userId)` and `(userId, status)`.
- `events`: `(weddingId, startAt, _id)`.
- `tasks`: `(weddingId, eventId, status, dueDate)` and `(weddingId, assigneeIds, status)`.
- `budgets`: `(weddingId, eventId)`; add uniqueness based on the chosen budget bucket model.
- `expenses`: `(weddingId, eventId, incurredAt)` and `(weddingId, ownershipSide, incurredAt)`.
- `payments`: `(weddingId, expenseId, paidAt)`.
- `guests`: `(weddingId, normalizedName)` and appropriate contact/search indexes.
- `eventInvitations`: unique `(weddingId, eventId, guestId)`; unique sparse/partial `tokenHash` as appropriate.
- `rsvps`: unique `(weddingId, eventId, guestId)`.
- `notifications`: `(recipientUserId, readAt, createdAt)`.
- `activityLogs`: `(weddingId, createdAt)`.
- `outbox`: `(status, nextAttemptAt)`.

Do not add every possible index up front; validate with production-like access patterns and `explain()`.

## 15. API implementation layout

```text
src/
  app/api/v1/
    me/route.ts
    weddings/route.ts
    weddings/[weddingId]/route.ts
    weddings/[weddingId]/events/route.ts
    weddings/[weddingId]/tasks/route.ts
    weddings/[weddingId]/expenses/route.ts
    weddings/[weddingId]/guests/route.ts
    public/invitations/[token]/route.ts
    public/invitations/[token]/rsvp/route.ts
  modules/
    identity/
    weddings/
    events/
    tasks/
    finance/
    guests/
    invitations/
    files/
    notifications/
    audit/
  shared/
    auth/
    authorization/
    validation/
    database/
    http/
    errors/
    observability/
```

A Route Handler should be thin: parse request → authenticate → validate input → call application service → serialize response. Application services enforce business rules and authorization; repositories apply tenant-scoped queries. Use a shared validation library such as Zod and infer TypeScript types from schemas. Server Actions must invoke the same services.

## 16. Contract testing and acceptance criteria

**Required tests before release:**

1. Anonymous users cannot access protected routes.
2. A member of Wedding A cannot read or mutate Wedding B records by changing IDs.
3. Event organizers cannot access events outside their assignment/policy.
4. Users without finance permissions cannot retrieve expenses or finance dashboard aggregates.
5. A guest invited to two events can RSVP independently to each.
6. Invalid, expired, or revoked public invitation tokens do not reveal private data.
7. Duplicate guest-event invitation requests cannot create duplicate associations.
8. Concurrent payments cannot exceed an expense balance.
9. Retrying a payment with the same idempotency key cannot record it twice.
10. Removing the final wedding owner is rejected.
11. Archived records remain available to permitted audit/history views but are excluded from active lists.
12. Upload signed URLs cannot be used to access another wedding's files.
13. Cursor pagination is stable and filters are tenant-scoped.
14. API errors are consistent and do not leak stack traces or sensitive tokens.
15. Outbox retries do not duplicate external delivery beyond the documented provider guarantees.

Use unit tests for policies/validators, integration tests against a test MongoDB instance, and end-to-end tests for core workflows. Include negative authorization cases for every route family.

## 17. Open decisions and versioning notes

Before implementation, finalize:

1. **Managed auth provider** and session/callback configuration.
2. **Exact role-permission matrix**, including whether admins can grant finance access.
3. **Budget bucket model** (wedding-wide, event, category, side) and uniqueness rules.
4. **Guest duplicate matching** (phone/email/name), import confirmation, and household/group semantics.
5. **Public RSVP policy:** token expiry, editing deadline, `MAYBE` party size, plus-one handling, resend/revocation.
6. **Financial adjustments:** payment void vs refund, overpayment policy, expense deletion/archival rules.
7. **Upload provider**, maximum sizes, allowed types, malware scanning, retention.
8. **Notification channels** and reliable worker hosting.
9. **Archive and retention policy** under applicable privacy requirements.
10. **API exposure:** browser-only MVP or eventual third-party consumers; external API keys/OAuth are deferred.

Changes that break clients require a new version or documented migration. Additive optional fields may remain within v1. Maintain an OpenAPI specification alongside route implementations and generate contract tests from it once field details are frozen.

## 18. Suggested implementation sequence

**Phase 1 — foundation:** auth integration, user profile, request/error conventions, wedding creation, membership authorization, indexes.  
**Phase 2 — planning:** events, organizers, tasks, dashboard basics.  
**Phase 3 — finance:** budgets, expenses, payments, finance permissions, audit.  
**Phase 4 — guests:** guest directory, CSV import, event invitations, public RSVP.  
**Phase 5 — supporting services:** files, notifications/outbox, audit activity, performance and security hardening.

## 19. References

- Next.js Route Handlers: https://nextjs.org/docs/app/getting-started/route-handlers
- Next.js Server Actions: https://nextjs.org/docs/app/getting-started/updating-data
- MongoDB transactions: https://www.mongodb.com/docs/drivers/node/current/crud/transactions/
- MongoDB indexes: https://www.mongodb.com/docs/manual/indexes/
- OpenAPI Specification: https://spec.openapis.org/oas/latest.html
- OWASP API Security Top 10: https://owasp.org/API-Security/

---

**Document note:** These contracts are a proposed baseline. Final field names and permission decisions should be reconciled with the Database Design v1.0 schema before code generation; this document deliberately avoids claiming unconfirmed implementation details as settled.
