import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { BoardOut } from "@/api-client/models/BoardOut";


export const ViewBoardDialog = ({board}: {board: BoardOut}) => {
    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>{board.title}</DialogTitle>
            </DialogHeader>
            {/* show description and labels */}
            <div className="flex flex-col gap-2">
                <h3 className="text-sm font-medium text-muted-foreground">Description</h3>
                <p className="text-sm text-muted-foreground">{board.description}</p>
                {/* labels */}
                <h3 className="text-sm font-medium text-muted-foreground">Labels</h3>
                <div className="flex flex-wrap gap-2">
                    {board.labels.map((label) => (
                        <div key={label.name} className={`w-4 h-2 rounded-full`} style={{ backgroundColor: label.color }} />
                    ))}
                </div>
            </div>
        </DialogContent>
    )
}