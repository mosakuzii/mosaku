import MainHomeHeader from "./Partial/MainHomeHeader";
import MainHomeInstant from "./Partial/MainHomeInstant";
import MainHomeRecent from "./Partial/MainHomeRecent";
import MainHomeShortcut from "./Partial/MainHomeShortcut";

export default function MainHome() {
    return (
        <div className="h-full w-full">
            <MainHomeHeader />
            <MainHomeInstant />
            <MainHomeShortcut />
            <MainHomeRecent />
        </div>
    )
}
