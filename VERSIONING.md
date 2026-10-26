# Versioning

What a version of the Open Resource schema promises, and what readers, writers and extensions must do. Each clause has a stable identifier (`OR-VER-nnn`) so it can be cited; later versions add clauses and never renumber them.

The current schema version is **0.12.0**.

## Three version lines

Three things are versioned, each on its own clock, and each answers a different question about a document.

| Line | Answers | Form | Where it lives |
|---|---|---|---|
| Schema version | can I parse this? | semver, `0.12.0` | `meta.schemaVersion` on the resource |
| Model version | can I render this? | integer pin, `family/name@6` | the `ref` of every model slot |
| Resource edition | is this the latest, and where did it come from? | integer | planned for 0.13; not part of this version |

Each line bumps only for its own kind of change. A model bump never touches the schema version. A schema bump never changes a lesson. The tiptap rich-text schema rides on the schema version; it has no line of its own.

## Scheme

- **OR-VER-001.** The schema follows semantic versioning: `major.minor.patch`.
- **OR-VER-002.** Before 1.0, a minor is breaking and a patch is additive. From 1.0, a major is breaking, a minor is additive, and a patch clarifies documentation or tightens a description without changing what validates.
- **OR-VER-003.** A document declares the version it is shaped to in `meta.schemaVersion`. A bare `major.minor` (as earlier documents carry) reads as patch 0.
- **OR-VER-004.** `resource.schema.json` accepts any patch of its own minor. Validating a document against a different minor is not meaningful.

## What breaks

- **OR-VER-010.** A change is breaking when it does any of: removes or renames a field; narrows a type or an enum; adds a required field; changes a default in a way that changes what renders or what is marked correct; or makes a validator or a marker refuse what it accepted before.
- **OR-VER-011.** Everything else is additive: a new optional field, a new value in a vocabulary (a tile kind, a role, a response mode), a loosened constraint, a clearer description.

## Readers

- **OR-VER-020.** A reader ignores fields it does not know. Unknown fields are must-ignore, never must-understand.
- **OR-VER-021.** A reader that meets a vocabulary value it does not know degrades rather than fails: it renders the slot's text or `altText` where there is one, or skips that tile, and it never drops content it does understand.
- **OR-VER-022.** A reader that supports a minor accepts every patch of it.
- **OR-VER-023.** A reader refuses a document from a newer minor than it supports, with a message that names both versions and says to upgrade. It may migrate a document from an older minor.

## Writers

- **OR-VER-030.** A writer stamps the current schema version into `meta.schemaVersion` on every document it emits.
- **OR-VER-031.** A writer never emits a document it has not validated against the version it stamps.
- **OR-VER-032.** A writer never changes the meaning of a core field. If a field needs to mean something else, that is a new field.

## Extensions

- **OR-VER-040.** An extension field is namespaced: its key begins with `x-`.
- **OR-VER-041.** An extension never redefines a core field and never changes how a core field is read.
- **OR-VER-042.** A reader that knows only the core schema must still be able to process a document that carries extensions, by OR-VER-020.

## Support window

- **OR-VER-050.** Open Resource reads each minor for at least twelve months after the next minor ships, migrating older documents on read.
- **OR-VER-051.** The public repository keeps every published version forever. Nothing published changes meaning in place.

## Models

- **OR-VER-060.** A model reference pins an integer version: `family/name@N`. A pin is exact; there are no ranges.
- **OR-VER-061.** A published model version keeps its interface and its marking stable and may improve its rendering. A change that would alter what a pinned lesson shows or accepts ships as a new version.
- **OR-VER-062.** A pin never changes on its own. Moving a lesson to a newer model version is an explicit edit by its author.
- **OR-VER-063.** A retired model version keeps rendering where it is already pinned and is not offered for new slots.

## History

- **OR-VER-070.** The public repository's history is append-only. Each release is tagged `v<version>`, and tags are never moved or deleted.
- **OR-VER-071.** 0.12.0 is the first tagged version. Versions 0.9, 0.10 and 0.11 existed inside Open Resource before the public repository was versioned, and Open Resource still reads them.
- **OR-VER-072.** Every version is listed in `versions.json` with its date, status (`current`, `supported` or `retired`), the date support ends, its tag, and whether it was breaking, and described in `CHANGELOG.md`. The newest entry in both is always the current version.
