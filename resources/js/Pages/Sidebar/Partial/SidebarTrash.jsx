import { AppContext } from "@/Pages/App";
import { TrashIcon } from "@heroicons/react/24/outline";
import { useContext } from "react";
import SidebarTrashList from "./SidebarTrashList";

export default function SidebarTrash() {
    const { mainMode, setMainMode, setNoteListOpen } = useContext(AppContext);
    return (
        <div className="mt-auto">
            <div
                className={`h-12 ${mainMode === "trash" ? "bg-gray-100" : "bg-gray-50"} hover:bg-gray-100 cursor-pointer flex items-center pl-6`}
                onClick={() => {setMainMode("trash"), setNoteListOpen(false)}}>
                <TrashIcon className="h-5 w-5 m-1" />
                <p>ゴミ箱</p>
            </div>
            <div>
                {mainMode === "trash" && <SidebarTrashList />}
            </div>
        </div>
    )
}