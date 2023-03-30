"use client"

import Modal from "@/components/Modal"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function SensitivePopup() {

    const [open, setOpen] = useState(true);
    const router = useRouter();

    const body = (
        <p>
            This linktree may contain sensitive content. By clicking &quot;Accept&quot;
            below, you acknowledge that you are of legal age to view such content
            and consent to view it.
        </p>
    )

    useEffect(() => {
        const accepted = localStorage.getItem('sensitive-popup');
        if (accepted === null) return;
        setOpen(false);
    }, [])

    return (
        <div>
            <Modal onClose={() => { router.back() }} onConfirm={() => { setOpen(false); localStorage.setItem('sensitive-popup', 'true') }} title="Warning: Sensitive Content" body={body} open={open} actionLabel="Accept" buttonVariant="green" />
        </div>
    )
}
export default SensitivePopup