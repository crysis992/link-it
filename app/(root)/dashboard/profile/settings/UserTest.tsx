"use client"
import { useSelector } from 'react-redux'
import { selectUser } from '@/redux/features/users/userSlice';
import { BarLoader } from 'react-spinners';



function UserTest() {
    const user = useSelector(selectUser);

    if (user === null) {
        return (
            <BarLoader width={20} color="#26D38A" />
        )
    }


    return (
        <div>
            <p>Username: {user.name} </p>
            <p>User ID: {user.id}</p>
            <div>Avatar: ...coming soon</div>
            <div>Profile Banner: ...coming soon</div>
        </div>
    )
}
export default UserTest