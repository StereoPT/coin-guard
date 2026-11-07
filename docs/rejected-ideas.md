# Rejected and Out-of-Scope Ideas

Read this before proposing any change. It lists ideas that were considered and rejected, features that already exist, and work that is already planned. Do not re-propose or redo anything listed here.

## How Coin Guard is used

Coin Guard is a monthly-close tool, not a live app. At the start of each month the previous month's bank CSV is imported manually, then reviewed and categorized. Improvements should fit that workflow (post-import review, data hygiene, reliability, polish). Real-time features do not fit.

## Rejected

- **Duplicate transaction detection.** Not wanted.
- **Dependency maintenance rounds.** Dependabot already handles this, and a full update round was done in v1.4.0. Do not open dependency bump PRs.
- **A second bank importer.** The second bank has no CSV export. The `packages/parser` package is ready if that ever changes, but do not build an importer speculatively.
- **Real-time features.** Budget alerts, forecasting and recurring-transaction prediction do not fit a monthly workflow.

## Already built (do not re-propose)

- Lookups for categories and descriptions, with Lookup Logs
- Database backup export
- Budgets per category
- Notifications
- Audit log
- Month-over-month comparison on the Dashboard

## Already planned for v1.5.0 (do not duplicate)

- Data layer hardening: `Float` to `Decimal` for money fields, new indexes, import validation with zod, Lookup Logs trimmed to errors only and written when an import is confirmed
- Playwright end-to-end tests for the Transactions flows
- Dashboard polish pass (no new widgets)
- Post-Import Summary step between review and commit, including a parsing issues list
- Mascot images on empty states and on the 404 and error screens

## Adding to this list

When an `auto-improve` PR is closed without merging, add a short entry here (what was proposed and why it was rejected), in addition to the closing comment on the PR.
