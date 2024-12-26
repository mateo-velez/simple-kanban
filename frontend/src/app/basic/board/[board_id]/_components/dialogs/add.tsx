import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { CardColumn } from "@/api-client/models/CardColumn"
import { CardOut } from "@/api-client/models/CardOut"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useState } from "react"

export const AddCardForm = () => {
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
        console.log(values);
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

