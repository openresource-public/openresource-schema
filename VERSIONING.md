# Versioning

What a version of the Open Resource schema promises. Each clause has a stable identifier (`OR-VER-nnn`); later versions add clauses and never renumber.

The current schema version is **0.12.0**.

## Three version lines

| Line | Answers | Form | Where |
|---|---|---|---|
| Schema version | can I parse this? | semver, `0.12.0` | `meta.schemaVersion` |
| Model version | can I render this? | integer pin, `family/name@6` | the `ref` of a model slot |
| Resource edition | is this the latest, and where did it come from? | integer | planned for 0.13 |

Each line bumps only for its own kind of change. The tiptap rich-text schema rides on the schema version.

## Scheme

- **OR-VER-001.** Semantic versioning: `major.minor.patch`.
- **OR-VER-002.** Before 1.0, a minor is breaking and a patch is additive. From 1.0, a major is breaking, a minor is additive, a patch changes documentation only.
- **OR-VER-003.** A document declares its version in `meta.schemaVersion`. A bare `major.minor` reads as patch 0.
- **OR-VER-004.** `resource.schema.json` accepts any patch of its own minor.
- **OR-VER-005.** Each schema file's `$id` is its URL under `schemas/<version>/`. A version directory never changes once published; `schemas/index.json` carries every file's SHA-256, and `schemas/*.json` is a copy of the current version.

## What breaks

- **OR-VER-010.** Breaking: a field removed or renamed; a type or enum narrowed; a required field added; a default that changes what renders or what marks correct; a validator or marker refusing what it accepted.
- **OR-VER-011.** Everything else is additive, including a new value in a vocabulary.

## Readers

- **OR-VER-020.** Unknown fields are ignored, never required.
- **OR-VER-021.** An unknown vocabulary value degrades (render the `altText` or text, or skip the tile); known content is never dropped.
- **OR-VER-022.** A reader that supports a minor accepts every patch of it.
- **OR-VER-023.** A reader refuses a newer minor with a message naming both versions. It may migrate an older one.

## Writers

- **OR-VER-030.** A writer stamps the current version on every document.
- **OR-VER-031.** A writer never emits a document it has not validated against that version.
- **OR-VER-032.** A core field never changes meaning. New meaning is a new field.

## Extensions

- **OR-VER-040.** Extension keys begin with `x-`.
- **OR-VER-041.** An extension never redefines a core field.
- **OR-VER-042.** A core-only reader must still process a document that carries extensions.

## Support window

- **OR-VER-050.** Open Resource reads each minor for at least twelve months after the next minor ships, migrating on read.
- **OR-VER-051.** The public repository keeps every published version forever. Nothing published changes meaning in place.
- **OR-VER-052.** `migrations/` carries the chain from the oldest supported version to the current one as dependency-free code with a fixture per step, so any reader can bring an old document forward. `conformance/` carries documents that must and must not validate, with the rule each breaks.

## Models

- **OR-VER-060.** A model reference pins an integer version, `family/name@N`. No ranges.
- **OR-VER-061.** Only a breaking change bumps a model version. Breaking means a lesson pinning the version would show or accept something its author did not choose: a parameter removed, renamed or given a new meaning; a default that changes what an existing parameter set draws or asks; a marker that refuses an answer it accepted.
- **OR-VER-062.** A pin never changes on its own.
- **OR-VER-063.** A retired version keeps rendering where pinned and is not offered for new slots.
- **OR-VER-064.** An improvement for everyone pinning a version lands in that version with no bump: a marker that accepts a correct answer it used to refuse, a fixed rendering fault, clearer text, a faster engine. The test is whether every lesson pinning the version would want the change; if any would not, it is a new version.
- **OR-VER-065.** `models/catalogue.json` lists every published model and every version it has had, with status; `models/<family>/<name>/<version>.json` is the interface a pin resolves to. A resolve for a superseded version says so and names the current one.

## History

- **OR-VER-070.** History is append-only. Each release is tagged `v<version>`; tags are never moved or deleted.
- **OR-VER-071.** 0.12.0 is the first tagged version. 0.9, 0.10 and 0.11 predate the tags and are still read.
- **OR-VER-072.** `versions.json` lists every version with date, status (`current`, `supported`, `retired`), support end, tag and breaking flag; `CHANGELOG.md` describes each. The newest entry in both is the current version.
- **OR-VER-073.** Each tag has a GitHub release whose notes are that version's changelog entry. Nothing is attached.
- **OR-VER-074.** Every copy of this repository carries `PROVENANCE.json`: the schema version and the source commit it was cut from.
