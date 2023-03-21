"use client"
import { getSession, useSession } from "next-auth/react";

function GreetingBox() {

    const { data: session, status } = useSession();

    if (status === "loading") {
        return <div>Loading...</div>;
    }
    return (
        <div className="text-xl">
            <p>Willkommen Admin, {session?.user.name}</p>
            {/* <p className="text-red-600">Dein Status: {session?.user.role}</p> */}

        </div>
    )
}
export default GreetingBox