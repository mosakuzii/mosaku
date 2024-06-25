import { HomeIcon } from "@heroicons/react/20/solid";

export default function MainHomeHeader() {
    return (
        <div className="relative h-32 w-full bg-green-300">
            <img src="/images/mosaku_header.png" alt="header" className="absolute bottom-0 left-0 h-32 w-full object-contain" />
            <div className="absolute bottom-0 left-0 h-8 pl-2 mt-auto flex items-center">
                <HomeIcon className="h-5 w-5 mr-1 text-white" />
                <p className="text-white">ホーム画面</p>
            </div>
        </div>
    )
}