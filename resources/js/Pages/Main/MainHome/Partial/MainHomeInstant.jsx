import { AppContext } from "@/Pages/App";
import { PencilIcon } from "@heroicons/react/20/solid";
import { useContext, useState } from "react";
import MainHomeInstantMemo from "./MainHomeInstantMemo";

export default function MainHomeInstant() {
    const { setAllMemos, setAllNotebooks, setAllTags } = useContext(AppContext);
    const [instantMemo, setInstantMemo] = useState({
        notebook_id: null, title: "", content: "", starred: false, tags: []});

    const storeInstantMemo = async () => {
        await axios.post("memo/store", instantMemo)
            .then(response => {
                setAllMemos(response.data.allMemos);
                setAllNotebooks(response.data.allNotebooks);
                setAllTags(response.data.allTags);
                setInstantMemo({
                    notebook_id: null, title: "", content: "", starred: false, tags: []});
            })
            .catch(error => {
                console.error("Error: ", error);
            });
    }
    return (
        <div className="h-[calc(2*(100%-8rem)/5)] p-4">
            <MainHomeInstantMemo
                instantMemo={instantMemo}
                setInstantMemo={setInstantMemo}
                storeInstantMemo={storeInstantMemo}
             />
        </div>
    )
}
