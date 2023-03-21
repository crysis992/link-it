"use client"
import { getSession, useSession } from "next-auth/react";

function GreetingBox() {

    const { data: session, status } = useSession();

    if (status === "loading") {
        return <div>Loading...</div>;
    }
    return (
        <div className="text-xl">
            <p>Welcome, {session?.user.name}</p>
        </div>
    )
}
export default GreetingBox