"use client"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { RedirectData } from "./[id]/page";


function RedirectFrame({ data }: { data: RedirectData }) {
    const router = useRouter();
    const [count, setCount] = useState(3);

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;

        setTimeout(() => {
            // router.replace(data.target);
        }, 3000)

        if (count <= 0) return () => clearInterval(interval!);

        interval = setInterval(() => { setCount(count - 1) }, 1000);

        return () => clearInterval(interval!);
    }, [count, data.target, router])

    return (
        <div>
            <h2 className="mt-2 text-xl text-center">in {count}</h2>
            <a href={`/report?url=${data.shortId}`}><small className="mt-10 block text-center underline">Report link?</small></a>
        </div>
    )
}
export default RedirectFrame