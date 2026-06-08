# `primitive_mind_map`

A hub-and-branches diagram: one central concept with radial branches. The hub and each branch can carry text and an optional image.

## Shape

```ts
{
  type: 'primitive_mind_map',
  content: {
    progression?: 'progressive' | 'click',
    center: {
      text: Doc,
      image?: Image
    },
    branches: [
      {
        id: string,
        text: Doc,
        image?: Image
      }
    ]
  }
}
```

`Doc` is the TipTap rich-text shape; `Image` is the shared image envelope — see [SCHEMA.md](../SCHEMA.md#rich-text).

`progression: 'progressive'` reveals branches in author order via a Next button; `progression: 'click'` hides branches until clicked, revealable in any order; omit for no reveal (all branches visible).

## Examples

Themes in a novel — each branch carries a focal theme and an example from the text:

```json
{
  "id": "blk-mockingbird-themes",
  "type": "primitive_mind_map",
  "content": {
    "center": {
      "text": { "type": "doc", "content": [
        { "type": "paragraph", "content": [
          { "type": "text", "text": "Themes in " },
          { "type": "text", "text": "To Kill a Mockingbird", "marks": [{ "type": "italic" }] }
        ] }
      ] }
    },
    "branches": [
      {
        "id": "prejudice",
        "text": { "type": "doc", "content": [
          { "type": "heading", "attrs": { "level": 3 }, "content": [{ "type": "text", "text": "Prejudice" }] },
          { "type": "paragraph", "content": [{ "type": "text", "text": "Racial injustice in the trial of Tom Robinson; the town's quick judgements of Boo Radley." }] }
        ] }
      },
      {
        "id": "innocence",
        "text": { "type": "doc", "content": [
          { "type": "heading", "attrs": { "level": 3 }, "content": [{ "type": "text", "text": "Innocence" }] },
          { "type": "paragraph", "content": [{ "type": "text", "text": "Scout and Jem's loss of childhood naivety as they witness adult cruelty firsthand." }] }
        ] }
      },
      {
        "id": "courage",
        "text": { "type": "doc", "content": [
          { "type": "heading", "attrs": { "level": 3 }, "content": [{ "type": "text", "text": "Moral courage" }] },
          { "type": "paragraph", "content": [{ "type": "text", "text": "Atticus defending Tom despite the town's hostility; Mrs Dubose's struggle with addiction." }] }
        ] }
      },
      {
        "id": "compassion",
        "text": { "type": "doc", "content": [
          { "type": "heading", "attrs": { "level": 3 }, "content": [{ "type": "text", "text": "Compassion" }] },
          { "type": "paragraph", "content": [{ "type": "text", "text": "Atticus teaches Scout to 'climb into someone's skin and walk around in it' before judging them." }] }
        ] }
      }
    ]
  }
}
```
