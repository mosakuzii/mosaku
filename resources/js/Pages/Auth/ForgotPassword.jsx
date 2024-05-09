import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-green-50">
        <div className="w-full sm:max-w-md mt-6 p-6 bg-white shadow-md overflow-hidden sm:rounded-lg">
            <Head title="Forgot Password" />

            <div className="mb-4 text-sm text-gray-600">
                パスワードリセット用のリンクをご登録のメールアドレスにお送りします。
            </div>

            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

            <form onSubmit={submit}>
                <InputLabel htmlFor="email" value="メールアドレス" />
                <TextInput
                    id="email"
                    type="email"
                    name="email"
                    value={data.email}
                    className="mt-1 block w-full"
                    isFocused={true}
                    onChange={(e) => setData('email', e.target.value)}
                />

                <InputError message={errors.email} className="mt-2" />

                <div className="flex items-center justify-end mt-4">
                    <Link
                        href={route('login')}
                        className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        ログイン画面に戻る
                    </Link>
                    <PrimaryButton className="ms-4" disabled={processing}>
                        送信
                    </PrimaryButton>
                </div>
            </form>
        </div>
        </div>
    );
}
