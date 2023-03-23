"use client"
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { memo } from "react";

function Logout() {
    const { status } = useSession();
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
export default memo(Logout)