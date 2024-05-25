import { createContext, useState } from "react";
import NotebookForm from "./NotebookForm";
import NotebookHeader from "./NotebookHeader";
import NotebookList from "./NotebookList";

export const NotebookContext = createContext();

export default function Notebook ({notebooks, tags}){
    const [allNotebooks, setAllNotebooks] = useState(notebooks);
    const [selectedNotebook, setSelectedNotebook] = useState({
        id: '', title: '', theme_id: false, starred: false,
    });
    return (
        <NotebookContext.Provider value={{allNotebooks, setAllNotebooks, selectedNotebook, setSelectedNotebook}}>
            <div className="w-full">
                Notebook.jsx
                <NotebookList />
                <NotebookHeader />
                <NotebookForm />
            </div>
        </NotebookContext.Provider>
    )
}