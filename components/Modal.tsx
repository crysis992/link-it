"use client"
import { useCallback, useEffect, useRef, useState } from "react";

export type ModalProps = {
    open: boolean,
    onClose: () => void,
    onConfirm: () => void,
    title: string,
    body: React.ReactElement<any>
}

function Modal({ open, onClose, onConfirm, title, body }: ModalProps) {

    const handleEscKey = useCallback((e: KeyboardEvent) => {
        if (e.key === "Escape") {
            onClose();
        }
    }, [onClose])

    useEffect(() => {
        document.addEventListener("keydown", handleEscKey, false);

        return () => document.removeEventListener("keydown", handleEscKey, false);
    }, [handleEscKey])

    if (!open) {
        return null;
    }



    return (
        <div className="fixed h-screen w-full bg-black inset-0 overflow-hidden bg-opacity-70 backdrop-blur-sm transition duration-300 flex flex-col justify-center items-center">

            <div className="bg-white w-[600px] h-[200px] flex flex-col justify-between p-3">
                <h1 className="text-xl font-bold">{title}</h1>
                <div className="justify-self-end"> {body} </div>
                <div className="flex justify-between p-2">
                    <button onClick={onClose}>Close</button>
                    <button onClick={onConfirm} className="bg-red-600 hover:bg-red-700">Delete</button>
                </div>
            </div>

        </div>
    )
}
export default Modal