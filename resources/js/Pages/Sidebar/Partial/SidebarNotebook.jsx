import { AppContext } from "@/Pages/App";
import { useContext } from "react";

export default function SidebarNotebook() {
    const { setMainMode } = useContext(AppContext);
    return (
        <div
            className="h-12 bg-green-50 hover:bg-green-200 cursor-pointer"
            onClick={() => {setMainMode("notebook")}}>
            SidebarNotebook.jsx
        </div>
    )
}