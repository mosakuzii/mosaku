import TextInput from "@/Components/TextInput";
import { useState } from "react";

export default function MainTagHeader({ storeTag }) {
    const [ newTag, setNewTag ] = useState({tag_name: "", tag_color: "#00793D"});
    return (
        <div className="bg-gray-200">
            タグ一覧
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
                <button
                    className="bg-green-300"
                    onClick={() => storeTag(newTag)}>
                    追加
                </button>
            </div>
        </div>
    )
}