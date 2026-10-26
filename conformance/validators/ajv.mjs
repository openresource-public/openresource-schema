/**
 * A validator for conformance/run.mjs built on the published JSON Schemas:
 * the resource envelope, then each block's content, using the schemas of the
 * version the document declares when that version is published here, else
 * the current ones. Needs `ajv`: `npm install` in this repository installs it.
 *
 *   node conformance/run.mjs conformance/validators/ajv.mjs --schema-only
 */

import { readFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const schema = (dir, name) => JSON.parse(readFileSync(path.join(ROOT, 'schemas', dir, name), 'utf8'));

let Ajv;
try {
  ({ default: Ajv } = await import('ajv/dist/2020.js'));
} catch {
  console.error('this validator needs ajv: run `npm install` in this repository, then run again');
  process.exit(2);
}

// One Ajv per schema directory: the current copy at schemas/ and the
// versioned copy it duplicates share an $id, which one instance refuses.
const compiled = new Map();
function validatorsFor(document) {
  // The schemas of the declared version when published here, else current.
  const declared = typeof document?.meta?.schemaVersion === 'string' ? document.meta.schemaVersion : '';
  const dir = /^\d+\.\d+\.\d+$/.test(declared) && existsSync(path.join(ROOT, 'schemas', declared)) ? declared : '';
  if (!compiled.has(dir)) {
    const ajv = new Ajv({ allErrors: true, strict: false });
    compiled.set(dir, { resource: ajv.compile(schema(dir, 'resource.schema.json')), content: ajv.compile(schema(dir, 'bento-content.schema.json')) });
  }
  return compiled.get(dir);
}

const format = (errors, prefix = '') => (errors || []).map((e) => ({
  path: `${prefix}${(e.instancePath || '').replace(/^\//, '').replace(/\//g, '.')}`,
  message: e.message,
}));

export function validate(document) {
  const { resource, content } = validatorsFor(document);
  const errors = [];
  if (!resource(document)) errors.push(...format(resource.errors));
  for (const [id, block] of Object.entries(document?.blocks || {})) {
    if (block && block.type === 'bento' && !content(block.content)) errors.push(...format(content.errors, `blocks.${id}.content.`));
  }
  return { valid: errors.length === 0, errors };
}
