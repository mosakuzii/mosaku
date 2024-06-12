import Dropdown from "@/Components/Dropdown";
import TextInput from "@/Components/TextInput";
import { AppContext } from "@/Pages/App";
import { ArrowsPointingOutIcon, EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import { useContext } from "react";

export default function MainEditHeader({ submitMemo, deleteMemo }) {
    const { selectedMemo, setSelectedMemo, allNotebooks, noteListOpen, setNoteListOpen } = useContext(AppContext);
    const handleTitleChange = (e) => {
        setSelectedMemo(prevState => ({
            ...prevState,
            title: e.target.value
        }));
    }
    return (
        <div className="h-18 bg-gray-300">
            <div className="flex items-center justify-between">
                <div className="flex">
                    {noteListOpen && (
                        <ArrowsPointingOutIcon
                            className="h-6 w-6 cursor-pointer text-gray-800"
                            onClick={() => setNoteListOpen(false)}
                        />
                    )}
                    <TextInput
                        id="memo_title"
                        type="text"
                        name="memo_title"
                        placeholder="タイトル"
                        value={selectedMemo.title}
                        onChange={handleTitleChange}
                    />
                </div>
                <Dropdown>
                    <Dropdown.Trigger>
                        <EllipsisVerticalIcon className="h-6 w-6 cursor-pointer text-gray-800" aria-hidden="true" />
                    </Dropdown.Trigger>
                    <Dropdown.Content>
                        <Dropdown.Item
                            className="flex items-center cursor-pointer"
                            onClick={() => setSelectedMemo({...selectedMemo, starred: !selectedMemo.starred})}>
                            {selectedMemo.starred ? "お気に入り解除" : "お気に入り"}
                        </Dropdown.Item>
                        {selectedMemo.id &&
                            <Dropdown.Item
                                className="flex items-center cursor-pointer"
                                onClick={() => {
                                    const memoTitle = selectedMemo.title || "無題のノート";
                                    if(window.confirm(`${memoTitle} を削除しますか？`)){
                                        deleteMemo();
                                    }}}>
                                    削除
                            </Dropdown.Item>
                        }
                    </Dropdown.Content>
                </Dropdown>
            </div>
            <div className="flex items-center justify-between">
                <Dropdown>
                    <Dropdown.Trigger>
                        <p className="text-gray-500 cursor-pointer">
                            {selectedMemo.notebook_id === null ?
                                "ノート指定なし" :
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
                <button
                    className="bg-green-300"
                    onClick={submitMemo}>
                    保存
                </button>
            </div>
        </div>
    )
}