import UpdatePasswordForm from "./Partial/UpdatePasswordForm";
import UpdateProfileInformationForm from "./Partial/UpdateProfileInformationForm";

export default function SettingModal({ user, open, onClose }){
    return (
        <div onClick={onClose} className={`
            fixed inset-0 flex justify-center items-center
            transition-colors
            ${open ? "visible bg-black/20 z-50" : "invisible z-50"}
        `}>
            <div onClick={(e) => e.stopPropagation()}
                className={`
                    bg-white rounded-xl shadow p-6 transition-all
                    ${open ? "scale-100 opacity-100" : "scale-125 opacity-0"}
            `}>
                <UpdateProfileInformationForm user={user} />
                <UpdatePasswordForm user={user} />
            </div>
        </div>
    )
}