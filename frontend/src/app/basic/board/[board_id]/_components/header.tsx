import { SidebarTrigger } from "@/components/ui/sidebar"
import { BoardOut } from "@/api-client/models/BoardOut"
import { DialogType } from "./dialogs/dialog";
import { DialogTrigger } from "@/components/ui/dialog";


export const Header = ({ board, setDialogState }: { board: BoardOut, setDialogState: (dialogType: DialogType) => void }) => {
    return (
        <div className="flex-1 flex border-b pb-1">
            <SidebarTrigger />
            <div className="flex-1 flex justify-end">
                {/* show board title on the right */}
                <DialogTrigger asChild>
                    <div className="flex flex-col justify-center hover:bg-card-foreground/10 rounded-md pl-1 pr-1">
                        <h1 className="text-xl font-bold text-card-foreground hover:cursor-pointer" onClick={() => {
                            setDialogState({ type: "view_board", board: board });
                        }}>{board.title}</h1>
                    </div>
                </DialogTrigger>
            </div>
        </div>
    )
}