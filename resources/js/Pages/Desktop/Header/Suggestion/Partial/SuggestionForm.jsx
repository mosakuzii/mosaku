import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Transition } from "@headlessui/react";
import { EnvelopeIcon } from "@heroicons/react/20/solid";
import { useForm } from "@inertiajs/react";

export default function SuggestionModal ({}){
    const { data, setData, post, errors, processing, recentlySuccessful } = useForm({
        suggestion_title: "", suggestion_content: "",
    });
    const submitSuggestion = (e) => {
        console.log("post suggestion");
        e.preventDefault();
        post(route('suggestion.post'));
    };
    return(
        <section className="max-w-xl">
            <header>
                <div className="flex items-center justify-start">
                    <EnvelopeIcon className="h-6 w-6 mr-1" />
                    <p className="text-lg font-medium text-gray-900">目安箱</p>
                </div>
                <p className="mt-3 text-sm text-gray-600">
                    是非ご意見やご質問をお聞かせください。
                </p>
                <p className="mt-1 text-sm text-gray-600">
                    皆様の声をもとに、より良いサービスの提供を目指していきます。
                </p>
            </header>
            <form onSubmit={submitSuggestion} className="mt-4 space-y-6">
                <div>
                    <TextInput
                        id="suggestion_title"
                        className="block w-full"
                        value={data.suggestion_title}
                        onChange={(e) => setData('suggestion_title', e.target.value)}
                        placeholder="件名"
                    />
                </div>
                <div>
                    <textarea
                        id="suggestion_content"
                        className="block w-full h-60 border-gray-300 rounded-md"
                        value={data.suggestion_content}
                        placeholder="内容をご記入ください"
                        onChange={(e) => setData('suggestion_content', e.target.value)}
                    />
                </div>
                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>送信</PrimaryButton>
                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0">
                        <p className="text-sm text-gray-600">送信しました</p>
                    </Transition>
                </div>
            </form>
        </section>
    )
}