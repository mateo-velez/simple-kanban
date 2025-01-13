import { CardOut } from "@/api-client/models/CardOut";
import { DialogTrigger } from "@/components/ui/dialog";
import { PlusIcon } from "lucide-react";
import { Metadata } from "./interfaces";
import { cn } from "@/lib/utils";
import { BoardOut } from "@/api-client/models/BoardOut";
import { Dispatch } from "react";
import { SetStateAction } from "react";

export function AddCard({
    boardId,
    setMetadata,
    className,
}: {
    boardId: number;
    setMetadata: Dispatch<SetStateAction<Metadata>>;
    className?: string;
}) {
    const classNames = cn(
        "p-4 rounded-lg border bg-background items-center justify-center flex hover:bg-accent transition-colors duration-200 cursor-pointer",
        className
    );
    return (
        <DialogTrigger>
            <div
                onClick={() => {
                    setMetadata({ type: "card_add", boardId: boardId });
                }}
                className={classNames}
            >
                <PlusIcon className="w-8 h-8 text-foreground" />
            </div>
        </DialogTrigger>
    );
}

export function DisplayCard({
    card,
    board,
    setMetadata,
    className,
}: {
    card: CardOut;
    board: BoardOut;
    setMetadata: Dispatch<SetStateAction<Metadata>>;
    className?: string;
}) {
    const classNames = cn(
        "flex flex-col gap-1.5 p-4 rounded-lg border bg-background hover:bg-accent transition-colors duration-200 cursor-pointer",
        className
    );
    return (
        <DialogTrigger>
            <div
                onClick={() => {
                    setMetadata({ type: "card_view", card: card, board: board });
                }}
                className={classNames}
                draggable
            >
                <div className="flex gap-2">
                    {card.labels.map((color) => (
                        <div
                            key={color}
                            className={`w-4 h-2 rounded-full`}
                            style={{ backgroundColor: color }}
                        />
                    ))}
                </div>
                <h3 className="font-normal text-lg text-foreground">{card.title}</h3>
            </div>
        </DialogTrigger>
    );
}
