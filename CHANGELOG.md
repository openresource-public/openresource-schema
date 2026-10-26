# Changelog

Every schema version, newest first. Each entry says what changed and whether it breaks documents shaped to the previous version ([VERSIONING.md](VERSIONING.md), OR-VER-010). The same list is machine-readable in [versions.json](versions.json). The date on an entry is the day that version became current in Open Resource; the first public tag is noted where there is one.

Entries before 0.12.0 describe versions that existed inside Open Resource before this repository was versioned. They are written from the migration chain and the commit history, so they are shorter than the entries that follow them will be.

## 0.12.0 (2026-08-02, tagged v0.12.0 on 2026-10-26) — breaking

The first version this repository is tagged at. The shape became current on 2026-08-02 and was published here under the 0.11 label until the tag; the label was wrong, the shape was not.

Breaking, with a migration from 0.11:

- Registry content is never duplicated. A block that restated an objective, keyword, misconception or assumed-knowledge entry in its own tiles becomes a tile-less projection block carrying the matching role (`objectives`, `glossary`, `misconceptions`, `assumed-knowledge`, `teacher-tips`), with `content.projection.ids` selecting the entries. `meta.objectiveIds`, `meta.keywordIds` and `meta.misconceptionIds` are pointers from a block to the entries it addresses, never a second copy of their text. The migration converts such blocks and, where a block held one entry in one tile, writes the tile's text back into the entry first.

Breaking, with no migration:

- The `layered-diagram` and `labelling` tile kinds are retired. A labelled figure is a `model` tile.

Added since the 0.11 publication:

- Declared block roles: `role` on the block envelope names the register (`question`, `worked-example`, `key-point`, and the five projection roles). A block with a marked tile or `explanation` refs declares `question` or `worked-example`; validation enforces the tie.
- Multi-block questions: member blocks share a `question` group id and sit contiguously in their section; surfaces treat the group as one question.
- Response modes `construct-region` (draw the boundary lines, then shade), `run-sheet`, `run-statement` and `run-figure` on `model` tiles.
- Per-axis scale on the coordinate grid (coordinate-grid@4) and the function-graph@6 pin in the examples.
- The version contract: [VERSIONING.md](VERSIONING.md) with stable clause identifiers; `meta.schemaVersion` is semver and `resource.schema.json` accepts any patch of the current minor; `tiptap-doc-schema.json` moves under `schemas/` beside the other two schemas; this changelog and `versions.json`.

## 0.11.0 (2026-06-07) — not breaking at the version change

The artefact is a resource, not a lesson: the schema describes any structured educational resource (a lesson, a quiz, a worksheet), and the rename ran through the platform. No stored field moved, so the 0.10 to 0.11 migration is the identity.

This repository was first published on 2026-06-08 at this version. Between June and July 2026, still under the 0.11 label, the block model was consolidated from seventeen block types in three families into the single `bento` type with tile kinds, question types became markable tiles, a multi-part question became one block whose tiles share `part` tags, groups were retired into section sequences, and the computed-model and marking sections were added. Documents from before the consolidation were rewritten in place rather than versioned. That is the gap the version contract from 0.12.0 closes: under OR-VER-010 every one of those changes takes a new minor.

## 0.10.0 (2026-05-28) — breaking

Objectives become the one outcome registry, with a migration from 0.9:

- `keyLearningPoints[]` is merged into `objectives[]`, in order, and removed. A lesson outcome and a per-cycle learning point are one concept, scoped by where the block that realises it sits.
- Blocks tagged `meta.klpIds` are retagged `meta.objectiveIds`.
- Prose blocks that realise an objective or an assumed-knowledge entry are promoted to first-class block types (later folded into roles under 0.11 and 0.12).
- The derived top-level `pupilLessonOutcome` field is removed; there is no singular outcome, only `objectives[]`.

## 0.9.0 (2026-04-29) — first versioned shape

The earliest version the migration chain reads: seventeen block types in `content`, `question` and `primitive` families, typed groups inside sections, and a separate key-learning-points registry beside objectives. Open Resource still reads documents at this version and walks them forward on load.
