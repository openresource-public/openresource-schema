# `primitive_glossary`

A glossary card: one or more term + definition pairs in a single block. Renders as a stacked term-definition list. Use for vocabulary, glossary entries, or any set of named items with short explanations.

## Shape

```ts
{
  type: 'primitive_glossary',
  content: {
    items: [
      {
        id: string,
        term: Doc,
        definition?: Doc
      }
    ]
  }
}
```

`Doc` is the TipTap rich-text shape — see [SCHEMA.md](../SCHEMA.md#rich-text).

## Examples

A glossary of poetic devices:

```json
{
  "id": "blk-poetic-devices",
  "type": "primitive_glossary",
  "content": {
    "items": [
      {
        "id": "alliteration",
        "term":       { "type": "doc", "content": [{ "type": "paragraph", "content": [{ "type": "text", "text": "Alliteration" }] }] },
        "definition": { "type": "doc", "content": [{ "type": "paragraph", "content": [{ "type": "text", "text": "The repetition of an initial consonant sound across two or more nearby words." }] }] }
      },
      {
        "id": "metaphor",
        "term":       { "type": "doc", "content": [{ "type": "paragraph", "content": [{ "type": "text", "text": "Metaphor" }] }] },
        "definition": { "type": "doc", "content": [{ "type": "paragraph", "content": [{ "type": "text", "text": "A figure of speech describing one thing as if it is another." }] }] }
      },
      {
        "id": "personification",
        "term":       { "type": "doc", "content": [{ "type": "paragraph", "content": [{ "type": "text", "text": "Personification" }] }] },
        "definition": { "type": "doc", "content": [{ "type": "paragraph", "content": [{ "type": "text", "text": "Giving human qualities to a non-human thing." }] }] }
      }
    ]
  }
}
```
