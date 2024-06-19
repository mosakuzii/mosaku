import { HomeIcon } from "@heroicons/react/20/solid";

export default function MainHomeHeader() {
    return (
        <div className="h-32 w-full bg-green-300">
            <div className="h-24">

            </div>
            <div className="h-8 pl-2 mt-auto flex items-center">
                <HomeIcon className="h-5 w-5 mr-1" />
                ホーム画面
            </div>
        </div>
    )
}