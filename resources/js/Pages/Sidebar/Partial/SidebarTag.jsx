import { AppContext } from "@/Pages/App";
import { TagIcon } from "@heroicons/react/24/outline";
import { useContext } from "react";

export default function SidebarTag() {
    const { mainMode, setMainMode, setNoteListOpen } = useContext(AppContext);
    return (
        <div
            className={`h-12 ${mainMode === "tag" ? "bg-yellow-100" : "bg-yellow-50"} hover:bg-yellow-100 cursor-pointer flex items-center pl-6`}
            onClick={() => {setMainMode("tag"), setNoteListOpen(false)}}>
            <TagIcon className="h-5 w-5 m-1" />
            <p>タグ</p>
        </div>
    )
}
