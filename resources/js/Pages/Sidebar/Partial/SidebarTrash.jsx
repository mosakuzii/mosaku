import { AppContext } from "@/Pages/App";
import { TrashIcon } from "@heroicons/react/24/outline";
import { useContext } from "react";
import SidebarTrashList from "./SidebarTrashList";

export default function SidebarTrash() {
    const { mainMode, setMainMode } = useContext(AppContext);
    return (
        <div className="mt-auto">
            <div
                className="h-12 bg-gray-100 hover:bg-gray-200 cursor-pointer flex items-center justify-start"
                onClick={() => setMainMode("trash")}>
                <TrashIcon className="h-5 w-5 m-1" />
                <p>ゴミ箱</p>
            </div>
            <div>
                {mainMode === "trash" && <SidebarTrashList />}
            </div>
        </div>
    )
}