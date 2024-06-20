import { AppContext } from "@/Pages/App";
import { useContext } from "react";
import MainTagHeader from "./Partial/MainTagHeader";
import MainTagList from "./Partial/MainTagList";

export default function MainTag() {
    const { setAllTags } = useContext(AppContext);
    const storeTag = async (tag) => {
        try{
            const response = await axios.post("tag", tag);
            await setAllTags(response.data.allTags);
        }catch(error) {
            console.error("Error: ", error);
        }
    }
    const updateTag = async (tag) => {
        try{
            const response = await axios.put(`tag/${tag}`, tag);
            await setAllTags(response.data.allTags);
        }catch(error) {
            console.error("Error: ", error);
        }
    }
    const destroyTag = async (tag) => {
        try{
            const response = await axios.delete(`tag/${tag.id}`);
            await setAllTags(response.data.allTags);
        }catch(error) {
            console.error("Error: ", error);
        }
    }
    return (
        <div className="h-full w-full p-2">
            <div className="h-full rounded-md shadow-lg border-2">
                <MainTagHeader storeTag={storeTag} />
                <MainTagList updateTag={updateTag} destroyTag={destroyTag} />
            </div>
        </div>
    )
}