import PrimaryButton from "@/Components/PrimaryButton";
import { AppContext } from "@/Pages/App";
import { AppMobileContext } from "@/Pages/Mobile/AppMobile";
import { BookOpenIcon, ListBulletIcon, TagIcon, TrashIcon } from "@heroicons/react/20/solid";
import { useContext } from "react";

export default function MainHomeMenu() {
    const { setMainMode } = useContext(AppContext);
    const { setOpenSidebar, setOpenTrash } = useContext(AppMobileContext);
    return (
        <div className="h-1/5 flex flex-row">
            <PrimaryButton
                className="h-12 w-1/4 bg-green-300 hover:bg-green-500"
                onClick={() => {setOpenSidebar(true)}}>
                <ListBulletIcon className="h-8 w-8 text-gray-600" />
                <p className="ml-1 text-gray-600 text-base">メモ一覧</p>
            </PrimaryButton>
            <PrimaryButton
                className="h-12 w-1/4 bg-blue-300 hover:bg-blue-500"
                onClick={() => {setMainMode("notebook")}}>
                <BookOpenIcon className="h-8 w-8 text-gray-600" />
                <p className="ml-1 text-gray-600 text-base">ノートブック</p>
            </PrimaryButton>
            <PrimaryButton
                className="h-12 w-1/4 bg-yellow-300 hover:bg-yellow-500"
                onClick={() => {setMainMode("tag")}}>
                <TagIcon className="h-8 w-8 text-gray-600" />
                <p className="ml-1 text-gray-600 text-base">タグ</p>
            </PrimaryButton>
            <PrimaryButton
                className="h-12 w-1/4 bg-gray-200 hover:bg-gray-400"
                onClick={() => {setOpenTrash(true)}}>
                <TrashIcon className="h-8 w-8 text-gray-600" />
                <p className="ml-1 text-gray-600 text-base">ゴミ箱</p>
            </PrimaryButton>
        </div>
    )
}