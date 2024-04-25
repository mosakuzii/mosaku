import { useState, createContext } from 'react';
import MemoForm from "./MemoForm";
import MemoHeader from "./MemoHeader";
import MemoList from "./MemoList";

export const MemoContext = createContext();
export const TagsContext = createContext();

export default function Memo({memos, tags}){
    const [selectedMemo, setSelectedMemo] = useState({
        id: '', title: '', content: '', pinned: false, starred: false, tags: [],
    });

    const [formMemo, setFormMemo] = useState({
        id:'', title:'', content:'', pinned:false, starred:false, tags:[],
    });
    const resetFormMemo = () => {
        setFormMemo({
            id:'', title:'', content:'', pinned:false, starred:false, tags:[],
        });
    };
    const [allMemos, setAllMemos] = useState(memos);
    const [allTags, setAllTags] = useState(tags);

    return (
        <MemoContext.Provider value={{allMemos, setAllMemos, formMemo, setFormMemo, resetFormMemo}}>
        <TagsContext.Provider value={{allTags, setAllTags}}>
            <div className="bg-white h-full w-1/4">
                <MemoList />
            </div>
            <div className="bg-white h-full w-3/4">
                <MemoHeader selectedMemo={selectedMemo} />
                <MemoForm selectedMemo={selectedMemo} />
            </div>
        </TagsContext.Provider>
        </MemoContext.Provider>
    );
}