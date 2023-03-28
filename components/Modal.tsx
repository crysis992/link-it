"use client"
import { useCallback, useEffect, useRef, useState } from "react";
import clsx from "clsx"

export type ModalProps = {
    open: boolean,
    onClose: () => void,
    onConfirm: () => void,
    title: string,
    body?: React.ReactElement<any>,
    actionLabel?: string,
    buttonVariant?: 'green' | 'red' | 'disabled',
    children?: React.ReactNode
}

function Modal({ open, onClose, onConfirm, title, body, buttonVariant = 'red', actionLabel = 'Delete', children }: ModalProps) {

    const handleEscKey = useCallback((e: KeyboardEvent) => {
        if (e.key === "Escape") {
            onClose();
        }
    }, [onClose])

    const buttonClasses = clsx(
        'py-2 px-4 font-semibold rounded-lg shadow-md',
        {
            'bg-green-500 hover:bg-green-600 text-white': buttonVariant === 'green',
            'bg-red-500 hover:bg-red-600 text-white': buttonVariant === 'red',
            'bg-gray-500 text-gray-600 cursor-not-allowed': buttonVariant === 'disabled',
        }
    );

    useEffect(() => {
        document.addEventListener("keydown", handleEscKey, false);

        return () => document.removeEventListener("keydown", handleEscKey, false);
    }, [handleEscKey])

    if (!open) {
        return null;
    }

    return (
        <div className="fixed h-screen w-full bg-black inset-0 overflow-hidden bg-opacity-70 backdrop-blur-sm transition duration-300 flex flex-col justify-center items-center">

            <div className="bg-white w-[600px] min-h-[200px] flex flex-col justify-between p-3">
                <h1 className="text-xl font-bold">{title}</h1>
                <div className="justify-self-end"> {children} {body}</div>
                <div className="flex justify-evenly p-2">
                    <button className="px-5 bg-gray-500 hover:bg-gray-600" onClick={onClose}>Close</button>
                    <button onClick={onConfirm} className={clsx(buttonClasses, 'px-5')}>{actionLabel}</button>
                </div>
            </div>

        </div>
    )
}
export default Modal