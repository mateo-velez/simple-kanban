"use client";

import { BoardOut } from "@/api-client/models/BoardOut";
import { CardColumn } from "@/api-client/models/CardColumn";
import { CardOut } from "@/api-client/models/CardOut";
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable"
import { ScrollArea } from "@/components/ui/scroll-area-fixed"
import { PlusIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";



// define alt strings for dialog content
// const [selectedString, setSelectedString] = useState("View card");



export default function BoardPage() {

    const { board_id } = useParams();
    // Sample board data
    const board: BoardOut = {
        id: 1,
        title: "My First Board",
        description: "This is my first board",
        labels: [
            { name: "Label 1", color: "red" },
            { name: "Label 2", color: "blue" },
            { name: "Label 3", color: "green" },
            { name: "Label 4", color: "yellow" },
            { name: "Label 5", color: "purple" },
            { name: "Label 6", color: "orange" },
            { name: "Label 7", color: "gray" }
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
    }

    // Sample cards data
    const cards: CardOut[] = [
        {
            id: 1,
            title: "Card 1",
            description: "This is my first card",
            column: CardColumn.Backlog,
            labels: ["red", "blue", "purple"],
            boardId: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            id: 2,
            title: "Card 2",
            description: "This is my second card",
            column: CardColumn.Todo,
            labels: ["blue", "gray", "orange"],
            boardId: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            id: 3,
            title: "Card 3",
            description: "This is my third card",
            column: CardColumn.Backlog,
            labels: ["green"],
            boardId: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            id: 4,
            title: "Card 4",
            description: "This is my fourth card",
            column: CardColumn.Doing,
            labels: ["yellow"],
            boardId: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            id: 5,
            title: "Card 5",
            description: "This is my fifth card",
            column: CardColumn.Doing,
            labels: ["purple"],
            boardId: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            id: 6,
            title: "Card 6",
            description: "This is my sixth card",
            column: CardColumn.Done,
            labels: ["orange"],
            boardId: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            id: 7,
            title: "Card 7",
            description: "This is my seventh card",
            column: CardColumn.Done,
            labels: ["orange"],
            boardId: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            id: 8,
            title: "Card 8",
            description: "This is my eighth card",
            column: CardColumn.Backlog,
            labels: ["orange"],
            boardId: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            id: 9,
            title: "Card 9",
            description: "This is my ninth card",
            column: CardColumn.Backlog,
            labels: ["orange"],
            boardId: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            id: 10,
            title: "Card 10",
            description: "This is my tenth card",
            column: CardColumn.Done,
            labels: ["orange"],
            boardId: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
        },

    ]

    interface DialogType {
        type: "add" | "view";
        extra?: any;
    }

    const [dialogType, setDialogType] = useState<DialogType>({ type: "add" });

    const DialogContentRender = ({ dialogType }: { dialogType: DialogType }) => {
        if (dialogType.type === "add") {
        return (
            <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add card</DialogTitle>
                        <DialogDescription>Add a new card to the board</DialogDescription>
                    </DialogHeader>
            </DialogContent>
            )
        } else if (dialogType.type === "view") {
            return (
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>View card</DialogTitle>
                        <DialogDescription>View card details</DialogDescription>
                    </DialogHeader>
                </DialogContent>
            )
        }
    }

    const AddCardComponent = () => {
        return (
            <DialogTrigger asChild>
                <div
                    onClick={() => setDialogType({ type: "add" })}
                    className="p-4 rounded-lg border bg-background items-center justify-center flex hover:bg-accent transition-colors duration-200 cursor-pointer">
                    {/* add big plus icon */}
                    <PlusIcon className="w-8 h-8 text-foreground" />
                </div>
            </DialogTrigger>
        )
    }

    const CardComponent = ({ card }: { card: CardOut }) => {
        return (
            <DialogTrigger asChild>
                <div onClick={() => setDialogType({ type: "view", extra: card })} className="flex flex-col gap-1.5 p-4 rounded-lg border bg-background hover:bg-accent transition-colors duration-200 cursor-pointer">
                    <div className="flex gap-2">
                        {card.labels.map((label) => (
                            <div key={label} className={`w-4 h-2 rounded-full`} style={{ backgroundColor: label }} />
                        ))}
                    </div>
                    <h3 className="font-normal text-lg text-foreground">{card.title}</h3>
                </div>
            </DialogTrigger>
        )
    }

    const DoColumnComponent = ({ title, cards }: { title: string, cards: CardOut[] }) => {
        return (
            <div className="w-full h-fit max-h-full flex flex-col gap-2 bg-card rounded-lg border">
                <div className="p-4 border-b flex-none">
                    <h2 className="text-xl font-semibold text-card-foreground">{title}</h2>
                </div>
                <ScrollArea className="max-h-full flex p-2">
                    <div className="flex flex-col gap-2">
                        {cards.map((card) => (
                            <CardComponent key={card.id} card={card} />
                        ))}
                    </div>
                </ScrollArea>
            </div>
        )
    }

    const DoColumnsComponent = () => {
        return (
            <div className="h-full flex gap-4 p-4">
                <DoColumnComponent title="Todo" cards={cards.filter((card) => card.column === CardColumn.Todo)} />
                <DoColumnComponent title="Doing" cards={cards.filter((card) => card.column === CardColumn.Doing)} />
                <DoColumnComponent title="Done" cards={cards.filter((card) => card.column === CardColumn.Done)} />
            </div>
        )
    }

    const Backlog = () => {
        return (
            <div className="h-full flex flex-col rounded-lg border bg-card m-4">
                <div className="p-4 border-b">
                    <h2 className="text-xl font-semibold text-card-foreground text-center">Backlog</h2>
                </div>
                <ScrollArea className="h-fit max-h-full ">
                    <div className="grid grid-cols-3 gap-4 p-4">
                        <AddCardComponent />
                        {cards.filter(card => card.column === CardColumn.Backlog).map((card) => (
                            <CardComponent key={card.id} card={card} />
                        ))}
                        {cards.filter(card => card.column === CardColumn.Backlog).map((card) => (
                            <CardComponent key={card.id} card={card} />
                        ))}
                        {cards.filter(card => card.column === CardColumn.Backlog).map((card) => (
                            <CardComponent key={card.id} card={card} />
                        ))}
                        {cards.filter(card => card.column === CardColumn.Backlog).map((card) => (
                            <CardComponent key={card.id} card={card} />
                        ))}
                        {cards.filter(card => card.column === CardColumn.Backlog).map((card) => (
                            <CardComponent key={card.id} card={card} />
                        ))}
                    </div>
                </ScrollArea>
            </div>
        )
    }

    const RezizableDivComponent = () => {
        return (
            <ResizablePanelGroup
                direction="vertical"
                className="h-full rounded-lg"
            >
                <ResizablePanel defaultSize={70} minSize={30} className="h-full">
                    <DoColumnsComponent />
                </ResizablePanel>

                <ResizableHandle withHandle />

                <ResizablePanel className="h-full">
                    <Backlog />
                </ResizablePanel>
            </ResizablePanelGroup>
        )
    }

    return (
        <Dialog>
            <div className="h-full bg-background">
                <RezizableDivComponent />
            </div>
            <DialogContentRender dialogType={dialogType} />
        </Dialog>
    )
}
