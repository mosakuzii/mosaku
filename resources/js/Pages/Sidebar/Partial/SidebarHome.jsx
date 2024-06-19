import { AppContext } from "@/Pages/App";
import { HomeIcon } from "@heroicons/react/24/outline";
import { useContext } from "react";

export default function SidebarHome() {
    const { setMainMode, setNoteListOpen, mainMode } = useContext(AppContext);
    return (
        <div
            className={`h-12 ${mainMode === "home" ? "bg-green-100" : "bg-green-50"} hover:bg-green-100 cursor-pointer flex items-center`}
            onClick={() => {setMainMode("home"), setNoteListOpen(false)}}>
            <HomeIcon className="h-5 w-5 m-1" />
            <p>ホーム画面</p>
        </div>
    )
}