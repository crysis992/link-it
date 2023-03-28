"use client"

import { useRouter } from "next/navigation";

interface SidebarEntryProps {
    title: string;
    link: string;
}

function SidebarEntry({ title, link }: SidebarEntryProps) {
    const router = useRouter();

    const handleButtonClick = () => {
        router.replace(link)
    }

    return (
        <button onClick={handleButtonClick} className="rounded-none bg-white text-black hover:bg-slate-100 py-5 border-b border-slate-300">
            {title}
        </button>
    )
}
export default SidebarEntry