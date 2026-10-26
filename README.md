# resource schema

JSON schemas for the structured resource format used by Open Resource. The same JSON drives slide, web, print, PPTX, and DOCX output. Resources can be imported from Oak National Academy slide decks (and other sources) or authored from scratch.

## Files

- `SCHEMA.md` — resource model overview.
- `VERSIONING.md` — what a schema version promises: the scheme, what counts as breaking, and what readers, writers and extensions must do.
- `CHANGELOG.md` — every version, newest first, with what changed and whether it breaks. `versions.json` is the same list for machines: version, date, status, support end, tag.
- `blocks/bento.md` — the block: tile catalogue and content shape.
- `MODELS.md` — computed models (parameterised coded figures): the concept and where they appear.
- `models/<name>.md` — per-model parameter interface (one published example).
- `examples/` — real lessons in the schema, stripped of platform internals.
- `schemas/` — machine-readable JSON Schemas: `resource.schema.json` (the envelope), `bento-content.schema.json` (block content) and `tiptap-doc-schema.json` (the rich-text document every text field carries). `schemas/<version>/` holds each published version, never changed once published; the files at `schemas/` are the current version; `schemas/index.json` lists every file's SHA-256. Each file's `$id` is its versioned URL.

## Contributing

Issues welcome. The source lives in a separate repository; this one is regenerated on each schema-version release, and each release is tagged `v<version>`.

## Licence

MIT. See [LICENCE](LICENCE). The example lessons carry their own content licences (OGL v3, CC BY-SA 4.0) — see [examples/README.md](examples/README.md).
