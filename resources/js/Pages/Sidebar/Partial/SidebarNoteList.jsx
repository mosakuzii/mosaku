import { AppContext } from "@/Pages/App";
import { useContext } from "react";

export default function SidebarNoteList() {
    const { allMemos, setSelectedMemo } = useContext(AppContext);
    return (
        <div className="fixed top-0 left-1/4 h-full w-1/4 bg-green-500 shadow-lg transition-transform transform translate-x-0 overflow-y-auto">
            <div className="sticky top-0 bg-green-600 p-2">
                SidebarNoteList.jsx
            </div>
            {allMemos.map((memo) => (
                <div
                    key={memo.id}
                    className="h-24 bg-green-50 hover:bg-green-200 cursor-pointer"
                    onClick={() => {setSelectedMemo(memo)}}>
                    {memo.title === null ?
                        <p className="text-gray-600">無題のノート</p> :
                        <p className="text-black">{memo.title}</p>
                    }
                </div>
            ))}
        </div>
    )
}
