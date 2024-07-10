import { AppContext } from "@/Pages/App";
import { HomeIcon } from "@heroicons/react/20/solid";
import axios from "axios";
import { useContext } from "react";
import MainTrashContent from "./Partial/MainTrashContent";

export default function MainTrash() {
    const { selectedDeletedMemo, setSelectedDeletedMemo, setAllMemos, setDeletedMemos, setAllNotebooks, setAllTags, setMainMode } = useContext(AppContext);
    const restoreMemo = async() => {
        await axios.post(`/memo/restore/${selectedDeletedMemo.id}`)
            .then(response => {
                setAllMemos(response.data.allMemos);
                setDeletedMemos(response.data.trashMemos);
                setAllNotebooks(response.data.allNotebooks);
                setAllTags(response.data.allTags);
                setSelectedDeletedMemo({
                    notebook_id: null, title: "", content: "", starred: false, tags: []});
            }).catch(error => {
                console.error("Error: ", error);
            });
    }
    return (
        <div className="h-full w-full p-2">
            <div className="h-8 flex items-center text-gray-500 cursor-pointer"
                onClick={() => setMainMode("home")}>
                <HomeIcon className="h-6 w-6" />
                <p className="text-lg">ホームへ戻る</p>
            </div>
            <div className="h-[calc(100%-2rem)] rounded-md shadow-lg border-2">
                <MainTrashContent restoreMemo={restoreMemo} />
            </div>
        </div>
    )
}
