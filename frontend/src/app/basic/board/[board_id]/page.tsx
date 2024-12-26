"use client";

import { BoardOut } from "@/api-client/models/BoardOut";
import { CardColumn } from "@/api-client/models/CardColumn";
import { CardOut } from "@/api-client/models/CardOut";
import { useState } from "react";
import { DialogType } from "./_components/dialogs/dialog";
import { RezizableBoard } from "./_components/board";
import { Header } from "./_components/header";
import { DialogContentRender } from "./_components/dialogs/dialog";
import { Dialog } from "@/components/ui/dialog";

import { BoardsApi } from "@/api-client/apis/BoardsApi"

export default function BoardPage({ params }: { params: { board_id: string } }) {


    const board = new BoardsApi().getBoardBoardsBoardIdGet({ boardId: parseInt(params.board_id) })

    // // Sample board data
    // const board: BoardOut = {
    //     id: 1,
    //     title: "My First Board",
    //     description: "This is my first board",
    //     labels: [
    //         { name: "Label 1", color: "red" },
    //         { name: "Label 2", color: "blue" },
    //         { name: "Label 3", color: "green" },
    //         { name: "Label 4", color: "yellow" },
    //         { name: "Label 5", color: "purple" },
    //         { name: "Label 6", color: "orange" },
    //         { name: "Label 7", color: "gray" }
    //     ],
    //     createdAt: new Date(),
    //     updatedAt: new Date(),
    // }

    // A sample markdown description with full markdown support
    const SampleMarkdown = `
## Sample Markdown
### Another subtitle
This is a sample markdown description with full markdown support.

- [ ] Task 1
- [x] Task 2
- [ ] Task 3

**Bold**

[Link](https://www.google.com)

> This is a blockquote

\`Inline code\`

\`\`\`
Code block
\`\`\`

\`\`\`typescript
const sample = "sample";
\`\`\`
`

    // Sample cards data
    const cards: CardOut[] = [
        {
            id: 1,
            title: "Card 1",
            description: SampleMarkdown,
            column: CardColumn.Backlog,
            labels: ["red", "blue", "purple"],
            boardId: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            id: 2,
            title: "Card 2",
            description: SampleMarkdown,
            column: CardColumn.Todo,
            labels: ["blue", "gray", "orange"],
            boardId: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            id: 3,
            title: "Card 3",
            description: SampleMarkdown,
            column: CardColumn.Backlog,
            labels: [],
            boardId: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            id: 4,
            title: "Card 4",
            description: SampleMarkdown,
            column: CardColumn.Doing,
            labels: ["yellow"],
            boardId: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            id: 5,
            title: "Card 5",
            description: SampleMarkdown,
            column: CardColumn.Doing,
            labels: ["purple"],
            boardId: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            id: 6,
            title: "Card 6",
            description: SampleMarkdown,
            column: CardColumn.Done,
            labels: ["orange"],
            boardId: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            id: 7,
            title: "Card 7",
            description: SampleMarkdown,
            column: CardColumn.Done,
            labels: ["orange"],
            boardId: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            id: 8,
            title: "Card 8",
            description: SampleMarkdown,
            column: CardColumn.Backlog,
            labels: ["orange"],
            boardId: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            id: 9,
            title: "Card 9",
            description: SampleMarkdown,
            column: CardColumn.Backlog,
            labels: ["orange"],
            boardId: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            id: 10,
            title: "Card 10",
            description: SampleMarkdown,
            column: CardColumn.Done,
            labels: ["orange"],
            boardId: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
        }

    ]

    const [dialogState, setDialogState] = useState<DialogType>({ type: "add" });

    return (
        <Dialog>
            <div className="h-full w-full flex flex-col">
                <Header board={board} setDialogState={setDialogState} />
                <div className="h-full bg-background">
                <RezizableBoard cards={cards} setDialogState={setDialogState} />
            </div>
                <DialogContentRender dialogState={dialogState} />
            </div>
        </Dialog>
    )
}
