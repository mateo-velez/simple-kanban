import { CardOut } from "@/api-client/models/CardOut"
import { DialogTrigger } from "@/components/ui/dialog"
import { PlusIcon } from "lucide-react"
import { DialogType } from "./base"

export function AddCard({ setDialogType }: { setDialogType: (dialogState: DialogType) => void }) {
    return (
        <DialogTrigger asChild>
            <div
                onClick={() => setDialogType({ type: "add" })}
                className="p-4 rounded-lg border bg-background items-center justify-center flex hover:bg-accent transition-colors duration-200 cursor-pointer">
                {/* add big plus icon */}
                <PlusIcon className="w-8 h-8 text-foreground" />
            </div>
        </DialogTrigger>
    );
}

export function DisplayCard({ card, setDialogType }: { card: CardOut; setDialogType: (dialogState: DialogType) => void }) {
    return (
        <DialogTrigger asChild>
            <div onClick={() => setDialogType({ type: "view", card: card })} className="flex flex-col gap-1.5 p-4 rounded-lg border bg-background hover:bg-accent transition-colors duration-200 cursor-pointer">
                <div className="flex gap-2">
                    {card.labels.map((label) => (
                        <div key={label} className={`w-4 h-2 rounded-full`} style={{ backgroundColor: label }} />
                    ))}
                </div>
                <h3 className="font-normal text-lg text-foreground">{card.title}</h3>
            </div>
        </DialogTrigger>
    );
}