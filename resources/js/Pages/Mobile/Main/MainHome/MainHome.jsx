import MainHomeInstant from "./Partial/MainHomeInstant";
import MainHomeMenu from "./Partial/MainHomeMenu";
import MainHomeRecent from "./Partial/MainHomeRecent";
import MainHomeShortcut from "./Partial/MainHomeShortcut";

export default function MainHome() {
    return (
        <div className="h-full w-full">
            <MainHomeInstant />
            <MainHomeMenu />
            <MainHomeShortcut />
            <MainHomeRecent />
        </div>
    )
}
