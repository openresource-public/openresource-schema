/**
 * 0.11 to 0.12: registry content is never duplicated (the projection
 * collapse).
 *
 * Before, a registry entry (an objective, keyword, misconception, piece of
 * assumed knowledge or teacher tip) could be realised by a block that
 * restated the entry's text in its own tiles and carried the entry's id in
 * `meta.<kind>Ids`: two copies, able to drift. After, registry content
 * renders only through projection blocks, one role per registry, and the
 * `meta.<kind>Ids` tags on other blocks are pointers with no content.
 *
 *   1. A role-less `bento` block carrying a registry tag whose tiles are
 *      pure registry prose (all text tiles, or all glossary tiles for
 *      keywords) becomes a projection block: `role` for the tag,
 *      `content: { tiles: [], projection: { ids } }`, the consumed tag
 *      removed from `meta` (other meta survives).
 *   2. The block's copy wins where the mapping is trivial: one id and one
 *      text tile writes the tile's text back into the entry; one id and one
 *      glossary tile with one item writes term and definition back. Anything
 *      less trivial keeps the registry copy.
 *   3. Blocks with a role (question, worked-example, key-point, or a
 *      projection) are untouched; their tags are already pointers.
 *   4. Version stamping is the chain's job (index.mjs).
 *
 * Pure and idempotent: converted blocks carry a projection role, so a second
 * pass finds nothing to convert.
 */

// Projection role to the registry it renders (SCHEMA.md, Registries).
export const PROJECTION_REGISTRY = Object.freeze({
  objectives: 'objectives',
  glossary: 'keywords',
  'assumed-knowledge': 'assumedKnowledge',
  misconceptions: 'misconceptions',
  'teacher-tips': 'teacherTips',
});

// meta key to projection role, in priority order for a double-tagged block.
const TAG_TO_ROLE = [
  ['objectiveIds', 'objectives'],
  ['keywordIds', 'glossary'],
  ['assumedKnowledgeIds', 'assumed-knowledge'],
  ['misconceptionIds', 'misconceptions'],
  ['teacherTipIds', 'teacher-tips'],
];

const isDoc = (v) => v && typeof v === 'object' && v.type === 'doc';

function tilePayloadKinds(tiles) {
  return tiles.map((t) => {
    if (!t || typeof t !== 'object') return null;
    if (t.text !== undefined) return 'text';
    if (t.glossary !== undefined) return 'glossary';
    return 'other';
  });
}

export function migrateLessonTo012(resource) {
  if (!resource || typeof resource !== 'object') return resource;
  const next = { ...resource, blocks: { ...(resource.blocks || {}) } };

  // Registry arrays are copied on first write-back so untouched arrays keep
  // their identity.
  const copiedRegistries = new Set();
  const registryArray = (key) => {
    if (!copiedRegistries.has(key)) {
      next[key] = (Array.isArray(next[key]) ? next[key] : []).map((e) => (e && typeof e === 'object' ? { ...e } : e));
      copiedRegistries.add(key);
    }
    return next[key];
  };

  for (const [blockId, block] of Object.entries(next.blocks)) {
    if (!block || typeof block !== 'object') continue;
    if (block.type !== 'bento') continue;
    if (typeof block.role === 'string' && block.role) continue;
    const meta = block.meta;
    if (!meta || typeof meta !== 'object') continue;

    const hit = TAG_TO_ROLE.find(([key]) => Array.isArray(meta[key]) && meta[key].length > 0);
    if (!hit) continue;
    const [tagKey, role] = hit;
    const registry = PROJECTION_REGISTRY[role];

    // Only pure registry-prose realisers convert. A block with marking,
    // models, images or mixed tiles is related teaching content: its tag
    // stays a pointer and the block stays as authored.
    const tiles = Array.isArray(block.content?.tiles) ? block.content.tiles : [];
    const kinds = tilePayloadKinds(tiles);
    const allText = kinds.length > 0 && kinds.every((k) => k === 'text');
    const allGlossary = kinds.length > 0 && kinds.every((k) => k === 'glossary');
    const convertible = tagKey === 'keywordIds' ? (allGlossary || allText) : allText;
    if (!convertible) continue;

    const ids = meta[tagKey];

    if (ids.length === 1) {
      const arr = registryArray(registry);
      const entryIdx = arr.findIndex((e) => e && e.id === ids[0]);
      if (entryIdx >= 0) {
        const entry = arr[entryIdx];
        if (allText && tiles.length === 1 && isDoc(tiles[0].text) && tagKey !== 'keywordIds') {
          arr[entryIdx] = { ...entry, text: tiles[0].text };
        } else if (allGlossary && tiles.length === 1) {
          const items = Array.isArray(tiles[0].glossary?.items) ? tiles[0].glossary.items : [];
          if (items.length === 1) {
            const updated = { ...entry };
            if (isDoc(items[0].term)) updated.term = items[0].term;
            if (isDoc(items[0].definition)) updated.definition = items[0].definition;
            arr[entryIdx] = updated;
          }
        }
      }
    }

    const nextMeta = { ...meta };
    delete nextMeta[tagKey];
    const converted = {
      ...block,
      role,
      content: { tiles: [], projection: { ids: [...ids] } },
    };
    if (Object.keys(nextMeta).length > 0) converted.meta = nextMeta;
    else delete converted.meta;
    next.blocks[blockId] = converted;
  }

  return next;
}
