import Dropdown from "@/Components/Dropdown";
import { AppContext } from "@/Pages/App";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon, EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import { useContext, useState } from "react";
import MainTagModal from "./MainTagModal";

export default function MainTagList({ updateTag, destroyTag }) {
    const { allTags } = useContext(AppContext);
    const [open, setOpen] = useState(false);
    const [ renameTag, setRenameTag ] = useState({});
    return (
        <div className="h-full w-full bg-gray-100">
            {allTags.map((tag) => (
                <Disclosure key={tag.id}>
                    {({ open }) => (
                        <>
                            <Disclosure.Button className="flex items-center justify-between h-8 bg-gray-100 px-2 hover:bg-gray-300">
                                <div className="flex items-center">  
                                    <ChevronUpIcon className={`${open ? "transform rotate-180" : ""} h-5 w-5`} />
                                    {tag.memos.length}
                                    {tag.tag_name}
                                </div>
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
                                            onClick={() => {
                                                const tagName = tag.tag_name || "無題のタグ";
                                                if(window.confirm(`${tagName} を削除しますか？`)){
                                                    destroyTag(tag);
                                                }}}>
                                            削除
                                        </Dropdown.Item>
                                    </Dropdown.Content>
                                </Dropdown>
                            </Disclosure.Button>
                            <Disclosure.Panel className="bg-gray-200 p-2">
                                {tag.memos.map((memo) => (
                                    <div key={memo.id} className="flex items-center">
                                        {memo.title}
                                    </div>
                                ))}
                            </Disclosure.Panel>
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
