import TextInput from "@/Components/TextInput";
import { Menu } from "@headlessui/react";
import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon, TagIcon, XMarkIcon } from "@heroicons/react/20/solid";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { NotebookContext } from "../Notebook";

export default function NotebookForm ({ tags }){
    const {setAllNotebooks, selectedNotebook, setSelectedNotebook} = useContext(NotebookContext);
    const [pages, setPages] = useState([]);
    const [currentPageNumber, setCurrentPageNumber] = useState(1);
    const [notebookEditMode, setNotebookEditMode] = useState(false);
    const [formNote, setFormNote] = useState({
        notebook_id: null, page_number: currentPageNumber, content: "", attachedTags: [],
    });

    const previousPage = () => {
        setCurrentPageNumber(prevcurrentPageNumber => Math.max(prevcurrentPageNumber-1, 1));
    };
    const nextPage = () => {
        setCurrentPageNumber(prevcurrentPageNumber => prevcurrentPageNumber+1);
    };

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
    const saveNotebook = async () => {
        try {
            console.log("formNote: ", formNote);
            await setFormNote({ ...formNote, notebook_id: selectedNotebook.id });
            await axios.post('/page', formNote);
            await pages.push(formNote);
        } catch (error) {
            console.error("Error: ", error);
        }
    };
    useEffect(() => {
        console.log("currentPageNumber: ", currentPageNumber);
        const currentPage = pages.find(page => page.page_number === currentPageNumber);
        console.log("currentPage: ", currentPage);
        if(currentPage){
            setFormNote({
                ...currentPage,
                content: currentPage.content || ""
            });
        } else {
            setFormNote({
                notebook_id: selectedNotebook.id,
                page_number: currentPageNumber,
                content: ""
            });
        }
    }, [currentPageNumber]);

    const getPage = async () => {
        try{
            const response = await axios.post("/page/get-pages", selectedNotebook)
            console.log("response: ", response.data.pages);
            const last_page = response.data.pages.length ?
                response.data.pages[response.data.pages.length-1] :
                { notebook_id: selectedNotebook.id, page_number: 1 , content: "" };
            await setPages(response.data.pages);
            await setFormNote({ notebook_id: selectedNotebook.id, page_number: last_page.page_number, content: last_page.content, attachedTags: selectedNotebook.attachedTags});
            await setCurrentPageNumber(last_page.page_number);
        } catch(error){
            console.error("Error: ", error);
        }
    };
    useEffect(() => {
        console.log("selectedNotebook: ", selectedNotebook);
        console.log("formNote: ", formNote);
        if (selectedNotebook.id) {
            getPage();
        }
    }, [selectedNotebook]);

    return (
        <div>
            <div className="flex items-center justify-start">
                {selectedNotebook.attachedTags &&
                    selectedNotebook.attachedTags.map(tag => (
                        <div key={tag.id} className="flex items-center justify-center bg-gray-200 rounded-md p-1 m-1">
                            <p>{tag.tag_name}</p>
                        </div>
                    ))
                }
            </div>
            <div className="flex items-center justify-end">
                {notebookEditMode ? 
                    <div>
                        <TextInput
                            type="text"
                            placeholder="ノートブック名"
                            className="block w-2/3"
                            value={selectedNotebook.title}
                            onChange={(e) => setSelectedNotebook({ ...selectedNotebook, title: e.target.value})}
                        />
                        <XMarkIcon className="h-5 w-5 text-gray-600 cursor-pointer" onClick={() => setNotebookEditMode(false)} />
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
                <Menu as="div" className="relative inline-block text-right">
                    <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none">
                        <TagIcon className="h-5 w-5" />
                        タグを選択
                        <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
                    </Menu.Button>
                    <Menu.Items className="absolute right-0 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        {tags.map((tag) => (
                            <Menu.Item
                                key={tag.id}
                                className="hover:bg-gray-100"
                                onClick={() => setSelectedNotebook({...selectedNotebook, attachedTags: [...selectedNotebook.attachedTags, tag]})}>
                                <div className="flex items-center justify-start">
                                    <TagIcon className="h-5 w-5" style={{ color: tag.tag_color }} />
                                    <span>{tag.tag_name}</span>
                                </div>
                            </Menu.Item>
                        ))}
                    </Menu.Items>
                </Menu>
                <button
                    className="bg-gray-500 text-white rounded-md p-1"
                    onClick={() => saveNotebook()}>保存</button>
            </div>
            <div className="flex items-center justify-between">
                <textarea
                    key={currentPageNumber}
                    placeholder={`${currentPageNumber}ページ目`}
                    className="block w-full"
                    value={formNote.content}
                    onChange={(e) => setFormNote({ ...formNote, content: e.target.value})}
                />
            </div>
            <p>{currentPageNumber}ページ目</p>
            <div className="flex items-center justify-between">
                <button className="bg-green-500 text-white rounded-md p-1" onClick={() => previousPage()}>
                    <ChevronLeftIcon className="h-4 w-4"/>
                </button>
                <button className="bg-green-500 text-white rounded-md p-1" onClick={() => nextPage()}>
                    <ChevronRightIcon className="h-4 w-4"/>
                </button>
            </div>
        </div>
    )
}