"use client"
import Modal from "@/components/Modal"
import { LinkData } from "../page"
import { useRef, useState } from "react"
import { useRouter } from "next/navigation"
import AlertBox from "@/components/AlertBox"

function LinkList({ data }: { data: LinkData[] }) {
    const [modalVisible, setModalVisible] = useState(false)
    const selectedLink = useRef<string | null>(null);
    const [error, setError] = useState<string | null>(null)
    const router = useRouter();

    const handleDelete = async () => {
        setModalVisible(false)
        try {
            const result = await fetch("/api/url", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    url: selectedLink.current,
                }),
            })
            if (result.status !== 200) {
                const message = await result.json();
                setError(message);
            } else {
                setError(null)
                router.refresh();
            }

        } catch (error) {

        }
    }

    return (
        <section>
            <Modal
                open={modalVisible}
                onClose={() => setModalVisible(false)}
                onConfirm={handleDelete}
                title="Delete Link?"
                body={<div>Are you sure you want to delete {selectedLink.current}?</div>}
            />
            {error && <AlertBox title="Error" message='Something went wrong' variant="error" />}

            <table className="min-w-full text-left text-sm font-light my-5">
                <thead className="border-b font-medium border-neutral-500">
                    <tr>
                        <th scope="col" className="px-6 py-4">Short</th>
                        <th scope="col" className="px-6 py-4">Destination</th>
                        <th scope="col" className="px-6 py-4">Visits</th>
                        <th scope="col" className="px-6 py-4">Manage</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((link) => (
                        <tr key={link.id} className="border-b transition duration-200 ease-in-out hover:bg-neutral-100">
                            <td className="whitespace-nowrap px-6 py-4 font-medium">{process.env.NEXT_PUBLIC_BOARD_URL}/l/{link.shortId}</td>
                            <td className="whitespace-nowrap px-6 py-4 font-medium">{link.target.length > 40 ? link.target.substring(0, 40) + '...' : link.target}</td>
                            <td className="whitespace-nowrap px-6 py-4 font-medium">{link.visits}</td>
                            <td className="whitespace-nowrap px-6 py-4"><button onClick={() => { selectedLink.current = link.id; setModalVisible(true) }} className="bg-red-400 hover:bg-red-500">Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    )
}
export default LinkList