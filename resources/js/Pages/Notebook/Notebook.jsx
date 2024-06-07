import { createContext, useState } from "react";
import NotebookForm from "./NotebookForm/NotebookForm";
import NotebookFormHeader from "./NotebookForm/NotebookFormHeader";
import NotebookModal from "./NotebookModal/NotebookModal";

export const NotebookContext = createContext();

export default function Notebook ({notebooks, tags}){
    const [allNotebooks, setAllNotebooks] = useState(notebooks);
    const [selectedNotebook, setSelectedNotebook] = useState({
        id: '', title: '', theme_id: false, starred: false,
    });
    const [open, setOpen] = useState(false);
    return (
        <NotebookContext.Provider value={{allNotebooks, setAllNotebooks, selectedNotebook, setSelectedNotebook}}>
            <div className="w-full">
                <NotebookModal open={open} onClose={() => setOpen(false)} />
                <button className="bg-green-500 hover:bg-green-700 text-white font-bold rounded-md p-1" onClick={() => setOpen(true)} value="New">
                    Notebook Modal
                </button>
                <NotebookForm tags={tags} />
            </div>
        </NotebookContext.Provider>
    )
}