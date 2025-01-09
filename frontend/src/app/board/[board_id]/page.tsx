"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";

import { BoardsApi } from "@/api-client/apis/BoardsApi";
import { getConfig } from "@/auth/utils";

import { DialogRoot } from "./_components/dialog/dialog";
import { Header } from "./_components/header";
import { RezizableBoard } from "./_components/board";
import { Spinner } from "@/components/ui/spinner";
import { Data, Metadata } from "./_components/interfaces";

import { useToast } from "@/hooks/use-toast";
export default function BoardPage() {
    const boardApi = new BoardsApi(getConfig());
    const params = useParams<{ board_id: string }>();
    const boardId = parseInt(params.board_id);
    const router = useRouter();
    const { toast } = useToast();
    const [data, setData] = useState<Data>({
        board: {
            id: 0,
            title: "",
            labels: [],
            description: "",
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        cards: [],
    });
    const [open, setOpen] = useState(false);
    const [metadata, setMetadata] = useState<Metadata>({ type: "default" });

    async function fetchData(boardId: number, boardApi: BoardsApi) {
        try {
            const [board, cards] = await Promise.all([
                boardApi.getBoardBoardsBoardIdGet({ boardId: boardId }),
                boardApi.listCardsBoardsBoardIdCardsGet({ boardId: boardId }),
            ]);
            setData({ board, cards });
        } catch (error) {
            router.push("/");
            toast({
                title: "Board not found",
                description: "The board you are trying to access does not exist.",
                variant: "destructive",
            });
        }
    }

    useEffect(() => {
        fetchData(boardId, boardApi);
    }, []);

    if (!data)
        return (
            <div className="h-full w-full flex items-center justify-center">
                <Spinner />
            </div>
        );

    return (
        <DialogRoot open={open} setOpen={setOpen} metadata={metadata} setData={setData}>
            <div className="h-full w-full flex flex-col">
                <Header board={data.board} setMetadata={setMetadata} setOpen={setOpen} />
                <div className="h-full bg-background">
                    <RezizableBoard data={data} setMetadata={setMetadata} />
                </div>
            </div>
        </DialogRoot>
    );
}
