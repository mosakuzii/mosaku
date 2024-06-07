import { BookOpenIcon, XMarkIcon } from "@heroicons/react/20/solid";
import NotebookModalAddForm from "./NotebookModalAddForm";
import NotebookModalList from "./NotebookModalList/NotebookModalList";

export default function NotebookModal({ open, onClose }){
    return (
        <div onClick={onClose} className={`
            fixed inset-0 flex justify-center items-center
            transition-colors
            ${open ? "visible bg-black/20 z-50" : "invisible z-50"}
        `}>
            <div onClick={(e) => e.stopPropagation()}
                className={`
                    bg-white rounded-xl shadow p-6 transition-all w-1/2 text-center
                    ${open ? "scale-100 opacity-100" : "scale-125 opacity-0"}
            `}>
                <div className="mx-auto w-full justify-end">
                    <div className="flex items-center justify-end">
                        <XMarkIcon className="h-5 w-5 text-gray-600 cursor-pointer" onClick={onClose}/>
                    </div>
                    <header className="flex items-center justify-start">
                        <BookOpenIcon className="h-5 w-5 text-green-900" />
                        <h2 className="text-lg font-medium text-gray-900">ノート設定</h2>
                    </header>
                    <NotebookModalAddForm />
                    <NotebookModalList />
                </div>
            </div>
        </div>
    )
}