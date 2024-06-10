import { createContext, useEffect, useState } from 'react';
import Header from './Header/Header';
import Main from './Main/Main';
import Sidebar from './Sidebar/Sidebar';

export const AppContext = createContext();

export default function App({ auth, memos, trashMemos, notebooks, tags }) {
    const [allMemos, setAllMemos] = useState(memos);
    const [deletedMemos, setDeletedMemos] = useState(trashMemos);
    const [allNotebooks, setAllNotebooks] = useState(notebooks);
    const [allTags, setAllTags] = useState(tags);
    const [mainMode, setMainMode] = useState("home");
    const [selectedMemo, setSelectedMemo] = useState({
        notebook_id: null, title: "", content: "", starred: false, tags: []});
    const [selectedDeletedMemo, setSelectedDeletedMemo] = useState({
        notebook_id: null, title: "", content: "", starred: false, tags: []});

    return (
        <AppContext.Provider
            value={{
                auth,
                allMemos, setAllMemos,
                deletedMemos, setDeletedMemos,
                allNotebooks, setAllNotebooks,
                allTags, setAllTags,
                mainMode, setMainMode,
                selectedMemo, setSelectedMemo,
                selectedDeletedMemo, setSelectedDeletedMemo}}>
            <div className="h-full flex flex-row h-screen">
                <div className="h-full w-1/4">
                    <div className='h-12 bg-green-600 px-2'>
                        <Header user={auth.user} />
                    </div>
                    <div className="h-[calc(100vh-3rem)]">
                        <Sidebar />
                    </div>
                </div>
                <div className={`h-full
                    ${mainMode === "edit" || mainMode === "trash" ?
                        "relative left-1/4 w-1/2" : "w-3/4"} bg-green-100 p-4`}>
                    <Main />
                </div>
            </div>
        </AppContext.Provider>
    );
}
