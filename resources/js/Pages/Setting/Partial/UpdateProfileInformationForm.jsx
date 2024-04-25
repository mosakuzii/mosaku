import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Transition } from "@headlessui/react";
import { useForm } from "@inertiajs/react";

export default function UpdateProfileInformationForm({user}){
    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        name: user.name, email: user.email,
    });
    const submitProfile = (e) => {
        e.preventDefault();
        patch(route('profile.update'));
    }
    return (
        <section className="max-w-xl">
            <header>
                <h2 className="text-lg font-medium text-gray-900">ユーザ名/メールアドレス変更</h2>
            </header>
            <form onSubmit={submitProfile} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="name" value="ユーザ名" />
                    <TextInput
                        id="name"
                        className="mt-1 block w-full"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        placeholder="User Name"
                        required
                        isFocused
                        autoComplete="name"
                    />
                    <InputError className="mt-2" message={errors.name} />
                </div>
                <div>
                    <InputLabel htmlFor="email" value="メールアドレス" />
                    <TextInput
                        id="email"
                        type="email"
                        className="mt-1 block w-full"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                        autoComplete="username"
                    />
                    <InputError className="mt-2" message={errors.email} />
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
    )
}