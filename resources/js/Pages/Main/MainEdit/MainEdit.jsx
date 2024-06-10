import { AppContext } from "@/Pages/App";
import axios from "axios";
import { useContext, useEffect } from "react";
import MainEditFooter from "./Partial/MainEditFooter";
import MainEditForm from "./Partial/MainEditForm";
import MainEditHeader from "./Partial/MainEditHeader";

export default function MainEdit() {
    const { selectedMemo, setSelectedMemo, setAllMemos, setDeletedMemos, setAllNotebooks, setAllTags } = useContext(AppContext);
    const submitMemo = async () => {
        const routeName = selectedMemo.id ? "memo/update" : "memo/store";
        await axios.post(routeName, selectedMemo)
            .then(response => {
                setAllMemos(response.data.allMemos);
                setAllNotebooks(response.data.allNotebooks);
                setAllTags(response.data.allTags);
                const tmp_selectedMemo = 
                    "tags" in response.data.selectedMemo ?
                    response.data.selectedMemo : {...response.data.selectedMemo, tags: []};
                setSelectedMemo(tmp_selectedMemo);
            })
            .catch(error => {
                console.error("Error: ", error);
            });
    }
    const deleteMemo = async () => {
        await axios.delete(`/memo/delete/${selectedMemo.id}`)
            .then(response => {
                console.log(response.data);
                setAllMemos(response.data.allMemos);
                setDeletedMemos(response.data.trashMemos);
                setAllNotebooks(response.data.allNotebooks);
                setAllTags(response.data.allTags);
                setSelectedMemo({
                    notebook_id: null, title: "", content: "", starred: false, tags: []});
            }).catch(error => {
                console.error("Error: ", error);
            });
    }
    return (
        <div className="h-full w-full bg-white">
            <MainEditHeader submitMemo={submitMemo} deleteMemo={deleteMemo} />
            <MainEditForm />
            <MainEditFooter />
        </div>
    )
}