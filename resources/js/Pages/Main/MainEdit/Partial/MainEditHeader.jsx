import Dropdown from "@/Components/Dropdown";
import TextInput from "@/Components/TextInput";
import { AppContext } from "@/Pages/App";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import { useContext } from "react";

export default function MainEditHeader({ submitMemo, deleteMemo }) {
    const { selectedMemo, setSelectedMemo, allNotebooks } = useContext(AppContext);
    return (
        <div className="h-18 bg-gray-300">
            <div className="flex items-center justify-between">
                <TextInput
                    id="memo_title"
                    type="text"
                    name="memo_title"
                    placeholder="タイトル"
                    value={selectedMemo.title}
                    onChange={(e) => setSelectedMemo({...selectedMemo, title: e.target.value})}
                />
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
                                onClick={deleteMemo}>
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
                            {selectedMemo.notebook_id ?
                                allNotebooks.find(notebook => notebook.id === selectedMemo.notebook_id).title : "ノート指定なし"}
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