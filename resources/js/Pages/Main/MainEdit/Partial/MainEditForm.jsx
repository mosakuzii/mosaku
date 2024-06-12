import { AppContext } from "@/Pages/App";
import { useContext, useState } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function MainEditForm() {
    const { selectedMemo, setSelectedMemo } = useContext(AppContext);
    const handleContentChange = (content) => {
        setSelectedMemo(prevState => ({
            ...prevState,
            content: content
        }));
    }
    return (
        <div className="h-[calc(100vh-8rem)] bg-gray-100">
            <ReactQuill
                theme="snow"
                placeholder="文字を入力してください"
                value={selectedMemo.content}
                onChange={handleContentChange}
            />
        </div>
    )
}
