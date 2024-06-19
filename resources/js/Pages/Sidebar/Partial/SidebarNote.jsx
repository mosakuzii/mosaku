import { AppContext } from "@/Pages/App";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { useContext, useState } from "react";
import SidebarNoteList from "./SidebarNoteList";

export default function SidebarNote() {
    const { mainMode, setMainMode, noteListOpen, setNoteListOpen } = useContext(AppContext);
    return (
        <div>
            <div
                className={`h-12 ${mainMode === "edit" ? "bg-green-100" : "bg-green-50"} hover:bg-green-100 cursor-pointer flex items-center`}
                onClick={() => {setMainMode("edit"), setNoteListOpen(true)}}>
                <PencilSquareIcon className="h-5 w-5 m-1" />
                <p>ノート</p>
            </div>
            <div>
                {noteListOpen && <SidebarNoteList />}
            </div>
        </div>
    )
}