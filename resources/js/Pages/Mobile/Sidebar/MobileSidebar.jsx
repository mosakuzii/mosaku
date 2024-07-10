import { AppContext } from "@/Pages/App";
import { BookOpenIcon, ListBulletIcon, StarIcon } from "@heroicons/react/20/solid";
import { useContext } from "react";

export default function Sidebar({ open, onClose }) {
    const { allMemos, selectedMemo, setSelectedMemo, setMainMode } = useContext(AppContext);
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
    const getRemainingTagsCount = (tags) => tags.length > 2 ? tags.length - 2 : 0;
    return (
        <div onClick={onClose} className={`
            fixed inset-0 flex justify-center items-center
            transition-colors
            ${open ? "visible bg-black/20 z-50" : "invisible z-50"}
        `}>
            <div onClick={(e) => e.stopPropagation()}
                className={`
                    fixed inset-0 z-50 h-full w-2/5 h-screen bg-green-50 shadow-lg overflow-y-auto
                    ${open ? "scale-100 opacity-100" : "scale-125 opacity-0"}>
            `}>
                <div className="sticky top-0 bg-green-600 p-2 text-white h-12 flex items-center">
                    <ListBulletIcon className="h-5 w-5 m-1" />
                    ノート一覧
                </div>
                {allMemos.map((memo) => (
                    <div key={memo.id}
                        className={`h-32 flex items-center bg-green-50 hover:bg-green-200 cursor-pointer border border-emerald-200
                            ${selectedMemo.id === memo.id ? "bg-green-200" : ""}`}
                        onClick={() => {setSelectedMemo(memo), onClose(), setMainMode("edit")}}>
                        <div className="w-full px-2">
                            <div className="text-gray-500 text-sm flex justify-between">
                                {memo.notebook_id === null ?
                                    <div>ノート指定なし</div>:
                                    <div className="flex items-center">
                                        <BookOpenIcon className="h-4 w-4 mr-1" />{memo.notebook.title}
                                    </div>}
                                <div>
                                    {memo.starred === 1 && <StarIcon className="h-4 w-4 text-gray-500" />}
                                </div>
                            </div>
                            <div className="text-gray-500 border-b-2 text-ellipsis overflow-hidden">
                                {memo.title === null ?
                                    <p className="text-gray-600">無題のノート</p> :
                                    <p className="text-black">{memo.title}</p>
                                }
                            </div>
                            <div className="text-gray-600 text-ellipsis overflow-hidden">
                                {stripHtmlTags(memo.content)}
                            </div>
                            <div className="text-gray-400 text-sm flex items-center justify-start px-1 mt-3">
                                {formatDate(memo.updated_at)}
                                {getDisplayedTags(memo.tags).map(tag => (
                                    <div key={tag.id}
                                        className="max-w-16 mx-1 px-1 text-ellipsis overflow-hidden bg-green-200">
                                        {tag.tag_name}
                                    </div>
                                ))}
                                {getRemainingTagsCount(memo.tags) > 0 && 
                                    "+"+getRemainingTagsCount(memo.tags)}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}