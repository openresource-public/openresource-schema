/**
 * 0.9 to 0.10: objectives become the one outcome registry.
 *
 *   1. `keyLearningPoints[]` is appended to `objectives[]`, in order, and
 *      removed. An outcome and a per-cycle learning point are one concept,
 *      scoped by where the block that realises it sits.
 *   2. Blocks tagged `meta.klpIds` are retagged `meta.objectiveIds`
 *      (merged and de-duplicated if objectiveIds already present).
 *   3. `content_text` blocks that realise a registry entry are promoted to
 *      first-class types of that era (`content_objective`,
 *      `content_assumed_knowledge`), their `content.richText` moving to
 *      `content.text`. Objective wins if a block carries both tags.
 *   4. The derived top-level `pupilLessonOutcome` is removed; there is no
 *      singular outcome, only `objectives[]`.
 *   5. `meta.schemaVersion` is stamped `0.10`.
 *
 * Pure and idempotent: a second pass finds nothing to change.
 */

export const TARGET_VERSION = '0.10';

export function migrateBlock(block) {
  if (!block || typeof block !== 'object') return block;
  let next = block;

  if (next.meta && typeof next.meta === 'object' && Array.isArray(next.meta.klpIds) && next.meta.klpIds.length > 0) {
    const meta = { ...next.meta };
    const merged = Array.isArray(meta.objectiveIds) ? [...meta.objectiveIds] : [];
    for (const id of meta.klpIds) {
      if (!merged.includes(id)) merged.push(id);
    }
    meta.objectiveIds = merged;
    delete meta.klpIds;
    next = { ...next, meta };
  }

  if (next.type === 'content_text' && next.meta && typeof next.meta === 'object') {
    const hasObjective = Array.isArray(next.meta.objectiveIds) && next.meta.objectiveIds.length > 0;
    const hasAssumed = Array.isArray(next.meta.assumedKnowledgeIds) && next.meta.assumedKnowledgeIds.length > 0;
    if (hasObjective || hasAssumed) {
      const newType = hasObjective ? 'content_objective' : 'content_assumed_knowledge';
      const content = next.content && typeof next.content === 'object' ? { ...next.content } : {};
      if ('richText' in content) {
        content.text = content.richText;
        delete content.richText;
      }
      next = { ...next, type: newType, content };
    }
  }

  return next;
}

export function migrateLessonTo010(resource) {
  if (!resource || typeof resource !== 'object') return resource;
  const out = { ...resource };

  const objectives = Array.isArray(out.objectives) ? [...out.objectives] : [];
  if (Array.isArray(out.keyLearningPoints)) {
    for (const klp of out.keyLearningPoints) objectives.push(klp);
  }
  out.objectives = objectives;
  delete out.keyLearningPoints;

  delete out.pupilLessonOutcome;

  if (out.blocks && typeof out.blocks === 'object' && !Array.isArray(out.blocks)) {
    const blocks = {};
    for (const [id, block] of Object.entries(out.blocks)) {
      blocks[id] = migrateBlock(block);
    }
    out.blocks = blocks;
  }

  out.meta = { ...(out.meta && typeof out.meta === 'object' ? out.meta : {}), schemaVersion: TARGET_VERSION };

  return out;
}
