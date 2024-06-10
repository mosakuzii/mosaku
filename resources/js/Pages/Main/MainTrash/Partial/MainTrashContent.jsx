import Dropdown from "@/Components/Dropdown";
import { AppContext } from "@/Pages/App";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import { useContext } from "react";

export default function MainTrashContent({ restoreMemo }) {
    const { selectedDeletedMemo } = useContext(AppContext);
    return (
        <div>
            <div className="h-18 bg-gray-300">
                <div className="flex items-center justify-between">
                    {selectedDeletedMemo.title === null ?
                        <p className="text-gray-600">無題のノート</p> :
                        <p className="text-black">{selectedDeletedMemo.title}</p>
                    }
                    <Dropdown>
                        <Dropdown.Trigger>
                            <EllipsisVerticalIcon className="h-6 w-6 cursor-pointer text-gray-800" aria-hidden="true" />
                        </Dropdown.Trigger>
                        <Dropdown.Content>
                            <Dropdown.Item
                                className="flex items-center cursor-pointer"
                                onClick={restoreMemo}>
                                ノートを復元する
                            </Dropdown.Item>
                        </Dropdown.Content>
                    </Dropdown>
                </div>
                <p className="text-gray-500">
                    {selectedDeletedMemo.notebook_id ?
                        selectedDeletedMemo.notebook.title : "ノート指定なし"}
                </p>
            </div>
            <div className="h-[calc(100vh-6rem)] bg-gray-100">
                {selectedDeletedMemo.content}
            </div>
            <div className="h-6 bg-gray-300 flex items-center">
                {selectedDeletedMemo.tags.length === 0 ?
                    <p className="text-gray-500">タグ指定なし</p> :
                    selectedDeletedMemo.tags.map((tag) => (
                        <p key={tag.id}
                            className="mr-2">
                            {tag.tag_name}
                        </p>
                ))}
            </div>
        </div>
    )
}