import { AppContext } from "@/Pages/App";
import { BookOpenIcon } from "@heroicons/react/24/outline";
import { useContext } from "react";

export default function SidebarNotebook() {
    const { mainMode, setMainMode, setNoteListOpen } = useContext(AppContext);
    return (
        <div
            className={`h-12 ${mainMode === "notebook" ? "bg-green-100" : "bg-green-50"} hover:bg-green-100 cursor-pointer flex items-center`}
            onClick={() => {setMainMode("notebook"), setNoteListOpen(false)}}>
            <BookOpenIcon className="h-5 w-5 m-1" />
            ノートブック
        </div>
    )
}
