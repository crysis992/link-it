"use client"
import { getSession, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";


function Logout() {
    const { data: session, status } = useSession();
    const router = useRouter();

    if (status === "loading" || status === "authenticated") {
        return <></>
    }

    return (
        <button onClick={() => router.push('/login')}>Login</button>
    )
}
export default Logout