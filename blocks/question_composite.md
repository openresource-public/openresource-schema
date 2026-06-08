# `question_composite`

A composite question with a shared stem and multiple labelled sub-parts. Each part is its own `question_*` block referenced by id. Use for multi-part exam questions where the parts share context.

## Shape

```ts
{
  type: 'question_composite',
  content: {
    stem?: {
      text?: Doc,
      image?: Image
    },
    parts: [
      {
        id: string,
        label: string,            // e.g. "a", "b", "c", or "1", "2"
        blockId: string           // id of the question_* block carrying this part
      }
    ],
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

## Examples

A three-part question sharing a single experimental scenario as its stem. The parts (`blockId` references) are separate `question_*` blocks elsewhere in the resource — typically a name-the-thing, a what-changed, and an explain:

```json
{
  "id": "blk-q-pondweed",
  "type": "question_composite",
  "content": {
    "stem": {
      "text": { "type": "doc", "content": [{ "type": "paragraph", "content": [{ "type": "text", "text": "A pupil places a piece of pondweed in water at different temperatures and counts the bubbles of gas released each minute under a bright lamp." }] }] }
    },
    "parts": [
      { "id": "p-a", "label": "a", "blockId": "blk-q-name-gas" },
      { "id": "p-b", "label": "b", "blockId": "blk-q-variable" },
      { "id": "p-c", "label": "c", "blockId": "blk-q-explain-result" }
    ],
    "marksAvailable": 6
  }
}
```
