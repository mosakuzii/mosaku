import Dropdown from "@/Components/Dropdown";
import { AppContext } from "@/Pages/App";
import { ArrowUturnLeftIcon, EllipsisVerticalIcon, TagIcon } from "@heroicons/react/20/solid";
import { useContext } from "react";

export default function MainTrashContent({ restoreMemo }) {
    const { selectedDeletedMemo } = useContext(AppContext);
    function stripHtmlTags(str) {
        const div = document.createElement("div");
        div.innerHTML = str;
        return div.innerText;
    }
    const formatDate = (dateString) => {
        if (dateString === undefined) return "";
        else{
            const date = new Date(dateString);
            const year = date.getFullYear();
            const month = date.getMonth() + 1;
            const day = date.getDate();
            return `最終更新: ${year}年${month}月${day}日`;
        }
    }
    return (
        <>
        <div className="h-32 bg-gray-300">
            <div className="flex items-center justify-end mr-2">
                {formatDate(selectedDeletedMemo.updated_at)}
            </div>
            <div className="flex items-center justify-between">
                <p className="w-full text-2xl text-black">
                    {selectedDeletedMemo.title === null ?
                        "無題のノート":selectedDeletedMemo.title}
                </p>
                <Dropdown>
                    <Dropdown.Trigger>
                        <EllipsisVerticalIcon className="h-6 w-6 cursor-pointer text-gray-800" aria-hidden="true" />
                    </Dropdown.Trigger>
                    <Dropdown.Content>
                        <Dropdown.Item
                            className="w-auto min-w-max flex items-center cursor-pointer"
                            onClick={restoreMemo}>
                            <div className="flex items-center">
                                <ArrowUturnLeftIcon className="h-4 w-4 mr-1" />
                                <p>ノートを復元する</p>
                            </div>
                        </Dropdown.Item>
                    </Dropdown.Content>
                </Dropdown>
            </div>
            <p className="text-gray-500">
                {selectedDeletedMemo.notebook_id ?
                    selectedDeletedMemo.notebook.title : "ノート指定なし"}
            </p>
        </div>
        <div className="h-[calc(100vh-11rem)] bg-gray-100">
            {stripHtmlTags(selectedDeletedMemo.content)}
        </div>
        <div className="h-8 bg-gray-200 flex items-center mt-auto">
            {selectedDeletedMemo.tags.length === 0 ?
                <p className="text-gray-500">タグ指定なし</p> :
                selectedDeletedMemo.tags.map((tag) => (
                    <div key={tag.id}
                        className="flex items-center bg-white rounded-md max-w-32 mr-2 px-2">
                        <TagIcon className="h-4 w-4 mr-1" style={{ color: tag.tag_color }} />
                        <p className="text-ellipsis overflow-hidden">
                            {tag.tag_name}
                        </p>
                    </div>
                ))}
        </div>
        </>
    )
}