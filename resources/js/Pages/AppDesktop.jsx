import { useContext } from 'react';
import { AppContext } from './App';
import Header from './Header/Header';
import Main from './Main/Main';
import Sidebar from './Sidebar/Sidebar';
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
                <div className='h-12 bg-green-700 px-2'>
                    <Header
                        user={auth.user}
                        openSuggestionModal={openSuggestionModal}
                        setOpenSuggestionModal={setOpenSuggestionModal}
                    />
                </div>
                <div className="h-[calc(100vh-3rem)]">
                    <Sidebar
                        user={auth.user}
                        openSuggestionModal={openSuggestionModal}
                        setOpenSuggestionModal={setOpenSuggestionModal}
                    />
                </div>
                <SuggestionModal user={auth.user} open={openSuggestionModal} onClose={() => setOpenSuggestionModal(false)} />
            </div>
            <div className={`h-full ${noteListOpen && mainMode === "edit" || mainMode === "trash" ? "relative left-1/4 w-1/2" : "w-3/4"}`}>
                <Main />
            </div>
        </div>
    );
}
