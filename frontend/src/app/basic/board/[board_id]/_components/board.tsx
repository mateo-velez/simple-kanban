import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { ScrollArea } from "@/components/ui/scroll-area-fixed"
import { DisplayCard, AddCard } from "./card"
import { CardColumn } from "@/api-client/models/CardColumn"
import { DialogType } from "./dialogs/dialog"
import { CardOut } from "@/api-client/models/CardOut"

// Take in cards as children
const Column = ({ title, children }: { title: string, children: React.ReactNode }) => {
    return (
        <div className="w-full h-fit max-h-full flex flex-col gap-2 bg-card rounded-lg border shadow-md">
            <div className="p-4 border-b flex-none">
                <h2 className="text-xl font-semibold text-card-foreground">{title}</h2>
            </div>
            <ScrollArea className="max-h-full flex p-2">
                <div className="flex flex-col gap-2">
                    {children}
                </div>
            </ScrollArea>
        </div>
    )
}

// Take in cards as children
const Backlog = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="h-full flex flex-col rounded-lg border bg-card m-4">
            <div className="p-4 border-b">
                <h2 className="text-xl font-semibold text-card-foreground text-center">Backlog</h2>
            </div>
            <ScrollArea className="h-fit max-h-full ">
                <div className="grid grid-cols-3 gap-4 p-4">
                    {children}
                </div>
            </ScrollArea>
        </div>
    )
}




export const RezizableBoard = ({ cards, setDialogState }: { cards: CardOut[], setDialogState: (dialogState: DialogType) => void }) => {


    return (
        <ResizablePanelGroup
            direction="vertical"
            className="h-full rounded-lg"
        >
            <ResizablePanel defaultSize={70} minSize={30} className="h-full flex gap-4 p-4">
                <Column title="Todo">
                    {cards.filter(card => card.column === CardColumn.Todo).map((card) => (
                        <DisplayCard key={card.id} card={card} setDialogState={setDialogState} />
                    ))}
                </Column>
                <Column title="Doing">
                    {cards.filter(card => card.column === CardColumn.Doing).map((card) => (
                        <DisplayCard key={card.id} card={card} setDialogState={setDialogState} />
                    ))}
                </Column>
                <Column title="Done">
                    {cards.filter(card => card.column === CardColumn.Done).map((card) => (
                        <DisplayCard key={card.id} card={card} setDialogState={setDialogState} />
                    ))}
                </Column>
            </ResizablePanel>

            <ResizableHandle withHandle />

            <ResizablePanel className="h-full">
                <Backlog>
                    <AddCard setDialogState={setDialogState}/>
                    {cards.filter(card => card.column === CardColumn.Backlog).map((card) => (
                        <DisplayCard key={card.id} card={card} setDialogState={setDialogState}/>
                    ))}
                </Backlog>
            </ResizablePanel>
        </ResizablePanelGroup>
    )
}
