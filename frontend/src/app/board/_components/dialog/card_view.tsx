import { useEffect, useState, Dispatch, SetStateAction } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import MarkdownRenderer from "@/components/markdown";

import { CardOut } from "@/api-client/models/CardOut";
import { CardColumn } from "@/api-client/models/CardColumn";
import { CardInUpdate } from "@/api-client/models/CardInUpdate";
import { LabelColor } from "@/api-client/models/LabelColor";
import { LabelOut } from "@/api-client/models/LabelOut";
import { CardsApi } from "@/api-client/apis/CardsApi";
import { Data, CardView } from "../interfaces";
import { useToast } from "@/hooks/use-toast";

import {
    Plus,
    Square,
    SquareDashed,
    SquareMinus,
    SquarePen,
    SquareX,
    Trash2Icon,
} from "lucide-react";
import { getConfig } from "@/auth/utils";

const formSchema = z.object({
    title: z.string().min(1, { message: "Title is required" }),
    description: z.string(),
    column: z.string(),
    labels: z.array(z.string()),
});

const Title = ({ form }: { form: any }) => {
    const [isTitleEditable, setIsTitleEditable] = useState(false);

    const handleBlur = (value: string) => {
        form.setValue("title", value);
        setIsTitleEditable(false);
    };

    if (isTitleEditable) {
        return (
            <Input
                className="font-bold"
                {...form.register("title")}
                onBlur={(e) => handleBlur(e.target.value)}
                autoFocus
            />
        );
    }
    return (
        <div className="text-2xl font-bold" onClick={() => setIsTitleEditable(true)}>
            {form.watch("title")}
        </div>
    );
};

const Description = ({ form }: { form: any }) => {
    const [isDescriptionEditable, setIsDescriptionEditable] = useState(false);

    const handleBlur = (value: string) => {
        form.setValue("description", value);
        setIsDescriptionEditable(false);
    };

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
                            {...form.register("description")}
                            onBlur={(e) => handleBlur(e.target.value)}
                            autoFocus
                        />
                    </ScrollArea>
                </div>
            </div>
        );
    }
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
                    <MarkdownRenderer content={form.watch("description")} />
                </ScrollArea>
            </div>
        </div>
    );
};

// Start of Selection
const Labels = ({ form, labels }: { form: any; labels: LabelOut[] }) => {
    const sortedLabels = labels.sort((a, b) => a.color.localeCompare(b.color));

    const handleLabelChange = (value: string, checked: boolean) => {
        const currentLabels: string[] = form.getValues("labels") || [];
        const newLabels = checked
            ? [...currentLabels, value]
            : currentLabels.filter((label) => label !== value);
        form.setValue("labels", newLabels);
    };

    const currentLabels: string[] = form.watch("labels").sort() || [];

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <div className="flex items-center gap-1 p-2">
                    {currentLabels.map((labelColor) => {
                        const label = labels.find((l) => l.color === labelColor);
                        return label ? (
                            <div
                                key={label.color}
                                className="w-5 h-5 rounded-sm"
                                style={{ backgroundColor: label.color }}
                            />
                        ) : null;
                    })}
                    <div className="border rounded-sm flex items-center justify-center">
                        <Plus className="w-5 h-5" />
                    </div>
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <div className="flex flex-col gap-1 p-2">
                    {sortedLabels.map((opt) => (
                        <div key={opt.color} className="flex items-center gap-2">
                            <Checkbox
                                id={opt.color}
                                checked={currentLabels.includes(opt.color)}
                                onCheckedChange={(checked) =>
                                    handleLabelChange(opt.color, checked as boolean)
                                }
                            />
                            <label
                                htmlFor={opt.color}
                                className="flex items-center justify-center gap-2 font-bold text-black text-sm cursor-pointer w-full rounded-full"
                                style={{ backgroundColor: opt.color }}
                            >
                                {opt.name || "-"}
                            </label>
                        </div>
                    ))}
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

const Column = ({ form }: { form: any }) => {
    return (
        <Select
            value={form.watch("column")}
            onValueChange={(value) => form.setValue("column", value)}
        >
            <SelectTrigger className="w-[180px]">
                <SelectValue />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value={CardColumn.Backlog}>
                    <div className="flex items-center gap-2">
                        <SquareDashed className="w-4 h-4" /> Backlog
                    </div>
                </SelectItem>
                <SelectItem value={CardColumn.Todo}>
                    <div className="flex items-center gap-2">
                        <Square className="w-4 h-4" /> Todo
                    </div>
                </SelectItem>
                <SelectItem value={CardColumn.Doing}>
                    <div className="flex items-center gap-2">
                        <SquareMinus className="w-4 h-4" /> Doing
                    </div>
                </SelectItem>
                <SelectItem value={CardColumn.Done}>
                    <div className="flex items-center gap-2">
                        <SquareX className="w-4 h-4" /> Done
                    </div>
                </SelectItem>
            </SelectContent>
        </Select>
    );
};

// const Form = ({ metadata, children }: { metadata: CardView; children: React.ReactNode }) => {
//     const onSubmit = async (values: z.infer<typeof formSchema>) => {
//         console.log(values);
//     };

//     return (
//         <Form {...form} key={metadata.card.id}>
//             <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//                 {children}
//             </form>
//         </Form>
//     );
// };

export const ViewDialog = ({
    metadata,
    setData,
    setOpen,
}: {
    metadata: CardView;
    setData: Dispatch<SetStateAction<Data>>;
    setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
    const { toast } = useToast();
    const cardsApi = new CardsApi(getConfig());

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: metadata.card.title,
            description: metadata.card.description,
            column: metadata.card.column,
            labels: metadata.card.labels,
        },
    });

    useEffect(() => {
        form.reset({
            title: metadata.card.title,
            description: metadata.card.description,
            column: metadata.card.column,
            labels: metadata.card.labels,
        });
    }, [metadata, form]);

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        // with optimistic update

        const patch: CardInUpdate = {
            title: values.title !== metadata.card.title ? values.title : undefined,
            description:
                values.description !== metadata.card.description ? values.description : undefined,
            column:
                values.column !== metadata.card.column ? (values.column as CardColumn) : undefined,
            labels:
                values.labels !== metadata.card.labels
                    ? (values.labels as LabelColor[])
                    : undefined,
        };

        // create a new card with the updated values
        const newCard: CardOut = {
            ...metadata.card,
            title: patch.title ?? metadata.card.title,
            description: patch.description ?? metadata.card.description,
            column: patch.column ?? metadata.card.column,
            labels: patch.labels ?? metadata.card.labels,
        };

        setData((prevData: Data) => ({
            ...prevData,
            cards: prevData.cards.map((card) => (card.id === metadata.card.id ? newCard : card)),
        }));

        // Check if all fields are undefined
        if (Object.values(patch).every((value) => value === undefined)) {
            // Optionally, notify the user that no changes were made
            return;
        }

        try {
            const response = await cardsApi.updateCardCardsCardIdPatch({
                cardId: metadata.card.id,
                cardInUpdate: patch,
            });
            setData((prevData: Data) => ({
                ...prevData,
                cards: prevData.cards.map((card) =>
                    card.id === metadata.card.id ? response : card
                ),
            }));
            toast({
                title: "Card updated",
                description: "Card updated successfully",
            });
        } catch (error) {
            // Handle errors and provide user feedback
            // console.error("Failed to update card:", error);
            toast({
                title: "Card update failed",
                description: "Please try again",
                variant: "destructive",
            });
        }
        setOpen(false);
    };

    const handleDelete = async () => {
        try {
            await cardsApi.deleteCardCardsCardIdDelete({
                cardId: metadata.card.id,
            });

            setData((prevData: Data) => ({
                ...prevData,
                cards: prevData.cards.filter((card) => card.id !== metadata.card.id),
            }));

            toast({
                title: "Card deleted",
                description: "Card was successfully deleted",
            });
            setOpen(false);
        } catch (error) {
            toast({
                title: "Delete failed",
                description: "Failed to delete the card. Please try again.",
                variant: "destructive",
            });
        }
    };

    return (
        <DialogContent>
            <Form {...form} key={metadata.card.id}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <DialogHeader>
                        <DialogTitle>
                            <Title form={form} />
                        </DialogTitle>
                    </DialogHeader>
                    <div className="h-fit md:w-autoflex flex-col gap-2">
                        <div className="flex items-center gap-2">
                            <Labels form={form} labels={metadata.board.labels} />
                            <Column form={form} />
                        </div>
                        <Description form={form} />
                    </div>
                    <DialogFooter>
                        <Button type="submit">Save Changes</Button>
                        <Button type="button" variant="destructive" onClick={handleDelete}>
                            <Trash2Icon className="w-4 h-4" />
                        </Button>
                    </DialogFooter>
                </form>
            </Form>
        </DialogContent>
    );
};
