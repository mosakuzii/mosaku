import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { AppContext } from "@/Pages/App";
import { BookOpenIcon, PencilIcon, TagIcon } from "@heroicons/react/20/solid";
import { useContext } from "react";

export default function SidebarSearch() {
    const { setMainMode, setSelectedMemo, setNoteListOpen } = useContext(AppContext);
    return (
        <div className="h-36 bg-green-50 px-2">
            <TextInput
                id="search"
                type="text"
                name="search"
                placeholder="検索"
                className="w-full h-12"
            />
            <div className="h-12 flex items-center justify-center">
                <PrimaryButton className="w-full h-10 bg-green-300 hover:bg-green-500">
                    <div className="flex items-center justify-center"
                        onClick={() => {setMainMode("edit"), setNoteListOpen(false), setSelectedMemo({
                            notebook_id: null, title: "", content: "", starred: false, tags: []})}}>
                        <PencilIcon className="h-8 w-8 text-gray-600" />
                        <p className="ml-1 text-gray-600 text-base">ノート</p>
                    </div>
                </PrimaryButton>
            </div>
            <div className="h-12 flex items-center justify-center">
                <PrimaryButton className="w-2/3 h-10 mr-1 bg-blue-300 hover:bg-blue-500">
                    <div className="flex items-center justify-center"
                        onClick={() => {setMainMode("notebook"), setNoteListOpen(false)}}>
                        <BookOpenIcon className="h-8 w-8 text-gray-600" />
                        <p className="ml-1 text-gray-600 text-base">ノートブック</p>
                    </div>
                </PrimaryButton>
                <PrimaryButton className="w-1/3 h-10 ml-1 bg-yellow-300 hover:bg-yellow-500">
                    <div className="flex items-center justify-center"
                        onClick={() => {setMainMode("tag"), setNoteListOpen(false)}}>
                        <TagIcon className="h-8 w-8 text-gray-600" />
                        <p className="ml-1 text-gray-600 text-base">タグ</p>
                    </div>
                </PrimaryButton>
            </div>
            {/* TODO: SidebarSearch.jsx */}
        </div>
    )
}