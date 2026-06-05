# Phase 9 — Hardening, accessibility, and launch

## Goal

Make TechSkillsHub production-ready: accessible, performant, secure, observable, and
documented for a public CSM launch.

## Scope

- Accessibility (WCAG 2.1 AA) audit and remediation.
- Performance optimization and Core Web Vitals targets.
- Security hardening and dependency review.
- Observability: error tracking, logging, and analytics.
- Testing coverage and a release/runbook process.

## Tasks

1. Run an accessibility audit (axe / Lighthouse) and fix violations; verify keyboard
   navigation, focus management, color contrast, and screen-reader labels.
2. Optimize performance: image handling, caching, DB query review, and bundle size.
3. Security review: input validation, RBAC checks, rate limiting, secret handling,
   and dependency vulnerability scan.
4. Add error tracking (e.g., Sentry) and structured logging.
5. Add privacy-respecting analytics for engagement metrics (grant reporting).
6. Expand automated tests: unit (scoring, RBAC), integration, and key E2E flows.
7. Write a deployment runbook, backups/restore plan, and an onboarding README.

## Deliverables

- Accessible, performant, secure production build.
- Monitoring and analytics in place.
- Test coverage on critical paths and a documented release process.

## Acceptance criteria

- No critical or serious accessibility violations on core pages.
- Lighthouse performance and accessibility scores meet agreed targets.
- RBAC and input validation verified by automated tests.
- Errors are captured and alertable; key engagement metrics are tracked.
- A documented runbook enables repeatable production deploys and rollbacks.

## Dependencies

- All prior phases (this hardens the complete product before launch).
