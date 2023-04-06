'use client'
import AlertBox from "@/components/AlertBox";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { useEffect, useState } from "react";
import { useSelector } from 'react-redux'
import { selectUser } from '@/redux/features/users/userSlice';
import { BarLoader } from "react-spinners";
import { signOut } from "next-auth/react";


//TODO: Switch to react-form, update components to support react-form

function ProfileSettingsPage() {
    const user = useSelector(selectUser);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('')
    const [oldPassword, setOldPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    const handleProfileUpdate = async () => {
        setError('');

        if (password.length > 0) {
            if (password !== confirmPassword || oldPassword.length === 0) {
                setError('Passwords do not match')
                return;
            }
        }

        if (username.length === 0) {
            setError('Username cannot be empty');
            return;
        }

        const result = await fetch('/api/profile/update', {
            method: 'POST',
            body: JSON.stringify({
                username: username,
                password: password,
                oldpassword: oldPassword,
            })
        })

        if (result.status === 200) {
            signOut({ callbackUrl: '/login', redirect: true })
        }
    }

    useEffect(() => {
        if (user === null) return;
        setUsername(user.name);
        setLoading(false);
    }, [user])

    if (loading) {
        return (
            <BarLoader width={50} color="#26D38A" />
        )
    }


    return (
        <div className="w-2/4 mx-auto max-sm:w-full">
            {error.length > 0 && (<AlertBox message={error} />)}
            <h1>Profile Settings (@{user?.name})</h1>

            <div>
                <h2>Profile</h2>
                <section className="flex flex-col gap-3 items-start border-b border-slate-200">
                    <p className="font-bold">Change Username</p>
                    <Input id='username' placeholder='Username' value={username} onChange={(e) => { setUsername(e.target.value) }} />
                    <hr />
                    <p className="font-bold">Change password</p>
                    <Input id='old_password' placeholder='Old password' type='password' value={oldPassword} onChange={(e) => { setOldPassword(e.target.value) }} />
                    <Input id='password' placeholder='New password' type='password' value={password} onChange={(e) => { setPassword(e.target.value) }} />
                    <Input id='confirmpassword' placeholder='Confirm password' type='password' value={confirmPassword} onChange={(e) => { setConfirmPassword(e.target.value) }} />
                    <Button label='Save' onClick={handleProfileUpdate} />
                    <p className="text-sm">To change your email, please <span className="underline">contact our support</span></p>
                </section>
                <h2>Avatar & Banner</h2>
                <section className="flex flex-col gap-3 items-start border-b border-slate-200">
                    <p>Coming soon</p>
                    <button className="mb-3 self-end cursor-not-allowed">Coming soon</button>
                </section>
                <h2 className="text-red-500">Danger Zone!</h2>
                <section className="flex flex-col gap-3 items-start border-b border-slate-200">
                    <p>Delete your account, this action cannot be undone!</p>
                    <button className="btn-red mb-3 cursor-not-allowed">Coming soon</button>
                </section>
            </div>
        </div>
    )
}
export default ProfileSettingsPage