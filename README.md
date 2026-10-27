# Open Resource schema

The data model for a structured educational resource: a lesson, a quiz, a worksheet, as one JSON document that web, slide, print, PowerPoint and Word surfaces all render. Machine-readable schemas are served at `https://openresource-public.github.io/openresource-schema/schemas/<version>/`; the current version is in [versions.json](versions.json). Pre-1.0: a minor is breaking, a patch is additive (see [VERSIONING.md](VERSIONING.md)).

## Files

- `SCHEMA.md` — resource model overview.
- `VERSIONING.md` — what a schema version promises: the scheme, what counts as breaking, and what readers, writers and extensions must do.
- `CHANGELOG.md` — every version, newest first, with what changed and whether it breaks. `versions.json` is the same list for machines: version, date, status, support end, tag.
- `PROVENANCE.json` — the source commit and schema version this copy was cut from. `scripts/check.mjs` proves the index, schemas, labels, provenance and migration fixtures agree; CI runs it on every push.
- `migrations/` — the chain to the current version as dependency-free modules, `migrate(resource)` to run it, and a fixture per step. It covers every document made of `bento` blocks, which is every document since July 2026; earlier shapes are reported as unsupported.
- `conformance/` — valid and invalid documents with the rule each breaks, and a runner to prove a validator against them.
- `blocks/bento.md` — the block: tile catalogue and content shape.
- `MODELS.md` — computed models (parameterised coded figures): the concept and where they appear.
- `models/catalogue.json` — every published model and version with status; `models/<family>/<name>/<version>.json` is the contract a pin resolves to (response modes, params schema, example paramsets); `models/coordinate-grid.md` is one model written up in prose.
- `examples/` — real lessons in the schema, stripped of platform internals.
- `schemas/` — machine-readable JSON Schemas: `resource.schema.json` (the envelope), `bento-content.schema.json` (block content) and `tiptap-doc-schema.json` (the rich-text document every text field carries). `schemas/<version>/` holds each published version, never changed once published; the files at `schemas/` are the current version; `schemas/index.json` lists every file's SHA-256. Each file's `$id` is its versioned URL.

## Ownership and stability

Maintained by Open Resource. The source lives in a private repository; this one is regenerated from it, each release is tagged `v<version>`, and a tag is never moved or deleted. Before 1.0 a minor may break documents of the previous minor and a patch may not ([VERSIONING.md](VERSIONING.md)). Open Resource reads each minor for at least twelve months after the next ships. Report a problem as an issue here.

## Licence

MIT. See [LICENCE](LICENCE). The example lessons carry their own content licences (OGL v3, CC BY-SA 4.0) — see [examples/README.md](examples/README.md).
