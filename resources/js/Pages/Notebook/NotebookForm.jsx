import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import axios from "axios";
import { useContext, useState } from "react";
import { NotebookContext } from "./Notebook";

export default function NotebookForm ({}){
    const {selectedNotebook} = useContext(NotebookContext);
    const [page, setPage] = useState({
        notebook_id: null, page_number: null, content: null
    });
    const [pageNumber, setPageNumber] = useState(1);
    const previousPage = async () => {
        setPageNumber(prevPageNumber => Math.max(prevPageNumber-1, 1));
    }
    const nextPage = async () => {
        setPageNumber(prevPageNumber => prevPageNumber+1);
    }
    const saveNotebook = async () => {
        console.log("save Notebook!");
        console.log(selectedNotebook);
        //await axios.post('/page')
    };
    return (
        <div>
            NotebookForm.jsx
            <div className="md:flex items-center justify-between">
                <button
                    className="bg-gray-500 text-white rounded-md p-1"
                    onClick={() => saveNotebook()}>保存</button>
                <textarea
                    key={pageNumber}
                    className="block w-full md:w-1/2"
                />
                {pageNumber}
                <textarea
                    key={pageNumber+1}
                    className="hidden w-1/2 md:block"
                />
                {pageNumber+1}
            </div>
            <div className="md:flex items-center justify-between">
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