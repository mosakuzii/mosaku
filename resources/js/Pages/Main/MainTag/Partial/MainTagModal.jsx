import TextInput from "@/Components/TextInput";

export default function MainTagModal({ open, onClose, renameTag, setRenameTag, updateTag }) {
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
                <input
                    id="tag_color"
                    type="color"
                    name="tag_color"
                    value={renameTag.tag_color}
                    onChange={(e) => setRenameTag({...renameTag, tag_color: e.target.value})}
                />
                <TextInput
                    id="tag_title"
                    type="text"
                    name="tag_title"
                    placeholder="タグ名"
                    value={renameTag.tag_name}
                    onChange={(e) => setRenameTag({...renameTag, tag_name: e.target.value})}
                />
                <button
                    className="bg-green-300"
                    onClick={() => updateTag(renameTag)}>
                    保存
                </button>
            </div>
        </div>
    )
}