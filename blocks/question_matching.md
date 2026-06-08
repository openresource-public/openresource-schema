# `question_matching`

Match items between two columns. Variants: `pairs` (one-to-one matching) and `categorise` (sort items into category buckets).

## Shape

```ts
{
  type: 'question_matching',
  content: {
    variant: 'pairs' | 'categorise',
    stem: {
      text: Doc,
      image?: Image
    },
    response: {
      leftColumn:  [{ id: string, text?: Doc, image?: Image }],
      rightColumn: [{ id: string, text?: Doc, image?: Image }]
    },
    correctAnswer: { [leftId: string]: string },   // leftId → rightId
    marksAvailable?: number,
    markScheme?: MarkScheme,        // structured rubric — see SCHEMA.md
    feedback?: {
      text?: Doc,                  // explanation prose shown after the student attempts
      image?: Image
    }
  }
}
```

`Doc` is the TipTap rich-text shape; `Image` is the shared image envelope — see [SCHEMA.md](../SCHEMA.md#rich-text).

In both variants `leftColumn` carries the items the student arranges and `rightColumn` carries the targets. For `pairs`, each left item maps to exactly one right item and each right item is used once. For `categorise`, `rightColumn` is the set of category buckets and `leftColumn` is the set of items to sort into them; multiple left items can map to the same right (bucket).

## Examples

One-to-one pairs — terms and definitions:

```json
{
  "id": "blk-q-match-devices",
  "type": "question_matching",
  "content": {
    "variant": "pairs",
    "stem": {
      "text": { "type": "doc", "content": [{ "type": "paragraph", "content": [{ "type": "text", "text": "Match each literary technique to its definition." }] }] }
    },
    "response": {
      "leftColumn": [
        { "id": "alliteration",    "text": { "type": "doc", "content": [{ "type": "paragraph", "content": [{ "type": "text", "text": "Alliteration" }] }] } },
        { "id": "simile",          "text": { "type": "doc", "content": [{ "type": "paragraph", "content": [{ "type": "text", "text": "Simile" }] }] } },
        { "id": "personification", "text": { "type": "doc", "content": [{ "type": "paragraph", "content": [{ "type": "text", "text": "Personification" }] }] } }
      ],
      "rightColumn": [
        { "id": "def-as-like",     "text": { "type": "doc", "content": [{ "type": "paragraph", "content": [{ "type": "text", "text": "A comparison using 'like' or 'as'." }] }] } },
        { "id": "def-consonant",   "text": { "type": "doc", "content": [{ "type": "paragraph", "content": [{ "type": "text", "text": "Repeated consonant sounds at the start of nearby words." }] }] } },
        { "id": "def-human-quals", "text": { "type": "doc", "content": [{ "type": "paragraph", "content": [{ "type": "text", "text": "Giving human qualities to a non-human thing." }] }] } }
      ]
    },
    "correctAnswer": {
      "alliteration":    "def-consonant",
      "simile":          "def-as-like",
      "personification": "def-human-quals"
    },
    "marksAvailable": 3
  }
}
```

Categorise — sort items into buckets (rightColumn) where each bucket can receive several items:

```json
{
  "id": "blk-q-sort-animals",
  "type": "question_matching",
  "content": {
    "variant": "categorise",
    "stem": {
      "text": { "type": "doc", "content": [{ "type": "paragraph", "content": [{ "type": "text", "text": "Sort each animal into the correct category." }] }] }
    },
    "response": {
      "leftColumn": [
        { "id": "octopus",   "text": { "type": "doc", "content": [{ "type": "paragraph", "content": [{ "type": "text", "text": "Octopus" }] }] } },
        { "id": "shark",     "text": { "type": "doc", "content": [{ "type": "paragraph", "content": [{ "type": "text", "text": "Shark" }] }] } },
        { "id": "earthworm", "text": { "type": "doc", "content": [{ "type": "paragraph", "content": [{ "type": "text", "text": "Earthworm" }] }] } },
        { "id": "frog",      "text": { "type": "doc", "content": [{ "type": "paragraph", "content": [{ "type": "text", "text": "Frog" }] }] } }
      ],
      "rightColumn": [
        { "id": "vert",   "text": { "type": "doc", "content": [{ "type": "paragraph", "content": [{ "type": "text", "text": "Vertebrate" }] }] } },
        { "id": "invert", "text": { "type": "doc", "content": [{ "type": "paragraph", "content": [{ "type": "text", "text": "Invertebrate" }] }] } }
      ]
    },
    "correctAnswer": {
      "octopus":   "invert",
      "shark":     "vert",
      "earthworm": "invert",
      "frog":      "vert"
    },
    "marksAvailable": 4
  }
}
```
