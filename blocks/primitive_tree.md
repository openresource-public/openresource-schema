# `primitive_tree`

A hierarchical tree. Subtypes: `general` (taxonomy, classification, family tree, decision tree) and `etymology` (a word broken into morphemes with meanings).

## Shape

```ts
{
  type: 'primitive_tree',
  content: {
    subtype: 'general' | 'etymology',
    progression?: 'progressive' | 'click',
    nodes: [
      {
        id: string,
        parentId?: string,         // omit on the root
        text: Doc,
        meaning?: Doc,             // etymology subtype only
        edgeLabel?: Doc,           // label on the edge from this node to its parent
        image?: Image
      }
    ]
  }
}
```

`Doc` is the TipTap rich-text shape; `Image` is the shared image envelope — see [SCHEMA.md](../SCHEMA.md#rich-text).

`progression: 'progressive'` reveals nodes in author order; `progression: 'click'` hides nodes until clicked; omit for no reveal.

## Examples

A `general` subtype — a simple taxonomy of animals:

```json
{
  "id": "blk-animal-tree",
  "type": "primitive_tree",
  "content": {
    "subtype": "general",
    "nodes": [
      { "id": "animals",       "text": { "type": "doc", "content": [{ "type": "paragraph", "content": [{ "type": "text", "text": "Animals" }] }] } },
      { "id": "vertebrates",   "parentId": "animals",       "text": { "type": "doc", "content": [{ "type": "paragraph", "content": [{ "type": "text", "text": "Vertebrates" }] }] } },
      { "id": "invertebrates", "parentId": "animals",       "text": { "type": "doc", "content": [{ "type": "paragraph", "content": [{ "type": "text", "text": "Invertebrates" }] }] } },
      { "id": "mammals",       "parentId": "vertebrates",   "text": { "type": "doc", "content": [{ "type": "paragraph", "content": [{ "type": "text", "text": "Mammals" }] }] } },
      { "id": "birds",         "parentId": "vertebrates",   "text": { "type": "doc", "content": [{ "type": "paragraph", "content": [{ "type": "text", "text": "Birds" }] }] } },
      { "id": "fish",          "parentId": "vertebrates",   "text": { "type": "doc", "content": [{ "type": "paragraph", "content": [{ "type": "text", "text": "Fish" }] }] } },
      { "id": "insects",       "parentId": "invertebrates", "text": { "type": "doc", "content": [{ "type": "paragraph", "content": [{ "type": "text", "text": "Insects" }] }] } },
      { "id": "molluscs",      "parentId": "invertebrates", "text": { "type": "doc", "content": [{ "type": "paragraph", "content": [{ "type": "text", "text": "Molluscs" }] }] } }
    ]
  }
}
```

An `etymology` subtype — a Greek-rooted word broken into morphemes, each with its meaning:

```json
{
  "id": "blk-photosynthesis-etymology",
  "type": "primitive_tree",
  "content": {
    "subtype": "etymology",
    "nodes": [
      {
        "id": "photosynthesis",
        "text": { "type": "doc", "content": [{ "type": "paragraph", "content": [{ "type": "text", "text": "photosynthesis" }] }] }
      },
      {
        "id": "photo",
        "parentId": "photosynthesis",
        "text":    { "type": "doc", "content": [{ "type": "paragraph", "content": [{ "type": "text", "text": "photo-" }] }] },
        "meaning": { "type": "doc", "content": [
          { "type": "paragraph", "content": [
            { "type": "text", "text": "Greek " },
            { "type": "text", "text": "phōs, phōtos", "marks": [{ "type": "italic" }] },
            { "type": "text", "text": ": light" }
          ] }
        ] }
      },
      {
        "id": "synthesis",
        "parentId": "photosynthesis",
        "text":    { "type": "doc", "content": [{ "type": "paragraph", "content": [{ "type": "text", "text": "synthesis" }] }] },
        "meaning": { "type": "doc", "content": [
          { "type": "paragraph", "content": [
            { "type": "text", "text": "Greek " },
            { "type": "text", "text": "sunthesis", "marks": [{ "type": "italic" }] },
            { "type": "text", "text": ": putting together" }
          ] }
        ] }
      },
      {
        "id": "syn",
        "parentId": "synthesis",
        "text":    { "type": "doc", "content": [{ "type": "paragraph", "content": [{ "type": "text", "text": "syn-" }] }] },
        "meaning": { "type": "doc", "content": [{ "type": "paragraph", "content": [{ "type": "text", "text": "Greek: together, with" }] }] }
      },
      {
        "id": "thesis",
        "parentId": "synthesis",
        "text":    { "type": "doc", "content": [{ "type": "paragraph", "content": [{ "type": "text", "text": "thesis" }] }] },
        "meaning": { "type": "doc", "content": [{ "type": "paragraph", "content": [{ "type": "text", "text": "Greek: placing, setting" }] }] }
      }
    ]
  }
}
```
