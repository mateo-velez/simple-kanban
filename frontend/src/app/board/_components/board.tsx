"use client";

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area-fixed";
import { DisplayCard, AddCard } from "./card";
import { CardColumn } from "@/api-client/models/CardColumn";
import { Data, Metadata } from "./interfaces";
import { Dispatch } from "react";
import { SetStateAction } from "react";

// Take in cards as children
const Column = ({ title, children }: { title: string; children: React.ReactNode }) => {
    return (
        <div className="w-full h-fit max-h-full flex flex-col gap-2 bg-card rounded-lg border shadow-md">
            <div className="p-2 border-b flex justify-center bg-card-foreground rounded-t-lg -mb-1">
                <h2 className="text-lg font-semibold text-card">{title}</h2>
            </div>
            <ScrollArea className="max-h-full flex p-2">
                <div className="flex flex-col gap-2">{children}</div>
            </ScrollArea>
        </div>
    );
};

// Take in cards as children
const Backlog = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="h-full flex flex-col rounded-lg border bg-card m-4">
            <div className="p-2 border-b bg-card-foreground rounded-t-lg">
                <h2 className="text-lg font-semibold text-card text-center">BACKLOG</h2>
            </div>
            <ScrollArea className="h-fit max-h-full ">
                <div className="grid grid-cols-3 gap-4 p-4">{children}</div>
            </ScrollArea>
        </div>
    );
};

export const RezizableBoard = ({
    data,
    setMetadata,
}: {
    data: Data;
    setMetadata: Dispatch<SetStateAction<Metadata>>;
}) => {
    return (
        <ResizablePanelGroup direction="vertical" className="h-full rounded-lg">
            <ResizablePanel defaultSize={70} minSize={30} className="h-full flex gap-4 p-4">
                {[CardColumn.Todo, CardColumn.Doing, CardColumn.Done].map((columnValue) => (
                    <Column key={columnValue} title={columnValue}>
                        {data.cards
                            .filter((card) => card.column === columnValue)
                            .map((card) => (
                                <DisplayCard
                                    key={card.id}
                                    card={card}
                                    board={data.board}
                                    setMetadata={setMetadata}
                                    className="border-2 border-card-foreground/25"
                                    N={120}
                                />
                            ))}
                    </Column>
                ))}
            </ResizablePanel>

            <ResizableHandle withHandle />

            <ResizablePanel className="h-full">
                <Backlog>
                    <AddCard
                        boardId={data.board.id}
                        setMetadata={setMetadata}
                        className="border-2 border-card-foreground/25 h-full min-h-16"
                    />
                    {data.cards
                        .filter((card) => card.column === CardColumn.Backlog)
                        .map((card) => (
                            <DisplayCard
                                key={card.id}
                                card={card}
                                board={data.board}
                                setMetadata={setMetadata}
                                className="border-2 border-card-foreground/25 h-full min-h-16"
                                N={70}
                            />
                        ))}
                </Backlog>
            </ResizablePanel>
        </ResizablePanelGroup>
    );
};
