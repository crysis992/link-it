"use client"
import { getSession, useSession } from "next-auth/react";
import ScaleLoader from "react-spinners/ScaleLoader";

function GreetingBox() {

    const { data: session, status } = useSession();

    if (status === "loading") {
        return <ScaleLoader color={'#8A9D95'} height={15} width={30} />
    }
    return (
        <div className="text-xl">
            <p>Welcome, {session?.user.name}</p>
        </div>
    )
}
export default GreetingBox