import { AppContext } from "@/Pages/App";
import { ClockIcon } from "@heroicons/react/20/solid";
import { useContext } from "react";

export default function MainHomeRecent() {
    const { allMemos, setMainMode, setSelectedMemo } = useContext(AppContext);
    const recentMemos = allMemos.slice(0, 10);
    function stripHtmlTags(str) {
        const div = document.createElement("div");
        div.innerHTML = str;
        return div.innerText;
    }
    function formatDate(dateString) {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${year}年${month}月${day}日${hours}:${minutes} 更新`;
    }
    return (
        <div className="h-1/5 bg-gray-200">
            <div className="h-8 bg-gray-300 flex px-2">
                <ClockIcon className="h-5 w-5 mr-1" />
                最近更新したメモ
            </div>
            <div className="flex h-[calc(20vh-3.5rem)] bg-gray-100 overflow-x-auto">
                {recentMemos.map(memo => (
                    <div
                        key={memo.id}
                        className="text-center min-w-48 p-1 hover:bg-gray-300 cursor-pointer flex flex-col"
                        onClick={() => {setMainMode("edit"), setSelectedMemo(memo)}}>
                        <div className="text-black-400">
                            {memo.title}
                        </div>
                        <div className="text-gray-500 break-words flex-grow">
                            {stripHtmlTags(memo.content)}
                        </div>
                        <div className="text-gray-500 mt-2">
                            {formatDate(memo.updated_at)}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}