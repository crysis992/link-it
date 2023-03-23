"use client"
import { TreeEntry } from "@prisma/client";
import { useEffect, useRef, useState } from "react";
import { DragDropContext, Draggable } from "react-beautiful-dnd";
import { StrictModeDroppable as Droppable } from './StrictModeDropable'
import { useRouter } from "next/navigation";

type LinkPreviewProps = {
    user: string;
}

function LinkPreview({ user }: LinkPreviewProps) {

    const [list, setList] = useState<TreeEntry[]>([]);
    const [loading, setLoading] = useState(false);
    const [requireUpdate, setRequireUpdate] = useState(true);
    const router = useRouter();
    const treeId = useRef();


    useEffect(() => {

        const fetchData = async () => {
            const result = await fetch(`/api/linktree/user/?id=${user}`)
            const dataTree = await result.json();
            setList(dataTree.entries);
            treeId.current = dataTree.id;
            setLoading(false)
            setRequireUpdate(false)
            console.log('Data loaded')
        }
        if (requireUpdate) {
            setLoading(true)
            console.log('Loading Data...');
            fetchData();
        }

    }, [user, requireUpdate])



    const handleOnDragEnd = (result: any) => {
        console.log(result)
        if (!result.destination) {
            return;
        }

        const { source, destination } = result;

        if (source.index === destination.index) {
            return;
        }

        const newList = [...list];

        const [reorderedItem] = newList.splice(source.index, 1);
        newList.splice(destination.index, 0, reorderedItem);

        newList.map((item, index) => {
            item.order = index;
        })
        setList(newList);
    }

    const handleOnSave = async () => {
        setLoading(true)
        await fetch('/api/linktree/update', {
            method: 'POST',
            body: JSON.stringify({ treeId: treeId.current, entries: list }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).finally(() => setLoading(false))
    }

    const handleAdd = async () => {
        const response = await fetch('/api/linktree', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                tree: treeId.current,
                owner: user,
                name: 'Instagram',
                url: 'https://www.instagram.com/'
            })
        })
        setRequireUpdate(true);
        router.refresh();
    }

    const handleDelete = async (id: string) => {
        const result = await fetch('/api/linktree/entry', {
            method: 'DELETE',
            body: JSON.stringify({ id: id })
        })

        if (result.status === 200) {
            setLoading(true)
            setRequireUpdate(true);
            router.refresh();
        }
    }

    if (loading) {
        return (
            <div className="mx-auto w-full">
                <h1>Your Links: {list.length}/10</h1>
                <p>Loading...</p>
            </div>
        )
    }


    return (
        <div className="mx-auto w-full flex flex-col items-center">
            <h1>Your Links: {list.length}/10</h1>
            <button className="w-2/4 my-5 rounded-lg max-w-md" onClick={handleAdd}>Add Entry</button>
            <section className="w-full max-w-5xl">
                <DragDropContext onDragEnd={handleOnDragEnd}>
                    <Droppable droppableId="linklist">
                        {(provided: any) => (
                            <section {...provided.droppableProps} ref={provided.innerRef}>
                                {
                                    list.map((item, index) => (
                                        <Draggable key={item.id} draggableId={item.id} index={index}>
                                            {(provided) => (
                                                <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}
                                                    className="bg-slate-200 border border-slate-400 my-5 flex items-center py-3">
                                                    <p className="font-medium text-lg grow">{item.name}</p>

                                                    <div className="flex gap-3 justify-self-end pr-3">
                                                        <button onClick={() => handleDelete(item.id)}>Delete</button>
                                                        <button onClick={() => handleDelete(item.id)}>Edit</button>
                                                    </div>
                                                </div>
                                            )}
                                        </Draggable>
                                    ))
                                }
                                {provided.placeholder}
                            </section>
                        )}
                    </Droppable>
                </DragDropContext>
            </section>

            <button onClick={handleOnSave} className="w-full">Save</button>
        </div>
    )
}
export default LinkPreview