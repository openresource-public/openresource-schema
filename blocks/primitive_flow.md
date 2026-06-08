# `primitive_flow`

N peer items arranged on a single axis or as a 2D grid, with optional layout flags and an optional leading stem envelope. Use for ordered processes (water cycle, derivation steps), parallel sets (members of a category, comparison rows), worked examples, or any tile-based arrangement of small content units.

## Shape

```ts
{
  type: 'primitive_flow',
  content: {
    orientation: 'horizontal' | 'vertical',
    cols?: number,                  // when set, items lay out as an N-column grid
    arrows?: boolean,               // connector arrows between items (horizontal: →, vertical: ↓)
    numbered?: boolean,             // auto-numbered badges (1, 2, 3, …)
    progression?: 'progressive',    // Next-button walkthrough reveal
    stem?: {                        // optional leading prompt above the items
      text: Doc,
      image?: Image
    },
    items: [
      {
        id: string,
        text?: Doc,
        image?: Image,
        icon?: string
      }
    ]
  }
}
```

`Doc` is the TipTap rich-text shape; `Image` is the shared image envelope — see [SCHEMA.md](../SCHEMA.md#rich-text).

Each item carries a `Doc` — typically a heading node (the focal term, h3) plus a paragraph of body prose. The renderer styles headings as the focal line and paragraphs as the supporting explanation.

## Examples

An ordered sequence with connector arrows and step numbers:

```json
{
  "id": "blk-water-cycle",
  "type": "primitive_flow",
  "content": {
    "orientation": "horizontal",
    "arrows": true,
    "numbered": true,
    "items": [
      {
        "id": "evaporation",
        "text": { "type": "doc", "content": [
          { "type": "heading", "attrs": { "level": 3 }, "content": [{ "type": "text", "text": "Evaporation" }] },
          { "type": "paragraph", "content": [{ "type": "text", "text": "Heat from the sun warms water in oceans, lakes, and rivers. Liquid water gains energy and turns into water vapour, rising invisibly into the air." }] }
        ] }
      },
      {
        "id": "condensation",
        "text": { "type": "doc", "content": [
          { "type": "heading", "attrs": { "level": 3 }, "content": [{ "type": "text", "text": "Condensation" }] },
          { "type": "paragraph", "content": [{ "type": "text", "text": "Higher in the atmosphere the air is colder. The vapour loses energy and changes back into tiny liquid droplets, which gather together to form clouds." }] }
        ] }
      },
      {
        "id": "precipitation",
        "text": { "type": "doc", "content": [
          { "type": "heading", "attrs": { "level": 3 }, "content": [{ "type": "text", "text": "Precipitation" }] },
          { "type": "paragraph", "content": [{ "type": "text", "text": "When the droplets grow too heavy for the cloud to hold, they fall back to the ground as rain, snow, sleet, or hail." }] }
        ] }
      },
      {
        "id": "collection",
        "text": { "type": "doc", "content": [
          { "type": "heading", "attrs": { "level": 3 }, "content": [{ "type": "text", "text": "Collection" }] },
          { "type": "paragraph", "content": [{ "type": "text", "text": "Water collects in rivers, lakes, oceans, and groundwater. From there it can evaporate again, and the cycle continues." }] }
        ] }
      }
    ]
  }
}
```

A grid of parallel items, each a focal term with a definition and an example:

```json
{
  "id": "blk-parts-of-speech",
  "type": "primitive_flow",
  "content": {
    "orientation": "horizontal",
    "cols": 3,
    "items": [
      {
        "id": "noun",
        "text": { "type": "doc", "content": [
          { "type": "heading", "attrs": { "level": 3 }, "content": [{ "type": "text", "text": "Noun" }] },
          { "type": "paragraph", "content": [{ "type": "text", "text": "A word for a person, place, or thing. Examples: cat, London, happiness." }] }
        ] }
      },
      {
        "id": "verb",
        "text": { "type": "doc", "content": [
          { "type": "heading", "attrs": { "level": 3 }, "content": [{ "type": "text", "text": "Verb" }] },
          { "type": "paragraph", "content": [{ "type": "text", "text": "An action word, or a word describing a state of being. Examples: run, is, think." }] }
        ] }
      },
      {
        "id": "adjective",
        "text": { "type": "doc", "content": [
          { "type": "heading", "attrs": { "level": 3 }, "content": [{ "type": "text", "text": "Adjective" }] },
          { "type": "paragraph", "content": [{ "type": "text", "text": "A word that describes a noun. Examples: red, tall, mysterious." }] }
        ] }
      },
      {
        "id": "adverb",
        "text": { "type": "doc", "content": [
          { "type": "heading", "attrs": { "level": 3 }, "content": [{ "type": "text", "text": "Adverb" }] },
          { "type": "paragraph", "content": [{ "type": "text", "text": "A word that describes a verb, an adjective, or another adverb. Examples: quickly, very, well." }] }
        ] }
      },
      {
        "id": "pronoun",
        "text": { "type": "doc", "content": [
          { "type": "heading", "attrs": { "level": 3 }, "content": [{ "type": "text", "text": "Pronoun" }] },
          { "type": "paragraph", "content": [{ "type": "text", "text": "A word that stands in for a noun to avoid repetition. Examples: she, them, it." }] }
        ] }
      },
      {
        "id": "preposition",
        "text": { "type": "doc", "content": [
          { "type": "heading", "attrs": { "level": 3 }, "content": [{ "type": "text", "text": "Preposition" }] },
          { "type": "paragraph", "content": [{ "type": "text", "text": "A word showing the relationship between a noun (or pronoun) and another word, often in time or space. Examples: in, after, between." }] }
        ] }
      }
    ]
  }
}
```

A worked example modelling the Point–Evidence–Explanation structure for analytical writing:

```json
{
  "id": "blk-pee-frost",
  "type": "primitive_flow",
  "content": {
    "orientation": "vertical",
    "numbered": true,
    "stem": {
      "text": { "type": "doc", "content": [{ "type": "paragraph", "content": [{ "type": "text", "text": "Read these opening lines of Robert Frost's 'The Road Not Taken': 'Two roads diverged in a yellow wood, / And sorry I could not travel both.' Use Point, Evidence, Explanation to write a paragraph analysing how Frost presents the idea of choice. The model below shows the pattern." }] }] }
    },
    "items": [
      {
        "id": "step-point",
        "text": { "type": "doc", "content": [
          { "type": "heading", "attrs": { "level": 3 }, "content": [{ "type": "text", "text": "Point — make a clear claim" }] },
          { "type": "paragraph", "content": [{ "type": "text", "text": "In the opening lines, Frost presents choice as quietly painful — a moment of regret rather than triumph." }] }
        ] }
      },
      {
        "id": "step-evidence",
        "text": { "type": "doc", "content": [
          { "type": "heading", "attrs": { "level": 3 }, "content": [{ "type": "text", "text": "Evidence — quote briefly from the poem" }] },
          { "type": "paragraph", "content": [{ "type": "text", "text": "The narrator describes himself as 'sorry' that he cannot 'travel both' roads." }] }
        ] }
      },
      {
        "id": "step-explanation",
        "text": { "type": "doc", "content": [
          { "type": "heading", "attrs": { "level": 3 }, "content": [{ "type": "text", "text": "Explanation — show how the evidence proves the point" }] },
          { "type": "paragraph", "content": [{ "type": "text", "text": "The word 'sorry' reverses the reader's expectation that taking a path is heroic; even before the choice is made, Frost hints at the lasting sense of loss the rest of the poem will explore." }] }
        ] }
      }
    ]
  }
}
```
