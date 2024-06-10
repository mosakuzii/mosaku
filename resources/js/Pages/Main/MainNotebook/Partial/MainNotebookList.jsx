import Dropdown from "@/Components/Dropdown";
import { AppContext } from "@/Pages/App";
import { BookOpenIcon, EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import { useContext, useState } from "react";
import MainNotebookModal from "./MainNotebookModal";

export default function MainNotebookList({ updateNotebook, destroyNotebook }) {
    const { allNotebooks } = useContext(AppContext);
    const [open, setOpen] = useState(false);
    const [ renameNotebook, setRenameNotebook ] = useState({});
    return (
        <div className="h-full w-full bg-gray-100">
            {allNotebooks.map((notebook) => (
                <div key={notebook.id}
                    className="flex items-center justify-between h-8 bg-gray-100 px-2 hover:bg-gray-300">
                    <div className="flex">
                        {notebook.memos.length}
                        {notebook.title}
                    </div>
                    <MainNotebookModal
                        open={open}
                        onClose={() => setOpen(false)}
                        renameNotebook={renameNotebook}
                        setRenameNotebook={setRenameNotebook}
                        updateNotebook={updateNotebook} />
                    <Dropdown>
                        <Dropdown.Trigger>
                            <EllipsisVerticalIcon className="h-6 w-6 cursor-pointer" />
                        </Dropdown.Trigger>
                        <Dropdown.Content>
                            <Dropdown.Item
                                className="flex items-center cursor-pointer"
                                onClick={() => updateNotebook({...notebook, starred: !notebook.starred})}>
                                {notebook.starred ? "お気に入り解除" : "お気に入り"}
                            </Dropdown.Item>
                            <Dropdown.Item
                                className="flex items-center cursor-pointer"
                                onClick={() => {setOpen(true), setRenameNotebook(notebook)}}>
                                名前を変更
                            </Dropdown.Item>
                            <Dropdown.Item
                                className="flex items-center cursor-pointer"
                                onClick={() => destroyNotebook(notebook)}>
                                削除
                            </Dropdown.Item>
                        </Dropdown.Content>
                    </Dropdown>
                </div>
            ))}
        </div>
    )
}