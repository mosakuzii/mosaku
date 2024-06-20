import Dropdown from "@/Components/Dropdown";
import { AppContext } from "@/Pages/App";
import { Disclosure } from "@headlessui/react";
import { BookOpenIcon, ChevronUpIcon, DocumentTextIcon, EllipsisVerticalIcon, PencilSquareIcon, StarIcon as StarIconSolid, TrashIcon } from "@heroicons/react/20/solid";
import { StarIcon as StarIconOutline } from "@heroicons/react/24/outline";
import { useContext, useState } from "react";
import MainNotebookModal from "./MainNotebookModal";

export default function MainNotebookList({ updateNotebook, destroyNotebook }) {
    const { allNotebooks, allMemos, setMainMode, setSelectedMemo } = useContext(AppContext);
    const [open, setOpen] = useState(false);
    const [ renameNotebook, setRenameNotebook ] = useState({});
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
    const getDisplayedTags = (tags) => {
        return tags.slice(0, 2);
    }
    const getRemainingTagsCount = (tags) => tags.length > 3 ? tags.length - 2 : 0;
    console.log(allNotebooks);

    return (
        <div className="h-[calc(100%-6rem)] w-full px-8 mt-4">
            <div className="flex items-center gap-5">
                <span className="w-10"></span>
                <p className="text-md w-48">ノートブック名</p>
                <p className="text-md w-32">ノート数</p>
                <p className="text-md w-48">更新日</p>
                <p className="text-md ml-auto">操作</p>
            </div>
            {allNotebooks.map((notebook) => (
                <Disclosure key={notebook.id}>
                    {({ open }) => (
                        <>
                        <div className="w-full h-10 flex items-center border-b-2 hover:bg-green-100">
                            <Disclosure.Button className="flex-1">
                                <div className="flex items-center gap-5">
                                    <div className="flex items-center w-10">
                                        {notebook.memos.length > 0 ?
                                            <ChevronUpIcon className={`${open ? "transform rotate-180" : ""} h-4 w-4`} />:
                                            <span className="w-4"></span>}
                                        <BookOpenIcon className="h-6 w-6 text-gray-600" />
                                    </div>
                                    <p className="w-48 text-left text-ellipsis overflow-hidden">
                                        {notebook.title || "無題のノートブック"}
                                    </p>
                                    <p className="w-32 text-sm text-left">
                                        {notebook.memos.length} 件のノート
                                    </p>
                                    <p className="w-48 text-sm text-left">
                                        {formatDate(notebook.updated_at)}
                                    </p>
                                </div>
                            </Disclosure.Button>
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <EllipsisVerticalIcon className="h-6 w-6 cursor-pointer" />
                                </Dropdown.Trigger>
                                <Dropdown.Content>
                                    <Dropdown.Item className="w-auto min-w-max flex items-center cursor-pointer"
                                        onClick={() => updateNotebook({...notebook, starred: !notebook.starred})}>
                                        {notebook.starred ?
                                            <div className="flex items-center">
                                                <StarIconOutline className="h-5 w-5 mr-1" />
                                                <p>お気に入り解除</p>
                                            </div>:
                                            <div className="flex items-center">
                                                <StarIconSolid className="h-5 w-5 mr-1" />
                                                <p>お気に入り登録</p>
                                            </div>}
                                    </Dropdown.Item>
                                    <Dropdown.Item className="w-auto min-w-max flex items-center cursor-pointer"
                                        onClick={() => {setOpen(true), setRenameNotebook(notebook)}}>
                                        <PencilSquareIcon className="h-4 w-4 mr-1" />
                                        名前を変更
                                    </Dropdown.Item>
                                    <Dropdown.Item className="w-auto min-w-max flex items-center cursor-pointer"
                                        onClick={() => {
                                            const notebookTitle = notebook.title || "無題のノートブック";
                                            if(window.confirm(`${notebookTitle} を削除しますか？`)){
                                                destroyNotebook(notebook);
                                            }}}>
                                        <TrashIcon className="h-4 w-4 mr-1" />
                                        削除
                                    </Dropdown.Item>
                                </Dropdown.Content>
                            </Dropdown>
                        </div>
                        {notebook.memos.length > 0 &&
                        <Disclosure.Panel className="bg-green-50 p-2">
                            <div className="flex items-center gap-5">
                                <span className="w-10"></span>
                                <p className="text-base w-48">タイトル</p>
                                <p className="text-base w-48">タグ</p>
                                <p className="text-base w-48">更新日</p>
                            </div> 
                            {notebook.memos.map((memo) => (
                                <div key={memo.id}
                                    className="h-10 flex items-center gap-5 border-b-2 text-gray-600 cursor-pointer"
                                    onClick={()=>{setMainMode("edit"), setSelectedMemo(allMemos.find(m=>m.id === memo.id))}}>
                                    <div className="w-10 flex items-center justify-center">
                                        <DocumentTextIcon className="h-6 w-6 text-gray-500" />
                                    </div>
                                    <p className="w-48 text-left text-ellipsis overflow-hidden">
                                        {memo.title}
                                    </p>
                                    <p className="w-48 flex items-center">
                                        {allMemos.find(m => m.id === memo.id).tags.length > 0 ?
                                            getDisplayedTags(allMemos.find(m => m.id === memo.id).tags).map((tag) => (
                                                <span key={tag.id}
                                                    className="w-16 mx-1 px-1 text-ellipsis overflow-hidden bg-green-200">
                                                    {tag.tag_name}
                                                </span>
                                            )):
                                            "タグなし"}
                                        {getRemainingTagsCount(allMemos.find(m => m.id === memo.id).tags) > 0 &&
                                            "+" + getRemainingTagsCount(allMemos.find(m => m.id === memo.id).tags)}
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
            <MainNotebookModal
                open={open}
                onClose={() => setOpen(false)}
                renameNotebook={renameNotebook}
                setRenameNotebook={setRenameNotebook}
                updateNotebook={updateNotebook} />
        </div>
    )
}