"use client"

import { useRouter } from "next/navigation";
import { useState } from "react";

function CreateTreeButton() {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleCreateTree = async () => {
        setLoading(true);

        const response = await fetch("/api/linktree", {
            method: 'DELETE',
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
        <button className='bg-red-500 hover:bg-red-600' onClick={handleCreateTree}>DELETE</button>
    )
}
export default CreateTreeButton