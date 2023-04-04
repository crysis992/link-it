"use client"
import { TreeEntry } from "@prisma/client";
import { useEffect, useRef, useState } from "react";
import { DragDropContext, Draggable } from "react-beautiful-dnd";
import { StrictModeDroppable as Droppable } from './StrictModeDropable'
import { useRouter } from "next/navigation";
import AddEntry from "./AddEntry";
import { RxDragHandleHorizontal } from 'react-icons/rx'
import AlertBox from "@/components/AlertBox";
import PropagateLoader from "react-spinners/PropagateLoader";
import EditEntry from "./EditEntry";

type LinkPreviewProps = {
    user: string;
    username: string;
    linkLimit: number;
}

function LinkPreview({ user, username, linkLimit }: LinkPreviewProps) {

    const [list, setList] = useState<TreeEntry[]>([]);
    const [loading, setLoading] = useState(false);
    const [requireUpdate, setRequireUpdate] = useState(true);
    const [error, setError] = useState('');
    const router = useRouter();
    const treeId = useRef<string>();


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
            <div className="mx-auto -translate-y-1/2 transition-all duration-700">
                <PropagateLoader size={20} color="#26D38A" />
            </div>
        )
    }


    return (
        <div className="mx-auto w-full flex flex-col items-center">
            <AlertBox canClose onClose={() => setError('')} message={error} visible={error.length > 0} className='w-2/4' />
            <h1>Your Links: {list.length}/{linkLimit}</h1>
            <div className="flex items-center justify-center gap-3 w-1/3">
                <AddEntry setError={setError} currentTree={treeId.current!} userId={user} setRequireUpdate={setRequireUpdate} />
                <a href={process.env.NEXT_PUBLIC_BOARD_URL + '/' + username} target="_blank" ><button className="">Open in new tab</button></a>
            </div>
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
                                                    <RxDragHandleHorizontal size={30} />
                                                    <p className="font-medium text-lg grow ml-3 font-buttons">{item.name} <span className="text-sm ml-5">{item.destination} </span></p>

                                                    <div className="flex gap-2 pr-3">
                                                        <EditEntry
                                                            setError={setError}
                                                            setRequireUpdate={setRequireUpdate}
                                                            itemId={item.id}
                                                            initLink={item.destination}
                                                            initTitle={item.name}
                                                        />


                                                        <button className="btn-red" onClick={() => handleDelete(item.id)}>Delete</button>
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

            <button onClick={handleOnSave} className="w-1/4 my-5 rounded-lg max-w-xs">Save</button>
        </div>
    )
}
export default LinkPreview