# Data licence

The code in this repository is MIT (see [LICENSE](LICENSE)). The **data** under
`data/` is a different thing with a different answer, because not all of it is
mine to license.

## Short version

| What | Terms |
|---|---|
| The compilation — schema, categories, tags, which services are listed, `verified_at`, `confidence`, my written `notes` | **CC BY 4.0** |
| The free-tier numbers themselves ("0.5 GB storage", "100 CU-hours") | **Facts. Nobody owns them.** |
| Vendor names, logos, trademarks | **Theirs.** Not licensed here |
| Text quoted verbatim from a vendor's page | **Theirs.** Quoted under fair use / quotation, not relicensed |
| The linked pricing pages | **Theirs.** Only linked, never copied wholesale |

Attribution for the CC BY 4.0 part: `shibu003 / free —
https://github.com/shibu003/free`.

## Why it splits this way

A record in `data/services/*.json` mixes three kinds of thing:

```jsonc
{
  "id": "neon",                    // mine — my identifier scheme
  "name": "Neon",                  // theirs — a trademark
  "category": "database",          // mine — my taxonomy
  "tags": ["postgres", "sql"],     // mine — my taxonomy
  "pricing_url": "...",            // theirs — a link, not a copy
  "free_tier": [
    { "resource": "Storage",       // mine — my normalisation of their page
      "limit": "0.5 GB/project",   // a fact — not copyrightable
      "notes": "..." }             // mine, unless quoted
  ],
  "verified_at": "2026-08-15",     // mine — the whole point of this project
  "confidence": "high",            // mine — my judgement
  "notes": "... 'On the Free plan, Managed Better Auth is included for up to
            60,000 MAU.' ..."      // MIXED — my prose around their quote
}
```

**Facts are not copyrightable.** That a service gives 0.5 GB of storage is a
fact; anyone may state it. What can be protected is the *compilation* — the
selection of which 36 services matter, the taxonomy they are sorted into, the
normalised shape every entry is forced into, and the verification dates. That
compilation is the work here, and that is what CC BY 4.0 covers.

**Quoted text stays theirs.** Some `notes` fields contain a sentence lifted from
a vendor's pricing page, in quotation marks, so a reader can check the claim
against the source. Quoting for verification is not relicensing. If you reuse
this dataset, those quotes remain the vendor's text.

**Trademarks are never licensed by a content licence.** CC BY 4.0 says so
explicitly. Listing "Neon" here does not give you or me any right in that name.

**Database rights, if they apply to you.** In jurisdictions with a sui generis
database right (the EU, the UK), that right in this compilation is licensed on
the same CC BY 4.0 terms. In jurisdictions without one, there is nothing extra
to license.

## What this means in practice

**You may**, with attribution: use the data commercially, build a product on it,
redistribute it, transform it, feed it to a model, ship it inside an app.

**You should not**: present vendor trademarks as yours or mine; republish
vendors' page text as if it were part of this dataset's licence; imply any
vendor endorses this project.

**You must check before relying on it**: every record carries `verified_at` and
`sources`. Pricing changes without notice. A record verified months ago is a
starting point for your own check, not a guarantee. That is the honest limit of
this dataset and the reason the date is in every entry.

## Corrections

A wrong number is worse than a missing one. If a limit here does not match the
vendor's current page, open an issue with the source URL — that is the most
useful contribution this project can receive.
