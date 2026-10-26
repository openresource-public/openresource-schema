#!/usr/bin/env node
/**
 * Prove a validator against this repository's conformance corpus.
 *
 *   node conformance/run.mjs <path to a validator module> [--schema-only]
 *
 * The validator module exports `validate(document)` returning
 * `{ valid: boolean, errors?: { path?: string, message?: string }[] }`.
 * Every document in valid/ must come back valid; every document in invalid/
 * must come back invalid. Each invalid file says which rule it breaks
 * (`clause`) and, where the fault is visible to a JSON Schema validator,
 * `schemaDetectable: true`; `--schema-only` skips the ones that are not
 * (cross-block rules such as question-group contiguity).
 *
 * validators/ajv.mjs is a ready validator for the published JSON Schemas;
 * it needs `ajv` installed next to this repository.
 */

import { readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const argv = process.argv.slice(2);
const modulePath = argv.find((a) => !a.startsWith('--'));
const schemaOnly = argv.includes('--schema-only');
if (!modulePath) {
  console.error('usage: node conformance/run.mjs <validator module> [--schema-only]');
  process.exit(2);
}

const { validate } = await import(pathToFileURL(path.resolve(modulePath)).href);
if (typeof validate !== 'function') {
  console.error(`${modulePath} does not export validate(document)`);
  process.exit(2);
}

const load = (dir) => readdirSync(path.join(HERE, dir)).filter((f) => f.endsWith('.json')).sort()
  .map((f) => ({ file: `${dir}/${f}`, ...JSON.parse(readFileSync(path.join(HERE, dir, f), 'utf8')) }));

let failures = 0;
const report = (ok, file, note) => { console.log(`${ok ? 'ok  ' : 'FAIL'} ${file}${note ? `  ${note}` : ''}`); if (!ok) failures++; };

for (const entry of load('valid')) {
  const result = await validate(entry.document);
  report(result && result.valid === true, entry.file, result?.valid ? '' : (result?.errors || []).map((e) => `${e.path || ''} ${e.message || ''}`.trim()).join('; '));
}
for (const entry of load('invalid')) {
  if (schemaOnly && entry.schemaDetectable === false) { console.log(`skip ${entry.file}  (not a schema rule)`); continue; }
  const result = await validate(entry.document);
  report(result && result.valid === false, entry.file, `${entry.clause}: ${entry.reason}`);
}

console.log(failures ? `\n${failures} failure(s)` : '\nall documents judged correctly');
process.exit(failures ? 1 : 0);
