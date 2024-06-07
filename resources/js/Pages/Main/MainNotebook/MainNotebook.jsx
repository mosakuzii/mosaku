import { AppContext } from "@/Pages/App";
import { useContext } from "react";
import MainNotebookHeader from "./Partial/MainNotebookHeader";
import MainNotebookList from "./Partial/MainNotebookList";

export default function MainNotebook() {
    const { setAllNotebooks } = useContext(AppContext);
    const storeNotebook = async (notebook) => {
        await axios.post("notebook", notebook)
            .then(response => {
                setAllNotebooks(response.data.allNotebooks);
            })
            .catch(error => {
                console.error("Error: ", error);
            });
    }
    const updateNotebook = async (notebook) => {
        await axios.put(`notebook/${notebook}`, notebook)
            .then(response => {
                setAllNotebooks(response.data.allNotebooks);
            })
            .catch(error => {
                console.error("Error: ", error);
            });
    }
    const destroyNotebook = async (notebook) => {
        await axios.delete(`notebook/${notebook.id}`, notebook.id)
            .then(response => {
                setAllNotebooks(response.data.allNotebooks);
            })
            .catch(error => {
                console.error("Error: ", error);
            });
    }

    return (
        <div className="h-full w-full bg-white">
            <MainNotebookHeader storeNotebook={storeNotebook} />
            <div className="h-[calc(100vh-5rem)] bg-gray-100">
                <MainNotebookList updateNotebook={updateNotebook} destroyNotebook={destroyNotebook} />
            </div>
        </div>
    )
}