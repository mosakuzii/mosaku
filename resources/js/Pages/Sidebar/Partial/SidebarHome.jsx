import { AppContext } from "@/Pages/App";
import { useContext } from "react";

export default function SidebarHome() {
    const { mainMode, setMainMode } = useContext(AppContext);
    return (
        <div
            className="h-12 bg-green-200 hover:bg-green-200 cursor-pointer"
            onClick={() => setMainMode("home")}>
            <p>Home</p>
        </div>
    )
}