import { AppContext } from "@/Pages/App";
import { DocumentTextIcon } from "@heroicons/react/20/solid";
import { HomeIcon, StarIcon } from "@heroicons/react/24/outline";
import { useContext } from "react";

export default function SidebarShortcut() {
    const { allMemos, setMainMode, setSelectedMemo } = useContext(AppContext);
    const starredMemos = allMemos.filter(memo => memo.starred);

    return (
        <div className="max-h-60">
            <div className="h-12 bg-green-50 flex items-center justify-start pl-6">
                <StarIcon className="h-5 w-5 m-1" />
                <p>お気に入りメモ</p>
            </div>
            <div className="max-h-48 bg-white overflow-y-auto pl-6">
                {starredMemos.map(memo => (
                    <div
                        key={memo.id}
                        className="flex items-center justify-start px-4 py-1 hover:bg-green-200 cursor-pointer"
                        onClick={() => {setMainMode("edit"), setSelectedMemo(memo)}}>
                        <DocumentTextIcon className="h-5 w-5 mr-1 text-gray-600" />
                        <span className="text-ellipsis overflow-hidden">{memo.title}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}