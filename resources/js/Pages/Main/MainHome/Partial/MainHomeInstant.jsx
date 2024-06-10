import { AppContext } from "@/Pages/App";
import { PencilIcon } from "@heroicons/react/20/solid";
import { useContext, useState } from "react";
import MainHomeInstantMemo from "./MainHomeInstantMemo";

export default function MainHomeInstant() {
    const { setAllMemos, setAllNotebooks, setAllTags } = useContext(AppContext);
    const [instantMemo, setInstantMemo] = useState({
        notebook_id: null, title: "", content: "", starred: false, tags: []});

    const storeInstantMemo = async () => {
        console.log("storeInstantMemo", instantMemo);
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
        <div className="h-2/5 bg-gray-200">
            <div className="h-8 w-full bg-gray-300 flex px-2">
                <PencilIcon className="h-5 w-5 mr-1" />
                インスタントメモ
            </div>
            <div className="h-[calc(40vh-3rem)] bg-gray-100">
                <MainHomeInstantMemo
                    instantMemo={instantMemo}
                    setInstantMemo={setInstantMemo}
                    storeInstantMemo={storeInstantMemo}
                 />
            </div>
        </div>
    )
}
