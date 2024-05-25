import TextInput from "@/Components/TextInput";
import axios from "axios"
import { useContext, useState } from "react";
import { NotebookContext } from "./Notebook";

export default function NotebookHeader ({}){
    const {setAllNotebooks} = useContext(NotebookContext);
    const {selectedNotebook, setSelectedNotebook} = useContext(NotebookContext);
    const [notebookEditMode, setNotebookEditMode] = useState(false);
    const updateNotebook = async () => {
        await axios.put(`/notebook/${selectedNotebook}`, selectedNotebook)
            .then(response => {
                setAllNotebooks(response.data.allNotebooks);
                setNotebookEditMode(false);
            })
            .catch(error => {
                console.error("Error: ", error);
            });
    };
    const destroyNotebook = async () => {
        await axios.delete(`/notebook/${selectedNotebook.id}`, selectedNotebook.id)
            .then(response => {
                setAllNotebooks(response.data.allNotebooks);
                setSelectedNotebook({});
                setNotebookEditMode(false);
            })
            .catch(error => {
                console.error("Error: ", error);
            });
    };
    return (
        <div>
            NotebookHeader.jsx
            {notebookEditMode ? 
                <div>
                    <TextInput
                        type="text"
                        placeholder="ノートブック名"
                        className="block w-2/3"
                        value={selectedNotebook.title}
                        onChange={(e) => setSelectedNotebook({ ...selectedNotebook, title: e.target.value})}
                    />
                    <button
                        className="bg-gray-500 text-white rounded-md p-1"
                        onClick={() => updateNotebook()}>保存</button>
                    <button
                        className="bg-gray-500 text-white rounded-md p-1"
                        onClick={() => destroyNotebook()}>削除</button>
                </div>:
                <div>
                    <p className="hover:bg-green-300"
                        onClick={()=>setNotebookEditMode(true)}>
                        {selectedNotebook.title}
                    </p>
                </div>
            }
        </div>
    )
}