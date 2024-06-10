import Dropdown from "@/Components/Dropdown";
import { AppContext } from "@/Pages/App";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import { useContext, useState } from "react";
import MainTagModal from "./MainTagModal";

export default function MainTagList({ updateTag, destroyTag }) {
    const { allTags } = useContext(AppContext);
    const [open, setOpen] = useState(false);
    const [ renameTag, setRenameTag ] = useState({});
    return (
        <div className="h-full w-full bg-gray-100">
            {allTags.map((tag) => (
                <div key={tag.id}
                    className="flex items-center justify-between h-8 bg-gray-100 px-2 hover:bg-gray-300">
                    <div className="flex">
                        {tag.memos.length}
                        {tag.tag_name}
                    </div>
                    <MainTagModal
                        open={open}
                        onClose={() => setOpen(false)}
                        renameTag={renameTag}
                        setRenameTag={setRenameTag}
                        updateTag={updateTag} />
                    <Dropdown>
                        <Dropdown.Trigger>
                            <EllipsisVerticalIcon className="h-6 w-6 cursor-pointer" />
                        </Dropdown.Trigger>
                        <Dropdown.Content>
                            <Dropdown.Item
                                className="flex items-center cursor-pointer"
                                onClick={() => {setOpen(true), setRenameTag(tag)}}>
                                名前を変更
                            </Dropdown.Item>
                            <Dropdown.Item
                                className="flex items-center cursor-pointer"
                                onClick={() => destroyTag(tag)}>
                                削除
                            </Dropdown.Item>
                        </Dropdown.Content>
                    </Dropdown>
                </div>
            ))}
        </div>
    )
}
