"use client"
import { selectUser } from '@/redux/features/users/userSlice';
import { useSelector } from "react-redux";
import { BarLoader } from 'react-spinners';


function SaveSocialsButton() {
    const user = useSelector(selectUser);

    console.log('SaveButton', user);

    if (user === null) {
        return <BarLoader width={200} color="#26D38A" />
    }

    const handleSave = async () => {
        await fetch('/api/profile/socials', {
            method: 'POST',
            body: JSON.stringify(user.socials)
        })
    }

    return (
        <>
            <button onClick={handleSave}>Save</button>
        </>
    )
}
export default SaveSocialsButton