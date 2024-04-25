import { BookOpenIcon, PencilSquareIcon } from "@heroicons/react/20/solid";
import { useContext } from "react";
import { MemoContext } from "./Memo";

export default function MemoList(){
    const {allMemos, formMemo, setFormMemo} = useContext(MemoContext);
    const selectMemo = (memo) =>{
        const tmp_memo = {
            id: memo.id,
            title: memo.title !== null ? memo.title : '',
            content: memo.content !== null ? memo.content : '',
            pinned: memo.pinned,
            starred: memo.starred,
            tags: memo.tags,
        };
        setFormMemo(tmp_memo);
    }
    return (
        <div className="h-full">
            <div className="flex items-center justify-start h-8 border-b-2 border-green-700 mx-1 pt-2">
                <BookOpenIcon className="h-5 text-green-800"/>
                <h3>メモ一覧</h3>
            </div>
            <div className='h-[calc(100%-2rem)] overflow-y-auto px-1'>
                {allMemos.map((memo) => (
                    <div key={memo.id}
                        onClick={() => selectMemo(memo)}
                        className={`border-b border-gray-400 hover:bg-green-100 ${memo.id === formMemo.id && 'bg-green-100'} cursor-pointer pl-1 pr-4 relative group`}>
                        <div className="text-gray-700 text-ellipsis overflow-hidden">
                            {memo.title ? memo.title : "無題"}
                        </div>
                        <div className="text-gray-400 text-ellipsis overflow-hidden pl-1">
                            {memo.content ? memo.content : "(内容がありません)"}
                        </div>
                        <div className="invisible group-hover:visible absolute top-0 right-0 flex items-center justify-center h-full w-10">
                            <PencilSquareIcon className="h-5 w-5 text-green-600" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}