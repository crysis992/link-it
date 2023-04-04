"use client"
import { useEffect, useState } from "react";
import CheckBox from "./CheckBox"
import { useSelector, useDispatch } from 'react-redux'
import { selectUser, toggleSensitive } from '@/redux/features/users/userSlice';
import { BarLoader } from "react-spinners";

function SensitiveWarning() {
    const user = useSelector(selectUser);
    const [selected, setSelected] = useState(false);
    const dispatch = useDispatch();


    useEffect(() => {
        if (user === null) return;
        setSelected(user.userlinks.sensitive);
    }, [user])

    if (user === null) {
        return (
            <BarLoader width={20} color="#26D38A" />
        )
    }

    const handleSave = async () => {
        if (selected === user.userlinks.sensitive) return;
        const result = await fetch(`/api/linktree/sensitive?user=${user.id}&mode=${selected}`, {
            method: 'POST',
        });
        if (result.status === 200) {
            const data = await result.json();
            if (data.sensitive === selected) {
                dispatch(toggleSensitive());
            }
        }
    }

    const handleCheckboxChange = (e: any) => {
        setSelected(!selected)
    }


    return (
        <div>
            <h1>Sensitive Warning</h1>
            <div>Active: <span className="font-bold">{user.userlinks.sensitive ? 'Yes' : 'No'}</span> </div>
            <form onSubmit={(e) => e.preventDefault()}>
                <p>Display a sensitive content warning before visitors can view your linktree.</p>

                <CheckBox label="active" value="active" onChange={handleCheckboxChange} checked={selected} />

            </form>
            <button className="mt-3" onClick={handleSave}>Save</button>
        </div>
    )
}
export default SensitiveWarning