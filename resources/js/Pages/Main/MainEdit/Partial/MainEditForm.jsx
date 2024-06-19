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
        <ReactQuill
            className="bg-white h-[calc(100%-10rem)] react-quill-custom"
            theme="snow"
            placeholder="文字を入力してください"
            value={selectedMemo.content}
            onChange={handleContentChange}
        />
    )
}
