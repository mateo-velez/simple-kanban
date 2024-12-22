import { BoardOut } from "@/api-client/models/BoardOut";
import { LabelOut } from "@/api-client/models/LabelOut";
import { PlusIcon } from "lucide-react";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"




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

const Label = ({ label }: { label: LabelOut }) => {
    return <div className="bg-gray-600 rounded-md p-2">{label.name}</div>;
}

const AddBoard = () => {
    return (
        <DialogTrigger>
            <div
                className="w-52 h-32 rounded-md border p-4 flex flex-col
    items-center justify-center hover:bg-accent transition-colors duration-200 cursor-pointer">
                <PlusIcon className="w-4 h-4" />
            </div>
        </DialogTrigger>
    );
}

// Element to display the board
const Board = ({ board }: { board: BoardOut, className?: string }) => {
    return (
        <div className="w-52 h-32 rounded-md border p-4 hover:bg-accent transition-colors duration-200 cursor-pointer">
            <span className="text-sm text-muted-foreground">{board.title}</span>
        </div>
    )
}

export default function HomePage() {
    // Make it compact
    return <Dialog className="w-full h-full">
        <div className="h-full w-full p-4">
            <div className="flex flex-wrap gap-4">
                <AddBoard />
                {boardResponses.map((board) => <Board key={board.id} board={board} className="border border-gray-300 rounded-md p-4" />)}
                {boardResponses.map((board) => <Board key={board.id} board={board} className="border border-gray-300 rounded-md p-4" />)}
                {boardResponses.map((board) => <Board key={board.id} board={board} className="border border-gray-300 rounded-md p-4" />)}
            </div>
        </div>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Create new board</DialogTitle>
                <DialogDescription>
                    This action will create a new board.
                </DialogDescription>
            </DialogHeader>
        </DialogContent>
    </Dialog>;
}
