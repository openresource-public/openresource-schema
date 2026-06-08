# Block type registry

Seventeen block types in three categories. Each block has its content shape defined at [`blocks/<id>.md`](blocks/).

For the surrounding model (how blocks compose into sections and a resource), see [SCHEMA.md](SCHEMA.md). For the rich-text shape used by every text field, see [tiptap-doc-schema.json](tiptap-doc-schema.json).

## Content

- [`content`](blocks/content.md) — unified text + image block, optionally with margin annotations.
- [`content_table`](blocks/content_table.md) — rows-by-columns table with optional header row and header column.

## Question

- [`question_choice`](blocks/question_choice.md) — pick from a list. Variants: `single`, `multi`, `boolean`.
- [`question_text_input`](blocks/question_text_input.md) — typed answer. Variants: `short`, `long`, `numerical`, `latex`.
- [`question_ordering`](blocks/question_ordering.md) — arrange items in sequence.
- [`question_matching`](blocks/question_matching.md) — pair left-column items with right-column items. Variants: `pairs`, `categorise`.
- [`question_gap_fill`](blocks/question_gap_fill.md) — fill blanks in a prose template.
- [`question_table`](blocks/question_table.md) — fill blanks in a table.
- [`question_labelling`](blocks/question_labelling.md) — type labels at positions on a diagram.
- [`question_label_select`](blocks/question_label_select.md) — click labels on a diagram.
- [`question_composite`](blocks/question_composite.md) — composite question with a shared stem and multiple sub-parts.

## Primitive

- [`primitive_layered`](blocks/primitive_layered.md) — coordinate-authored scene with layered labels, arrows, and shapes.
- [`primitive_flow`](blocks/primitive_flow.md) — N peer items in a sequence or grid, with an optional leading stem.
- [`primitive_mind_map`](blocks/primitive_mind_map.md) — hub-and-branches diagram.
- [`primitive_tree`](blocks/primitive_tree.md) — hierarchical tree. Subtypes: `general`, `etymology`.
- [`primitive_dialogue`](blocks/primitive_dialogue.md) — named speakers exchanging turns.
- [`primitive_glossary`](blocks/primitive_glossary.md) — term and definition pairs.
