import { AppContext } from "@/Pages/App";
import axios from "axios";
import { useContext } from "react";
import MainTrashContent from "./Partial/MainTrashContent";

export default function MainTrash() {
    const { selectedDeletedMemo, setSelectedDeletedMemo, setAllMemos, setDeletedMemos, setAllNotebooks, setAllTags } = useContext(AppContext);
    const restoreMemo = async() => {
        console.log("Restore", selectedDeletedMemo);
        await axios.post(`/memo/restore/${selectedDeletedMemo.id}`)
            .then(response => {
                console.log(response.data);
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
        <div className="h-full w-full bg-white">
            <MainTrashContent restoreMemo={restoreMemo} />
        </div>
    )
}
