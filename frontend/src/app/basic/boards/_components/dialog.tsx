import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"


export const BoardsDialog = ({ children }: { children: React.ReactNode }) => {
    return (
        <Dialog>
            {children}
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create new board</DialogTitle>
                    <DialogDescription>
                        This action will create a new board.
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
} 