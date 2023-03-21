"use client"

import { useState, cache } from "react";
import { FaArrowRight } from "react-icons/fa";

function generateId() {
    return Math.random().toString(36).slice(-7);
}

function LinkShortener() {
    const [data, setData] = useState('');
    const [url, setUrl] = useState('')
    const [loading, setLoading] = useState(false);

    const handleSubmit = cache(async (target: string) => {
        if (target.length === 0) {
            return;
        }

        // TODO Validate URL input

        setLoading(true);
        const result = await fetch(`/api/url`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                url: target,
                id: generateId()
            })
        }).finally(() => { setLoading(false) })

        if (result.status !== 200) {
            console.log('Failed to generate url');
            return;
        }
        const data = await result.json();
        setUrl(data.shortId);
    });


    return (
        <section className="container mx-auto mt-20">
            <h2 className="text-4xl mb-5 text-center">Shorten your links</h2>

            <div className="flex gap-3 mx-auto">
                <input
                    className='text-slate-800 bg-slate-100 shadow-sm shadow-slate-200 w-full py-2 rounded-lg px-2 outline-transparent border-b border-slate-400'
                    type="url"
                    autoComplete="off"
                    placeholder="Paste an URL to shorten..."
                    value={data}
                    onChange={(e) => setData(e.target.value)}
                />
                {loading ? <p>Loading...</p> :
                    <button onClick={() => { handleSubmit(data) }} className='py-3 rounded-xl px-3 hover:bg-opacity-80 transition bg-gradient-to-tr from-green-500 to-green-600 font-semibold'>Short this link</button>
                }
            </div>
            {url.length > 0 &&
                (<div className=" w-fit mx-auto px-3 mt-2 border-2 py-2 border-green-900 flex items-center">
                    <FaArrowRight className="mr-3 text-2xl" />
                    <h2 className="text-center text-2xl">Your short link: <a href={`/l/${url}`}>https://link.es/l/{url}</a></h2>
                </div>)}
        </section>
    )
}
export default LinkShortener