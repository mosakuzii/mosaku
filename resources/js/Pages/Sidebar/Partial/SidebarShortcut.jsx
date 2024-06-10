import { AppContext } from "@/Pages/App";
import { HomeIcon, StarIcon } from "@heroicons/react/24/outline";
import { useContext } from "react";

export default function SidebarShortcut() {
    const { allMemos, setMainMode, setSelectedMemo } = useContext(AppContext);
    const starredMemos = allMemos.filter(memo => memo.starred);

    return (
        <div className="h-60">
            <div className="h-12 bg-green-50 flex items-center justify-start">
                <StarIcon className="h-5 w-5 m-1" />
                <p>お気に入りメモ</p>
            </div>
            <div className="h-48 bg-green-100 overflow-y-auto">
                {starredMemos.map(memo => (
                    <div
                        key={memo.id}
                        className="flex items-center justify-between px-4 py-1 hover:bg-green-200 cursor-pointer"
                        onClick={() => {setMainMode("edit"), setSelectedMemo(memo)}}>
                        {memo.title}
                    </div>
                ))}
            </div>
        </div>
    )
}