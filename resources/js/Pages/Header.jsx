import Dropdown from '@/Components/Dropdown';
import { ArrowLeftStartOnRectangleIcon, Cog6ToothIcon } from '@heroicons/react/20/solid';
import { useState } from 'react';
import SettingModal from './Setting/SettingModal';

export default function Header({user}){
    const [open, setOpen] = useState(false);
    return (
        <div className="flex items-center justify-between">
            <SettingModal user={user} open={open} onClose={() => setOpen(false)} />
            <img src="/images/logo.png" className="h-12 w-12" />
            <Dropdown>
                <Dropdown.Trigger>
                    <span className="inline-flex rounded-md">
                        <button type="button"
                            className="inline-flex items-center border border-transparent text-md leading-4 font-medium rounded-md text-gray-100 bg-green-800 hover:text-green-200 focus:outline-none transition ease-in-out duration-150">
                            {user.name}
                            <svg
                                className="ms-2 -me-0.5 h-4 w-4"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor">
                                <path
                                    fillRule="evenodd"
                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                    clipRule="evenodd" />
                            </svg>
                        </button>
                    </span>
                </Dropdown.Trigger>
                <Dropdown.Content>
                    <Dropdown.Item onClick={() => setOpen(true)} className="flex items-center cursor-pointer">
                        <Cog6ToothIcon className="h-4 w-4 mr-2" />設定
                    </Dropdown.Item>
                    <Dropdown.Link href={route('logout')} method="post" className="flex items-center cursor-pointer">
                        <ArrowLeftStartOnRectangleIcon className="h-4 w-4 mr-2" />ログアウト
                    </Dropdown.Link>
                </Dropdown.Content>
            </Dropdown>
        </div>
    );
}