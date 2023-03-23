"use client"

import Input from "@/components/Input";
import Link from "next/link"
import { useCallback, useState } from "react";
import { FiAlertCircle } from "react-icons/fi";

const emailRegex = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);

function RegisterPage() {

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");


    const onSubmit = useCallback(async () => {
        setLoading(true)

        if (password.length < 4) {
            setError("Password must be at least 8 characters")
            setLoading(false)
            return;
        }

        if (username.length < 4) {
            setError("Username must be at least 4 characters")
            setLoading(false)
            return;
        }

        if (emailRegex.test(email) === false) {
            setError("Invalid email")
            setLoading(false)
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match")
            setLoading(false)
            return;
        }

        setError("");

        try {
            const result = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    username,
                    password,
                })
            })
            if (result.status !== 200) {
                const responseData = await result.json();
                setError(responseData);
            } else {
                setSuccess("Your account has been created. You can now log in.");
                setPassword("")
                setConfirmPassword("")
                setEmail("")
                setUsername("")
            }

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }, [email, username, password, confirmPassword]);





    return (
        <div className="container mx-auto">
            {error.length > 0 && (
                <div className="relative flex flex-col items-center bg-red-300 border-red-600 border-2 py-3">
                    <h2 className="font-semibold text-xl">Error:</h2>
                    <p>{error}</p>
                    <FiAlertCircle size={25} className="absolute left-4 translate-y-2/4" />
                </div>
            )}
            {success.length > 0 && (
                <div className="relative flex flex-col items-center bg-green-300 border-green-600 border-2 py-3">
                    <h2 className="font-semibold text-xl">Successful!</h2>
                    <p>{success}</p>
                    <FiAlertCircle size={25} className="absolute left-4 translate-y-2/4" />
                </div>
            )}
            <div className="py-6 flex flex-col justify-center sm:py-12">
                <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                    <div
                        className="absolute inset-0 bg-gradient-to-r from-green-300 to-green-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
                    </div>
                    <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                        <div className="max-w-md mx-auto">
                            <div>
                                <h1 className="text-2xl font-semibold">Register new Account</h1>
                            </div>
                            <div className="divide-y divide-gray-200">
                                <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                                    <Input id='username' placeholder="Username" type="text" onChange={({ target }) => setUsername(target.value)} value={username} />
                                    <Input id='email' placeholder="Email" type="text" onChange={({ target }) => setEmail(target.value)} value={email} />
                                    <Input id='password' placeholder="Password" type="password" onChange={({ target }) => setPassword(target.value)} value={password} />
                                    <Input id='confirmpassword' placeholder="Confirm Password" type="password" onChange={({ target }) => setConfirmPassword(target.value)} value={confirmPassword} />

                                    <div className="relative">
                                        {loading ? (<button className="bg-green-500 text-white rounded-md px-2 py-1 cursor-progress">...</button>) : (<button onClick={onSubmit} className="bg-green-500 text-white rounded-md px-2 py-1">Register</button>)}

                                    </div>
                                </div>
                                <small className='mt-3'>Already have an account? <span className="underline"><Link href='/login'>Sign in</Link></span></small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default RegisterPage