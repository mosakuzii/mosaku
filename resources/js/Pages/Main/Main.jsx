import { useContext } from "react";
import { AppContext } from "../App";
import MainEdit from "./MainEdit/MainEdit";
import MainHome from "./MainHome/MainHome";
import MainNotebook from "./MainNotebook/MainNotebook";
import MainTag from "./MainTag/MainTag";
import MainTrash from "./MainTrash/MainTrash";

export default function Main() {
    const { mainMode } = useContext(AppContext);
    return (
        <>
            {mainMode === "home" && <MainHome />}
            {mainMode === "edit" && <MainEdit />}
            {mainMode === "notebook" && <MainNotebook />}
            {mainMode === "tag" && <MainTag />}
            {mainMode === "trash" && <MainTrash />}
        </>
    )
}
