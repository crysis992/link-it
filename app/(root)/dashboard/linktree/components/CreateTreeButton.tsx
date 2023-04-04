"use client"

import { useRouter } from "next/navigation";
import { useState } from "react";

function CreateTreeButton() {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleCreateTree = async () => {
        setLoading(true);

        const response = await fetch("/api/linktree", {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
            },
        })
        if (response.ok) {
            router.refresh();
        } else {
            console.log(response);
        }
        setLoading(false);
    };

    if (loading) {
        return <button disabled className="bg-gray-400 hover:bg-gray-400">Loading...</button>
    }

    return (
        <button onClick={handleCreateTree}>Create new Linktree</button>
    )
}
export default CreateTreeButton