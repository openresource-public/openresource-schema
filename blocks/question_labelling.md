# `question_labelling`

Type labels at positions on a diagram. The diagram is an inline [`primitive_layered`](primitive_layered.md) composition with blank slots for the labels.

## Shape

```ts
{
  type: 'question_labelling',
  content: {
    stem: {
      text: Doc,
      image?: Image
    },
    response: {
      blanks: [{ id: string }]
    },
    correctAnswer: { [blankId: string]: string | string[] },
    diagram: LayeredContent,
    marksAvailable?: number,
    markScheme?: MarkScheme,        // structured rubric — see SCHEMA.md
    feedback?: {
      text?: Doc,                  // explanation prose shown after the student attempts
      image?: Image
    }
  }
}
```

`Doc` is the TipTap rich-text shape; `Image` is the shared image envelope — see [SCHEMA.md](../SCHEMA.md#rich-text). `LayeredContent` is the `content` shape of [`primitive_layered`](primitive_layered.md).

Each blank fills one text layer of the `diagram`: a blank with `id` `X` corresponds to the layer whose id is `blank-X`. In the example below, blank `petal` fills the diagram layer `blank-petal`. `correctAnswer` is keyed by the blank `id` (`petal`), not the layer id.

## Examples

Label three structures on a flower diagram:

```json
{
  "id": "blk-q-label-flower",
  "type": "question_labelling",
  "content": {
    "stem": {
      "text": { "type": "doc", "content": [{ "type": "paragraph", "content": [{ "type": "text", "text": "Label the three structures indicated on the diagram of the flower." }] }] }
    },
    "response": {
      "blanks": [
        { "id": "petal" },
        { "id": "stamen" },
        { "id": "stigma" }
      ]
    },
    "correctAnswer": {
      "petal":  ["petal", "petals"],
      "stamen": "stamen",
      "stigma": "stigma"
    },
    "diagram": {
      "canvas": { "width": 800, "height": 500 },
      "altText": "Cross-section diagram of a flower with three structures arrowed for labelling.",
      "layers": [
        {
          "id": "base",
          "zOrder": 0,
          "type": "image",
          "geometry": { "x": 0, "y": 0, "width": 800, "height": 500 },
          "src": "https://example.com/flower-cross-section.png"
        },
        { "id": "blank-petal",  "zOrder": 1, "type": "text", "geometry": { "x": 60,  "y": 100, "width": 140, "height": 32 } },
        { "id": "blank-stamen", "zOrder": 2, "type": "text", "geometry": { "x": 600, "y": 180, "width": 140, "height": 32 } },
        { "id": "blank-stigma", "zOrder": 3, "type": "text", "geometry": { "x": 350, "y": 60,  "width": 140, "height": 32 } }
      ]
    },
    "marksAvailable": 3
  }
}
```
