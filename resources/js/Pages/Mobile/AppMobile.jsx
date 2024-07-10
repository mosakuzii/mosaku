import { createContext, useContext, useState } from "react";
import { AppContext } from "../App";
import MobileMain from "../Mobile/Main/MobileMain";
import MobileHeader from "./Header/MobileHeader";
import MobileSidebar from "./Sidebar/MobileSidebar";
import MobileTrash from "./Sidebar/MobileTrash";

export const AppMobileContext = createContext();

export default function AppMobile(){
    const {
        auth,
        openSuggestionModal,
        setOpenSuggestionModal
    } = useContext(AppContext);
    const [openSidebar, setOpenSidebar] = useState(false);
    const [openTrash, setOpenTrash] = useState(false);

    return (
        <AppMobileContext.Provider value={{ setOpenSidebar, setOpenTrash }}>
            <div className="h-full w-full h-screen">
                <MobileHeader
                    user={auth.user}
                    openSuggestionModal={openSuggestionModal}
                    setOpenSuggestionModal={setOpenSuggestionModal}
                />
                <MobileMain />
                <MobileSidebar open={openSidebar} onClose={() => setOpenSidebar(false)} />
                <MobileTrash open={openTrash} onClose={() => setOpenTrash(false)} />
            </div>
        </AppMobileContext.Provider>
    )
}