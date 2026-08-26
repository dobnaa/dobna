# DOBNA Documentation

Welcome to the official documentation for **DOBNA**.

DOBNA is a production-grade social gaming and digital financial platform built using a modern **Monorepo architecture**. The platform combines real-time multiplayer gaming, digital wallets, community management, messaging, payment processing, and scalable backend services into a single ecosystem.

This documentation serves as the single source of truth for developers, DevOps engineers, QA engineers, security teams, architects, and contributors.

---

# Documentation Structure

```
docs/
│
├── architecture/
├── api/
├── development/
├── deployment/
├── security/
├── database/
├── guides/
├── releases/
├── adr/
├── rfcs/
├── runbooks/
├── performance/
├── compliance/
├── localization/
├── assets/
└── templates/
```

Each directory documents one aspect of the platform.

---

# Project Overview

DOBNA consists of multiple applications sharing one common backend and shared packages.

Main applications include:

- Web Application
- Mobile Application
- Admin Panel
- Backend Services
- Shared Packages
- Supabase
- Docker Infrastructure

The project follows:

- Monorepo Architecture
- Domain Driven Design (DDD)
- Modular Architecture
- Clean Architecture
- Shared Package Strategy

---

# Documentation Index

## Architecture

Location:

```
docs/architecture/
```

Contains:

- System Overview
- High Level Architecture
- Component Diagram
- Database Architecture
- API Flow
- Deployment Diagrams
- Sequence Diagrams

Files:

```
overview.md
system-design.md
components.md
database.md
api-flow.md
```

---

## API Documentation

Location

```
docs/api/
```

Includes

- Authentication
- REST APIs
- RPC APIs
- Error Codes
- Rate Limiting
- API Examples
- OpenAPI Specification

Files

```
authentication.md
endpoints.md
errors.md
examples.md
rate-limiting.md
openapi.yaml
```

---

## Development

Location

```
docs/development/
```

Includes

- Local setup
- Folder structure
- Coding standards
- Testing
- Git workflow
- Debugging
- Contribution guide

Files

```
setup.md
coding-style.md
project-structure.md
testing.md
debugging.md
contributing.md
git-workflow.md
```

---

## Deployment

Location

```
docs/deployment/
```

Includes

- Docker
- Kubernetes
- Production deployment
- Staging deployment
- CI/CD
- Monitoring
- Backup Strategy

Files

```
docker.md
kubernetes.md
production.md
staging.md
backup.md
monitoring.md
ci-cd.md
```

---

## Security

Location

```
docs/security/
```

Topics

- Authentication
- Authorization
- Encryption
- Secrets
- Vulnerability Management
- Security Checklist
- GDPR

---

## Database

Location

```
docs/database/
```

Contains

- Database schema
- Migrations
- Index strategy
- SQL queries
- Seed data
- Backup strategy

---

## Guides

Location

```
docs/guides/
```

Contains practical documentation.

Examples

- Getting Started
- FAQ
- Troubleshooting
- Migration Guide
- Best Practices
- Performance Tuning

---

## Releases

Location

```
docs/releases/
```

Contains

- Changelog
- Versioning
- Roadmap
- Release Process

---

## ADR (Architecture Decision Records)

Location

```
docs/adr/
```

Documents all important architectural decisions.

Current ADRs

| ADR | Title |
|------|-------|
| 0001 | Use Monorepo |
| 0002 | Use Supabase |
| 0003 | Use React Native |

Every future architectural decision should be documented here.

---

## RFCs

Location

```
docs/rfcs/
```

Contains feature proposals before implementation.

Examples

- Duel System
- Payment Gateway
- Wallet Improvements
- Community Features

---

## Runbooks

Location

```
docs/runbooks/
```

Operational documentation for production incidents.

Examples

- Database Failure
- Payment Failure
- Performance Issues
- Security Incidents

---

## Performance

Location

```
docs/performance/
```

Includes

- Benchmarks
- Load Testing
- Optimization
- Scalability Reports

---

## Compliance

Location

```
docs/compliance/
```

Documents

- GDPR
- ISO 27001
- PCI DSS
- Audit Logs

---

## Localization

Location

```
docs/localization/
```

Supported languages

```
English
Persian
Turkish
Arabic
```

---

## Assets

Location

```
docs/assets/
```

Contains

- Architecture Images
- Screenshots
- Icons
- Logos
- Videos
- Diagrams

---

## Templates

Location

```
docs/templates/
```

Includes reusable templates.

Examples

- ADR Template
- RFC Template
- Issue Template
- Pull Request Template

---

# Repository Structure

High-level repository layout:

```
apps/
packages/
backend/
supabase/
docker/
docs/
scripts/
```

Supporting root configuration files include:

```
package.json
pnpm-workspace.yaml
tsconfig.json
docker-compose.yml
Dockerfile
README.md
```

---

# Technology Stack

## Frontend

- React
- React Native
- TypeScript
- Expo
- React Navigation
- React Query
- Zustand

---

## Backend

- Supabase
- PostgreSQL
- Edge Functions
- Row Level Security
- pg_cron
- pg_net
- pgcrypto

---

## Infrastructure

- Docker
- Nginx
- Redis
- Prometheus
- Grafana
- Loki
- Traefik

---

## Tooling

- pnpm
- Turborepo
- ESLint
- Prettier
- Husky
- Commitlint
- GitHub Actions

---

# Development Workflow

Typical workflow:

1. Create a feature branch.
2. Implement changes.
3. Add tests.
4. Update documentation.
5. Submit a Pull Request.
6. Perform code review.
7. Merge into the main branch.
8. Deploy through CI/CD.

---

# Documentation Standards

Documentation should always be:

- Accurate
- Versioned
- Reviewable
- Maintainable
- Production-ready
- Written in English
- Markdown formatted

Every new feature should include updates to:

- API documentation
- Database documentation
- ADR (if architectural)
- Runbooks (if operational)
- Release notes

---

# Contributing to Documentation

When contributing:

- Keep documents concise and well-structured.
- Use Markdown headings consistently.
- Include examples where appropriate.
- Update related documentation when behavior changes.
- Avoid duplicating information across documents.
- Reference existing ADRs and RFCs when applicable.

Documentation changes should be reviewed alongside code changes.

---

# Versioning

Documentation follows the same versioning strategy as the application.

Major releases include:

- Architecture updates
- API changes
- Database migrations
- Breaking changes
- Security updates

Each release should update:

- CHANGELOG
- Roadmap
- Version documentation
- Relevant guides

---

# Intended Audience

This documentation is intended for:

- Software Engineers
- Mobile Developers
- Frontend Developers
- Backend Developers
- Database Engineers
- DevOps Engineers
- QA Engineers
- Security Engineers
- Technical Writers
- Product Managers
- Solution Architects

---

# Getting Started

If you are new to DOBNA, begin with the following documents in order:

1. `architecture/overview.md`
2. `development/setup.md`
3. `development/project-structure.md`
4. `database/schema.md`
5. `api/authentication.md`
6. `deployment/docker.md`
7. `security/authentication.md`

This sequence provides a complete understanding of the project's architecture, development workflow, infrastructure, and security model.

---

# License

Unless otherwise specified, all documentation is part of the DOBNA project and follows the project's licensing terms.

Refer to the repository root `LICENSE` file for details.

---

# Maintenance

The documentation is maintained alongside the codebase.

All architectural, database, API, infrastructure, and operational changes must be reflected in the relevant documentation before being merged into the main branch.

Documentation is considered a first-class component of the DOBNA project and is subject to the same review standards as production code.