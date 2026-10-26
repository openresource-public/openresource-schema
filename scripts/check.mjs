#!/usr/bin/env node
/**
 * Self-check for this repository, dependency-free:
 *   node scripts/check.mjs
 *
 * - every file under schemas/<version>/ matches its SHA-256 in schemas/index.json
 * - the files at schemas/ equal the current version's files
 * - versions.json, CHANGELOG.md, SCHEMA.md, the examples, PROVENANCE.json and
 *   migrations/index.mjs all name the same current version
 * - every migration fixture replays: the step turns before into after
 *
 * CI runs it on every push and weekly (.github/workflows/check.yml).
 */

import { createHash } from 'node:crypto';
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = (rel) => readFileSync(path.join(ROOT, rel), 'utf8').replace(/\r\n/g, '\n');
const sha256 = (text) => createHash('sha256').update(text, 'utf8').digest('hex');
const problems = [];
const check = (ok, message) => { if (!ok) problems.push(message); };

const list = JSON.parse(read('versions.json'));
const index = JSON.parse(read('schemas/index.json'));
const current = list.current;

check(list.versions[0]?.version === current && list.versions[0]?.status === 'current', 'versions.json: the first entry must be the current version');
check(index.current === current, `schemas/index.json current (${index.current}) must equal versions.json current (${current})`);

for (const [version, entry] of Object.entries(index.versions)) {
  const dir = path.join(ROOT, 'schemas', version);
  check(existsSync(dir), `schemas/${version}/ is listed in index.json but missing`);
  if (!existsSync(dir)) continue;
  const onDisk = readdirSync(dir).sort();
  check(onDisk.join() === Object.keys(entry.files).sort().join(), `schemas/${version}/ files differ from index.json`);
  for (const [file, meta] of Object.entries(entry.files)) {
    const rel = `schemas/${version}/${file}`;
    if (!existsSync(path.join(ROOT, rel))) { problems.push(`${rel} missing`); continue; }
    const text = read(rel);
    check(sha256(text) === meta.sha256, `${rel}: digest differs from index.json (a published version must never change)`);
    if (version === current) check(read(`schemas/${file}`) === text, `schemas/${file} must equal schemas/${version}/${file}`);
    const id = JSON.parse(text).$id;
    check(id === `${index.base}${version}/${file}`, `${rel}: $id ${id} is not its versioned URL`);
  }
}

check(read('SCHEMA.md').split('\n')[0] === `# Open Resource schema v${current}`, 'SCHEMA.md heading does not name the current version');
check(read('VERSIONING.md').includes(`The current schema version is **${current}**.`), 'VERSIONING.md does not name the current version');
check(/^## (\S+) /m.exec(read('CHANGELOG.md'))?.[1] === current, 'CHANGELOG.md top section is not the current version');
for (const f of readdirSync(path.join(ROOT, 'examples')).filter((f) => f.endsWith('.json'))) {
  check(JSON.parse(read(`examples/${f}`)).meta?.schemaVersion === current, `examples/${f} is not stamped ${current}`);
}
if (existsSync(path.join(ROOT, 'PROVENANCE.json'))) {
  const prov = JSON.parse(read('PROVENANCE.json'));
  check(prov.schemaVersion === current, `PROVENANCE.json names ${prov.schemaVersion}, not ${current}`);
  check(/^[0-9a-f]{40}$/.test(prov.sourceCommit || ''), 'PROVENANCE.json has no source commit');
} else {
  problems.push('PROVENANCE.json missing');
}

const { MIGRATIONS, CURRENT, migrate } = await import('../migrations/index.mjs');
check(CURRENT === current, `migrations/index.mjs CURRENT (${CURRENT}) is not ${current}`);
for (const step of MIGRATIONS) {
  const file = `migrations/fixtures/${step.name}.json`;
  if (!existsSync(path.join(ROOT, file))) { problems.push(`${file} missing`); continue; }
  const fx = JSON.parse(read(file));
  const out = step.migrate(fx.before);
  const stamped = JSON.stringify({ ...out, meta: { ...(out.meta || {}), schemaVersion: step.to } });
  check(stamped === JSON.stringify(fx.after), `${file}: the step no longer turns before into after`);
}
const oldest = JSON.parse(read(`migrations/fixtures/${MIGRATIONS[0].name}.json`));
check(migrate(oldest.before).resource.meta.schemaVersion === current, 'migrations: the chain does not end at the current version');

if (problems.length) {
  console.error(`✗ ${problems.length} problem(s):`);
  for (const p of problems) console.error(`  - ${p}`);
  process.exit(1);
}
console.log(`✓ ${current}: index, schemas, labels, provenance and migration fixtures agree`);
