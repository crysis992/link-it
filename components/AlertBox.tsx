"use client"
import { IconType } from "react-icons/lib"
import clsx from "clsx"

interface AlertBoxProps {
    title?: string;
    message: string | React.ReactElement<HTMLDivElement>;
    icon?: IconType;
    variant?: "success" | "error";
    canClose?: boolean;
    visible?: boolean;
    onClose?: () => void;
    className?: string;
}

function AlertBox({ title = 'Error', icon, message, variant = "error", canClose, onClose, visible = true, className }: AlertBoxProps) {

    const variantStyle = clsx({
        "bg-green-100 text-green-900 border border-green-900 ": variant === "success",
        "bg-red-100 text-red-900 border border-red-900 ": variant === "error",
    });

    if (!visible) {
        return null;
    }

    return (
        <div className={clsx(variantStyle, 'p-3 my-1 relative', className)}>
            {canClose && (<div onClick={onClose} className="absolute top-0 right-1 cursor-pointer">X</div>)}
            <h2 className="font-semibold">{title}</h2>
            <p>{message}</p>
        </div>
    )
}
export default AlertBox