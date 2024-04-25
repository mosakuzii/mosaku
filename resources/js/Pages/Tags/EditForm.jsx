import TextInput from "@/Components/TextInput";
import { CheckCircleIcon, PencilSquareIcon, TagIcon, TrashIcon, XMarkIcon } from "@heroicons/react/20/solid";
import axios from "axios";
import { useContext, useState } from "react";
import { MemoContext, TagsContext } from "../Memo/Memo";

export default function EditForm(){ 
    const {allTags, setAllTags} = useContext(TagsContext);
    const {formMemo, setFormMemo, setAllMemos} = useContext(MemoContext);
    const [editingTag, setEditingTag] = useState({});

    const updateMemoFormTag = (tag_id) => {
        const tmp_tags = formMemo.tags;
        return tmp_tags.map(tag => {
            if(tag.id == tag_id){
                return {...tag,
                tag_name: editingTag.tag_name,
                tag_color: editingTag.tag_color};
            }
            return tag;
        });
    };

    const updateTag = async (editing_tag) => {
        await axios.put(`/tag/${editing_tag}`, editing_tag)
            .then(response => {
                setAllMemos(response.data.allMemos);
                setAllTags(response.data.allTags);
                formMemo.tags.some(tag => tag.id === editing_tag.id) &&
                    setFormMemo({...formMemo, tags: updateMemoFormTag(editing_tag.id)});
                setEditingTag({});
            })
            .catch(error => {
                console.error("Error: ", error);
            });
    };

    const deleteTag = async (delete_tag) => {
        await axios.delete(`/tag/${delete_tag.id}`)
            .then(response => {
                setAllMemos(response.data.allMemos);
                setAllTags(response.data.allTags);
                formMemo.tags.some(tag => tag.id === delete_tag.id &&
                    setFormMemo({...formMemo, tags: formMemo.tags.filter(tag => tag.id !== delete_tag.id)}));
            })
            .catch(error => {
                console.error("Error: ", error);
            });
    };

    return (
        <section className="p-2">
            {allTags.map((tag) => (
                <div
                    key={tag.id}
                    className="hover:bg-gray-100 cursor-pointer"
                    onClick={()=>setEditingTag(tag)}>
                    {editingTag.id === tag.id ?
                        <div className="flex items-center justify-start mt-1 p-1">
                            <input
                                type="color"
                                className="h-8 w-8 mx-2"
                                value={editingTag.tag_color}
                                onChange={(e) => setEditingTag({ ...editingTag, tag_color: e.target.value})}
                            />
                            <TextInput
                                value={editingTag.tag_name}
                                className="h-8 w-2/3 mx-1"
                                onChange={(e) => setEditingTag({ ...editingTag, tag_name: e.target.value})}
                            />
                            <CheckCircleIcon className="h-8 w-8 text-gray-600" onClick={() => updateTag(editingTag)} />
                            <TrashIcon className="h-8 w-8 text-gray-600" onClick={() => deleteTag(tag)} />
                        </div>:
                        <div className="flex items-center justify-start mt-1 p-1">
                            <TagIcon className="h-5 w-5" style={{ color: tag.tag_color }} />
                            <p className="text-ellipsis overflow-hidden">{tag.tag_name}</p>
                        </div>
                    }
                </div>
            ))}
        </section>
    )
}