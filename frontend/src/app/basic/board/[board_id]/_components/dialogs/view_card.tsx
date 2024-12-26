import { CardOut } from "@/api-client/models/CardOut";
import MarkdownRenderer from "@/components/markdown";
import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Plus, Square, SquareDashed, SquareMinus, SquarePen, SquareX } from "lucide-react";
import { SelectTrigger, SelectContent, SelectItem, SelectValue, Select } from "@/components/ui/select";
import { CardColumn } from "@/api-client/models/CardColumn";
import { Checkbox } from "@/components/ui/checkbox";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent } from "@/components/ui/dropdown-menu";


const Title = ({ card }: { card: CardOut }) => {
    const [isTitleEditable, setIsTitleEditable] = useState(false);

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value);
    }

    if (isTitleEditable) {
        return (
            <Input
                defaultValue={card.title}
                onChange={handleOnChange}
                onBlur={() => setIsTitleEditable(false)}
                autoFocus
            />
        )
    }
    else {
        return (
            <h2 className="text-2xl font-bold" onClick={() => setIsTitleEditable(true)}>{card.title}</h2>
        )
    }
}

const Description = ({ card }: { card: CardOut }) => {
    const [isDescriptionEditable, setIsDescriptionEditable] = useState(false);

    const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        console.log(e.target.value);
    }


    if (isDescriptionEditable) {
        return (
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                    <SquarePen className="w-4 h-4" />
                    <span className="font-bold">Description</span>
                </div>
                <div className="flex flex-col gap-2">
                    <ScrollArea className="h-full">
                        <Textarea
                            className="h-96"
                            defaultValue={card.description}
                            onChange={handleOnChange}
                            onBlur={() => setIsDescriptionEditable(false)}
                            autoFocus
                        />
                    </ScrollArea>
                </div>
            </div>
        )
    }
    else {
        return (
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                    <SquarePen className="w-4 h-4" />
                    <span className="font-bold">Description</span>
                </div>
                <div
                    onClick={() => setIsDescriptionEditable(true)}
                    className="flex flex-col gap-2 border rounded-md p-2"
                >

                    <ScrollArea className="h-96">
                        <MarkdownRenderer content={card.description} />
                    </ScrollArea>
                </div>
            </div>
        )
    }
}

const Labels = ({ card }: { card: CardOut }) => {
    const labelOptions = [
        { value: "red", label: "Red" },
        { value: "orange", label: "Orange" },
        { value: "green", label: "Green" },
        { value: "blue", label: "Blue" },
        { value: "gray", label: "Gray" },
        { value: "purple", label: "Purple" },
        { value: "yellow", label: "Yellow" }
    ];

    return (
        <DropdownMenu >
            <DropdownMenuTrigger>
                <div className="flex items-center gap-1 p-2">
                    {card.labels.map((label) => (
                        <div key={label} className="w-5 h-5 rounded-sm" style={{ backgroundColor: label }} />
                    ))}
                    <div className="border rounded-sm flex items-center justify-center">
                        <Plus className="w-5 h-5" />
                    </div>
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <div className="flex flex-col gap-1 p-2">
                    {labelOptions.map((opt) => (
                        <div key={opt.value} className="flex items-center gap-2">
                            <Checkbox
                                id={opt.value}
                                defaultChecked={card.labels.includes(opt.value as any)}
                            />
                            <label
                                htmlFor={opt.value}
                                className="flex items-center justify-center font-bold text-black text-sm cursor-pointer w-full rounded-full"
                                style={{ backgroundColor: opt.value }}
                            >
                                {opt.label}
                            </label>
                        </div>
                    ))}
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

                const Column = ({card}: {card: CardOut }) => {
    const [isColumnEditable, setIsColumnEditable] = useState(false);
                const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
                    console.log(e.target.value);
    }

                    return (
                    <Select
                        defaultValue={card.column}
                    >
                        <SelectTrigger className="w-[180px]">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value={CardColumn.Backlog}><div className="flex items-center gap-2"><SquareDashed className="w-4 h-4" /> Backlog</div></SelectItem>
                            <SelectItem value={CardColumn.Todo}><div className="flex items-center gap-2"><Square className="w-4 h-4" /> Todo</div></SelectItem>
                            <SelectItem value={CardColumn.Doing}><div className="flex items-center gap-2"><SquareMinus className="w-4 h-4" /> Doing</div></SelectItem>
                            <SelectItem value={CardColumn.Done}><div className="flex items-center gap-2"><SquareX className="w-4 h-4" /> Done</div></SelectItem>
                        </SelectContent>
                    </Select>
                    )
}

                    export const ViewDialog = ({card}: {card: CardOut }) => {
    return (
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle><Title card={card} /></DialogTitle>
                        </DialogHeader>
                        <div className="h-fit md:w-autoflex flex-col gap-2">
                            {/* labels and column */}
                            <div className="flex items-center gap-2">
                                <Labels card={card} />
                                <Column card={card} />
                            </div>
                            <Description card={card} />
                        </div>
                    </DialogContent>
                    )
}