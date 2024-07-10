import TextInput from "@/Components/TextInput";

export default function MainNotebookModal({ open, onClose, renameNotebook, setRenameNotebook, updateNotebook }) {
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
                <TextInput
                    id="notebook_title"
                    type="text"
                    name="notebook_title"
                    placeholder="ノートブック名"
                    value={renameNotebook.title}
                    onChange={(e) => setRenameNotebook({...renameNotebook, title: e.target.value})}
                />
                <button
                    className="bg-green-300"
                    onClick={() => updateNotebook(renameNotebook)}>
                    保存
                </button>
            </div>
        </div>
    )
}