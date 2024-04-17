import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { useState, Fragment } from 'react';

import MemoForm from "@/Pages/Auth/MemoForm";

export default function Index({ auth, memos, tags }) {
    const [memo, setMemo] = useState([]);
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Mosaku" />
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 grid grid-cols-2">
                <div className='bg-white overflow-hidden shadow-sm sm:rounded-lg'>
                    <h3 className="text-lg font-black text-gray-800">Memo List</h3>
                    {memos.map((memo) => (
                        <div key={memo.id} onClick={() => setMemo(memo)}>
                            <p>{memo.title}</p>
                        </div>
                    ))}
                </div>
                <MemoForm selectedMemo={memo} allTags={tags} />
            </div>
        </AuthenticatedLayout>
    );
}
