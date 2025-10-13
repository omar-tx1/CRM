# Iteration 1 Planning Snapshot

## Jobber → TJB Alignment
| Borrow (Keep) | Simplify (Adjust) | Defer (Later) |
| --- | --- | --- |
| Lead → Quote → Job → Invoice → Payment pipeline with status chips. | Use a single combined Contacts module for leads & customers; rely on quick filters instead of separate modules. | Automated lead ingestion from Meta/Thumbtack; customer self-service portal. |
| Quote builder with itemized pricing, taxes, discounts, e-signature. | Volume-tier presets (1/8 to full load) with quick keypad entry and optional heavy-debris surcharge toggle. | Complex proposal templates and multi-page quotes. |
| Scheduling board with drag-and-drop and crew assignments. | Day/week calendar views first; dispatchers manage mobile crews via simple cards. | Automated route optimization and travel-time predictions. |
| Invoices, deposits, receipts, and payment status tracking. | Stripe Payment Links only; no on-site card capture at MVP. | Full accounting export to QuickBooks or other ERPs. |
| Photo attachments for jobs (before/after). | Mobile-first upload flow with compression; limit video support for now. | Rich media gallery management and advanced editing. |
| Audit log of changes and RBAC for Admin/Dispatcher/Crew/Viewer. | Lightweight RBAC rules enforced via middleware; single-tenant deployment. | Granular field-level permissions and multi-tenant architecture. |
| Revenue dashboard showing conversion rate, avg job value, revenue trend. | Focus on weekly/monthly revenue, conversion, source mix, and crew utilization. | Forecasting, cohort analysis, lifetime value modeling. |
| Map view clustering jobs/leads. | Use Mapbox with simple status/date/source filters. | Service area polygons, real-time truck GPS overlays. |
| Double-entry accounting for invoices/payments/taxes. | Seeded chart of accounts and guardrails around AR + taxes first. | Cash flow automation, bank reconciliation, integrations with external accounting. |
| Email/SMS workflows for confirmations and reminders. | Predefined templates stored in DB with minimal customization. | Full marketing automation, drip campaigns, or AI personalization. |

## Working Assumptions (Until Stakeholder Answers)
1. **Tech stack**: Next.js (App Router) for web, Express API with PostgreSQL/Prisma.
2. **Auth**: Email magic links with optional Google OAuth; NextAuth for SSO layer.
3. **Payments**: Stripe Payment Links only; no embedded Elements in MVP.
4. **Taxes**: Default tax rate 8.25%; service radius 25 miles from HQ.
5. **Pricing tiers**: Standard junk volume tiers (1/8, 1/4, 1/2, 3/4, full) with $40 heavy debris surcharge per cubic yard.
6. **Communications**: Resend for email, Twilio for SMS.
7. **Map provider**: Mapbox (tile credits manageable for MVP).
8. **CSV import**: Columns = name, phone, email, address, source, tags, notes.
9. **Dashboard metrics**: Total revenue (week/month), average job value, conversion rate, jobs by source, crew utilization.
10. **Lead intake**: No existing Google/Meta/Thumbtack integrations; manual entry or CSV import.

## Proposed Iteration 1 Monorepo Layout
```
.
├── apps
│   ├── api
│   │   ├── src
│   │   │   ├── index.ts
│   │   │   ├── routes
│   │   │   ├── controllers
│   │   │   ├── services
│   │   │   └── middleware
│   │   ├── prisma
│   │   │   └── schema.prisma
│   │   └── package.json
│   └── web
│       ├── app
│       │   ├── (auth)
│       │   │   └── login
│       │   ├── dashboard
│       │   ├── contacts
│       │   ├── jobs
│       │   ├── calendar
│       │   ├── quotes
│       │   ├── invoices
│       │   ├── map
│       │   └── accounting
│       ├── components
│       ├── lib
│       └── package.json
├── packages
│   ├── config
│   │   ├── eslint
│   │   ├── prettier
│   │   └── tsconfig
│   ├── types
│   │   └── src
│   └── ui
│       ├── src
│       └── package.json
├── docs
│   └── iteration1-plan.md
├── prisma
│   └── migrations (placeholder for shared migrations)
├── .github
│   └── workflows
│       └── ci.yml
├── package.json (root workspace orchestrator)
├── turbo.json (if using Turborepo)
├── pnpm-workspace.yaml
├── README.md
└── .env.example
```

## Initial Prisma Schema (CRM Core + Accounting)
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

enum Role {
  ADMIN
  DISPATCHER
  CREW
  VIEWER
}

enum JobStatus {
  LEAD
  QUOTE
  SCHEDULED
  IN_PROGRESS
  COMPLETED
  INVOICED
  PAID
}

enum InvoiceStatus {
  DRAFT
  SENT
  PARTIAL
  PAID
  VOID
}

enum PaymentMethod {
  STRIPE_LINK
  CARD
  CASH
  CHECK
  ACH
}

enum JournalRefType {
  INVOICE
  PAYMENT
  MANUAL
  ADJUSTMENT
  TAX
  OPENING
}

enum AccountType {
  ASSET
  LIABILITY
  EQUITY
  REVENUE
  EXPENSE
  CONTRA_ASSET
  CONTRA_REVENUE
}

enum PeriodStatus {
  OPEN
  CLOSED
}

model User {
  id            String   @id @default(cuid())
  email         String   @unique
  name          String?
  passwordHash  String?
  role          Role     @default(VIEWER)
  phone         String?
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
  jobsAssigned  Job[]    @relation("JobCrew")
  auditLogs     AuditLog[]
}

model Contact {
  id          String      @id @default(cuid())
  firstName   String
  lastName    String?
  email       String?
  phone       String?
  address     String?
  city        String?
  state       String?
  postalCode  String?
  source      String?
  tags        String[]
  notes       String?
  createdAt   DateTime    @default(now())
  updatedAt   DateTime    @updatedAt
  jobs        Job[]
  quotes      Quote[]
  invoices    Invoice[]
  attachments Attachment[]
}

model Job {
  id             String      @id @default(cuid())
  contactId      String
  contact        Contact     @relation(fields: [contactId], references: [id])
  status         JobStatus   @default(LEAD)
  serviceWindow  DateTime?
  scheduledStart DateTime?
  scheduledEnd   DateTime?
  crew           User[]      @relation("JobCrew")
  notes          String?
  locationLat    Float?
  locationLng    Float?
  materials      Json?
  createdAt      DateTime    @default(now())
  updatedAt      DateTime    @updatedAt
  attachments    Attachment[]
  quote          Quote?
  invoice        Invoice?
}

model Quote {
  id            String           @id @default(cuid())
  jobId         String?          @unique
  job           Job?             @relation(fields: [jobId], references: [id])
  contactId     String
  contact       Contact          @relation(fields: [contactId], references: [id])
  subtotal      Decimal          @default(0)
  taxTotal      Decimal          @default(0)
  total         Decimal          @default(0)
  deposit       Decimal          @default(0)
  notes         String?
  expiresAt     DateTime?
  signedAt      DateTime?
  signedBy      String?
  createdAt     DateTime         @default(now())
  updatedAt     DateTime         @updatedAt
  lineItems     QuoteLineItem[]
  attachments   Attachment[]
}

model QuoteLineItem {
  id          String   @id @default(cuid())
  quoteId     String
  quote       Quote    @relation(fields: [quoteId], references: [id])
  description String
  quantity    Decimal  @default(1)
  unitPrice   Decimal  @default(0)
  surcharge   Decimal  @default(0)
  taxRateId   String?
}

model Invoice {
  id           String            @id @default(cuid())
  number       String            @unique
  jobId        String?
  job          Job?              @relation(fields: [jobId], references: [id])
  contactId    String
  contact      Contact           @relation(fields: [contactId], references: [id])
  status       InvoiceStatus     @default(DRAFT)
  issuedAt     DateTime?
  dueAt        DateTime?
  subtotal     Decimal           @default(0)
  taxTotal     Decimal           @default(0)
  total        Decimal           @default(0)
  balance      Decimal           @default(0)
  currency     String            @default("USD")
  createdAt    DateTime          @default(now())
  updatedAt    DateTime          @updatedAt
  lineItems    InvoiceLineItem[]
  payments     PaymentApplication[]
  journalId    String?
  journal      Journal?          @relation(fields: [journalId], references: [id])
  attachments  Attachment[]
}

model InvoiceLineItem {
  id          String   @id @default(cuid())
  invoiceId   String
  invoice     Invoice  @relation(fields: [invoiceId], references: [id])
  description String
  quantity    Decimal  @default(1)
  unitPrice   Decimal  @default(0)
  surcharge   Decimal  @default(0)
  taxRateId   String?
}

model Payment {
  id            String               @id @default(cuid())
  method        PaymentMethod        @default(STRIPE_LINK)
  amount        Decimal
  receivedAt    DateTime             @default(now())
  reference     String?
  createdAt     DateTime             @default(now())
  updatedAt     DateTime             @updatedAt
  journalId     String?
  journal       Journal?             @relation(fields: [journalId], references: [id])
  applications  PaymentApplication[]
}

model PaymentApplication {
  id         String   @id @default(cuid())
  paymentId  String
  payment    Payment  @relation(fields: [paymentId], references: [id])
  invoiceId  String
  invoice    Invoice  @relation(fields: [invoiceId], references: [id])
  amount     Decimal
}

model TaxRate {
  id        String   @id @default(cuid())
  label     String
  percent   Decimal
  region    String?
  isActive  Boolean  @default(true)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Account {
  id           String         @id @default(cuid())
  code         String         @unique
  name         String
  type         AccountType
  isActive     Boolean        @default(true)
  createdAt    DateTime       @default(now())
  updatedAt    DateTime       @updatedAt
  entries      LedgerEntry[]
}

model Journal {
  id           String         @id @default(cuid())
  refType      JournalRefType
  refId        String?
  date         DateTime
  memo         String?
  postedById   String?
  isReversalOf String?
  createdAt    DateTime       @default(now())
  entries      LedgerEntry[]
}

model LedgerEntry {
  id         String   @id @default(cuid())
  journalId  String
  journal    Journal  @relation(fields: [journalId], references: [id])
  accountId  String
  account    Account  @relation(fields: [accountId], references: [id])
  debit      Decimal  @default(0)
  credit     Decimal  @default(0)
  memo       String?
  createdAt  DateTime @default(now())
}

model Period {
  id        String       @id @default(cuid())
  month     Int
  year      Int
  status    PeriodStatus @default(OPEN)
  closedAt  DateTime?
  closedBy  String?
  journals  Journal[]    @relation("PeriodJournals")
}

model Attachment {
  id          String   @id @default(cuid())
  url         String
  fileName    String
  fileType    String
  sizeBytes   Int
  contactId   String?
  contact     Contact? @relation(fields: [contactId], references: [id])
  jobId       String?
  job         Job?     @relation(fields: [jobId], references: [id])
  quoteId     String?
  quote       Quote?   @relation(fields: [quoteId], references: [id])
  invoiceId   String?
  invoice     Invoice? @relation(fields: [invoiceId], references: [id])
  createdAt   DateTime @default(now())
}

model AuditLog {
  id        String   @id @default(cuid())
  actorId   String?
  actor     User?    @relation(fields: [actorId], references: [id])
  entity    String
  entityId  String
  action    String
  data      Json?
  createdAt DateTime @default(now())
}

model WebhookEvent {
  id        String   @id @default(cuid())
  provider  String
  eventType String
  payload   Json
  processed Boolean  @default(false)
  createdAt DateTime @default(now())
  processedAt DateTime?
}
```
