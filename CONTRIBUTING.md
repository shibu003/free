# Contributing

You do not need to write code. The whole database is `data/services/*.json`;
a correction is a JSON edit plus a link to where you confirmed it.

## Report a pricing change

Open a [pricing changed](../../issues/new?template=pricing-changed.yml) issue,
or edit the file yourself:

1. Find `data/services/<id>.json`.
2. Update the `free_tier` entry (`limit`, and `type` if it changed — see
   [Tier types](#tier-types) below).
3. Bump `verified_at` to today.
4. Add the URL you checked to `sources` if it isn't already there.
5. Open a PR. `node lib.js validate` runs in CI and will tell you if a field
   is missing or malformed.

## Add a new service

Open an [add a service](../../issues/new?template=add-service.yml) issue, or
send a PR with a new `data/services/<id>.json`. Copy the shape of an existing
file in the same category. Every field CI checks for is in [`lib.js`
`validateService`](lib.js) — the short version:

- `id`: kebab-case, matches the filename
- `category`: one of `compute`, `hosting`, `database`, `storage`, `llm-api`,
  `ci`, `vector`, `auth`, `email`, `observability`, `ml-compute`
- `url`, `pricing_url`: both `https://`
- `has_free_tier`: `true`/`false`
- `free_tier`: array of `{ resource, limit, type?, notes? }` — empty if
  `has_free_tier` is `false`
- `credit_card_required`: `true`/`false`/`null` (`null` = official page
  doesn't say)
- `verified_at`: `YYYY-MM-DD`, the day you checked
- `sources`: at least one URL, the official pricing/docs page
- `confidence`: `high` (official page states it plainly) / `medium` (had to
  infer or a detail is unconfirmed) / `low` (third-party corroboration only)

Only add a service you can point to an **official** pricing page for. A
blog post saying "X has a free tier" is a lead to go verify, not a source.

## Tier types

Free offers are not one thing — a perpetual quota, a one-time trial credit,
and a monthly recurring credit are different promises, and a single service
can have more than one at once (e.g. a one-time signup credit *and* a
separate perpetual quota). That's why `type` lives on each `free_tier[]`
entry, not once on the service.

| `type` | Means |
|---|---|
| `perpetual-quota` | Resets on a cycle (daily/monthly/per-minute), no expiry |
| `recurring-credit` | A $ amount granted every billing period |
| `trial-credit` | A $ amount granted once, expires after N days |
| `one-time-credit` | A $ amount granted once, no expiry stated |
| `self-hosted` | Free because you run it yourself, not a hosted quota |

`type` is optional on older entries but must be one of the above if present
— `node lib.js validate` enforces this.

## What makes a good correction

The bar is the same as the rest of the database: **would this survive
someone re-checking the official page today?** If you're not sure, link the
page and note the date you looked — a partial correction with a source
beats a confident one without.

## Questions

Open an issue. If something in this file is unclear, that's a bug in the
file, not in you.
