# ADR-0003: Use React Native for Cross-Platform Mobile Development

- **Status:** Accepted
- **Date:** 2026-01-01
- **Decision Makers:** DOBNA Core Team
- **Technical Story:** Mobile Platform Architecture
- **Supersedes:** None
- **Superseded By:** None

---

# Context

DOBNA is a unified digital platform consisting of multiple client applications that share common business logic, APIs, data models, authentication mechanisms, design language, and infrastructure.

The platform includes:

- Web Application
- Mobile Application
- Admin Dashboard
- Backend Services
- Shared Packages
- Supabase Backend

The mobile application is expected to provide nearly all core platform capabilities, including:

- Authentication
- Wallet
- Payments
- Games
- Rooms
- Duels
- Challenges
- Communities
- Chat
- Notifications
- User Profiles
- Stories
- Media Upload
- Settings

The organization requires simultaneous support for:

- Android
- iOS

while maintaining a single development team and maximizing code reuse.

---

# Decision

DOBNA adopts **React Native** as the primary framework for mobile application development.

A single React Native codebase will be used to build both Android and iOS applications.

The application will consume the same shared packages used by the web platform whenever possible.

---

# Goals

The mobile architecture aims to achieve:

- Cross-platform development
- Shared business logic
- Shared TypeScript types
- Shared validation
- Shared API layer
- Shared design language
- High development velocity
- Lower maintenance cost
- Native performance where required
- Excellent developer experience

---

# Repository Structure

```
apps/

    dobna-mobile/

packages/

backend/

supabase/
```

The mobile application resides inside the Monorepo and consumes internal workspace packages.

---

# Architecture

```
React Native App

│

├── Screens

├── Navigation

├── Features

├── Services

├── Hooks

├── State

├── UI Components

│

▼

Shared Packages

│

├── UI

├── Types

├── Validators

├── API

├── Auth

├── Config

├── Utils

├── Constants

└── Localization

│

▼

Supabase

│

▼

PostgreSQL
```

---

# Why React Native?

The majority of business logic is identical across platforms.

Examples include:

- Authentication
- Wallet
- User Profiles
- Payments
- Games
- Communities
- Chat
- Notifications

Duplicating this logic in native Android and iOS projects would significantly increase maintenance costs.

React Native enables sharing most of the application code.

---

# TypeScript

All React Native code must be written in TypeScript.

Benefits include:

- Type Safety
- Better Refactoring
- Shared Interfaces
- IDE Support
- Compile-time Validation

---

# Shared Packages

The mobile application imports reusable modules from:

```
packages/
```

Examples:

```
packages/ui

packages/api

packages/auth

packages/hooks

packages/types

packages/utils

packages/constants

packages/config

packages/localization

packages/theme
```

Business logic must never be duplicated inside the mobile application when it already exists in shared packages.

---

# UI Components

Reusable components are shared whenever platform compatibility allows.

Examples:

- Buttons
- Inputs
- Cards
- Avatars
- Dialogs
- Loading Indicators
- Empty States
- Error Screens

Platform-specific components remain isolated inside the mobile application.

---

# Navigation

Navigation is implemented independently from web routing.

Responsibilities include:

- Authentication Flow
- Main Tabs
- Deep Links
- Modal Navigation
- Nested Navigation
- Protected Routes

Navigation state remains internal to the mobile application.

---

# State Management

Application state is divided into:

Global State

Examples:

- User
- Wallet
- Notifications
- Theme
- Language

Feature State

Examples:

- Chat
- Game
- Room
- Community

Server State

Examples:

- Supabase Queries
- Cached API Data

Each layer has a clearly defined responsibility.

---

# API Communication

The mobile application communicates with:

- Supabase
- Backend APIs
- Edge Functions

through shared API clients.

Direct SQL access from the client is prohibited.

---

# Authentication

Authentication is handled through Supabase Auth.

Supported flows include:

- Email Login
- Password Login
- Session Refresh
- Logout
- Token Validation

JWT management follows the shared authentication package.

---

# Offline Support

Where practical, the application supports:

- Local persistence
- Cached queries
- Retry queues
- Optimistic updates

Critical financial operations always require server confirmation.

---

# Push Notifications

Push notifications are supported for:

- Messages
- Challenges
- Duels
- Wallet Events
- Community Activity
- System Announcements

Notification handling remains platform-specific while payload structures are shared.

---

# Media

The application supports:

- Image Upload
- Avatar Upload
- Story Media
- Chat Attachments
- Community Images

Uploads are processed through Supabase Storage and Edge Functions.

---

# Realtime

Realtime features include:

- Chat
- Game Status
- Duel Status
- Challenge Updates
- Online Presence
- Notifications

Realtime subscriptions use Supabase Realtime.

---

# Security

Security principles include:

- Secure Storage
- JWT Authentication
- HTTPS Only
- Certificate Validation
- Least Privilege
- Input Validation

Sensitive information must never be stored in plaintext.

---

# Performance

Performance optimization techniques include:

- Lazy Loading
- Code Splitting
- Memoization
- Image Optimization
- Pagination
- Virtualized Lists

Expensive computations should remain on the backend whenever possible.

---

# Platform-Specific Code

Platform-specific implementations are allowed only when necessary.

Examples:

- Camera
- Biometrics
- Native Permissions
- Background Tasks
- Push Notification Registration

All other functionality should remain platform-independent.

---

# Testing

Testing includes:

- Unit Tests
- Integration Tests
- Component Tests
- End-to-End Tests

Business logic should be tested inside shared packages whenever possible.

---

# Accessibility

The application follows accessibility best practices:

- Screen Readers
- Dynamic Font Sizes
- Color Contrast
- Accessible Navigation
- Keyboard Support (where applicable)

Accessibility is considered a functional requirement.

---

# Localization

All user-facing text is localized.

Supported languages include:

- English
- Persian
- Turkish
- Arabic

Translations are maintained inside shared localization packages.

---

# CI/CD

The mobile application participates in the Monorepo pipeline.

Only affected packages trigger rebuilds.

Build artifacts are generated independently for:

- Android
- iOS

---

# Advantages

- Single codebase
- Cross-platform development
- High code reuse
- Faster delivery
- Lower maintenance cost
- Shared architecture
- Shared business logic
- Shared API layer
- Shared validation
- Shared TypeScript models

---

# Disadvantages

- Native modules occasionally required
- Larger application size
- Dependency on React Native ecosystem
- Platform-specific debugging complexity

These drawbacks are acceptable considering the project's goals.

---

# Alternatives Considered

## Native Android + Native iOS

Rejected.

Reasons:

- Two codebases
- Higher maintenance cost
- Duplicate business logic
- Larger development team
- Slower feature delivery

---

## Flutter

Rejected.

Reasons:

- Lower code sharing with existing React ecosystem
- Separate UI framework
- Duplicate frontend expertise
- Reduced reuse of existing packages

---

## Kotlin Multiplatform

Rejected.

Reasons:

- UI duplication
- Smaller ecosystem
- Less mature integration with the current architecture

---

## Ionic / Capacitor

Rejected.

Reasons:

- WebView limitations
- Lower native performance
- Less suitable for graphics-intensive game features
- Inferior user experience for complex mobile interactions

---

# Consequences

Positive:

- Unified development workflow
- Shared packages
- Consistent UI
- Faster feature delivery
- Reduced maintenance
- Easier onboarding
- Shared architecture across all clients

Negative:

- Occasional native development required
- Dependency on React Native ecosystem
- Platform-specific optimization remains necessary

Overall, the benefits significantly outweigh the drawbacks.

---

# Related ADRs

- ADR-0001 — Adopt a Monorepo Architecture
- ADR-0002 — Adopt Supabase as the Backend Platform
- ADR-0004 — Shared Packages Strategy
- ADR-0005 — Backend Service Architecture
- ADR-0006 — Docker Deployment Strategy

---

# References

- React Native Documentation
- Expo Documentation (where applicable)
- TypeScript Documentation
- React Navigation Documentation
- React Native Performance Guide
- Supabase React Native Documentation

---

# Decision Outcome

**Accepted**

React Native is adopted as the standard framework for the DOBNA mobile application.

All new mobile features shall be implemented using React Native and TypeScript, leveraging the shared packages defined within the Monorepo whenever possible.

Platform-specific native code shall be introduced only when required by device capabilities or performance considerations.

This decision establishes the long-term mobile development strategy for the DOBNA ecosystem.