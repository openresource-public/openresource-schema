# `question_table`

A fill-in-the-table question. The table carries a full row × cell structure (same shape as [`content_table`](content_table.md)); `blankCells` designates which cells the student fills in, and `correctAnswer` carries the expected value for each blank.

## Shape

```ts
{
  type: 'question_table',
  content: {
    stem: {
      text: Doc,
      image?: Image
    },
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
    ],
    blankCells: [
      {
        ref: string,                                       // spreadsheet-style A1 reference, e.g. "B2"
        correctAnswer: string | string[],
        matchMode?: 'exact' | 'caseInsensitive' | 'regex'
      }
    ],
    marksAvailable?: number,
    markScheme?: MarkScheme,        // structured rubric — see SCHEMA.md
    feedback?: {
      text?: Doc,                  // explanation prose shown after the student attempts
      image?: Image
    }
  }
}
```

`Doc` is the TipTap rich-text shape; `Image` is the shared image envelope — see [SCHEMA.md](../SCHEMA.md#rich-text).

`blankCells[*].ref` is a spreadsheet-style A1 reference: column letter (A, B, C, …) then 1-based row number, e.g. `"B2"` is the second column of the second row. Rows are numbered from 1 starting at the top; the header row (if any) is row 1. Each blank's cell renders as an input; the student's entry is marked against `correctAnswer` using `matchMode` (defaults to `caseInsensitive`).

## Examples

A function-machine table where the student completes the missing outputs:

```json
{
  "id": "blk-q-function-machine",
  "type": "question_table",
  "content": {
    "stem": {
      "text": { "type": "doc", "content": [{ "type": "paragraph", "content": [{ "type": "text", "text": "Complete the function machine. Each output is the input multiplied by 3." }] }] }
    },
    "hasHeaderRow": true,
    "rows": [
      {
        "cells": [
          { "text": { "type": "doc", "content": [{ "type": "paragraph", "content": [{ "type": "text", "text": "Input" }] }] } },
          { "text": { "type": "doc", "content": [{ "type": "paragraph", "content": [{ "type": "text", "text": "Operation" }] }] } },
          { "text": { "type": "doc", "content": [{ "type": "paragraph", "content": [{ "type": "text", "text": "Output" }] }] } }
        ]
      },
      {
        "cells": [
          { "text": { "type": "doc", "content": [{ "type": "paragraph", "content": [{ "type": "text", "text": "5" }] }] } },
          { "text": { "type": "doc", "content": [{ "type": "paragraph", "content": [{ "type": "text", "text": "× 3" }] }] } },
          { "text": { "type": "doc", "content": [{ "type": "paragraph", "content": [{ "type": "text", "text": "15" }] }] } }
        ]
      },
      {
        "cells": [
          { "text": { "type": "doc", "content": [{ "type": "paragraph", "content": [{ "type": "text", "text": "7" }] }] } },
          { "text": { "type": "doc", "content": [{ "type": "paragraph", "content": [{ "type": "text", "text": "× 3" }] }] } },
          { "text": { "type": "doc", "content": [] } }
        ]
      },
      {
        "cells": [
          { "text": { "type": "doc", "content": [{ "type": "paragraph", "content": [{ "type": "text", "text": "9" }] }] } },
          { "text": { "type": "doc", "content": [{ "type": "paragraph", "content": [{ "type": "text", "text": "× 3" }] }] } },
          { "text": { "type": "doc", "content": [] } }
        ]
      }
    ],
    "blankCells": [
      { "ref": "C3", "correctAnswer": "21" },
      { "ref": "C4", "correctAnswer": "27" }
    ],
    "marksAvailable": 2
  }
}
```
