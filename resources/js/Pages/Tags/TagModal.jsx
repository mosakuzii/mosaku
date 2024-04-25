import { TagIcon, XMarkIcon } from "@heroicons/react/20/solid";
import AddForm from "./AddForm";
import EditForm from "./EditForm";

export default function TagModal({ open, onClose }){
    return (
        <div onClick={onClose} className={`
            fixed inset-0 flex justify-center items-center
            transition-colors
            ${open ? "visible bg-black/20" : "invisible"}
        `}>
            <div onClick={(e) => e.stopPropagation()}
                className={`
                    bg-white rounded-xl shadow p-6 transition-all w-1/3 text-center
                    ${open ? "scale-100 opacity-100" : "scale-125 opacity-0"}
            `}>
                <div className="mx-auto w-full justify-end">
                    <div className="flex items-center justify-end">
                        <XMarkIcon className="h-5 w-5 text-gray-600 cursor-pointer" onClick={onClose}/>
                    </div>
                    <header className="flex items-center justify-start">
                        <TagIcon className="h-5 w-5 text-green-900" />
                        <h2 className="text-lg font-medium text-gray-900">タグ設定</h2>
                    </header>
                    <AddForm />
                    <EditForm />
                </div>
            </div>
        </div>
    )
}