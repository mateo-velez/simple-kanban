"use client";

import { BoardOut } from "@/api-client/models/BoardOut";
import { Board } from "./_components/board";
import { AddBoard } from "./_components/add-board";
import { BoardsDialog } from "./_components/dialog";
import { useEffect } from "react";
import { useState } from "react";
import { BoardsApi } from "@/api-client/apis/BoardsApi";
import { clearToken, getConfig, getToken } from "@/auth/utils";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";
import { ResponseError } from "@/api-client/runtime";
import { useToast } from "@/hooks/use-toast";
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
            },
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
            },
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
            },
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
    },
];

export default function HomePage() {
    const [boards, setBoards] = useState<BoardOut[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    const { toast } = useToast();
    const [open, setOpen] = useState(false);

    // check if token is valid and fetch boards, redirect to login if no token
    useEffect(() => {
        const token = getToken();
        if (!token) {
            router.push("/login");
            return;
        }
        const fetchBoards = async () => {
            try {
                const boardsApi = new BoardsApi(getConfig());
                const data = await boardsApi.listBoardsBoardsGet();
                setBoards(data);
            } catch (error) {
                if (error instanceof ResponseError && error.response.status === 401) {
                    clearToken();
                    router.push("/login");
                } else {
                    toast({
                        title: "An error occurred while fetching boards",
                        variant: "destructive",
                    });
                }
            }
        };
        fetchBoards();
        setIsLoading(false);
    }, []);

    if (isLoading)
        return (
            <div className="h-full w-full flex items-center justify-center">
                <Spinner />
            </div>
        );

    return (
        <BoardsDialog open={open} setOpen={setOpen} setBoards={setBoards}>
            <div className="h-full w-full p-4">
                <div className="flex flex-wrap gap-4">
                    <AddBoard />
                    {boards.map((board) => (
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
