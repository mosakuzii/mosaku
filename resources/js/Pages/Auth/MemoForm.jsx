import Dropdown from '@/Components/Dropdown';
import { ChevronDownIcon, Cog6ToothIcon, TagIcon, XMarkIcon } from '@heroicons/react/20/solid';
import { useForm } from '@inertiajs/react';
import { useState, Fragment, useEffect } from 'react';
import { Menu, Transition } from '@headlessui/react';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';

import TagModal from "@/Pages/Tags/Modal";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}
export default function MemoForm({ selectedMemo, allTags }){
    const { data, setData, post, delete:destroy, errors, processing, reset } = useForm({
        id: '', title: '', content: '',
        pinned: false, starred: false, tags: [],
    });

    const [open, setOpen] = useState(false);
    const deleteMemo = () => {
        destroy(route('memo.delete'));
        reset();
    };

    const submit = (e) => {
        e.preventDefault();
        const routeName = data.id ? 'memo.update' : 'memo.store';
        post(route(routeName, {id: data.id}));
    };

    useEffect(() => {
        setData(selectedMemo);
    }, [selectedMemo]);

    const [newAllTags, setNewAllTags] = useState(allTags);
    const getAllTags = (newAllTags) => {
        setNewAllTags(newAllTags);
        console.log(newAllTags);
    };

    return (
        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <TagModal getAllTags={getAllTags} tags={allTags} open={open} onClose={() => setOpen(false)} />
            <div className="flex items-center justify-end mt-1">
                <Dropdown>
                    <Dropdown.Trigger>
                        <Cog6ToothIcon className="h-6 w-6 text-gray-400" aria-hidden="true" />
                    </Dropdown.Trigger>

                    <Dropdown.Content>
                        <Dropdown.Item onClick={() => setOpen(true)}>Tag Setting</Dropdown.Item>
                        <Dropdown.Link href={route('profile.edit')}>Profile</Dropdown.Link>
                        <Dropdown.Link href={route('logout')} method="post" as="button">Log Out</Dropdown.Link>
                    </Dropdown.Content>
                </Dropdown>
            </div>
            <div className="flex items-center justify-start mt-1">
                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md" onClick={() => reset()}>
                    New
                </button>
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md ml-5" onClick={deleteMemo}>
                    Delete
                </button>
                <Menu as="div" className="relative inline-block text-left ml-5">
                    <div>
                        <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                            Tags
                            <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
                        </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div className="py-1">
                                {newAllTags.map(tag => (
                                    <Menu.Item key={tag.id} onClick={() => setData('tags', [...data.tags, tag])}>
                                        {({ active }) => (
                                            <div className="flex items-center justify-start mt-1">
                                                <TagIcon className="h-5 w-5" style={{ color: tag.tag_color }} />
                                                <a href="#"
                                                    className={classNames(
                                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                        'block px-4 py-2 text-sm')}>
                                                {tag.tag_name}
                                                </a>
                                            </div>
                                        )}
                                    </Menu.Item>
                                ))}
                            </div>
                        </Menu.Items>
                    </Transition>
                </Menu>
            </div>
            <form onSubmit={submit}>
                <div className="flex items-center justify-end mt-1">
                    <div onClick={() => setData({...data, pinned: !data.pinned,})}>
                        {data.pinned ? 'Unpinned' : 'Pinned'}
                    </div>
                    <div className="ms-4" onClick={() => setData({...data, starred: !data.starred,})}>
                        {data.starred ? 'Unstarred' : 'Starred'}
                    </div>
                    <PrimaryButton className="ms-4" disabled={processing}>
                        Save
                    </PrimaryButton>
                </div>
                <div className="flex items-center justify-end mt-1">
                    {data.tags && data.tags.map(attachedTag => (
                        <div key={attachedTag.id} className="flex items-center justify-end mt-1">
                            <TagIcon className="h-5 w-5" style={{ color: attachedTag.tag_color }} />
                            {attachedTag.tag_name}
                            <XMarkIcon className="h-5 w-5 text-gray-400" onClick={() => setData('tags', data.tags.filter(tag => tag !== attachedTag))} />
                        </div>
                    ))}
                </div>
                <TextInput
                    id="title"
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={data.title}
                    className="mt-1 block w-full"
                    autoComplete="username"
                    isFocused={true}
                    onChange={(e) => setData('title', e.target.value)}
                />
                <InputError message={errors.title} className="mt-2" />
                <textarea
                    id="content"
                    value={data.content}
                    className="mt-1 block w-full"
                    placeholder="content"
                    onChange={(e) => setData('content', e.target.value)}
                />
            </form>
        </div>
    );
}