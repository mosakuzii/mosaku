import { HomeIcon } from "@heroicons/react/20/solid";

export default function MainHomeHeader() {
    return (
        <div className="h-8 bg-gray-300 flex px-2">
            <HomeIcon className="h-5 w-5 mr-1" />
            ホーム画面
        </div>
    )
}