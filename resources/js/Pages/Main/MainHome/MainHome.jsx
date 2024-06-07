import MainHomeHeader from "./Partial/MainHomeHeader";
import MainHomeInstant from "./Partial/MainHomeInstant";
import MainHomeRecent from "./Partial/MainHomeRecent";
import MainHomeShortcut from "./Partial/MainHomeShortcut";

export default function MainHome() {
    return (
        <div className="h-full w-full bg-white">
            <MainHomeHeader />
            <div className="h-[calc(100vh-5rem)] bg-gray-100">
                <MainHomeInstant />
                <MainHomeShortcut />
                <MainHomeRecent />
            </div>
        </div>
    )
}
