import Dropdown from "@/Components/Dropdown";
import { AppContext } from "@/Pages/App";
import { PlusIcon } from "@heroicons/react/20/solid";
import { useContext } from "react";

export default function MainEditFooter() {
    const { selectedMemo, setSelectedMemo, allTags } = useContext(AppContext);
    return (
        <div className="h-6 bg-gray-300 flex items-center justify-between">
            <span className="flex items-center">
                {selectedMemo.tags.map((tag) => (
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
                                onClick={() => setSelectedMemo({...selectedMemo, tags: [...selectedMemo.tags, tag]})}>
                                    {tag.tag_name}
                            </Dropdown.Item>
                        ))}
                    </Dropdown.Content>
                </Dropdown>
            </span>
        </div>
    )
}