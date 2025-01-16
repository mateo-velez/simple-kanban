"use client";

import { useState, useCallback } from "react";
import { Board } from "./_components/board";
import { AddBoard } from "./_components/add-board";
import { BoardsDialog } from "./_components/dialog";
import { Spinner } from "@/components/ui/spinner";
import { useAuthClient } from "@/hooks/use-auth-client";
import { BoardsApi, Configuration } from "@/api-client";

export default function HomePage() {
    const fetchBoards = useCallback(async (config: Configuration) => {
        const boardsApi = new BoardsApi(config);
        return await boardsApi.listBoardsApiBoardsGet();
    }, []);

    const { data: boards, setData: setBoards } = useAuthClient(fetchBoards);

    const [open, setOpen] = useState(false);

    if (boards === null)
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
