import { Menu } from "@headlessui/react";
import { ChevronDownIcon, TagIcon } from "@heroicons/react/20/solid";
import { useContext, useState } from "react"
import { NotebookContext } from "../../Notebook"
import { AppContext } from "../../../App"

export default function NotebookModalList ({}){
    const {allNotebooks, setAllNotebooks} = useContext(NotebookContext);
    const {setSelectedNotebook} = useContext(NotebookContext);
    const {allTags} = useContext(AppContext);
    const saveNotebook = async (notebook) => {
        console.log("notebook: ", notebook);
        // await axios.post('/notebook', selectedNotebook)
        //     .then(response => {
        //         setAllNotebooks(response.data.allNotebooks);
        //         setSelectedNotebook({});
        //     })
        //     .catch(error => {
        //         console.error("Error: ", error);
        //     });
    };

    return (
        <div>
            {allNotebooks && allNotebooks.map(notebook => (
                <div key={notebook.id}
                    className="flex items-center justify-between">
                    {notebook.title}
                    <div>
                        <button
                            className="bg-green-500 hover:bg-green-700 text-white font-bold rounded-md p-1"
                            onClick={() => console.log("Edit: ", notebook)}>Edit
                        </button>
                        <button
                            className="bg-red-500 hover:bg-red-700 text-white font-bold rounded-md p-1"
                            onClick={() => console.log("Delete: ", notebook)}>Delete
                        </button>
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-md p-1"
                            onClick={() => setSelectedNotebook({...notebook, attachedTags:[]})}>Select
                        </button>
                        <Menu as="div" className="inline-block text-right">
                            <Menu.Button className="inline-flex justify-center rounded-md border border-gray-300 shadow-sm p-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">
                                <TagIcon className="h-5 w-5" />
                                タグを選択
                                <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
                            </Menu.Button>
                            <Menu.Items className="right-0 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                {allTags.map((tag) => (
                                    <Menu.Item
                                        key={tag.id}
                                        className="hover:bg-gray-100"
                                        onClick={() => console.log("Tag: ", tag)}>
                                        <div className="flex items-center justify-start">
                                            <TagIcon className="h-5 w-5" style={{ color: tag.tag_color }} />
                                            <p>{tag.tag_name}</p>
                                        </div>
                                    </Menu.Item>
                                ))}
                            </Menu.Items>
                        </Menu>
                        <button
                            className="bg-gray-500 hover:bg-gray-700 text-white font-bold rounded-md p-1"
                            onClick={() => saveNotebook(notebook)}>Save
                        </button>
                    </div>
                </div>
            ))}
        </div>
    )
}