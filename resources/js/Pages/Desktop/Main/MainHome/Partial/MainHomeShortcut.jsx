import { AppContext } from "@/Pages/App";
import { BookOpenIcon, DocumentTextIcon, StarIcon } from "@heroicons/react/20/solid";
import { useContext } from "react";

export default function MainHomeShortcut() {
    const { allMemos, setMainMode, setSelectedMemo } = useContext(AppContext);
    const starredMemos = allMemos.filter(memo => memo.starred);
    function stripHtmlTags(str) {
        const div = document.createElement("div");
        div.innerHTML = str;
        return div.innerText;
    }
    function formatDate(dateString) {
        const date = new Date(dateString);
        const now = new Date();
        const diffInMs = now - date;
        const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
        const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
        const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
        const diffInMonths = Math.floor(diffInMs / (1000 * 60 * 60 * 24 * 30));
        const diffInYears = Math.floor(diffInMs / (1000 * 60 * 60 * 24 * 30 * 12));
        if (diffInMinutes < 1) return "たった今";
        else if (diffInMinutes < 60) return `${diffInMinutes}分前`;
        else if (diffInHours < 24) return `${diffInHours}時間前`;
        else if (diffInDays < 30) return `${diffInDays}日前`;
        else if (diffInMonths < 12) return `${diffInMonths}ヶ月前`;
        else return `${diffInYears}年前`;
    }
    const getDisplayedTags = (tags) => {
        return tags.slice(0, 2);
    }
    const getRemainingTagsCount = (tags) => tags.length > 3 ? tags.length - 3 : 0;
    return (
        <div className="h-[calc(2*(100%-8rem)/5)] flex flex-col">
            <div className="h-8 flex items-center px-2">
                <StarIcon className="h-5 w-5 mr-1" />
                お気に入りメモ
            </div>
            <div className="flex flex-1 p-4 overflow-x-auto">
                {starredMemos.map(memo => (
                    <div
                        key={memo.id}
                        className="min-w-48 p-2 mr-3 bg-green-50 shadow-lg hover:bg-green-200 cursor-pointer flex flex-col"
                        onClick={() => {setMainMode("edit"), setSelectedMemo(memo)}}>
                        <div className="flex items-center">
                            <DocumentTextIcon className="h-5 w-5 mr-1" />
                            <p className="text-ellipsis overflow-hidden">
                                {memo.title}
                            </p>
                        </div>
                        <div className="text-gray-500 text-ellipsis overflow-hidden">
                            {stripHtmlTags(memo.content)}
                        </div>
                        <div className="mt-auto text-gray-500 text-sm flex items-center">
                            {getDisplayedTags(memo.tags).map(tag => (
                                <div key={tag.id}
                                    className="max-w-16 m-1 px-1 text-ellipsis overflow-hidden bg-green-200 rounded-full">
                                    {tag.tag_name}
                                </div>
                            ))}
                            {getRemainingTagsCount(memo.tags) > 0 &&
                                "+" + getRemainingTagsCount(memo.tags)}
                        </div>
                        <div className="text-gray-400 text-sm">
                            {formatDate(memo.updated_at)}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}