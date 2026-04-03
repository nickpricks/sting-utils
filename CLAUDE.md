# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

**string-common-utils** — a small npm library of string/number utility functions. Single-file library (`index.js`) with no build step.

- **Published as two npm packages:** `string-common-utils` (v1.0.0, ~40 downloads/month) is the active one. `sting-utils` (v0.0.1, ~4 downloads/month) is a stale initial publish matching the repo name — do not update it.
- **`package.json` `name` field** is `string-common-utils` (the active package).

## Commands

- **Run tests:** `npm test` (runs `node index.test.js` — hand-rolled assertions, no test framework)
- **Install deps:** `npm install`

## Architecture

Everything lives in two files:

- `index.js` — all exported utilities, uses CommonJS `exports.*` style. Each function is independently exported (no default export object).
- `index.test.js` — manual test file that throws on failure. Only covers a subset of the exported functions.

## Key Details

- **No test framework** — tests are plain Node.js assertions that throw errors. When adding tests, follow the existing pattern of throwing `new Error()` on failure.
- **`inWords` uses Indian numbering** — the number-to-words function uses crore/lakh groupings, not the Western billion/million system.
- **`uuid` dependency** — imports `uuid/v4` (uuid v3.x deep import path). The custom `uuid()` function generates variable-length IDs by concatenating multiple v4 UUIDs.
- **Node >=6 compat** — the `engines` field targets Node 6+. Code uses only arrow functions and template literals (no async/await, no optional chaining).
- **Typo in export name** — `parseEmptySting` (missing the 'r' in String) is the published API name. Do not rename without a major version bump.

## Branches

- **`master`** — active, published as `string-common-utils@1.0.0`.
- **`master1`** — merged via PR #1, identical to master. Safe to delete.
- **`feature/majorRevamp`** — stale TypeScript rewrite (2018), never merged. Drops 7 functions, downgrades UUID to `Math.random()`, renames API to cryptic abbreviations (`cfl`, `pez`). Do not merge as-is — use as reference only.
