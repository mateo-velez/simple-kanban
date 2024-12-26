import { CardOut } from "@/api-client/models/CardOut"
import { AddCardForm } from "./add"
import { ViewDialog } from "./view_card"
import { ViewBoardDialog } from "./view_board";
import { BoardOut } from "@/api-client/models/BoardOut";


interface ViewDialogType {
    type: "view";
    card: CardOut;
}

interface AddDialogType {
    type: "add";
}

interface ViewBoardDialogType {
    type: "view_board";
    board: BoardOut;
}

export type DialogType = ViewDialogType | AddDialogType | ViewBoardDialogType;

export const DialogContentRender = ({ dialogState }: { dialogState: DialogType }) => {
    switch (dialogState.type) {
        case "add":
            return <AddCardForm />;
        case "view":
            return <ViewDialog card={dialogState.card} />;
        case "view_board":
            return <ViewBoardDialog board={dialogState.board} />;
        default:
            // This should never happen
            console.error("Invalid dialog type");
            return null;
    }
}