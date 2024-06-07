import TextInput from "@/Components/TextInput";
import { useState } from "react";

export default function MainNotebookHeader({ storeNotebook }) {
    const [ newNotebook, setNewNotebook ] = useState({title: "", starred: false});
    return (
        <div className="bg-gray-200">
            ノートブック一覧
            <div className="flex items-center justify-start">
                <TextInput
                    id="new_notebook_title"
                    type="text"
                    name="new_notebook_title"
                    placeholder="ノートブック追加"
                    value={newNotebook.title}
                    onChange={(e) => setNewNotebook({...newNotebook, title: e.target.value})}
                />
                <button
                    className="bg-green-300"
                    onClick={() => storeNotebook(newNotebook)}>
                    追加
                </button>
            </div>
        </div>
    )
}
