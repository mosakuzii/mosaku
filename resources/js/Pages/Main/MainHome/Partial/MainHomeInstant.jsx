import MainHomeInstantMemo from "./MainHomeInstantMemo";
import MainHomeInstantNote from "./MainHomeInstantNote";

export default function MainHomeInstant() {
    return (
        <div className="h-1/5 bg-gray-200 flex flex-row">
            <MainHomeInstantNote />
            <MainHomeInstantMemo />
        </div>
    )
}
