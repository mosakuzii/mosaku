import { useForm } from "@inertiajs/react";
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import { CheckCircleIcon, PencilSquareIcon, TagIcon, TrashIcon } from "@heroicons/react/20/solid";
import axios from "axios";
import { useState } from "react";

export default function TagModal({ tags, getAllTags, open, onClose }){
    const { data, setData, reset } = useForm({
        id: '',
        tag_name: '',
        tag_color: '#00793D',
    });

    const [tagList, setTagList] = useState(tags);
    const [editingTagId, setEditingTagId] = useState('');
    const [editingTagName, setEditingTagName] = useState('');
    const [editingTagColor, setEditingTagColor] = useState('#00793D');

    const submitTag = async (e) => {
        e.preventDefault();
        await axios.post('/tag', data)
            .then(response =>{
                setTagList(response.data);
                getAllTags(response.data);
                reset();
            })
            .catch(error => {
                console.error('Error: ', error);
            });
    }

    const updateTag = async (tag_id) => {
        await axios.put(`/tag/${tag_id}`, {tag_name: editingTagName, tag_color: editingTagColor})
            .then(response => {
                setTagList(response.data);
                getAllTags(response.data);
                startEditing(false);
            })
            .catch(error => {
                console.error("Error: ", error);
            });
    }

    //TODO:「本当に削除しますか？」的なダイアログが欲しい
    const deleteTag = async (tag_id) => {
        await axios.delete(`/tag/${tag_id}`)
            .then(response => {
                setTagList(response.data);
                getAllTags(response.data);
            })
            .catch(error => {
                console.error("Error: ", error);
            });
    }

    const startEditing = (tag) => {
        setEditingTagId(tag.id);
        setEditingTagName(tag.tag_name);
        setEditingTagColor(tag.tag_color);
    }

    return (
        <div onClick={onClose} className={`
            fixed inset-0 flex justify-center items-center
            transition-colors
            ${open ? "visible bg-black/20" : "invisible"}
        `}>
            <div onClick={(e) => e.stopPropagation()}
                className={`
                    bg-white rounded-xl shadow p-6 transition-all
                    ${open ? "scale-100 opacity-100" : "scale-125 opacity-0"}
            `}>
                <div className="text-center w-56">
                    <div className="mx-auto my-4 w-48">
                        <h3 className="text-lg font-black text-gray-800">
                            Tag
                        </h3>
                        {/* TODO: submitTagやupdateTag等の実行中にロード表示みたいなのを加えたい */}
                        <form onSubmit={submitTag}>
                            <TextInput
                                id="tag_name"
                                type="text"
                                name="tag_name"
                                placeholder="Add Tag"
                                value={data.tag_name}
                                className="mt-1 block w-full"
                                autoComplete="username"
                                isFocused={true}
                                onChange={(e) => setData('tag_name', e.target.value)}
                            />
                            <input
                                id="tag_color" 
                                type="color"
                                name="tag_color"
                                value={data.tag_color}
                                onChange={(e) => setData('tag_color', e.target.value)}
                            />
                            <PrimaryButton className="ms-4">Save</PrimaryButton>
                        </form>
                        <div>
                            {tagList.map((tag) => (
                                <div key={tag.id} className="flex items-center justify-start mt-1">
                                    <TagIcon className="h-5 w-5" style={{ color: tag.tag_color }} />
                                    {editingTagId === tag.id ?
                                        <div>
                                            <TextInput
                                                value={editingTagName}
                                                onChange={(e) => setEditingTagName(e.target.value)}
                                            />
                                            <input
                                                type="color"
                                                value={editingTagColor}
                                                onChange={(e) => setEditingTagColor(e.target.value)}
                                            />
                                        </div>:
                                        <p>{tag.tag_name}</p>
                                    }
                                    <div className="relative ml-auto">
                                        {editingTagId === tag.id ?
                                            <CheckCircleIcon className="h-5 w-5 text-gray-400" onClick={() => updateTag(tag.id)} />:
                                            <PencilSquareIcon className="h-5 w-5 text-gray-400" onClick={() => startEditing(tag)} />
                                        }
                                    </div>
                                    <div className="relative ml-3">
                                        <TrashIcon className="h-5 w-5 text-gray-400" onClick={() => deleteTag(tag.id)} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}