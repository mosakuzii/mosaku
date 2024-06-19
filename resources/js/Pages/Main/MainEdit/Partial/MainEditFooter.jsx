import Dropdown from "@/Components/Dropdown";
import { AppContext } from "@/Pages/App";
import { PlusIcon, TagIcon } from "@heroicons/react/20/solid";
import { useContext } from "react";

export default function MainEditFooter() {
    const { selectedMemo, setSelectedMemo, allTags } = useContext(AppContext);
    return (
        <div className="h-8 bg-gray-200 flex items-center justify-start">
            <span className="flex items-center mr-2 cursor-pointer text-gray-800">
                <Dropdown>
                    <Dropdown.Trigger>
                        <div className="flex items-center">
                            <TagIcon className="h-6 w-6 ml-2" aria-hidden="true" />
                            <PlusIcon className="h-4 w-4 -ml-1 mr-1 mb-auto" aria-hidden="true" />
                        </div>
                    </Dropdown.Trigger>
                    <Dropdown.Content>
                        {allTags.map(tag => (
                            <Dropdown.Item
                                key={tag.id}
                                className="flex items-center cursor-pointer"
                                onClick={() => setSelectedMemo({...selectedMemo, tags: [...selectedMemo.tags, tag]})}>
                                    <TagIcon
                                        className="h-4 w-4 mr-1"
                                        style={{ color: tag.tag_color }} />
                                    {tag.tag_name}
                            </Dropdown.Item>
                        ))}
                    </Dropdown.Content>
                </Dropdown>
            </span>
            <span className="flex items-center">
                {selectedMemo.tags.map((tag) => (
                    <div key={tag.id}
                        className="flex items-center bg-white rounded-md max-w-32 mr-2 px-2">
                        <TagIcon className="h-4 w-4 mr-1" style={{ color: tag.tag_color }} />
                        <p className="text-ellipsis overflow-hidden">
                            {tag.tag_name}
                        </p>
                    </div>
                ))}
            </span>
        </div>
    )
}