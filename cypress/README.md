# Cypress Suite Review & Migration Notes

This document captures the current state of the Cypress test suite, key pain points, and recommended improvements as we prepare to transition to Playwright.

## Current State Snapshot
- UI-driven workflows dominate (multiple logins, uploads, approvals) with minimal re-use of shared helpers.
- Heavy reliance on brittle CSS selectors and imperative DOM traversal (`.first()`, index math).
- Command queue misuse leads to latent bugs (e.g. synchronous return values from asynchronous Cypress chains).
- Global waits (`cy.wait(3000)`) and extended timeouts mask application/network instability instead of asserting for deterministic events.

## High-Priority Fixes
- **Remove focused tests**: `it.only` left in `cypress/e2e/tests/smokeTesting/upload.cy.js` prevents the rest of the smoke suite from running.
- **Stabilize authentication**: wrap login flows in `cy.session` or backend login helpers instead of UI logins in every test (`pageObjects/login.js`, all smoke specs). This will also reduce suite runtime.
- **Replace arbitrary waits**: introduce network aliases with `cy.intercept` or DOM-based assertions rather than fixed delays (`pageObjects/topNavBar.js`, `pageObjects/common.js`, `pageObjects/dashboard.js`).
- **Fix index helpers**: functions such as `getApproverIndex` and `conversationTitleIndex` return stale values because Cypress commands are async (`pageObjects/upload.js`, `pageObjects/approvalQueue.js`, `pageObjects/dashboardFeed.js`). Refactor to return Cypress chains (`cy.wrap(index)`) or leverage selectors that remove the need for manual indexing.
- **Secure credentials**: move fixture credentials (`fixtures/users.json`) to environment variables or Cypress config with `.gitignore`d local files.

## Structural Improvements
- **Selectors**: introduce stable data attributes (`data-testid`) instead of styling classes. This will simplify Playwright migration as well.
- **Custom commands**: populate `support/commands.js` with shared actions (login, upload, select tag) to reduce page object responsibilities and code duplication.
- **Test data setup**: wherever possible, use APIs or seed scripts to create entities (media uploads, invitations) instead of chaining long UI workflows in a single test.
- **Test granularity**: break lengthy end-to-end scenarios into smaller specs with focused assertions. Add tagging (e.g. `@smoke`, `@regression`) to control runtime.
- **Assertion hygiene**: prefer `should` with explicit conditions (`should('have.text', ...)`, `should('not.exist')`) combined with retries over `cy.on('window:alert')` where possible.

## Tooling & Configuration
- **Timeout strategy**: reduce the global `defaultCommandTimeout` (currently 90s) and assert on individual commands with tailored retries.
- **Reporting**: the mochawesome integration remains valuable; align with Playwright's HTML reporter or Allure for consistency.
- **Parallelism**: add GitHub Action / CI docs describing how to shard specs once the suite is stable.

## Playwright Migration Plan
1. **Directory structure**: adopt Playwright's convention (`tests/`, `fixtures/`, `page-objects/`), keeping Cypress and Playwright side-by-side until parity is reached.
2. **Shared utilities**: port business logic helpers (e.g. privacy selection, approver selection) into reusable modules. Avoid returning mutable classes—prefer pure functions or lightweight page object wrappers.
3. **Authentication**: leverage Playwright's `test.use({ storageState })` with API logins to reuse authenticated sessions across specs.
4. **Network control**: replace Cypress waits with Playwright `page.waitForResponse`/`expect.poll` patterns to achieve deterministic assertions.
5. **Data-driven tests**: convert JSON fixtures into TypeScript modules or use Playwright test fixtures for environment-aware user data.
6. **Media handling**: move large fixture files outside the repo if possible and document how to fetch them (or mock uploads) to keep the repo lightweight.
7. **Cross-browser strategy**: enable Chromium + WebKit in Playwright by default, with optional Firefox runs matching current Cypress coverage.

## Next Steps
1. Clean up the existing Cypress suite (remove focused tests, centralize login, replace hard waits).
2. Introduce data-test selectors in the application where needed to simplify both Cypress stabilization and Playwright porting.
3. Begin migrating a small smoke subset to Playwright, validating the proposed structure and fixtures before broader adoption.
