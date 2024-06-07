import { AppContext } from "@/Pages/App";
import { useContext, useState } from "react";
import SidebarNoteList from "./SidebarNoteList";

export default function SidebarNote() {
    const { mainMode, setMainMode, setSelectedMemo } = useContext(AppContext);
    return (
        <div>
            <div
                className="h-12 bg-green-50 hover:bg-green-200 cursor-pointer"
                onClick={() => {setMainMode("edit")}}>
                {mainMode === "edit" ? <p>Hidden NoteList</p>:<p>Show NoteList</p>}
            </div>
            <div>
                {mainMode === "edit" && <SidebarNoteList />}
            </div>
        </div>
    )
}