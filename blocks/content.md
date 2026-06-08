# `content`

A unified text and image block: optional `text` (TipTap doc), optional `image`, and optional substring-anchored annotations. Use for prose, a standalone image, or a figure with a tightly-coupled prose body.

## Shape

```ts
{
  type: 'content',
  content: {
    text?: Doc,
    image?: Image,
    annotations?: [
      {
        id: string,
        anchor: { value: string, occurrence?: number },
        text?: Doc
      }
    ]
  }
}
```

`Doc` is the TipTap rich-text shape; `Image` is the shared image envelope — see [SCHEMA.md](../SCHEMA.md#rich-text).

`annotations` anchor commentary to substrings of `text` — model poems with margin notes, scripture extracts with glossed vocabulary, model writing with technique callouts. Each annotation's `anchor.value` must appear verbatim in the rendered text.

## Examples

A figure with body prose:

```json
{
  "id": "blk-river-erosion",
  "type": "content",
  "content": {
    "text": { "type": "doc", "content": [
      { "type": "paragraph", "content": [
        { "type": "text", "text": "Rivers shape the land around them. Over long periods of time, fast-moving water wears away rock and soil from the banks and bed — a process called " },
        { "type": "text", "text": "erosion", "marks": [{ "type": "italic" }] },
        { "type": "text", "text": ". The eroded material is then carried downstream and deposited where the water slows, building floodplains and deltas." }
      ] }
    ] },
    "image": {
      "src": "https://example.com/river-meander.jpg",
      "altText": "Aerial photograph of a meandering river cutting through a green floodplain.",
      "caption": { "type": "doc", "content": [
        { "type": "paragraph", "content": [{ "type": "text", "text": "A meandering river in its lower course." }] }
      ] }
    }
  }
}
```

A poem extract with substring-anchored margin notes:

```json
{
  "id": "blk-frost-annotated",
  "type": "content",
  "content": {
    "text": { "type": "doc", "content": [
      { "type": "paragraph", "content": [{ "type": "text", "text": "Two roads diverged in a yellow wood, And sorry I could not travel both And be one traveler, long I stood And looked down one as far as I could To where it bent in the undergrowth;" }] }
    ] },
    "annotations": [
      {
        "id": "ann-yellow-wood",
        "anchor": { "value": "diverged in a yellow wood" },
        "text": { "type": "doc", "content": [
          { "type": "paragraph", "content": [{ "type": "text", "text": "Autumn setting. The yellow leaves locate the poem at a turning point of the year — a season of change." }] }
        ] }
      },
      {
        "id": "ann-sorry",
        "anchor": { "value": "sorry I could not travel both" },
        "text": { "type": "doc", "content": [
          { "type": "paragraph", "content": [{ "type": "text", "text": "The regret arrives before the choice has been made — the narrator already mourns the road not taken." }] }
        ] }
      }
    ]
  }
}
```
