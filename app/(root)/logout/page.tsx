"use client"

import { signOut } from "next-auth/react";
import { useEffect, useRef } from "react"


function LogoutPage() {
    const isLoggedOut = useRef(false);

    useEffect(() => {
        if (isLoggedOut.current) {
            return;
        }
        signOut({ callbackUrl: 'http://localhost:3000' });
        isLoggedOut.current = true;
    }, [])

    return (
        <div>LogoutPage</div>
    )
}
export default LogoutPage