import { AppContext } from "@/Pages/App";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { useContext, useState } from "react";
import SidebarNoteList from "./SidebarNoteList";

export default function SidebarNote() {
    const { mainMode, setMainMode } = useContext(AppContext);
    return (
        <div>
            <div className="h-12 bg-green-50 hover:bg-green-200 cursor-pointer flex items-center justify-start"
                onClick={() => {setMainMode("edit")}}>
                <PencilSquareIcon className="h-5 w-5 m-1" />
                <p>ノート</p>
            </div>
            <div>
                {mainMode === "edit" && <SidebarNoteList />}
            </div>
        </div>
    )
}