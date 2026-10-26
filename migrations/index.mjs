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

export const CURRENT = '0.12.0';

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

/**
 * @param {object} resource
 * @returns {{ resource: object, applied: string[] }}
 */
export function migrate(resource) {
  if (!resource || typeof resource !== 'object') return { resource, applied: [] };
  let current = resource;
  let version = minorOf(current.meta && typeof current.meta === 'object' ? current.meta.schemaVersion : undefined);
  const applied = [];
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
  return { resource: current, applied };
}
