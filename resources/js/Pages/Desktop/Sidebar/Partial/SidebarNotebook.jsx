import { AppContext } from "@/Pages/App";
import { BookOpenIcon } from "@heroicons/react/24/outline";
import { useContext } from "react";

export default function SidebarNotebook() {
    const { mainMode, setMainMode, setNoteListOpen } = useContext(AppContext);
    return (
        <div
            className={`h-12 ${mainMode === "notebook" ? "bg-blue-100" : "bg-blue-50"} hover:bg-blue-100 cursor-pointer flex items-center pl-6`}
            onClick={() => {setMainMode("notebook"), setNoteListOpen(false)}}>
            <BookOpenIcon className="h-5 w-5 m-1" />
            ノートブック
        </div>
    )
}
