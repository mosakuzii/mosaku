import Dropdown from '@/Components/Dropdown';
import { EllipsisVerticalIcon, PlusIcon, StarIcon, TagIcon, TrashIcon } from '@heroicons/react/20/solid';
import axios from 'axios';
import { useContext, useState } from 'react';
import TagModal from '../Tags/TagModal';
import { MemoContext } from './Memo';

export default function MemoHeader({}) {
    const {formMemo, setFormMemo, setAllMemos, resetFormMemo} = useContext(MemoContext);
    const deleteMemo = async (memo_id) => {
        console.log(memo_id);
        await axios.delete(`/memo/delete/${memo_id}`)
            .then(response => {
                setAllMemos(response.data.allMemos);
                resetFormMemo();
            })
            .catch(error => {
                console.error("Error: ", error);
            });
    };
    const [open, setOpen] = useState(false);
    return(
        <div className="flex items-center justify-between p-2">
            <TagModal open={open} onClose={() => setOpen(false)} />
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold rounded-md p-1" onClick={() => resetFormMemo()} value="New">
                <PlusIcon className="h-6 w-6" />
            </button>
            <Dropdown>
                <Dropdown.Trigger>
                    <EllipsisVerticalIcon className="h-6 w-6 cursor-pointer text-gray-800" aria-hidden="true" />
                </Dropdown.Trigger>
                <Dropdown.Content>
                    <Dropdown.Item
                        className="flex items-center cursor-pointer"
                        onClick={() => setOpen(true)}>
                        <TagIcon className="h-4 w-4 mr-1" />
                        タグ設定
                    </Dropdown.Item>
                    {/* <Dropdown.Item
                        className="flex items-center cursor-pointer"
                        onClick={() => setFormMemo({...formMemo, pinned: !formMemo.pinned,})}>
                        {formMemo.pinned ?
                            <>
                            ピン留め解除
                            </>:
                            <>
                            ピン留め
                            </>}
                    </Dropdown.Item>
                    <Dropdown.Item
                        className="flex items-center cursor-pointer"
                        onClick={() => setFormMemo({...formMemo, starred: !formMemo.starred,})}>
                        {formMemo.starred ?
                            <>
                            <StarIcon className="h-4 w-4 mr-1" />
                            起動時に表示解除
                            </>:
                            <>
                            <StarIcon className="h-4 w-4 mr-1 text-gray-400" />
                            起動時に表示
                            </>}
                    </Dropdown.Item> */}
                    {/* TODO: 「本当に削除しますか？」的なダイアログが欲しい */}
                    {formMemo.id &&
                        <Dropdown.Item
                            className="flex items-center cursor-pointer"
                            onClick={() => deleteMemo(formMemo.id)}>
                                <TrashIcon className="h-4 w-4 mr-1" />
                                メモを削除
                        </Dropdown.Item>}
                </Dropdown.Content>
            </Dropdown>
        </div>
    )
}