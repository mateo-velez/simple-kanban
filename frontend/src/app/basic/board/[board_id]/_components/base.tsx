import { CardOut } from "@/api-client/models/CardOut";

export interface DialogType {
    type: "add" | "view";
    card?: CardOut;
}