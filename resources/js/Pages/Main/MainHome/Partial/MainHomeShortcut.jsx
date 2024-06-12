import { AppContext } from "@/Pages/App";
import { StarIcon } from "@heroicons/react/20/solid";
import { useContext } from "react";

export default function MainHomeShortcut() {
    const { allMemos, setMainMode, setSelectedMemo } = useContext(AppContext);
    const starredMemos = allMemos.filter(memo => memo.starred);
    function stripHtmlTags(str) {
        const div = document.createElement("div");
        div.innerHTML = str;
        return div.innerText;
    }
    return (
        <div className="h-2/5 bg-gray-200">
            <div className="h-8 bg-gray-300 flex px-2">
                <StarIcon className="h-5 w-5 mr-1" />
                お気に入りメモ
            </div>
            <div className="flex h-[calc(40vh-3.5rem)] bg-gray-100 overflow-x-auto">
                {starredMemos.map(memo => (
                    <div
                        key={memo.id}
                        className="text-center min-w-48 p-1 hover:bg-gray-300 cursor-pointer"
                        onClick={() => {setMainMode("edit"), setSelectedMemo(memo)}}>
                        <div className="text-black-400">
                            {memo.title}
                        </div>
                        <div className="text-gray-500 break-words">
                            {stripHtmlTags(memo.content)}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}