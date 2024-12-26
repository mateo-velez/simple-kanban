import { BoardOut } from "@/api-client/models/BoardOut";
import { useRouter } from "next/navigation";


export const Board = ({ board, className }: { board: BoardOut, className?: string }) => {
    const router = useRouter();

    return (
        <div 
            onClick={() => router.push(`/basic/board/${board.id}`)}
            className={`w-52 h-32 rounded-md border p-4 hover:bg-accent transition-colors duration-200 cursor-pointer ${className}`}
        >
            <span className="text-sm text-muted-foreground">{board.title}</span>
        </div>
    );
} 