import { AppContext } from "@/Pages/App";
import { useContext } from "react";

export default function SidebarTrashList() {
    const { deletedMemos, setSelectedDeletedMemo } = useContext(AppContext);
    return (
        <div className="fixed top-0 left-1/4 h-full w-1/4 bg-gray-300 shadow-lg transition-transform transform translate-x-0 overflow-y-auto">
            <div className="sticky top-0 bg-gray-200 p-2">
                SidebarTrashList.jsx
            </div>
            {deletedMemos.map((memo) => (
                <div
                    key={memo.id}
                    className="h-24 bg-gray-50 hover:bg-gray-200 cursor-pointer"
                    onClick={() => setSelectedDeletedMemo(memo)}>
                    {memo.title === null ?
                        <p className="text-gray-600">無題のノート</p> :
                        <p className="text-black">{memo.title}</p>
                    }
                </div>
            ))}
        </div>
    )
}