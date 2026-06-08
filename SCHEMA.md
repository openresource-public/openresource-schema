# Open Resource schema v0.11

A data model for educational resources.

## The shape

```ts
{
  id: string,
  type: 'resource',
  title: string,
  description?: string,

  blocks:   { [blockId]:  Block },
  sections: { [sectionId]: Section },
  sequence: SectionId[],

  objectives:       Objective[],
  keywords:         Keyword[],
  misconceptions:   Misconception[],
  assumedKnowledge: AssumedKnowledge[],

  meta: {
    schemaVersion: '0.11'
  }
}
```

A resource is a flat dictionary of blocks and sections referenced by id. The top-level `sequence` carries section ids in order. Resource-level lists (objectives, keywords, misconceptions, prior knowledge) live at the root.

## Sections

A section is one phase of a lesson. Its `type` is a hint, not a rule — it shapes how the lesson is authored and displayed, but doesn't change what the content means. The six types cover the usual stages of a lesson:

- `intro`: opening — introduction, learning outcome, glossary.
- `retrieval`: activates prior knowledge.
- `learning-cycle`: a full teach → check → practice arc on one sub-topic.
- `activity`: extended practice or investigation; no new teaching.
- `assessment`: standalone summative phase, separate from any learning cycle.
- `plenary`: closing — summary and reflection.

```ts
{
  id: string,
  type: 'intro' | 'retrieval' | 'learning-cycle' | 'activity' | 'assessment' | 'plenary',
  heading: string,
  sequence: BlockId[]
}
```

A section's `sequence` carries the ids of the blocks that make up that phase, in order.

## Blocks

A block is the atomic content unit. Three categories:

- `content_*`: prose, tables, and images.
- `question_*`: interactive. Choice, ordering, matching, gap-fill, labelling, text input, composite multi-part questions.
- `primitive_*`: structured visuals. Worked-example flows, mind maps, trees, dialogue, layered diagrams, glossaries.

```ts
{
  id: string,
  type: BlockType,
  heading?: string,
  content: object        // per-type; see blocks/<id>.md
}
```

The shape of `content` is defined per block type. See [BLOCKS.md](BLOCKS.md) for the catalogue and [`blocks/<id>.md`](blocks/) for each block's content shape. Every `question_*` block also carries optional `markScheme` (a structured marking rubric) and `feedback` (model-answer prose + optional figure) slots — documented in each question block's doc.

## Rich text

Every text-bearing field on a block or registry entry stores a [TipTap](https://tiptap.dev) JSON document. Inline styling (bold, italic, colour, subscript, superscript, links) survives between authoring surfaces and renderers. The full shape is in [tiptap-doc-schema.json](tiptap-doc-schema.json); below, `Doc` is shorthand for it:

```ts
type Doc = {
  type: 'doc',
  content?: Node[]
}
```

### Inline math

Equations are nodes inside a paragraph:

```json
{
  "type": "math",
  "attrs": {
    "latex": "x^2 + y^2 = z^2",
    "display": "inline"
  }
}
```

LaTeX is the canonical form.

## Image

Many blocks pair an optional image with their text: `content`, items of `primitive_flow`, nodes of `primitive_mind_map` and `primitive_tree`, speakers of `primitive_dialogue`, and the stem of every `question_*`. Wherever this pairing appears, the image envelope is uniform:

```ts
type Image = {
  src: string,
  altText: string,
  caption?: Doc
}
```

`altText` is required for accessibility. `caption` is a `Doc`, so it can carry inline styling and links. Both `text` and `image` are optional in each block where this pair appears — renderers compose text-only, image-only, or both.

## Registries

Resource-level lists at the root.

```ts
type Objective        = { id, text: Doc }
type Keyword          = { id, term: Doc, definition?: Doc }
type Misconception    = { id, text: Doc, response?: Doc }
type AssumedKnowledge = { id, text: Doc }
```

---

Resources can also be imported from existing pptx decks. Imported blocks additionally carry an `elements` array referencing source-deck shapes for round-trip back to pptx. That field is part of the import pipeline and is empty when authoring from scratch.
