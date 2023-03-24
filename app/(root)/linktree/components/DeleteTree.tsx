"use client"

import { useRouter } from "next/navigation";
import { useState } from "react";
import { PropagateLoader } from "react-spinners";

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
        return <PropagateLoader size={30} />
    }

    return (
        <button className='bg-red-500 hover:bg-red-600' onClick={handleCreateTree}>DELETE</button>
    )
}
export default CreateTreeButton