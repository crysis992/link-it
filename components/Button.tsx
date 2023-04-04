"use client"

import { useRouter } from "next/navigation";
import { useCallback } from "react";

interface ButtonProps {
    label: string;
    onClick?: () => void;
    disabled?: boolean;
    src?: string;
    className?: string;
}

function Button({ label, onClick, disabled, src, className }: ButtonProps) {
    const router = useRouter();

    const handleClick = useCallback(() => {
        if (!onClick || disabled) return;
        src ? router.push(src) : onClick();

    }, [disabled, onClick, router, src])

    return (
        <button
            onClick={handleClick}
            className={`
            ${disabled ? "cursor-not-allowed" : "cursor-pointer"}
            ${disabled ? "bg-slate-700" : ''}
            ${disabled ? "hover:bg-slate-600" : ''}
            ${className}
            `}
        >
            {label}
        </button>
    )
}
export default Button