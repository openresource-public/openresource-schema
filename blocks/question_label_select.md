# `question_label_select`

Click labels on a diagram (no typing). The diagram is an inline [`primitive_layered`](primitive_layered.md) composition with selectable label layers identified by id.

## Shape

```ts
{
  type: 'question_label_select',
  content: {
    stem: {
      text: Doc,
      image?: Image
    },
    response: {
      selectableLayerIds: string[]   // ids of layers the student picks from
    },
    correctAnswer: string | string[],   // correct layer id, or array of ids for multi-select (a subset of selectableLayerIds)
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

## Examples

Click each continent that lies in the Southern Hemisphere:

```json
{
  "id": "blk-q-southern-continents",
  "type": "question_label_select",
  "content": {
    "stem": {
      "text": { "type": "doc", "content": [{ "type": "paragraph", "content": [{ "type": "text", "text": "Click on every continent that lies wholly or mostly in the Southern Hemisphere." }] }] }
    },
    "response": {
      "selectableLayerIds": ["africa", "asia", "south-america", "europe", "north-america", "australia", "antarctica"]
    },
    "correctAnswer": ["australia", "antarctica", "south-america"],
    "diagram": {
      "canvas": { "width": 960, "height": 540 },
      "altText": "World map with each continent as a separately selectable layer.",
      "layers": [
        { "id": "base",          "zOrder": 0, "type": "image", "geometry": { "x": 0,   "y": 0,   "width": 960, "height": 540 }, "src": "https://example.com/world-map.png" },
        { "id": "north-america", "zOrder": 1, "type": "shape", "geometry": { "x": 80,  "y": 140, "width": 220, "height": 160 }, "shape": "rect" },
        { "id": "south-america", "zOrder": 1, "type": "shape", "geometry": { "x": 240, "y": 280, "width": 120, "height": 200 }, "shape": "rect" },
        { "id": "europe",        "zOrder": 1, "type": "shape", "geometry": { "x": 500, "y": 100, "width": 100, "height": 120 }, "shape": "rect" },
        { "id": "africa",        "zOrder": 1, "type": "shape", "geometry": { "x": 480, "y": 220, "width": 140, "height": 200 }, "shape": "rect" },
        { "id": "asia",          "zOrder": 1, "type": "shape", "geometry": { "x": 600, "y": 100, "width": 280, "height": 180 }, "shape": "rect" },
        { "id": "australia",     "zOrder": 1, "type": "shape", "geometry": { "x": 740, "y": 360, "width": 120, "height": 100 }, "shape": "rect" },
        { "id": "antarctica",    "zOrder": 1, "type": "shape", "geometry": { "x": 280, "y": 460, "width": 480, "height": 60  }, "shape": "rect" }
      ]
    },
    "marksAvailable": 3
  }
}
```
