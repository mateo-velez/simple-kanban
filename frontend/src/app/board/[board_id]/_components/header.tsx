import { SidebarTrigger } from "@/components/ui/sidebar";
import { Metadata } from "./interfaces";
import { BoardOut } from "@/api-client/models/BoardOut";
import { Dispatch, SetStateAction } from "react";

export const Header = ({
    board,
    setMetadata,
    setOpen,
}: {
    board: BoardOut;
    setMetadata: Dispatch<SetStateAction<Metadata>>;
    setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
    return (
        <div className="flex-1 flex border-b pb-1">
            <SidebarTrigger />
            <div className="flex-1 flex justify-end">
                <div className="flex flex-col justify-center hover:bg-card-foreground/10 rounded-md pl-1 pr-1">
                    <h1
                        className="text-xl font-bold text-card-foreground hover:cursor-pointer"
                        onClick={() => {
                            setMetadata({ type: "board_view", board: board });
                            setOpen(true);
                        }}
                    >
                        {board.title}
                    </h1>
                </div>
            </div>
        </div>
    );
};
