import { BoardOut } from "@/api-client/models/BoardOut";



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

// Element to display the board
const Board = ({ board, className }: { board: BoardOut, className?: string }) => {
    return <div className={className}>
        <h1>{board.title}</h1>
        <p>{board.description}</p>
        <div>
            {board.labels.map((label) => <Label key={label.name} label={label} />)}
        </div>
        {/* Show update and created at */}
        <p>Updated at: {board.updatedAt.toLocaleDateString()}</p>
        <p>Created at: {board.createdAt.toLocaleDateString()}</p>
    </div>;
}

export default function HomePage() {
    return <div className="flex flex-wrap gap-4">
        {boardResponses.map((board) => <Board key={board.id} board={board} className="border border-gray-300 rounded-md p-4" />)}
    </div>;
}
