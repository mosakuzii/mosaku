import SidebarHome from "./Partial/SidebarHome";
import SidebarNote from "./Partial/SidebarNote";
import SidebarNotebook from "./Partial/SidebarNotebook";
import SidebarSearch from "./Partial/SidebarSearch";
import SidebarShortcut from "./Partial/SidebarShortcut";
import SidebarTag from "./Partial/SidebarTag";
import SidebarTrash from "./Partial/SidebarTrash";

export default function Sidebar() {
    return (
        <div className="h-full w-full">
            <SidebarSearch />
            <div className="flex flex-col h-[calc(100vh-9rem)] bg-green-300">
                <SidebarHome />
                <SidebarShortcut />
                <SidebarNote />
                <SidebarTag />
                <SidebarNotebook />
                <SidebarTrash />
                <div className="h-12 bg-gray-200">
                    Message.jsx
                </div>
            </div>
        </div>
    )
}