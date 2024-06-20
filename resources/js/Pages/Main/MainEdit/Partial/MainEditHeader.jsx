import Dropdown from "@/Components/Dropdown";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { AppContext } from "@/Pages/App";
import { ArrowsPointingOutIcon, BookOpenIcon, ChevronDoubleDownIcon, ChevronDoubleRightIcon, EllipsisVerticalIcon, StarIcon as StarIconSolid, TrashIcon } from "@heroicons/react/20/solid";
import { StarIcon as StarIconOutline } from "@heroicons/react/24/outline";
import { useContext } from "react";

export default function MainEditHeader({ submitMemo, deleteMemo }) {
    const { selectedMemo, setSelectedMemo, allNotebooks, noteListOpen, setNoteListOpen } = useContext(AppContext);
    const handleTitleChange = (e) => {
        setSelectedMemo(prevState => ({
            ...prevState,
            title: e.target.value
        }));
    }
    const formatDate = (dateString) => {
        if(dateString === undefined) return "";
        else{
            const date = new Date(dateString);
            const year = date.getFullYear();
            const month = date.getMonth() + 1;
            const day = date.getDate();
            const hour = date.getHours();
            const minute = date.getMinutes();
            return `最終更新: ${year}年${month}月${day}日 ${hour}:${minute}`;
        }
    }
    return (
        <div className="h-32">
            <div className="flex items-center justify-between">
                {noteListOpen ?
                    <ArrowsPointingOutIcon
                        className="h-6 w-6 cursor-pointer text-gray-500"
                        onClick={() => setNoteListOpen(false)}
                    />:
                    <ChevronDoubleRightIcon
                        className="h-6 w-6 cursor-pointer text-gray-500"
                        onClick={() => setNoteListOpen(true)}
                    />
                }
                <div className="mr-2 text-gray-400">
                    {formatDate(selectedMemo.updated_at)}
                </div>
            </div>
            <div className="flex items-center justify-between">
                <TextInput
                    id="memo_title"
                    type="text"
                    name="memo_title"
                    placeholder="タイトル"
                    className="w-full text-2xl border-0 shadow-none"
                    value={selectedMemo.title}
                    onChange={handleTitleChange}
                />
                <Dropdown>
                    <Dropdown.Trigger>
                        <EllipsisVerticalIcon className="h-6 w-6 cursor-pointer text-gray-800" aria-hidden="true" />
                    </Dropdown.Trigger>
                    <Dropdown.Content>
                        <Dropdown.Item
                            className="w-auto min-w-max flex items-center cursor-pointer"
                            onClick={() => setSelectedMemo({...selectedMemo, starred: !selectedMemo.starred})}>
                            {selectedMemo.starred ? 
                                <div className="flex items-center">
                                    <StarIconOutline className="h-5 w-5 mr-1" />
                                    <p>お気に入り解除</p>
                                </div>:
                                <div className="flex items-center">
                                    <StarIconSolid className="h-5 w-5 mr-1" />
                                    <p>お気に入り登録</p>
                                </div>}
                        </Dropdown.Item>
                        {selectedMemo.id &&
                            <Dropdown.Item
                                className="w-auto min-w-max flex items-center cursor-pointer"
                                onClick={() => {
                                    const memoTitle = selectedMemo.title || "無題のノート";
                                    if(window.confirm(`${memoTitle} を削除しますか？`)){
                                        deleteMemo();
                                    }}}>
                                    <TrashIcon className="h-5 w-5 mr-1" />
                                    <p>削除</p>
                            </Dropdown.Item>
                        }
                    </Dropdown.Content>
                </Dropdown>
            </div>
            <div className="flex items-center justify-between pl-3">
                <Dropdown>
                    <Dropdown.Trigger>
                        <p className="text-gray-500 cursor-pointer">
                            {selectedMemo.notebook_id === null ?
                                "ノートブック指定なし" :
                                allNotebooks.find(notebook => notebook.id === selectedMemo.notebook_id).title}
                        </p>
                    </Dropdown.Trigger>
                    <Dropdown.Content>
                        {allNotebooks.map(notebook => (
                            <Dropdown.Item
                                key={notebook.id}
                                className="flex items-center cursor-pointer"
                                onClick={() => setSelectedMemo({...selectedMemo, notebook_id: notebook.id})}>
                                    {notebook.title}
                            </Dropdown.Item>
                        ))}
                    </Dropdown.Content>
                </Dropdown>
                <PrimaryButton
                    className="bg-green-500 hover:bg-green-700"
                    onClick={submitMemo}>
                    保存
                </PrimaryButton>
            </div>
        </div>
    )
}