import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { BookOpenIcon } from "@heroicons/react/20/solid";
import { useState } from "react";

export default function MainNotebookHeader({ storeNotebook }) {
    const [ newNotebook, setNewNotebook ] = useState({title: "", starred: false});
    return (
        <div className="h-24 p-4">
            <div className="flex items-center">
                <BookOpenIcon className="h-6 w-6 text-gray-800" />
                <p className="text-lg">
                    ノートブック一覧
                </p>
            </div>
            <div className="flex items-center justify-start">
                <TextInput
                    id="new_notebook_title"
                    type="text"
                    name="new_notebook_title"
                    placeholder="ノートブック追加"
                    value={newNotebook.title}
                    onChange={(e) => setNewNotebook({...newNotebook, title: e.target.value})}
                />
                <PrimaryButton
                    className="bg-green-600"
                    onClick={() => storeNotebook(newNotebook)}>
                    追加
                </PrimaryButton>
            </div>
        </div>
    )
}
