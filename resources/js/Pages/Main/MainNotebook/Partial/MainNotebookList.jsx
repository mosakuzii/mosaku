import Dropdown from "@/Components/Dropdown";
import { AppContext } from "@/Pages/App";
import { Disclosure } from "@headlessui/react";
import { BookOpenIcon, ChevronUpIcon, EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import { useContext, useState } from "react";
import MainNotebookModal from "./MainNotebookModal";

export default function MainNotebookList({ updateNotebook, destroyNotebook }) {
    const { allNotebooks } = useContext(AppContext);
    const [open, setOpen] = useState(false);
    const [ renameNotebook, setRenameNotebook ] = useState({});
    return (
        <div className="h-full w-full bg-gray-100">
            {allNotebooks.map((notebook) => (
                <Disclosure key={notebook.id}>
                    {({ open }) => (
                        <>
                            <Disclosure.Button className="flex items-center justify-between h-8 bg-gray-100 px-2 hover:bg-gray-300">
                                <div className="flex items-center">
                                    <ChevronUpIcon className={`${open ? "transform rotate-180" : ""} h-5 w-5`} />
                                    {notebook.memos.length}
                                    {notebook.title || "無題のノートブック"}
                                </div>
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
                                            onClick={() => {
                                                const notebookTitle = notebook.title || "無題のノートブック";
                                                if(window.confirm(`${notebookTitle} を削除しますか？`)){
                                                    destroyNotebook(notebook);
                                                }}}>
                                            削除
                                        </Dropdown.Item>
                                    </Dropdown.Content>
                                </Dropdown>
                            </Disclosure.Button>
                            <Disclosure.Panel className="bg-gray-200 p-2">
                                {notebook.memos.map((memo) => (
                                    <div key={memo.id} className="flex items-center">
                                        {memo.title}
                                    </div>
                                ))}
                            </Disclosure.Panel>
                        </>
                    )}
                </Disclosure>
            ))}
            <MainNotebookModal
                open={open}
                onClose={() => setOpen(false)}
                renameNotebook={renameNotebook}
                setRenameNotebook={setRenameNotebook}
                updateNotebook={updateNotebook} />
        </div>
    )
}