import { AppContext } from "@/Pages/App";
import { BookOpenIcon, PencilIcon, TagIcon } from "@heroicons/react/20/solid";
import { useContext } from "react";

export default function SidebarSearch() {
    const { setMainMode, setSelectedMemo, setNoteListOpen } = useContext(AppContext);
    return (
        <div className="h-24">
            <div className="h-12 bg-green-100 flex items-center justify-center">
                <button className="w-full bg-green-300 hover:bg-green-500 cursor-pointer">
                    <div className="flex items-center justify-center"
                        onClick={() => {setMainMode("edit"), setNoteListOpen(false), setSelectedMemo({
                            notebook_id: null, title: "", content: "", starred: false, tags: []})}}>
                        <PencilIcon className="h-5 w-5 m-1" />
                        <p>新しいメモ</p>
                    </div>
                </button>
            </div>
            <div className="h-12 bg-green-100 flex items-center justify-between">
                <button className="w-1/2 bg-green-300 hover:bg-green-500 cursor-pointer">
                    <div className="flex items-center justify-center"
                        onClick={() => {setMainMode("notebook"), setNoteListOpen(false)}}>
                        <BookOpenIcon className="h-5 w-5 m-1" />
                        <p>新しいノートブック</p>
                    </div>
                </button>
                <button className="w-1/2 bg-green-300 hover:bg-green-500 cursor-pointer">
                    <div className="flex items-center justify-center"
                        onClick={() => {setMainMode("tag"), setNoteListOpen(false)}}>
                        <TagIcon className="h-5 w-5 m-1" />
                        <p>新しいタグ</p>
                    </div>
                </button>
            </div>
            {/* TODO: SidebarSearch.jsx */}
        </div>
    )
}