import { AppContext } from "@/Pages/App";
import { useContext } from "react";

export default function MainEditForm() {
    const { selectedMemo, setSelectedMemo } = useContext(AppContext);
    return (
        <div className="h-[calc(100vh-8rem)] bg-gray-100">
            <textarea
                id="memo_content"
                value={selectedMemo.content}
                placeholder="文字を入力してください"
                onChange={(e) => setSelectedMemo({...selectedMemo, content: e.target.value})}
            />
        </div>
    )
}
