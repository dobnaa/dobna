# ADR-0001: Adopt a Monorepo Architecture

- **Status:** Accepted
- **Date:** 2026-01-01
- **Decision Makers:** DOBNA Core Team
- **Technical Story:** Initial Project Architecture
- **Supersedes:** None
- **Superseded By:** None

---

# Context

DOBNA is designed as a large-scale social gaming and financial platform that includes multiple independent applications sharing a significant amount of business logic, UI components, APIs, database models, and infrastructure.

The project currently consists of:

- Web Application
- Mobile Application
- Admin Dashboard
- Backend API
- Shared Packages
- Supabase
- Docker Infrastructure
- Documentation
- CI/CD Pipelines

The platform is expected to grow over time with additional services, applications, SDKs, and internal tooling.

Using multiple independent repositories would introduce several problems:

- duplicated code
- inconsistent versions
- difficult dependency management
- duplicated CI/CD
- difficult refactoring
- complicated releases
- poor developer experience

A single repository allows all parts of the platform to evolve together.

---

# Decision

DOBNA will use a **Monorepo Architecture**.

All applications, shared packages, backend services, infrastructure, documentation, and database resources will live inside one Git repository.

The repository structure is organized as follows:

```
apps/
    dobna-web/
    dobna-mobile/
    dobna-admin/

backend/

packages/

supabase/

docker/

docs/

scripts/
```

Each application remains independently deployable while sharing reusable code through internal packages.

---

# Goals

The architecture aims to achieve:

- Single source of truth
- Maximum code reuse
- Easier refactoring
- Shared design system
- Shared business logic
- Shared API types
- Shared validation
- Unified tooling
- Consistent dependency versions
- Simplified releases
- Better developer experience

---

# Repository Layout

## Applications

```
apps/
```

Contains all user-facing applications.

### dobna-web

React / Next.js application.

Responsibilities:

- Website
- User Dashboard
- Games
- Wallet
- Communities

---

### dobna-mobile

React Native application.

Responsibilities:

- Android
- iOS
- Shared mobile UI

---

### dobna-admin

Administration panel.

Responsibilities:

- User Management
- Reports
- Payments
- Moderation
- Analytics

---

## Backend

```
backend/
```

Contains backend services.

Responsibilities:

- REST APIs
- Business Logic
- Authentication
- External Integrations
- Queue Workers

---

## Packages

```
packages/
```

Contains reusable libraries.

Examples:

- ui
- config
- types
- auth
- api
- hooks
- validators
- utils
- icons
- themes
- constants
- localization

Packages are versioned together.

---

## Supabase

```
supabase/
```

Contains:

- migrations
- SQL
- functions
- triggers
- policies
- views
- tests
- generated types

---

## Docker

Contains:

- local development
- production containers
- monitoring
- nginx
- redis
- postgres
- backup

---

## Docs

Contains all project documentation.

Examples:

- Architecture
- API
- Security
- Deployment
- Database
- ADRs
- RFCs
- Guides

---

# Why Monorepo?

The project has extensive shared functionality.

Examples include:

- Authentication
- Wallet
- User Profiles
- Games
- Payments
- Notifications
- Localization
- Themes
- Components
- API Types
- Validation Schemas

Without a monorepo these would need to be duplicated across repositories.

---

# Shared Packages

Instead of copying code between applications:

```
apps/web
apps/mobile
apps/admin
backend
```

they all import from:

```
packages/*
```

Example:

```
packages/ui

packages/types

packages/auth

packages/config

packages/api

packages/utils
```

This eliminates duplication.

---

# Dependency Management

The repository uses:

- pnpm Workspace

Benefits:

- shared dependency store
- faster installs
- deterministic lockfile
- workspace linking
- lower disk usage

---

# Build System

The project supports incremental builds.

Only affected packages are rebuilt.

Benefits:

- faster CI
- faster local development
- cached builds
- reduced build time

---

# Code Sharing

Shared code includes:

- React Components
- Hooks
- Types
- Interfaces
- Utilities
- Validation
- Constants
- Theme
- Icons
- API Clients
- Database Types

---

# Versioning

Applications are released independently.

Shared packages remain synchronized inside the repository.

Version history remains unified.

---

# Refactoring

Large refactors become significantly easier.

Examples:

Rename a shared type:

```
UserProfile
```

Changes automatically propagate to:

- Web
- Mobile
- Admin
- Backend
- Tests

All updates happen in a single pull request.

---

# Testing

Testing becomes centralized.

Shared testing tools include:

- Unit Tests
- Integration Tests
- E2E Tests
- Database Tests
- Supabase Tests

---

# CI/CD

The pipeline can detect changed packages.

Example:

```
packages/ui changed
```

Only rebuild:

- web
- mobile
- admin

Backend remains untouched.

---

# Type Safety

Shared TypeScript types are generated once.

Example:

```
packages/types
```

All applications consume identical interfaces.

This avoids API mismatches.

---

# Database Integration

Generated Supabase types are shared through:

```
packages/database
```

Applications use identical database definitions.

---

# Documentation

Documentation stays alongside code.

Benefits:

- easier maintenance
- version consistency
- synchronized updates

---

# Developer Experience

Developers clone only one repository.

Single command:

```
pnpm install
```

Then:

```
pnpm dev
```

Everything becomes available.

No repository switching is required.

---

# Security Benefits

Shared authentication logic prevents divergence.

Security fixes are applied once.

All applications immediately benefit.

---

# Advantages

- Single repository
- Shared code
- Easier maintenance
- Faster onboarding
- Unified tooling
- Better consistency
- Shared testing
- Easier releases
- Simpler dependency management
- Reduced duplication
- Better scalability

---

# Disadvantages

Large repositories may have:

- longer clone time
- larger Git history
- more CI complexity
- workspace configuration overhead

These are mitigated using:

- pnpm workspace
- incremental builds
- caching
- selective pipelines

---

# Alternatives Considered

## Multi Repo

Rejected.

Reasons:

- duplicated packages
- duplicated CI
- inconsistent versions
- difficult refactoring
- dependency drift

---

## Hybrid Repository

Rejected.

Only some packages would be shared.

This introduces unnecessary complexity.

---

# Consequences

Positive:

- Shared architecture
- Consistent APIs
- Shared design system
- Faster development
- Easier maintenance
- Unified documentation
- Centralized tooling

Negative:

- Requires disciplined workspace management
- Larger Git repository
- CI pipeline complexity

Overall benefits significantly outweigh drawbacks.

---

# Related ADRs

- ADR-0002 — Use Supabase as Backend Platform
- ADR-0003 — Use React Native for Mobile
- ADR-0004 — Shared Packages Strategy
- ADR-0005 — Backend Architecture
- ADR-0006 — Docker Deployment Strategy

---

# References

- Martin Fowler — Monorepo
- Google Monorepo Experience
- Microsoft Monorepo Engineering
- pnpm Workspace Documentation
- Turborepo Documentation
- Nx Documentation

---

# Decision Outcome

**Accepted**

DOBNA will permanently adopt a Monorepo architecture as the foundation of its software platform.

All future applications, packages, infrastructure, services, documentation, and database resources must be added to the existing repository unless a documented ADR explicitly approves a separate repository.

This decision establishes the architectural baseline for the entire DOBNA ecosystem.