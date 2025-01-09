"use client";

import { BoardsApi } from "@/api-client/apis/BoardsApi";
import { BoardOut } from "@/api-client/models/BoardOut";
import { getConfig } from "@/auth/utils";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const AddBoardContent = ({
    setOpen,
    setBoards,
}: {
    setOpen: (open: boolean) => void;
    setBoards: React.Dispatch<React.SetStateAction<BoardOut[]>>;
}) => {
    const boardApi = new BoardsApi(getConfig());

    const formSchema = z.object({
        title: z.string().min(1, { message: "Title is required" }),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const response = await boardApi.createBoardBoardsPost({
                boardInCreate: {
                    title: values.title,
                },
            });
            setBoards((prevBoards) => [...prevBoards, response]);
        } catch (error) {
            console.error("Error creating board:", error);
        }
        setOpen(false);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <DialogHeader>
                    <DialogTitle>Create new board</DialogTitle>
                    <DialogDescription>This action will create a new board.</DialogDescription>
                </DialogHeader>

                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Board Title</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Enter board title..."
                                    {...field}
                                    className="w-full"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <DialogFooter>
                    <Button type="submit">Create Board</Button>
                </DialogFooter>
            </form>
        </Form>
    );
};

export const BoardsDialog = ({
    children,
    open,
    setOpen,
    setBoards,
}: {
    children: React.ReactNode;
    open: boolean;
    setOpen: (open: boolean) => void;
    setBoards: React.Dispatch<React.SetStateAction<BoardOut[]>>;
}) => {
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            {children}
            <DialogContent>
                <AddBoardContent setOpen={setOpen} setBoards={setBoards} />
            </DialogContent>
        </Dialog>
    );
};
