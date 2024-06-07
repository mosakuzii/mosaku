import { AppContext } from "@/Pages/App";
import { useContext } from "react";
import MainTagHeader from "./Partial/MainTagHeader";
import MainTagList from "./Partial/MainTagList";

export default function MainTag() {
    const { setAllTags } = useContext(AppContext);
    const storeTag = async (tag) => {
        await axios.post("tag", tag)
            .then(response => {
                setAllTags(response.data.allTags);
            })
            .catch(error => {
                console.error("Error: ", error);
            });
    }
    const updateTag = async (tag) => {
        await axios.put(`tag/${tag}`, tag)
            .then(response => {
                setAllTags(response.data.allTags);
            })
            .catch(error => {
                console.error("Error: ", error);
            });
    }
    const destroyTag = async (tag) => {
        await axios.delete(`tag/${tag.id}`)
            .then(response => {
                setAllTags(response.data.allTags);
            })
            .catch(error => {
                console.error("Error: ", error);
            });
    }
    return (
        <div className="h-full w-full bg-white">
            <MainTagHeader storeTag={storeTag} />
            <div className="h-[calc(100vh-5rem)] bg-gray-100">
                <MainTagList updateTag={updateTag} destroyTag={destroyTag} />
            </div>
        </div>
    )
}