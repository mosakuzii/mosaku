import { AppContext } from "@/Pages/App";
import { BookOpenIcon, ListBulletIcon, PencilSquareIcon, StarIcon, TagIcon } from "@heroicons/react/20/solid";
import { useContext } from "react";

export default function SidebarNoteList() {
    const { allMemos, selectedMemo, setSelectedMemo } = useContext(AppContext);
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
        if (diffInMinutes < 1) return "たった今 更新";
        else if (diffInMinutes < 60) return `${diffInMinutes}分前に更新`;
        else if (diffInHours < 24) return `${diffInHours}時間前に更新`;
        else if (diffInDays < 30) return `${diffInDays}日前に更新`;
        else if (diffInMonths < 12) return `${diffInMonths}ヶ月前に更新`;
        else return `${diffInYears}年前に更新`;
    }
    const getDisplayedTags = (tags) => {
        return tags.slice(0, 3);
    }
    const getRemainingTagsCount = (tags) => tags.length > 3 ? tags.length - 3 : 0;

    return (
        <div className="fixed top-0 left-1/4 h-full w-1/4 bg-green-500 shadow-lg transition-transform transform translate-x-0 overflow-y-auto">
            <div className="sticky top-0 bg-green-600 p-2 text-white h-12 flex items-center">
                <ListBulletIcon className="h-5 w-5 m-1" />
                ノート一覧
            </div>
            {allMemos.map((memo) => (
                <div key={memo.id}
                    className={`h-32 flex items-center bg-green-50 hover:bg-green-200 cursor-pointer border border-emerald-200
                        ${selectedMemo.id === memo.id ? "bg-green-200" : ""}`}
                    onClick={() => {setSelectedMemo(memo)}}>
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
    )
}
