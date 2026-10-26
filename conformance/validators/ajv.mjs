/**
 * A validator for conformance/run.mjs built on the published JSON Schemas:
 * the resource envelope, then each block's content. Needs `ajv`
 * (npm install ajv) resolvable from where you run it.
 *
 *   node conformance/run.mjs conformance/validators/ajv.mjs --schema-only
 */

import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const schema = (name) => JSON.parse(readFileSync(path.join(ROOT, 'schemas', name), 'utf8'));

let Ajv;
try {
  ({ default: Ajv } = await import('ajv/dist/2020.js'));
} catch {
  throw new Error('this validator needs ajv: npm install ajv (any 8.x), then run again');
}

const ajv = new Ajv({ allErrors: true, strict: false });
const resource = ajv.compile(schema('resource.schema.json'));
const content = ajv.compile(schema('bento-content.schema.json'));

const format = (errors, prefix = '') => (errors || []).map((e) => ({
  path: `${prefix}${(e.instancePath || '').replace(/^\//, '').replace(/\//g, '.')}`,
  message: e.message,
}));

export function validate(document) {
  const errors = [];
  if (!resource(document)) errors.push(...format(resource.errors));
  for (const [id, block] of Object.entries(document?.blocks || {})) {
    if (block && block.type === 'bento' && !content(block.content)) errors.push(...format(content.errors, `blocks.${id}.content.`));
  }
  return { valid: errors.length === 0, errors };
}
