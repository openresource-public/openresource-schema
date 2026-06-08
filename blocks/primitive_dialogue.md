# `primitive_dialogue`

Named speakers exchanging turns. Each speaker has an identity record (name, avatar); each turn references one speaker and carries the spoken text plus an optional contextual image.

## Shape

```ts
{
  type: 'primitive_dialogue',
  content: {
    progression?: 'progressive' | 'click',
    speakers: [
      {
        id: string,
        name: string,
        avatar?: Image
      }
    ],
    turns: [
      {
        id: string,
        speaker: string,           // id of one of the speakers above
        text: Doc,
        image?: Image
      }
    ]
  }
}
```

`Doc` is the TipTap rich-text shape; `Image` is the shared image envelope — see [SCHEMA.md](../SCHEMA.md#rich-text).

`speakers[*].avatar` is the persistent identity portrait reused on every turn. `turns[*].image` is a per-turn contextual image (a photo the speaker references, a diagram alongside their utterance). Distinct from a discussion prompt (open-ended, the student participates); `primitive_dialogue` depicts named characters speaking (the student watches).

## Examples

A Socratic exchange that surfaces a common misconception about fractions:

```json
{
  "id": "blk-dialogue-fractions",
  "type": "primitive_dialogue",
  "content": {
    "speakers": [
      { "id": "teacher", "name": "Teacher" },
      { "id": "student", "name": "Alex" }
    ],
    "turns": [
      {
        "id": "t1",
        "speaker": "teacher",
        "text": { "type": "doc", "content": [{ "type": "paragraph", "content": [{ "type": "text", "text": "Which is larger: one-half, or one-third?" }] }] }
      },
      {
        "id": "t2",
        "speaker": "student",
        "text": { "type": "doc", "content": [{ "type": "paragraph", "content": [{ "type": "text", "text": "One-third — three is bigger than two." }] }] }
      },
      {
        "id": "t3",
        "speaker": "teacher",
        "text": { "type": "doc", "content": [{ "type": "paragraph", "content": [{ "type": "text", "text": "Picture sharing a pizza. Would you rather have one of two equal slices, or one of three equal slices?" }] }] }
      },
      {
        "id": "t4",
        "speaker": "student",
        "text": { "type": "doc", "content": [{ "type": "paragraph", "content": [{ "type": "text", "text": "One of two — that's a bigger slice. Oh, so one-half is more than one-third." }] }] }
      },
      {
        "id": "t5",
        "speaker": "teacher",
        "text": { "type": "doc", "content": [{ "type": "paragraph", "content": [{ "type": "text", "text": "Right. The larger the bottom number, the more pieces you cut the whole into — so each piece becomes smaller." }] }] }
      }
    ]
  }
}
```
