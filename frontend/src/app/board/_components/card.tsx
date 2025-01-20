import { CardOut } from "@/api-client/models/CardOut";
import { DialogTrigger } from "@/components/ui/dialog";
import { GripVerticalIcon, PlusIcon } from "lucide-react";
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
    N = 30,
}: {
    card: CardOut;
    board: BoardOut;
    setMetadata: Dispatch<SetStateAction<Metadata>>;
    className?: string;
    N?: number;
}) {
    const classNames = cn(
        "flex flex-col gap-1 p-1.5 rounded-lg border bg-background hover:bg-accent transition-colors duration-200 cursor-pointer",
        className
    );
    return (
        <DialogTrigger>
            <div
                onClick={() => {
                    setMetadata({ type: "card_view", card: card, board: board });
                }}
                className={classNames}
            >
                <div className="h-2 flex gap-2 -mb-0.5">
                    {card.labels.map((color) => (
                        <div
                            key={color}
                            className={`w-4 h-2 rounded-full`}
                            style={{ backgroundColor: color }}
                        />
                    ))}
                </div>
                {/* limit card tittle to N characters ending with ... */}
                <h3 className="font-normal text-sm text-foreground">
                    {card.title.length > N ? card.title.slice(0, N) + "..." : card.title}
                </h3>
            </div>
        </DialogTrigger>
    );
}
