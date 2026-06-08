# `content_table`

A rows-by-columns table. Optional header row and header column. Each cell can carry text, an image, or both.

## Shape

```ts
{
  type: 'content_table',
  content: {
    hasHeaderRow?: boolean,
    hasHeaderCol?: boolean,
    rows: [
      {
        cells: [
          {
            text?: Doc,
            image?: Image
          }
        ]
      }
    ]
  }
}
```

Cells sit in a rectangular grid — every row has the same number of cells. Cell positions follow A1 notation (column letter + 1-based row, e.g. `B2`), the same scheme [`question_table`](question_table.md) uses to mark blanks.

`Doc` is the TipTap rich-text shape; `Image` is the shared image envelope — see [SCHEMA.md](../SCHEMA.md#rich-text).

For a fill-in-the-table question (some cells left blank for the student to complete), use [`question_table`](question_table.md) instead.

## Examples

A comparison table with header row and header column:

```json
{
  "id": "blk-vert-invert",
  "type": "content_table",
  "content": {
    "hasHeaderRow": true,
    "hasHeaderCol": true,
    "rows": [
      {
        "cells": [
          { "text": { "type": "doc", "content": [{ "type": "paragraph", "content": [{ "type": "text", "text": "Feature" }] }] } },
          { "text": { "type": "doc", "content": [{ "type": "paragraph", "content": [{ "type": "text", "text": "Vertebrates" }] }] } },
          { "text": { "type": "doc", "content": [{ "type": "paragraph", "content": [{ "type": "text", "text": "Invertebrates" }] }] } }
        ]
      },
      {
        "cells": [
          { "text": { "type": "doc", "content": [{ "type": "paragraph", "content": [{ "type": "text", "text": "Backbone" }] }] } },
          { "text": { "type": "doc", "content": [{ "type": "paragraph", "content": [{ "type": "text", "text": "Present" }] }] } },
          { "text": { "type": "doc", "content": [{ "type": "paragraph", "content": [{ "type": "text", "text": "Absent" }] }] } }
        ]
      },
      {
        "cells": [
          { "text": { "type": "doc", "content": [{ "type": "paragraph", "content": [{ "type": "text", "text": "Examples" }] }] } },
          { "text": { "type": "doc", "content": [{ "type": "paragraph", "content": [{ "type": "text", "text": "Cat, salmon, robin" }] }] } },
          { "text": { "type": "doc", "content": [{ "type": "paragraph", "content": [{ "type": "text", "text": "Earthworm, jellyfish, ant" }] }] } }
        ]
      }
    ]
  }
}
```

A data table:

```json
{
  "id": "blk-inner-planets",
  "type": "content_table",
  "content": {
    "hasHeaderRow": true,
    "rows": [
      {
        "cells": [
          { "text": { "type": "doc", "content": [{ "type": "paragraph", "content": [{ "type": "text", "text": "Planet" }] }] } },
          { "text": { "type": "doc", "content": [{ "type": "paragraph", "content": [{ "type": "text", "text": "Distance from Sun (million km)" }] }] } },
          { "text": { "type": "doc", "content": [{ "type": "paragraph", "content": [{ "type": "text", "text": "Length of day (hours)" }] }] } }
        ]
      },
      {
        "cells": [
          { "text": { "type": "doc", "content": [{ "type": "paragraph", "content": [{ "type": "text", "text": "Mercury" }] }] } },
          { "text": { "type": "doc", "content": [{ "type": "paragraph", "content": [{ "type": "text", "text": "58" }] }] } },
          { "text": { "type": "doc", "content": [{ "type": "paragraph", "content": [{ "type": "text", "text": "1408" }] }] } }
        ]
      },
      {
        "cells": [
          { "text": { "type": "doc", "content": [{ "type": "paragraph", "content": [{ "type": "text", "text": "Venus" }] }] } },
          { "text": { "type": "doc", "content": [{ "type": "paragraph", "content": [{ "type": "text", "text": "108" }] }] } },
          { "text": { "type": "doc", "content": [{ "type": "paragraph", "content": [{ "type": "text", "text": "5832" }] }] } }
        ]
      },
      {
        "cells": [
          { "text": { "type": "doc", "content": [{ "type": "paragraph", "content": [{ "type": "text", "text": "Earth" }] }] } },
          { "text": { "type": "doc", "content": [{ "type": "paragraph", "content": [{ "type": "text", "text": "150" }] }] } },
          { "text": { "type": "doc", "content": [{ "type": "paragraph", "content": [{ "type": "text", "text": "24" }] }] } }
        ]
      },
      {
        "cells": [
          { "text": { "type": "doc", "content": [{ "type": "paragraph", "content": [{ "type": "text", "text": "Mars" }] }] } },
          { "text": { "type": "doc", "content": [{ "type": "paragraph", "content": [{ "type": "text", "text": "228" }] }] } },
          { "text": { "type": "doc", "content": [{ "type": "paragraph", "content": [{ "type": "text", "text": "25" }] }] } }
        ]
      }
    ]
  }
}
```
