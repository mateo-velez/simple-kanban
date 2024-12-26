"use client"

import { BoardOut } from "@/api-client/models/BoardOut";
import { Board } from "./_components/board";
import { AddBoard } from "./_components/add-board";
import { BoardsDialog } from "./_components/dialog";

// Simulated board response from getBoards from api-client/models/BoardOut.ts
const boardResponses: BoardOut[] = [
    {
        id: 1,
        title: "My First Board",
        description: "This is my first board",
        labels: [
            {
                name: "Label 1",
                color: "red",
            },
            {
                name: "Label 2",
                color: "blue",
            },
            {
                name: "Label 3",
                color: "green",
            },
            {
                name: "Label 4",
                color: "yellow",
            },
            {
                name: "Label 5",
                color: "purple",
            },
            {
                name: "Label 6",
                color: "orange",
            },
            {
                name: "Label 7",
                color: "gray",
            }
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: 2,
        title: "My Second Board",
        description: "This is my second board",
        labels: [
            {
                name: "Label 1",
                color: "red",
            },
            {
                name: "Label 2",
                color: "blue",
            },
            {
                name: "Label 3",
                color: "green",
            },
            {
                name: "Label 4",
                color: "yellow",
            },
            {
                name: "Label 5",
                color: "purple",
            },
            {
                name: "Label 6",
                color: "orange",
            },
            {
                name: "Label 7",
                color: "gray",
            }
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: 3,
        title: "My Third Board",
        description: "This is my third board",
        labels: [
            {
                name: "Label 1",
                color: "red",
            },
            {
                name: "Label 2",
                color: "blue",
            },
            {
                name: "Label 3",
                color: "green",
            },
            {
                name: "Label 4",
                color: "yellow",
            },
            {
                name: "Label 5",
                color: "purple",
            },
            {
                name: "Label 6",
                color: "orange",
            },
            {
                name: "Label 7",
                color: "gray",
            }
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
    },
]

export default function HomePage() {
    return (
        <BoardsDialog>
            <div className="h-full w-full p-4">
                <div className="flex flex-wrap gap-4">
                    <AddBoard />
                    {boardResponses.map((board) => (
                        <Board 
                            key={board.id} 
                            board={board} 
                            className="border border-gray-300 rounded-md p-4" 
                        />
                    ))}
                </div>
            </div>
        </BoardsDialog>
    );
}
