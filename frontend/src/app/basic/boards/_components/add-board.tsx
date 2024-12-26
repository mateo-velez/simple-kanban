import { DialogTrigger } from "@/components/ui/dialog";
import { PlusIcon } from "lucide-react";

export function AddBoard() {
    return (
        <DialogTrigger>
            <div className="w-52 h-32 rounded-md border p-4 flex flex-col items-center justify-center hover:bg-accent transition-colors duration-200 cursor-pointer">
                <PlusIcon className="w-4 h-4" />
            </div>
        </DialogTrigger>
    );
} 