import Dropdown from "@/Components/Dropdown";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { AppContext } from "@/Pages/App";
import { PencilIcon } from "@heroicons/react/20/solid";
import { useContext } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';

export default function MainHomeInstantMemo({ instantMemo, setInstantMemo, storeInstantMemo }) {
    const { allNotebooks, allTags } = useContext(AppContext);
    return (
        <div className="h-full flex flex-col shadow-xl bg-orange-50">
            <div className="h-8 w-full flex items-center">
                <PencilIcon className="h-5 w-5" />
                インスタントメモ
            </div>
            <div className="h-12 flex items-center justify-between">
                <TextInput
                    id="instant_memo_title"
                    type="text"
                    name="instant_memo_title"
                    placeholder="タイトル"
                    value={instantMemo.title}
                    onChange={(e) => setInstantMemo({...instantMemo, title: e.target.value})}
                />
                <div
                    className={`cursor-pointer ${instantMemo.starred ? "bg-green-500" : "bg-green-200"}`}
                    onClick={() => setInstantMemo({...instantMemo, starred: !instantMemo.starred})}>
                    {instantMemo.starred ?
                        "お気に入り解除" :
                        "お気に入り"}
                </div>
            </div>
            <div className="h-8 flex items-center justify-between">
                <Dropdown>
                    <Dropdown.Trigger>
                        <p className="text-gray-500 cursor-pointer">
                            {instantMemo.notebook_id === null ?
                                "ノート指定なし" : allNotebooks.find(notebook => notebook.id === instantMemo.notebook_id).title}
                        </p>
                    </Dropdown.Trigger>
                    <Dropdown.Content>
                        {allNotebooks.map(notebook => (
                            <Dropdown.Item
                                key={notebook.id}
                                className="cursor-pointer"
                                onClick={() => setInstantMemo({...instantMemo, notebook_id: notebook.id})}>
                                {notebook.title}
                            </Dropdown.Item>
                        ))}
                    </Dropdown.Content>
                </Dropdown>
                <PrimaryButton
                    className="bg-orange-300 hover:bg-orange-500"
                    onClick={storeInstantMemo}>
                    保存
                </PrimaryButton>
            </div>
            <div className="flex-1">
                <ReactQuill
                    className="bg-yellow-50 h-full"
                    theme="bubble"
                    placeholder="文字を入力してください"
                    value={instantMemo.content}
                    onChange={(content) => setInstantMemo({...instantMemo, content})}
                />
            </div>
            <div className="h-8 mt-auto bg-orange-50 flex items-center justify-between">
                <span className="flex items-center">
                    {instantMemo.tags.map((tag) => (
                        <p key={tag.id}
                            className="mr-2">
                            {tag.tag_name}
                        </p>
                    ))}
                </span>
                <span className="flex items-center mr-2 cursor-pointer text-gray-800">
                    <Dropdown>
                        <Dropdown.Trigger>
                            タグを追加
                        </Dropdown.Trigger>
                        <Dropdown.Content>
                            {allTags.map(tag => (
                                <Dropdown.Item
                                    key={tag.id}
                                    className="flex items-center cursor-pointer"
                                    onClick={() => setInstantMemo({...instantMemo, tags: [...instantMemo.tags, tag]})}>
                                        {tag.tag_name}
                                </Dropdown.Item>
                            ))}
                        </Dropdown.Content>
                    </Dropdown>
                </span>
            </div>
        </div>
    )
}
