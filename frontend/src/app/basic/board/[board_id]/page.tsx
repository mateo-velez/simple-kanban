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
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import { DisplayCard, AddCard } from "./_components/card";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormLabel, FormControl, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogType } from "./_components/base";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { RezizableBoard } from "./_components/board";

export default function BoardPage({ params }: { params: { board_id: string } }) {

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
        }

    ]

    const [dialogState, setDialogType] = useState<DialogType>({ type: "add" });

    const AddCardForm = () => {
        const formSchema = z.object({
            title: z.string().min(1, { message: "Title is required" }),
        });

        const form = useForm<z.infer<typeof formSchema>>({
            resolver: zodResolver(formSchema),
            defaultValues: {
                title: "",
            },
        });

        const onSubmit = (values: z.infer<typeof formSchema>) => {
            // append to cards on the first index
            cards.unshift({
                id: cards.length + 1,
                title: values.title,
                description: "",
                column: CardColumn.Backlog,
                labels: [],
                boardId: 1,
                createdAt: new Date(),
                updatedAt: new Date(),
            });
            // close the dialog

        }

        return (
            <DialogContent className="sm:max-w-[425px]">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <DialogHeader>
                            <DialogTitle>Add New Card</DialogTitle>
                            <DialogDescription>
                                Create a new card by entering a title below.
                            </DialogDescription>
                        </DialogHeader>

                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Card Title</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter card title..."
                                            {...field}
                                            className="w-full"
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <DialogFooter>
                            <Button type="submit">Create Card</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        )
    }

    const ViewCardForm = ({ card }: { card: CardOut }) => {
        const formSchema = z.object({
            title: z.string().min(1, { message: "Title is required" }),
            description: z.string(),
            column: z.nativeEnum(CardColumn),
            labels: z.array(z.string())
        });

        const form = useForm<z.infer<typeof formSchema>>({
            resolver: zodResolver(formSchema),
            defaultValues: {
                title: card.title,
                description: card.description ?? "",
                column: card.column,
                labels: card.labels
            },
        });

        const onSubmit = (values: z.infer<typeof formSchema>) => {
            console.log(values);
        }


        const [title_editable, setTitleEditable] = useState(false);

        return (
            <DialogContent className="sm:max-w-[425px]">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <DialogHeader>
                            <DialogTitle>View/Edit Card</DialogTitle>
                            <DialogDescription>
                                View or make changes to this card.
                            </DialogDescription>
                        </DialogHeader>

                        {title_editable ? (
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                onBlur={() => setTitleEditable(false)}
                                                onKeyDown={() => setTitleEditable(false)}
                                                className="w-full"
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        ) : (
                            <h2 className="text-xl font-semibold text-card-foreground" onClick={() => setTitleEditable(true)}>{card.title}</h2>
                        )}

                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            className="w-full"
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="column"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Status</FormLabel>
                                    <FormControl>
                                        <select {...field} className="w-full p-2 border rounded">
                                            <option value={CardColumn.Backlog}>Backlog</option>
                                            <option value={CardColumn.Todo}>Todo</option>
                                            <option value={CardColumn.Doing}>Doing</option>
                                            <option value={CardColumn.Done}>Done</option>
                                        </select>
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <DialogFooter>
                            <Button type="submit">Save Changes</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        )
    }

    const DialogContentRender = ({ dialogState }: { dialogState: DialogType }) => {
        if (dialogState.type === "add") {
            return (
                <AddCardForm />
            )
        } else if (dialogState.type === "view") {
            const defaultCard: CardOut = {
                id: 0,
                title: "",
                description: "",
                column: CardColumn.Backlog,
                labels: [],
                boardId: 0,
                createdAt: new Date(),
                updatedAt: new Date(),
            }
            return (
                <ViewCardForm card={dialogState.card ?? defaultCard} />
            )
        }
    }


    return (
        <div className="h-full w-full flex flex-col">
            <div className="flex-1 flex border-b pb-1">
                <SidebarTrigger />
                <div className="flex-1 flex justify-end">
                    {/* show board title on the right */}
                    <div className="flex flex-col justify-center hover:bg-card-foreground/10 rounded-md pl-1 pr-1">
                    <h1 className="text-xl font-bold text-card-foreground hover:cursor-pointer">{board.title}</h1>
                    </div>
                </div>
            </div>
            <div className="h-full bg-background">
                <RezizableBoard cards={cards} setDialogType={setDialogType} />
            </div>
            <DialogContentRender dialogState={dialogState} />
        </div>
    )
}
