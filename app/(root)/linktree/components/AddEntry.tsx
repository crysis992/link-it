import AlertBox from "@/components/AlertBox";
import Input from "@/components/Input";
import Modal from "@/components/Modal";
import { useState } from "react";

interface AddEntryProps {
    setRequireUpdate: (shouldUpdate: boolean) => void
    currentTree: string;
    userId: string;
}


function AddEntry({ setRequireUpdate, currentTree, userId }: AddEntryProps) {
    const [open, setOpen] = useState(false);

    const [title, setTitle] = useState("");
    const [link, setLink] = useState("");

    const [error, setError] = useState('');

    const handleAdd = async () => {
        setError('')

        if (title.length === 0 || link.length === 0) {
            setError('Please fill in all fields');
            setOpen(false)
            return;
        }
        const response = await fetch('/api/linktree', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                tree: currentTree,
                owner: userId,
                name: title,
                url: link
            })
        })
        closeModal(true)
        if (response.status === 200) {
            setRequireUpdate(true);
        }
    }

    const closeModal = (reset: boolean) => {
        setOpen(false);
        if (reset) {
            setLink('')
            setTitle('')
        }
    }

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
            <AlertBox message={error} visible={error.length > 0} />
            <Modal open={open} title='Add a new Link' onClose={() => { closeModal(true) }} onConfirm={handleAdd} body={bodyContent} actionLabel='Add' buttonVariant="green" />
            <button className="my-5 rounded-lg max-w-md" onClick={() => setOpen(true)}>Add Entry</button>
        </div>
    )
}
export default AddEntry