# Conformance

Documents a reader or writer can be proved against.

- `valid/` — documents that conform. Each file carries a `reason` and the `document`.
- `invalid/` — documents that do not, one fault each. Each file carries the `clause` it breaks, a `reason`, `schemaDetectable` (whether a JSON Schema validator can see the fault, as opposed to a cross-block rule), the `path` Open Resource reports, and the `document`.
- `run.mjs` — runs a validator over both sets and reports every wrong verdict.
- `validators/ajv.mjs` — a validator for the published JSON Schemas; `npm install` in this repository installs `ajv`.

```
node conformance/run.mjs conformance/validators/ajv.mjs --schema-only
node conformance/run.mjs ./my-validator.mjs
```

A validator module exports `validate(document)` and returns `{ valid, errors }`. The example lessons in `examples/` are also valid documents.
