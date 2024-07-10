import { useContext } from 'react';
import { AppContext } from '../App';
import DesktopHeader from './Header/DesktopHeader';
import DesktopMain from './Main/DesktopMain';
import DesktopSidebar from './Sidebar/DesktopSidebar';
import SuggestionModal from './Header/Suggestion/SuggestionModal';

export default function AppDesktop() {
    const {
        auth,
        mainMode,
        noteListOpen,
        openSuggestionModal,
        setOpenSuggestionModal
    } = useContext(AppContext);

    return (
        <div className="h-full flex flex-row h-screen">
            <div className="h-full w-1/4">
                <div className='h-12'>
                    <DesktopHeader
                        user={auth.user}
                        openSuggestionModal={openSuggestionModal}
                        setOpenSuggestionModal={setOpenSuggestionModal}
                    />
                </div>
                <div className="h-[calc(100vh-3rem)]">
                    <DesktopSidebar
                        user={auth.user}
                        openSuggestionModal={openSuggestionModal}
                        setOpenSuggestionModal={setOpenSuggestionModal}
                    />
                </div>
                <SuggestionModal user={auth.user} open={openSuggestionModal} onClose={() => setOpenSuggestionModal(false)} />
            </div>
            <div className={`h-full ${noteListOpen && mainMode === "edit" || mainMode === "trash" ? "relative left-1/4 w-1/2" : "w-3/4"}`}>
                <DesktopMain />
            </div>
        </div>
    );
}
