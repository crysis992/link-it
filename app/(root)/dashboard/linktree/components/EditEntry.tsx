"use client"
import Input from "@/components/Input";
import Modal from "@/components/Modal";
import { memo, useCallback, useState } from "react";

interface EditEntry {
    setRequireUpdate: (shouldUpdate: boolean) => void
    setError: (message: string) => void;
    itemId: string;
    initTitle: string;
    initLink: string;
}


function EditEntry({ setRequireUpdate, setError, itemId, initTitle, initLink }: EditEntry) {
    const [open, setOpen] = useState(false);

    const [title, setTitle] = useState(initTitle);
    const [link, setLink] = useState(initLink);



    const handleAdd = useCallback(async () => {
        setError('')

        if (title.length === 0 || link.length === 0) {
            setError('Please fill in all fields');
            setOpen(false)
            return;
        }
        const response = await fetch('/api/linktree/update/entry', { //TODO create api endpoint
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                entry: itemId,
                title: title,
                url: link
            })
        })
        setOpen(false)
        if (response.status === 200) {
            setRequireUpdate(true);
        } else {
            setError(response.statusText);
        }
    }, [itemId, link, setError, setRequireUpdate, title])

    const bodyContent = (
        <div className="flex flex-col gap-6">
            <span />
            <Input id="name" placeholder="Title.." type="text" value={title} onChange={(e) => { setTitle(e.target.value) }} />
            <Input id="link" placeholder="Link.." type="text" value={link} onChange={(e) => { setLink(e.target.value) }} />
            <span />
        </div>
    )

    return (
        <div>
            <Modal open={open} title='Add a new Link' onClose={() => { setOpen(false) }} onConfirm={handleAdd} body={bodyContent} actionLabel='Update' buttonVariant="green" />
            <button className="rounded-lg max-w-md" onClick={() => setOpen(true)}>Edit</button>
        </div>
    )
}
export default memo(EditEntry)