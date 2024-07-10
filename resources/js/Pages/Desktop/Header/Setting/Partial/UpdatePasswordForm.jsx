import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Transition } from "@headlessui/react";
import { useForm } from "@inertiajs/react";
import { useRef } from "react";

export default function UpdatePasswordForm({}){
    const passwordInput = useRef();
    const currentPasswordInput = useRef();
    const { data, setData, put, processing, errors, recentlySuccessful } = useForm({
        current_password: '', password: '', password_confirmation: '',
    });
    const submitPassword = (e) => {
        e.preventDefault();
        put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset('password', 'password_confirmation');
                    passwordInput,current.focus();
                }
                if(errors.current){
                    reset('current_password');
                    currentPasswordInput.current.focus();
                }
            },
        });
    };
    return (
        <section className="max-w-xl">
            <header>
                <h2 className="mt-10 text-lg font-medium text-gray-900">パスワード変更</h2>
                <p className="mt-1 text-sm text-gray-600">
                    半角英数字、8文字以上、大文字小文字数字を含めてください。
                </p>
            </header>
            <form onSubmit={submitPassword} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="current_password" value="現在のパスワード" />
                    <TextInput
                        id="current_password"
                        ref={currentPasswordInput}
                        value={data.current_password}
                        onChange={(e) => setData('current_password', e.target.value)}
                        type="password"
                        className="mt-1 block w-full"
                        autoComplete="current-password"
                    />
                    <InputError message={errors.current_password} className="mt-2" />
                </div>
                <div>
                    <InputLabel htmlFor="password" value="新しいパスワード" />
                    <TextInput
                        id="password"
                        ref={passwordInput}
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        type="password"
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                    />
                    <InputError message={errors.password} className="mt-2" />
                </div>
                <div>
                    <InputLabel htmlFor="password_confirmation" value="新しいパスワード(確認)" />
                    <TextInput
                        id="password_confirmation"
                        value={data.password_confirmation}
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        type="password"
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                    />
                    <InputError message={errors.password_confirmation} className="mt-2" />
                </div>
                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>変更</PrimaryButton>
                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0">
                        <p className="text-sm text-gray-600">変更しました</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}