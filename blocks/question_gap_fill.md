# `question_gap_fill`

Fill blanks in a prose template. The template is a tokenised list of alternating prose runs and blank slots; an optional word bank constrains the available answers.

## Shape

```ts
{
  type: 'question_gap_fill',
  content: {
    stem: {
      text: Doc,
      image?: Image
    },
    response: {
      blanks: [{ id: string }],
      wordBank?: string[],
      template: TemplateSegment[]   // alternating { text: string } and { blank: blankId }
    },
    correctAnswer: { [blankId: string]: string | string[] },
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

`template` carries the prose with embedded blank markers. Each blank in `template` references a `blanks[i].id` via the `{ blank: '<id>' }` segment shape.

## Examples

A cloze sentence about aerobic respiration, with a word bank:

```json
{
  "id": "blk-q-respiration",
  "type": "question_gap_fill",
  "content": {
    "stem": {
      "text": { "type": "doc", "content": [{ "type": "paragraph", "content": [{ "type": "text", "text": "Complete the sentences about aerobic respiration." }] }] }
    },
    "response": {
      "blanks": [
        { "id": "reactant1" },
        { "id": "reactant2" },
        { "id": "product1" },
        { "id": "product2" }
      ],
      "wordBank": ["glucose", "oxygen", "carbon dioxide", "water", "nitrogen", "energy"],
      "template": [
        { "text": "Aerobic respiration uses " },
        { "blank": "reactant1" },
        { "text": " and " },
        { "blank": "reactant2" },
        { "text": " to release energy from food. The waste products are " },
        { "blank": "product1" },
        { "text": " and " },
        { "blank": "product2" },
        { "text": "." }
      ]
    },
    "correctAnswer": {
      "reactant1": ["glucose", "oxygen"],
      "reactant2": ["glucose", "oxygen"],
      "product1":  ["carbon dioxide", "water"],
      "product2":  ["carbon dioxide", "water"]
    },
    "marksAvailable": 4
  }
}
```
