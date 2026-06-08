# `question_choice`

Pick from a list of options. Variants: `single` (one correct option), `multi` (one or more correct), `boolean` (true/false).

## Shape

```ts
{
  type: 'question_choice',
  content: {
    variant: 'single' | 'multi' | 'boolean',
    stem: {
      text: Doc,
      image?: Image
    },
    response?: {
      options: [
        {
          id: string,
          text?: Doc,
          image?: Image
        }
      ]
    },
    correctAnswer: string | string[] | boolean,
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

`correctAnswer` shape depends on `variant`:

- `single` — the id of the correct option (string).
- `multi` — an array of correct option ids (string[]).
- `boolean` — just `true` or `false`. The `response` object is omitted entirely; the renderer emits the fixed True / False pair.

## Examples

Single correct option:

```json
{
  "id": "blk-q-prime",
  "type": "question_choice",
  "content": {
    "variant": "single",
    "stem": {
      "text": { "type": "doc", "content": [{ "type": "paragraph", "content": [{ "type": "text", "text": "Which of these numbers is prime?" }] }] }
    },
    "response": {
      "options": [
        { "id": "opt-9",  "text": { "type": "doc", "content": [{ "type": "paragraph", "content": [{ "type": "text", "text": "9" }] }] } },
        { "id": "opt-15", "text": { "type": "doc", "content": [{ "type": "paragraph", "content": [{ "type": "text", "text": "15" }] }] } },
        { "id": "opt-17", "text": { "type": "doc", "content": [{ "type": "paragraph", "content": [{ "type": "text", "text": "17" }] }] } },
        { "id": "opt-21", "text": { "type": "doc", "content": [{ "type": "paragraph", "content": [{ "type": "text", "text": "21" }] }] } }
      ]
    },
    "correctAnswer": "opt-17",
    "marksAvailable": 1
  }
}
```

Multiple correct options:

```json
{
  "id": "blk-q-mammals",
  "type": "question_choice",
  "content": {
    "variant": "multi",
    "stem": {
      "text": { "type": "doc", "content": [{ "type": "paragraph", "content": [{ "type": "text", "text": "Which of the following animals are mammals?" }] }] }
    },
    "response": {
      "options": [
        { "id": "opt-whale",     "text": { "type": "doc", "content": [{ "type": "paragraph", "content": [{ "type": "text", "text": "Whale" }] }] } },
        { "id": "opt-crocodile", "text": { "type": "doc", "content": [{ "type": "paragraph", "content": [{ "type": "text", "text": "Crocodile" }] }] } },
        { "id": "opt-bat",       "text": { "type": "doc", "content": [{ "type": "paragraph", "content": [{ "type": "text", "text": "Bat" }] }] } },
        { "id": "opt-shark",     "text": { "type": "doc", "content": [{ "type": "paragraph", "content": [{ "type": "text", "text": "Shark" }] }] } }
      ]
    },
    "correctAnswer": ["opt-whale", "opt-bat"],
    "marksAvailable": 2
  }
}
```

True or false:

```json
{
  "id": "blk-q-magna-carta",
  "type": "question_choice",
  "content": {
    "variant": "boolean",
    "stem": {
      "text": { "type": "doc", "content": [{ "type": "paragraph", "content": [{ "type": "text", "text": "Magna Carta was sealed in 1215." }] }] }
    },
    "correctAnswer": true,
    "marksAvailable": 1
  }
}
```
