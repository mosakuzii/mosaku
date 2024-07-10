import { AppContext } from "@/Pages/App";
import { useContext } from "react";
import MainNotebookHeader from "./Partial/MainNotebookHeader";
import MainNotebookList from "./Partial/MainNotebookList";

export default function MainNotebook() {
    const { setAllNotebooks, setAllMemos } = useContext(AppContext);
    const storeNotebook = async (notebook) => {
        try{
            const response = await axios.post("notebook", notebook);
            await setAllNotebooks(response.data.allNotebooks);
        }catch(error) {
            console.error("Error: ", error);
        }
    }
    const updateNotebook = async (notebook) => {
        try{
            const response = await axios.put(`notebook/${notebook}`, notebook);
            await setAllNotebooks(response.data.allNotebooks);
        }catch(error) {
            console.error("Error: ", error);
        }
    }
    const destroyNotebook = async (notebook) => {
        try{
            const response = await axios.delete(`notebook/${notebook.id}`, notebook.id);
            await setAllNotebooks(response.data.allNotebooks);
            await setAllMemos(response.data.allMemos);
        }catch(error) {
            console.error("Error: ", error);
        }
    }

    return (
        <div className="h-full w-full p-2">
            <div className="h-full rounded-md shadow-lg border-2">
                <MainNotebookHeader storeNotebook={storeNotebook} />
                <MainNotebookList updateNotebook={updateNotebook} destroyNotebook={destroyNotebook} />
            </div>
        </div>
    )
}