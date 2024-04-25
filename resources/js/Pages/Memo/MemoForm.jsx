import { useContext } from "react";
import { Menu } from '@headlessui/react';
import { ChevronDownIcon, TagIcon, XMarkIcon } from '@heroicons/react/20/solid';
import TextInput from '@/Components/TextInput';
import { MemoContext, TagsContext } from "./Memo";
import axios from "axios";

export default function MemoForm(){
    const {allTags} = useContext(TagsContext);
    const {formMemo, setFormMemo, setAllMemos} = useContext(MemoContext);
    const submitForm = async () => {
        const routeName = formMemo.id ? 'memo/update' : 'memo/store';
        await axios.post(routeName, formMemo)
            .then(response => {
                setAllMemos(response.data.allMemos)
                !formMemo.id && setFormMemo({ ...formMemo, id: response.data.memoId});
            })
            .catch(error => {
                console.error("Error: ", error);
            });
    }
    return (
        <div className="p-2">
            <div className="flex items-center justify-end">
                {formMemo.tags && formMemo.tags.map(attachedTag => (
                    <div key={attachedTag.id} className="flex items-center justify-end mt-1">
                        <TagIcon className="h-5 w-5" style={{ color: attachedTag.tag_color }} />
                        {attachedTag.tag_name}
                        <XMarkIcon className="h-5 w-5 text-gray-400" onClick={() => setFormMemo({ ...formMemo, tags: formMemo.tags.filter(tag => tag !== attachedTag)})} />
                    </div>
                ))}
                <Menu as="div" className="relative inline-block text-left ml-5">
                    <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                        タグを選択
                        <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
                    </Menu.Button>
                    <Menu.Items className="absolute right-0 z-10 mt-1 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="p-1 pointer-cursor">
                            {allTags.map(tag => (
                                <Menu.Item
                                    key={tag.id}
                                    className="hover:bg-gray-100"
                                    onClick={() => setFormMemo({ ...formMemo, tags: [...formMemo.tags, tag]})}>
                                    <div className="flex items-center justify-start">
                                        <TagIcon className="h-5 w-5" style={{ color: tag.tag_color }} />
                                        <p className="text-gray-700 block px-4 py-2 text-sm">
                                            {tag.tag_name}
                                        </p>
                                    </div>
                                </Menu.Item>
                            ))}
                        </div>
                    </Menu.Items>
                </Menu>
                <button className="ml-3 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-md" onClick={() => submitForm()}>
                    保存
                </button>
            </div>
            <TextInput
                id="title"
                type="text"
                name="title"
                placeholder="タイトル"
                value={formMemo.title}
                className="block w-full"
                autoComplete="username"
                isFocused={true}
                onChange={(e) => setFormMemo({ ...formMemo, title: e.target.value})}
            />
            <textarea
                id="content"
                value={formMemo.content}
                className="block w-full
                    border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                style={{height: "calc(100vh - 194px)"}}
                placeholder="メモ内容"
                onChange={(e) => setFormMemo({ ...formMemo, content: e.target.value})}
            />
        </div>
    )
}