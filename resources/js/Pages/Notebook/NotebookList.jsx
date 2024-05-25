import TextInput from "@/Components/TextInput";
import { useContext, useState } from "react"
import { NotebookContext } from "./Notebook"

export default function NotebookList ({}){
    const {allNotebooks, setAllNotebooks} = useContext(NotebookContext);
    const {setSelectedNotebook} = useContext(NotebookContext);

    const [createNotebook, setCreateNotebook] = useState({
        title: '', theme_id: '', starred: false
    });
    const storeNotebook = async () => {
        await axios.post('/notebook', createNotebook)
            .then(response => {
                setAllNotebooks(response.data.allNotebooks);
            })
            .catch(error => {
                console.error("Error: ", error);
            });
    };
    return (
        <div>
            NotebookList.jsx
            <div className="md:flex items-center justify-between">
                <TextInput
                    id="notebook_title"
                    type="text"
                    name="notebook_title"
                    placeholder="ノートブック名"
                    className="block w-2/3"
                    value={createNotebook.title}
                    onChange={(e) => setCreateNotebook({ ...createNotebook, title: e.target.value})}
                />
                <button className="bg-gray-500 text-white rounded-md p-1" onClick={() => storeNotebook()}>保存</button>
            </div>
            {allNotebooks && allNotebooks.map(notebook => (
                <div key={notebook.id}
                    className="bg-green-100 hover:bg-green-300"
                    onClick={()=>setSelectedNotebook(notebook)}>
                    {notebook.title}
                </div>
            ))}
        </div>
    )
}