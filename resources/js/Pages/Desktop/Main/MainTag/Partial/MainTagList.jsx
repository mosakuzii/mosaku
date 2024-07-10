import Dropdown from "@/Components/Dropdown";
import { AppContext } from "@/Pages/App";
import { Disclosure } from "@headlessui/react";
import { BookOpenIcon, ChevronUpIcon, DocumentTextIcon, EllipsisVerticalIcon, PencilSquareIcon, TagIcon, TrashIcon } from "@heroicons/react/20/solid";
import { useContext, useState } from "react";
import MainTagModal from "./MainTagModal";

export default function MainTagList({ updateTag, destroyTag }) {
    const { allTags, allNotebooks, allMemos, setMainMode, setSelectedMemo } = useContext(AppContext);
    const [open, setOpen] = useState(false);
    const [ renameTag, setRenameTag ] = useState({});
    const formatDate = (dateString) => {
        if(dateString === undefined) return "";
        else{
            const date = new Date(dateString);
            const year = date.getFullYear();
            const month = date.getMonth() + 1;
            const day = date.getDate();
            return `${year}年${month}月${day}日`;
        }
    }
    return (
        <div className="h-[calc(100%-6rem)] px-8 mt-4">
            <div className="flex items-center gap-5">
                <span className="w-10"></span>
                <p className="text-md w-48">タグ名</p>
                <p className="text-md w-32">ノート数</p>
                <p className="text-md w-48">更新日</p>
                <p className="text-md ml-auto">操作</p>
            </div>
            {allTags.map((tag) => (
                <Disclosure key={tag.id}>
                    {({ open }) => (
                        <>
                        <div className="w-full h-10 flex items-center border-b-2 hover:bg-green-100">
                            <Disclosure.Button className="flex-1">
                                <div className="flex items-center gap-5">
                                    <div className="flex items-center w-10">
                                        {tag.memos.length > 0 ?
                                            <ChevronUpIcon className={`${open ? "transform rotate-180" : ""} h-4 w-4`} />:
                                            <span className="h-4 w-4"></span>}
                                        <TagIcon className="h-6 w-6"
                                            style={{color: tag.tag_color}} />
                                    </div>
                                    <p className="w-48 text-left text-ellipsis overflow-hidden">
                                        {tag.tag_name}
                                    </p>
                                    <p className="w-32 text-sm text-left">
                                        {tag.memos.length} 件のノート
                                    </p>
                                    <p className="w-48 text-sm text-left">
                                        {formatDate(tag.updated_at)}
                                    </p>
                                </div>
                            </Disclosure.Button>
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <EllipsisVerticalIcon className="h-6 w-6 cursor-pointer" />
                                </Dropdown.Trigger>
                                <Dropdown.Content>
                                    <Dropdown.Item className="w-auto min-w-max flex items-center cursor-pointer"
                                        onClick={() => {setOpen(true), setRenameTag(tag)}}>
                                        <PencilSquareIcon className="h-4 w-4 mr-1" />
                                        名前を変更
                                    </Dropdown.Item>
                                    <Dropdown.Item className="w-auto min-w-max flex items-center cursor-pointer"
                                        onClick={() => {
                                            const tagName = tag.tag_name || "無題のタグ";
                                            if(window.confirm(`${tagName} を削除しますか？`)){
                                                destroyTag(tag);
                                            }}}>
                                        <TrashIcon className="h-4 w-4 mr-1" />
                                        削除
                                    </Dropdown.Item>
                                </Dropdown.Content>
                            </Dropdown>
                        </div>
                        {tag.memos.length > 0 &&
                        <Disclosure.Panel className="bg-green-50 p-2">
                            <div className="flex items-center gap-5">
                                <span className="w-10"></span>
                                <p className="text-base w-48">タイトル</p>
                                <p className="text-base w-48">ノートブック</p>
                                <p className="text-base w-48">更新日</p>
                            </div>
                            {tag.memos.map((memo) => (
                                <div key={memo.id}
                                    className="h-10 flex items-center gap-5 border-b-2 text-gray-600 cursor-pointer hover:bg-green-100"
                                    onClick={()=>{setMainMode("edit"), setSelectedMemo(allMemos.find(m=>m.id === memo.id))}}>
                                    <div className="w-10 flex items-center justify-center">
                                        <DocumentTextIcon className="h-6 w-6 text-gray-500" />
                                    </div>
                                    <p className="w-48 text-left text-ellipsis overflow-hidden">
                                        {memo.title}
                                    </p>
                                    <p className="w-48 text-left text-ellipsis overflow-hidden">
                                        {memo.notebook_id === null ?
                                            <p>ノート指定なし</p>:
                                            <div className="flex items-center">
                                                <BookOpenIcon className="h-6 w-6 mr-1 text-gray-500" />
                                                {allNotebooks.find(notebook => notebook.id === memo.notebook_id).title}
                                            </div>}
                                    </p>
                                    <p className="w-48 text-sm text-left">
                                        {formatDate(memo.updated_at)}
                                    </p>
                                </div>
                            ))}
                        </Disclosure.Panel>}
                        </>
                    )}
                </Disclosure>
            ))}
            <MainTagModal
                open={open}
                onClose={() => setOpen(false)}
                renameTag={renameTag}
                setRenameTag={setRenameTag}
                updateTag={updateTag} />
        </div>
    )
}
