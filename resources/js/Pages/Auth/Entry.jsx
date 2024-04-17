import React, { useState, useEffect } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';

export default function Entry({}) {
    const { data, setData, post } = useForm({
        accesskey: '',
    });
    const [errors, setErrors] = useState({
        accesskey: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('accesskey.verify'));
    };

    return (
        <GuestLayout>
            <Head title="Entry" />
            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="accesskey" value="アクセスキー" />
                    <TextInput
                        id="accesskey"
                        type="text"
                        name="accesskey"
                        value={data.accesskey}
                        className="mt-1 block w-full"
                        isFocused={true}
                        onChange={(e) => setData('accesskey', e.target.value)}
                    />
                    <InputError message={errors.accesskey} className="mt-2" />
                </div>
                <div className="flex items-center justify-end mt-4">
                    <Link
                        href={route('login')}
                        className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        登録済みの方はこちら
                    </Link>
                    <PrimaryButton className="ms-4">
                        送信
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
