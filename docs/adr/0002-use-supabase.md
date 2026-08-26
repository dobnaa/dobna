# ADR-0002: Adopt Supabase as the Backend Platform

- **Status:** Accepted
- **Date:** 2026-01-01
- **Decision Makers:** DOBNA Core Team
- **Technical Story:** Backend Platform Selection
- **Supersedes:** None
- **Superseded By:** None

---

# Context

DOBNA is a large-scale social gaming and financial platform that requires a modern backend capable of supporting real-time communication, authentication, relational data, secure APIs, file storage, serverless execution, and scalable infrastructure.

The platform includes multiple applications:

- Web Application
- Mobile Application
- Admin Dashboard
- Backend Services

Core business domains include:

- User Accounts
- Authentication
- Wallets
- Transactions
- Games
- Rooms
- Duels
- Challenges
- Communities
- Chat
- Notifications
- Reports
- Media Uploads
- Leaderboards

The backend platform must provide:

- PostgreSQL
- Authentication
- Authorization
- Row-Level Security
- Object Storage
- Realtime subscriptions
- Serverless Functions
- SQL Migrations
- Type Generation
- API support
- High scalability

After evaluating available solutions, Supabase was selected.

---

# Decision

DOBNA adopts **Supabase** as the primary backend platform.

Supabase serves as the system of record for:

- Database
- Authentication
- Authorization
- Storage
- Realtime
- Edge Functions
- Database Migrations
- SQL Functions
- Policies
- Triggers
- Views
- Generated Types

Custom backend services remain responsible for domain-specific business logic that is unsuitable for direct database execution.

---

# Goals

The decision aims to achieve:

- Strong type safety
- Centralized authentication
- Secure data access
- Real-time capabilities
- SQL-first architecture
- PostgreSQL compatibility
- Developer productivity
- Scalable infrastructure
- Low operational overhead

---

# Architecture

```
Clients
│
├── Web
├── Mobile
├── Admin
│
▼

Supabase Platform

├── PostgreSQL
├── Auth
├── Storage
├── Realtime
├── Edge Functions
├── Row Level Security
├── Database Functions
├── Triggers
├── Views
└── REST API

▼

Backend Services

▼

External Providers
```

---

# Repository Structure

Supabase resources are organized as follows:

```
supabase/

    migrations/

    functions/

    sql/

        functions/

        triggers/

        policies/

        views/

        indexes/

        types/

        helpers/

    tests/

    scripts/

    types/
```

---

# PostgreSQL

PostgreSQL is the primary database.

Reasons:

- ACID compliance
- mature ecosystem
- relational integrity
- advanced indexing
- transactions
- JSON support
- extensions
- SQL functions

---

# Authentication

Supabase Auth manages:

- Email login
- Password login
- Password reset
- Email verification
- JWT issuance
- Session management

Application profiles remain stored separately in the `profiles` table.

---

# Authorization

Authorization is enforced through PostgreSQL Row-Level Security (RLS).

Policies are defined per table under:

```
supabase/sql/policies/
```

Examples:

- profiles
- wallets
- transactions
- games
- duels
- challenges
- communities
- chat

---

# Database Schema

The schema is migration-driven.

Every structural change must be introduced through SQL migrations.

Example:

```
0001_create_extensions.sql
0002_create_profiles.sql
0003_create_wallets.sql
...
```

Direct modifications to production databases are prohibited.

---

# SQL Functions

Business logic that benefits from transactional execution is implemented as PostgreSQL functions.

Examples:

- create duel
- join duel
- create room
- purchase card
- transfer escrow
- update balance
- complete game
- process referral reward

Benefits:

- atomic execution
- reduced latency
- centralized validation
- transactional integrity

---

# Triggers

Database triggers automate internal operations.

Examples:

- timestamp updates
- audit logging
- balance synchronization
- statistics updates

Triggers are deterministic and idempotent where possible.

---

# Views

Database views expose optimized read models.

Examples:

- leaderboard
- user statistics
- community rankings
- transaction summaries

Views simplify reporting and analytics.

---

# Row-Level Security

All public tables enforce Row-Level Security.

Rules include:

- users access only their own private data
- administrators receive elevated access
- public resources expose limited information
- service role bypasses policies when required

Security is enforced at the database layer.

---

# Storage

Supabase Storage manages:

- avatars
- profile images
- community images
- chat attachments
- game assets
- uploaded documents

Bucket permissions follow least-privilege principles.

---

# Realtime

Realtime subscriptions are used for:

- chat messages
- room updates
- duel status
- challenge status
- notifications
- presence indicators

Realtime reduces polling and improves responsiveness.

---

# Edge Functions

Edge Functions handle operations requiring secure server-side execution.

Examples:

- payment webhooks
- image processing
- notifications
- authentication hooks
- game processing

Functions are located under:

```
supabase/functions/
```

---

# Type Generation

Database types are generated automatically.

```
supabase/types/database.types.ts
```

These types are consumed by shared packages and applications.

Benefits:

- compile-time validation
- autocomplete
- reduced runtime errors

---

# Migrations

Every schema modification must be reversible.

Migration rules:

- incremental numbering
- immutable history
- no editing applied migrations
- rollback strategy documented

---

# Testing

Database behavior is verified using:

- pgTAP
- integration tests
- SQL fixtures

Coverage includes:

- functions
- triggers
- RLS policies
- transactions

---

# Security Principles

Supabase implementation follows:

- Least Privilege
- Principle of Separation
- JWT Authentication
- Secure Defaults
- SQL Parameterization
- Encrypted Connections
- Row-Level Security
- Audit Logging

---

# Performance

Optimization techniques include:

- indexes
- views
- SQL functions
- query planning
- pagination
- selective joins

Expensive business operations execute inside PostgreSQL where transactional consistency is required.

---

# Monitoring

Operational monitoring includes:

- database metrics
- slow queries
- connection usage
- Edge Function logs
- audit events
- cron execution

Monitoring integrates with Prometheus, Grafana, and Loki where applicable.

---

# Backups

Backup strategy includes:

- scheduled database backups
- migration history
- storage redundancy
- disaster recovery procedures

Backups are tested periodically.

---

# Advantages

- PostgreSQL foundation
- Built-in authentication
- Row-Level Security
- Realtime support
- Object Storage
- Serverless Functions
- Excellent TypeScript integration
- Migration support
- SQL-first development
- Reduced infrastructure complexity
- High developer productivity

---

# Disadvantages

- Vendor-specific features
- Edge Function runtime limitations
- Advanced customization may require external services
- Dependency on Supabase platform availability

These trade-offs are acceptable for the project's scale and goals.

---

# Alternatives Considered

## Firebase

Rejected.

Reasons:

- No relational database
- Limited SQL capabilities
- Vendor-specific querying
- Less suitable for transactional financial workflows

---

## Self-Managed PostgreSQL

Rejected.

Reasons:

- Higher operational burden
- Infrastructure maintenance
- Manual authentication implementation
- Increased DevOps complexity

---

## Hasura

Rejected.

Reasons:

- Additional operational complexity
- Separate authentication layer
- Less integrated developer experience

---

## Appwrite

Rejected.

Reasons:

- Smaller ecosystem
- Less mature PostgreSQL integration
- Fewer production references for financial workloads

---

# Consequences

Positive:

- Faster backend development
- Centralized authentication
- Strong type safety
- Reduced infrastructure management
- Secure database access
- Simplified real-time implementation
- Consistent SQL architecture

Negative:

- Dependence on Supabase ecosystem
- Some advanced backend logic still requires custom services
- Team must maintain SQL expertise

Overall, the benefits significantly outweigh the drawbacks.

---

# Related ADRs

- ADR-0001 — Adopt a Monorepo Architecture
- ADR-0003 — Use React Native for Mobile
- ADR-0004 — Shared Packages Strategy
- ADR-0005 — Backend Service Architecture
- ADR-0006 — Docker Deployment Strategy

---

# References

- Supabase Documentation
- PostgreSQL Documentation
- PostgreSQL Row-Level Security Guide
- Supabase Edge Functions Documentation
- Supabase Storage Documentation
- Supabase Realtime Documentation
- pgTAP Documentation

---

# Decision Outcome

**Accepted**

Supabase is adopted as the primary backend platform for DOBNA.

All persistent application data, authentication, authorization, storage, realtime communication, database functions, migrations, and generated types will be managed through Supabase.

Custom backend services will complement Supabase only for domain-specific processing, external integrations, asynchronous workloads, and business operations that extend beyond database-centric responsibilities.

This decision establishes the backend foundation for the entire DOBNA platform.