import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import { useContext } from "react";
import { TagsContext } from "../Memo/Memo";

export default function AddForm(){
    const { data, setData, reset } = useForm({
        id: '', tag_name: '', tag_color: '#00793D', test_color: "",
    });
    const {allTags, setAllTags} = useContext(TagsContext);

    const submitTag = async (e) => {
        e.preventDefault();
        await axios.post('/tag', data)
            .then(response =>{
                setAllTags(response.data);
                reset();
            })
            .catch(error => {
                console.error('Error: ', error);
            });
    };

    return (
        <section className="py-2 border-b">
            <form onSubmit={submitTag}>
                <TextInput
                    id="tag_name"
                    type="text"
                    name="tag_name"
                    placeholder="新しいタグ名を入力"
                    value={data.tag_name}
                    className="w-full"
                    isFocused={true}
                    onChange={(e) => setData('tag_name', e.target.value)}
                />
                <div className="flex items-center justify-between mt-1">
                    <div className="flex items-center">
                        <input
                            id="tag_color" 
                            type="color"
                            name="tag_color"
                            className="h-8 w-8 mx-2"
                            value={data.tag_color}
                            onChange={(e) => setData('tag_color', e.target.value)}
                        />色を選択
                    </div>
                    <PrimaryButton>追加</PrimaryButton>
                </div>
            </form>
        </section>
    )
}