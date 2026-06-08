# Open Resource schema

JSON schemas for the structured resource format used by Open Resource. Resources can be imported from decks and structured into the schema or authored from scratch.

The schema is intended to be extensible and flexible. It can be used for a full lesson, a short quiz or anything in between. The schema treats resources as a sequence of composable blocks, optionally split into sections. A block might be, for instance, a multiple choice question, or a worked example, or a layered diagram.

Each block type has associated with it a JSON shape, agent tool shape, tool validator, React components and document renderers. These are not currently in the public repo.

Where content doesn't fit neatly into one of the existing primitives, for instance in Maths, new primitives can be easily created to fill the need.

## Files

- [`SCHEMA.md`](SCHEMA.md) — model overview.
- [`BLOCKS.md`](BLOCKS.md) — block type index.
- [`blocks/`](blocks/) — per-block content shape, one file per block type.
- [`tiptap-doc-schema.json`](tiptap-doc-schema.json) — rich-text document schema referenced from every text field.
- [`examples/`](examples/) — real lessons in the schema. See [`examples/README.md`](examples/README.md).

## Contributing

Issues and suggestions very welcome.

## Licence

MIT. See [LICENCE](LICENCE).
