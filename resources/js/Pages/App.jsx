import { createContext, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import AppDesktop from './AppDesktop';
import AppMobile from './AppMobile';

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

    const isDesktop = useMediaQuery({ query: '(min-width: 768px)' });

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
            {isDesktop ? <AppDesktop /> : <AppMobile />}
        </AppContext.Provider>
    );
}
