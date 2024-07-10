import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { TagIcon } from "@heroicons/react/20/solid";
import { useState } from "react";

export default function MainTagHeader({ storeTag }) {
    const [ newTag, setNewTag ] = useState({tag_name: "", tag_color: "#00793D"});
    return (
        <div className="h-24 p-4">
            <div className="flex items-center">
                <TagIcon className="h-6 w-6 text-gray-800" />
                <p className="text-lg">
                    タグ一覧
                </p>
            </div>
            <div className="flex items-center justify-start">
                <input
                    id="new_tag_color"
                    type="color"
                    name="new_tag_color"
                    value={newTag.tag_color}
                    onChange={(e) => setNewTag({...newTag, tag_color: e.target.value})}
                />
                <TextInput
                    id="new_tag_title"
                    type="text"
                    name="new_tag_title"
                    placeholder="タグ追加"
                    value={newTag.tag_name}
                    onChange={(e) => setNewTag({...newTag, tag_name: e.target.value})}
                />
                <PrimaryButton
                    className="bg-green-600"
                    onClick={() => storeTag(newTag)}>
                    追加
                </PrimaryButton>
            </div>
        </div>
    )
}