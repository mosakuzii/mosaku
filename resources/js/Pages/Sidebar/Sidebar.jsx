import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import SidebarHome from "./Partial/SidebarHome";
import SidebarNote from "./Partial/SidebarNote";
import SidebarNotebook from "./Partial/SidebarNotebook";
import SidebarSearch from "./Partial/SidebarSearch";
import SidebarShortcut from "./Partial/SidebarShortcut";
import SidebarTag from "./Partial/SidebarTag";
import SidebarTrash from "./Partial/SidebarTrash";

export default function Sidebar({ user, openSuggestionModal, setOpenSuggestionModal }) {
    return (
        <div className="h-full w-full">
            <SidebarSearch />
            <div className="flex flex-col h-[calc(100vh-12rem)] bg-green-50">
                <SidebarHome />
                <SidebarShortcut />
                <SidebarNote />
                <SidebarTag />
                <SidebarNotebook />
                <SidebarTrash />
                <div className="h-12 bg-gray-50 hover:bg-gray-100 cursor-pointer flex items-center justify-start"
                    onClick={() => setOpenSuggestionModal(true)}>
                    <QuestionMarkCircleIcon className="h-5 w-5 ml-1" />
                    <p>お問い合わせ</p>
                </div>
            </div>
        </div>
    )
}