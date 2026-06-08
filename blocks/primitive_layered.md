# `primitive_layered`

A coordinate-authored scene: a base image, map, or diagram with arrows, shape highlights, and text labels overlaid. Layers stack by `zOrder`; each layer carries its own geometry and content type.

## Shape

```ts
{
  type: 'primitive_layered',
  content: {
    canvas: { width: number, height: number },
    layers: Layer[],
    altText?: string,
    caption?: Doc,
    preserveTextStyle?: boolean
  }
}

type Layer = {
  id: string,
  zOrder: number,
  type: 'image' | 'arrow' | 'text' | 'shape',
  geometry?: { x: number, y: number, width: number, height: number },

  // image-layer fields
  src?: string,
  altText?: string,

  // arrow-layer fields
  from?: { x: number, y: number },
  to?: { x: number, y: number },
  capEnd?: 'arrow' | 'circle' | 'none',

  // text-layer field
  text?: Doc,

  // shape-layer fields
  shape?: 'rect' | 'ellipse' | 'roundRect',
  fill?: string,
  stroke?: string
}
```

`Doc` is the TipTap rich-text shape — see [SCHEMA.md](../SCHEMA.md#rich-text).

Use for annotated figures: a leaf with labelled organelles, a map with highlighted regions, a circuit diagram with labelled components. Co-ordinates are author-set in the canvas space.

## Examples

A labelled cross-section of a plant cell with three callout arrows:

```json
{
  "id": "blk-plant-cell",
  "type": "primitive_layered",
  "content": {
    "canvas": { "width": 960, "height": 540 },
    "altText": "Labelled cross-section diagram of a plant cell.",
    "layers": [
      {
        "id": "base",
        "zOrder": 0,
        "type": "image",
        "geometry": { "x": 0, "y": 0, "width": 960, "height": 540 },
        "src": "https://example.com/plant-cell.png",
        "altText": "Cross-section of a plant cell."
      },
      { "id": "arr-wall",        "zOrder": 1, "type": "arrow", "from": { "x": 200, "y": 76  }, "to": { "x": 320, "y": 140 }, "capEnd": "arrow" },
      { "id": "arr-chloroplast", "zOrder": 1, "type": "arrow", "from": { "x": 740, "y": 136 }, "to": { "x": 600, "y": 200 }, "capEnd": "arrow" },
      { "id": "arr-nucleus",     "zOrder": 1, "type": "arrow", "from": { "x": 480, "y": 460 }, "to": { "x": 480, "y": 320 }, "capEnd": "arrow" },
      {
        "id": "lbl-wall",
        "zOrder": 2,
        "type": "text",
        "geometry": { "x": 40, "y": 60, "width": 160, "height": 32 },
        "text": { "type": "doc", "content": [{ "type": "paragraph", "content": [{ "type": "text", "text": "Cell wall" }] }] }
      },
      {
        "id": "lbl-chloroplast",
        "zOrder": 2,
        "type": "text",
        "geometry": { "x": 740, "y": 120, "width": 180, "height": 32 },
        "text": { "type": "doc", "content": [{ "type": "paragraph", "content": [{ "type": "text", "text": "Chloroplast" }] }] }
      },
      {
        "id": "lbl-nucleus",
        "zOrder": 2,
        "type": "text",
        "geometry": { "x": 400, "y": 460, "width": 160, "height": 32 },
        "text": { "type": "doc", "content": [{ "type": "paragraph", "content": [{ "type": "text", "text": "Nucleus" }] }] }
      }
    ]
  }
}
```

A map of the United Kingdom with the four nations labelled:

```json
{
  "id": "blk-uk-nations",
  "type": "primitive_layered",
  "content": {
    "canvas": { "width": 600, "height": 800 },
    "altText": "Map of the United Kingdom with England, Scotland, Wales, and Northern Ireland labelled.",
    "layers": [
      { "id": "base", "zOrder": 0, "type": "image", "geometry": { "x": 0, "y": 0, "width": 600, "height": 800 }, "src": "https://example.com/uk-outline.png" },
      {
        "id": "lbl-scotland",
        "zOrder": 1,
        "type": "text",
        "geometry": { "x": 220, "y": 120, "width": 140, "height": 32 },
        "text": { "type": "doc", "content": [{ "type": "paragraph", "content": [{ "type": "text", "text": "Scotland" }] }] }
      },
      {
        "id": "lbl-england",
        "zOrder": 1,
        "type": "text",
        "geometry": { "x": 260, "y": 480, "width": 140, "height": 32 },
        "text": { "type": "doc", "content": [{ "type": "paragraph", "content": [{ "type": "text", "text": "England" }] }] }
      },
      {
        "id": "lbl-wales",
        "zOrder": 1,
        "type": "text",
        "geometry": { "x": 120, "y": 520, "width": 140, "height": 32 },
        "text": { "type": "doc", "content": [{ "type": "paragraph", "content": [{ "type": "text", "text": "Wales" }] }] }
      },
      {
        "id": "lbl-ni",
        "zOrder": 1,
        "type": "text",
        "geometry": { "x": 40, "y": 360, "width": 200, "height": 32 },
        "text": { "type": "doc", "content": [{ "type": "paragraph", "content": [{ "type": "text", "text": "Northern Ireland" }] }] }
      }
    ]
  }
}
```
