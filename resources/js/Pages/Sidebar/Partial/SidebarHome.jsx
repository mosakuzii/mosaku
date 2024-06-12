import { AppContext } from "@/Pages/App";
import { HomeIcon } from "@heroicons/react/24/outline";
import { useContext } from "react";

export default function SidebarHome() {
    const { setMainMode, setNoteListOpen } = useContext(AppContext);
    return (
        <div
            className="h-12 bg-green-50 hover:bg-green-200 cursor-pointer flex items-center justify-start"
            onClick={() => {setMainMode("home"), setNoteListOpen(false)}}>
            <HomeIcon className="h-5 w-5 m-1" />
            <p>ホーム</p>
        </div>
    )
}