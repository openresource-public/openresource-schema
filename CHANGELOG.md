# Changelog

Every schema version, newest first, with whether it breaks documents of the previous version ([VERSIONING.md](VERSIONING.md), OR-VER-010). The date is when the version became current in Open Resource. The same list is machine-readable in [versions.json](versions.json).

## 0.12.1 (2026-10-26, tagged 2026-10-26)

- The resource's own edition on `meta`: `version`, `status`, `supersedes`, `derivedFrom`, `dateModified`. All optional. Open Resource writes `derivedFrom` for an adaptation and `dateModified` on read.
- `models/catalogue.json` lists every published model and version; one interface document per current version. A resolve for a superseded version says so.
- The migration chain under `migrations/` with a fixture per step; the conformance corpus under `conformance/` with a runner.

## 0.12.0 (2026-08-02, tagged 2026-10-26) · breaking

- Registry content is never duplicated: a block that restated an objective, keyword, misconception or assumed-knowledge entry becomes a projection block with the matching role; `meta.*Ids` are pointers, not copies. Migration from 0.11.
- `layered-diagram` and `labelling` tile kinds retired; a labelled figure is a `model` tile. No migration.
- Declared block roles on the envelope, including `assumed-knowledge`, `misconceptions` and `teacher-tips`.
- Multi-block questions share a `question` group id.
- Response modes `construct-region`, `run-sheet`, `run-statement`, `run-figure`.
- Semver in `meta.schemaVersion`; VERSIONING.md; tiptap schema under `schemas/`; this changelog and versions.json.
- Published under the 0.11 label from 2026-08-02 until the tag.

## 0.11.0 (2026-06-07)

- The artefact is a resource, not a lesson. No stored field moved; the migration is the identity.
- First public publication, 2026-06-08.
- June to July 2026, under this label and without a version change: seventeen block types became the one `bento` type with tile kinds; questions became markable tiles; groups were retired. Under OR-VER-010 each of those would now take a new minor.

## 0.10.0 (2026-05-28) · breaking

- `keyLearningPoints[]` merged into `objectives[]` and removed; `meta.klpIds` became `meta.objectiveIds`.
- `pupilLessonOutcome` removed.
- Prose blocks realising an objective or assumed-knowledge entry promoted to first-class types (later folded into roles). Migration from 0.9.

## 0.9.0 (2026-04-29)

- First versioned shape: seventeen block types in three families, typed groups, a key-learning-points registry beside objectives. Still read and migrated on load.
