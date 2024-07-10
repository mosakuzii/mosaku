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
        try {
            const response = await axios.post(routeName, selectedMemo);
            await setAllMemos(response.data.allMemos);
            await setAllNotebooks(response.data.allNotebooks);
            await setAllTags(response.data.allTags);
            const tmp_selectedMemo = 
                "tags" in response.data.selectedMemo ?
                response.data.selectedMemo : {...response.data.selectedMemo, tags: []};
            await setSelectedMemo(tmp_selectedMemo);

        } catch(error) {
            console.error("Error: ", error);
        }
    }
    const deleteMemo = async () => {
        try{
            const response = await axios.delete(`/memo/delete/${selectedMemo.id}`);
            await setAllMemos(response.data.allMemos);
            await setDeletedMemos(response.data.trashMemos);
            await setAllNotebooks(response.data.allNotebooks);
            await setAllTags(response.data.allTags);
            await setSelectedMemo({
                id: null, notebook_id: null, title: "", content: "", starred: false, notebook: {}, tags: []});
        } catch(error){
            console.error("Error: ", error);
        }
    }
    return (
        <div className="h-full w-full p-2">
            <div className="h-full rounded-md shadow-lg border-2">
                <MainEditHeader submitMemo={submitMemo} deleteMemo={deleteMemo} />
                <MainEditForm />
                <MainEditFooter />
            </div>
        </div>
    )
}