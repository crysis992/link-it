"use client"
import Input from "@/components/Input";
import Modal from "@/components/Modal";
import { useCallback, useMemo, useState } from "react";
import { IconType } from "react-icons";
import { SocialPlatform, socialPlatforms } from "@/libs/socials"
import { useDispatch, useSelector } from "react-redux";
import { addSocial, selectUser } from "@/redux/features/users/userSlice"
import { BarLoader } from "react-spinners";


function AddSocial() {
    const [open, setOpen] = useState(false);
    const [socialId, setSocialId] = useState('');
    const [selected, setSelected] = useState<SocialPlatform | null>(null);
    const dispatch = useDispatch();

    const user = useSelector(selectUser);



    const openModal = () => {
        setOpen(true);
    }

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const platform = socialPlatforms.find((p) => p.value === e.target.value);
        setSelected(platform || null);
    };

    const iconComponent = useMemo(() => {
        if (!selected) {
            return null;
        }

        const Icon: IconType = selected.icon;
        return <Icon size={24} />;
    }, [selected]);


    const handleAddSocial = async () => {
        if (!selected) {
            return;
        }
        const provider = selected.value;
        dispatch(addSocial({ provider: provider, public: true, username: socialId }))
        setOpen(false);
    }

    const body = (
        <div>
            <div className="flex gap-3">
                <select onChange={handleSelectChange} value={selected?.value}>
                    <option value="">Select a platform</option>
                    {socialPlatforms.map((platform) => (
                        <option key={platform.value} value={platform.value}>
                            {platform.label}
                        </option>
                    ))}
                </select>
            </div>
            {iconComponent}
            <Input className='mt-5' id="social" onChange={(e) => setSocialId(e.target.value)} type="text" placeholder={`Your ${selected?.label ? selected.label : ''} tag`} value={socialId} />
        </div>
    )


    if (user === null) {
        return (
            <BarLoader width={200} color="#26D38A" />
        )
    }


    return (
        <div>
            <Modal body={body} open={open} onClose={() => { setOpen(false) }} onConfirm={handleAddSocial} title="Add Social" actionLabel="Save" buttonVariant="green" />
            <button onClick={openModal}>Add Social</button>
        </div>
    )
}
export default AddSocial