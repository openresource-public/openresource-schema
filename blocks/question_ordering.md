# `question_ordering`

Arrange items in the correct sequence. Items can carry text, an image, or both.

## Shape

```ts
{
  type: 'question_ordering',
  content: {
    stem: {
      text: Doc,
      image?: Image
    },
    response: {
      items: [
        {
          id: string,
          text?: Doc,
          image?: Image
        }
      ]
    },
    correctAnswer: string[],   // ordered item ids
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

Order historical events chronologically:

```json
{
  "id": "blk-q-tudor-order",
  "type": "question_ordering",
  "content": {
    "stem": {
      "text": { "type": "doc", "content": [{ "type": "paragraph", "content": [{ "type": "text", "text": "Place these events from Tudor England in the order they happened, earliest first." }] }] }
    },
    "response": {
      "items": [
        { "id": "armada",      "text": { "type": "doc", "content": [{ "type": "paragraph", "content": [{ "type": "text", "text": "The Spanish Armada is defeated." }] }] } },
        { "id": "bosworth",    "text": { "type": "doc", "content": [{ "type": "paragraph", "content": [{ "type": "text", "text": "Henry VII wins the Battle of Bosworth and becomes king." }] }] } },
        { "id": "monasteries", "text": { "type": "doc", "content": [{ "type": "paragraph", "content": [{ "type": "text", "text": "Henry VIII dissolves the monasteries." }] }] } },
        { "id": "elizabeth",   "text": { "type": "doc", "content": [{ "type": "paragraph", "content": [{ "type": "text", "text": "Elizabeth I is crowned." }] }] } }
      ]
    },
    "correctAnswer": ["bosworth", "monasteries", "elizabeth", "armada"],
    "marksAvailable": 3
  }
}
```
