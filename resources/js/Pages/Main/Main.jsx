import { useContext } from "react";
import { AppContext } from "../App";
import MainEdit from "./MainEdit/MainEdit";
import MainHome from "./MainHome/MainHome";
import MainNotebook from "./MainNotebook/MainNotebook";
import MainTag from "./MainTag/MainTag";

export default function Main() {
    const { mainMode } = useContext(AppContext);
    return (
        <div>
            {mainMode === "home" && <MainHome />}
            {mainMode === "edit" && <MainEdit />}
            {mainMode === "notebook" && <MainNotebook />}
            {mainMode === "tag" && <MainTag />}
        </div>
    )
}
