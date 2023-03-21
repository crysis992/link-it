"use client"
import { getSession, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

function Logout() {
    const { data: session, status } = useSession();
    const router = useRouter();

    if (status === "loading" || status === "unauthenticated") {
        return <></>
    }

    return (
        <>
            <button onClick={() => router.push('/dashboard')}>Dashboard</button>
            <button onClick={() => signOut()}>Logout</button>
        </>
    )
}
export default Logout