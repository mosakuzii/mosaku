import { Head } from '@inertiajs/react';
import Header from './Header/Header';
import Memo from './Memo/Memo';
import Notebook from './Notebook/Notebook';

export default function App({ auth, memos, notebooks, tags }) {
    return (
        <div className="h-full flex flex-col h-screen bg-green-50">
            <Head title="mosaku" />
            <div className="h-12 bg-green-800 px-1">
                <Header user={auth.user} />
            </div>
            <div className="h-[calc(100vh-3rem)] flex flex-row px-2">
                <Notebook notebooks={notebooks} tags={tags} />
            </div>
            <div className="h-[calc(100vh-3rem)] flex flex-row px-2">
                <Memo memos={memos} tags={tags} />
            </div>
        </div>
    );
}
