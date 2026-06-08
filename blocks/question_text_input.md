# `question_text_input`

A typed-answer question. Variants: `short` (one-line text), `long` (paragraph or essay), `numerical` (numeric value with optional unit and tolerance), `latex` (mathematical expression).

## Shape

```ts
{
  type: 'question_text_input',
  content: {
    variant: 'short' | 'long' | 'numerical' | 'latex',
    stem: {
      text: Doc,
      image?: Image
    },
    response?: {
      tolerance?: number    // numerical variant — acceptable absolute margin
    },
    correctAnswer?: unknown,
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

Short answer:

```json
{
  "id": "blk-q-photosynthesis",
  "type": "question_text_input",
  "content": {
    "variant": "short",
    "stem": {
      "text": { "type": "doc", "content": [{ "type": "paragraph", "content": [{ "type": "text", "text": "Name the process by which green plants make their own food using sunlight." }] }] }
    },
    "correctAnswer": "photosynthesis",
    "marksAvailable": 1
  }
}
```

Long answer:

```json
{
  "id": "blk-q-tudor-heir",
  "type": "question_text_input",
  "content": {
    "variant": "long",
    "stem": {
      "text": { "type": "doc", "content": [{ "type": "paragraph", "content": [{ "type": "text", "text": "Explain why Henry VIII was so determined to have a male heir. Refer to political and religious factors in your answer." }] }] }
    },
    "marksAvailable": 6
  }
}
```

Numerical answer:

```json
{
  "id": "blk-q-triangle-perimeter",
  "type": "question_text_input",
  "content": {
    "variant": "numerical",
    "stem": {
      "text": { "type": "doc", "content": [{ "type": "paragraph", "content": [{ "type": "text", "text": "A triangle has sides of 5 cm, 12 cm, and 13 cm. Calculate its perimeter, in cm." }] }] }
    },
    "correctAnswer": 30,
    "marksAvailable": 1
  }
}
```

LaTeX answer:

```json
{
  "id": "blk-q-simplify",
  "type": "question_text_input",
  "content": {
    "variant": "latex",
    "stem": {
      "text": { "type": "doc", "content": [{ "type": "paragraph", "content": [{ "type": "text", "text": "Simplify 3x + 2x − 5 + x." }] }] }
    },
    "correctAnswer": "6x - 5",
    "marksAvailable": 2
  }
}
```
