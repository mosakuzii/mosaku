import { createContext, useEffect, useState } from 'react';
import Header from './Header/Header';
import Main from './Main/Main';
import Sidebar from './Sidebar/Sidebar';
import SuggestionModal from './Header/Suggestion/SuggestionModal';

export const AppContext = createContext();

export default function App({ auth, memos, trashMemos, notebooks, tags }) {
    const [allMemos, setAllMemos] = useState(memos);
    const [deletedMemos, setDeletedMemos] = useState(trashMemos);
    const [allNotebooks, setAllNotebooks] = useState(notebooks);
    const [allTags, setAllTags] = useState(tags);
    const [mainMode, setMainMode] = useState("home");
    const [noteListOpen, setNoteListOpen] = useState(false);
    const [openSuggestionModal, setOpenSuggestionModal] = useState(false);
    const [selectedMemo, setSelectedMemo] = useState({
        id: null, notebook_id: null, title: null, content: null, starred: false, tags: []});
    const [selectedDeletedMemo, setSelectedDeletedMemo] = useState({
        id: null, notebook_id: null, title: null, content: null, starred: false, tags: []});
    return (
        <AppContext.Provider
            value={{
                auth,
                allMemos, setAllMemos,
                deletedMemos, setDeletedMemos,
                allNotebooks, setAllNotebooks,
                allTags, setAllTags,
                mainMode, setMainMode,
                noteListOpen, setNoteListOpen,
                selectedMemo, setSelectedMemo,
                selectedDeletedMemo, setSelectedDeletedMemo,
                openSuggestionModal, setOpenSuggestionModal}}>
            <div className="h-full flex flex-row h-screen">
                <div className="h-full w-1/4">
                    <div className='h-12 bg-green-700 px-2'>
                        <Header
                            user={auth.user}
                            openSuggestionModal={openSuggestionModal} 
                            setOpenSuggestionModal={setOpenSuggestionModal} />
                    </div>
                    <div className="h-[calc(100vh-3rem)]">
                        <Sidebar
                            user={auth.user}
                            openSuggestionModal={openSuggestionModal} 
                            setOpenSuggestionModal={setOpenSuggestionModal} />
                    </div>
                    <SuggestionModal user={auth.user} open={openSuggestionModal} onClose={() => setOpenSuggestionModal(false)} />
                </div>
                <div className={`h-full ${((noteListOpen && mainMode === "edit") || mainMode === "trash") ?
                        "relative left-1/4 w-1/2" : "w-3/4"}`}>
                    <Main />
                </div>
            </div>
        </AppContext.Provider>
    );
}
