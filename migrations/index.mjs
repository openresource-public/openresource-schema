/**
 * Bring a resource forward to the current schema version.
 *
 *   import { migrate } from './migrations/index.mjs';
 *   const { resource, applied } = migrate(oldResource);
 *
 * Dependency-free. Each step is a pure function from one minor to the next;
 * the chain is keyed on major.minor (a patch is additive, so no step is ever
 * keyed on one) and the head step stamps the full current version. A resource
 * already at the current minor, or at a version the chain does not know, is
 * returned untouched with `applied: []`. Every step is idempotent. Fixtures
 * for each step are in ./fixtures/, one file per step: `before` and the
 * `after` this chain must produce.
 *
 * CURRENT is written by the release tooling; it always equals versions.json.
 */

import { migrateLessonTo010 } from './migrate_0_10_objectiveBlocks.mjs';
import { migrateLessonTo012 } from './migrate_0_12_projectionCollapse.mjs';

export const CURRENT = '0.12.2';

export function parseVersion(value) {
  if (typeof value !== 'string') return null;
  const m = /^(\d+)\.(\d+)(?:\.(\d+))?$/.exec(value.trim());
  if (!m) return null;
  return { major: Number(m[1]), minor: Number(m[2]), patch: m[3] === undefined ? 0 : Number(m[3]) };
}

export function minorOf(value) {
  const v = parseVersion(value);
  return v ? `${v.major}.${v.minor}` : null;
}

// 0.10 to 0.11 was additive (the artefact became a resource, no stored
// field moved), so the step is the identity; it exists to carry the chain.
function migrateLessonTo011(resource) {
  return { ...resource };
}

export const MIGRATIONS = [
  { from: '0.9',  to: '0.10',   name: 'migrate_0_10_objectiveBlocks',    migrate: migrateLessonTo010 },
  { from: '0.10', to: '0.11',   name: 'migrate_0_11_additive',           migrate: migrateLessonTo011 },
  { from: '0.11', to: CURRENT,  name: 'migrate_0_12_projectionCollapse', migrate: migrateLessonTo012 },
];

// Every step starts where the one before it ends, and the chain ends at
// CURRENT: a new minor needs a new step (the identity, for an additive
// change), or a document at the skipped minor would never be walked
// forward. Checked at load so a release that forgets the step fails before
// anything ships.
{
  const next = (v) => `${v.major}.${v.minor + 1}`;
  for (let i = 0; i < MIGRATIONS.length; i++) {
    const step = MIGRATIONS[i];
    const from = parseVersion(step.from); const to = parseVersion(step.to);
    if (!from || !to) throw new Error(`migrations: step ${step.name} has a malformed version`);
    const consecutive = (to.major === from.major && to.minor === from.minor + 1) || (to.major === from.major + 1 && to.minor === 0);
    if (!consecutive) throw new Error(`migrations: step ${step.name} goes from ${step.from} to ${step.to}; steps move one minor at a time`);
    if (i > 0 && minorOf(MIGRATIONS[i - 1].to) !== minorOf(step.from)) throw new Error(`migrations: step ${step.name} starts at ${step.from} but the step before ends at ${MIGRATIONS[i - 1].to}`);
    if (i < MIGRATIONS.length - 1 && step.to === CURRENT) throw new Error(`migrations: only the last step may end at CURRENT; ${step.name} does`);
  }
  const head = MIGRATIONS[MIGRATIONS.length - 1];
  if (head.to !== CURRENT) throw new Error(`migrations: the chain ends at ${head.to} but CURRENT is ${CURRENT}; add the ${next(parseVersion(head.to))} step`);
}

/**
 * @param {object} resource
 * @returns {{ resource: object, applied: string[], status: 'current' | 'migrated' | 'newer' | 'unknown' }}
 *   `current`: already at the current minor. `migrated`: walked forward.
 *   `newer`: a later minor than this chain knows; a reader refuses it
 *   (VERSIONING.md, OR-VER-023). `unknown`: no version, or one the chain
 *   has no step for; returned as is.
 */
export function migrate(resource) {
  if (!resource || typeof resource !== 'object') return { resource, applied: [], status: 'unknown' };
  let current = resource;
  const declared = current.meta && typeof current.meta === 'object' ? current.meta.schemaVersion : undefined;
  let version = minorOf(declared);
  const applied = [];
  if (version === minorOf(CURRENT)) return { resource, applied, status: 'current' };
  const d = parseVersion(declared); const c = parseVersion(CURRENT);
  if (d && (d.major > c.major || (d.major === c.major && d.minor > c.minor))) return { resource, applied, status: 'newer' };
  for (const step of MIGRATIONS) {
    if (minorOf(step.from) !== version) continue;
    const next = step.migrate(current);
    current = {
      ...next,
      meta: { ...(next.meta && typeof next.meta === 'object' ? next.meta : {}), schemaVersion: step.to },
    };
    version = minorOf(step.to);
    applied.push(step.name);
  }
  return { resource: current, applied, status: applied.length ? 'migrated' : 'unknown' };
}
