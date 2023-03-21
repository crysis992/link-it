"use client"
import Input from "@/components/Input";
import Link from "next/link"
import { signIn, useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import { FiAlertCircle } from "react-icons/fi";
import { useRouter } from "next/navigation";

function LoginPage() {
    const { data: session, status } = useSession();
    const router = useRouter();

    const [email, setEmail] = useState("crysis@gmail.com");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = useCallback(async () => {
        try {
            const result = await signIn('credentials', { redirect: false, email: email, password: password });

            if (result?.error) {
                setError(result.error);
            }

        } catch (error) {
            console.log(error)
        }
    }, [email, password]);

    useEffect(() => {
        if (status === "authenticated") {
            router.push("/");
        }
    }, [router, status])

    if (status === "loading" || status === 'authenticated') {
        return <></>
    }


    return (
        <div className="container mx-auto">
            {error.length > 0 && (
                <div className="relative flex flex-col items-center bg-red-300 border-red-600 border-2 py-3">
                    <h2 className="font-semibold text-xl">Error:</h2>
                    <p>{error}</p>
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
                                <h1 className="text-2xl font-semibold">Login</h1>
                            </div>
                            <div className="divide-y divide-gray-200">
                                <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                                    <Input id='email' placeholder="Email" type="text" onChange={({ target }) => setEmail(target.value)} value={email} />
                                    <Input id='password' placeholder="Password" type="password" onChange={({ target }) => setPassword(target.value)} value={password} />

                                    <div className="relative">
                                        <button onClick={handleLogin} className="bg-green-500 text-white rounded-md px-2 py-1">Login</button>
                                    </div>
                                </div>
                                <small className='mt-3'>Dont have an account? <span className="underline"><Link href='/register'>Register</Link></span></small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default LoginPage