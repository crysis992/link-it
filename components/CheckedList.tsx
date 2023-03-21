function CheckedList({ entries }: { entries: String[] }) {
    return (
        <ul className="grid grid-cols-1 gap-4">

            {entries.map((entry, index) => (
                <li key={index} className="inline-flex items-center text-gray-600">
                    <svg className="w-4 h-4 mr-2 fill-current text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM371.8 211.8l-128 128C238.3 345.3 231.2 348 224 348s-14.34-2.719-19.81-8.188l-64-64c-10.91-10.94-10.91-28.69 0-39.63c10.94-10.94 28.69-10.94 39.63 0L224 280.4l108.2-108.2c10.94-10.94 28.69-10.94 39.63 0C382.7 183.1 382.7 200.9 371.8 211.8z"></path>
                    </svg>
                    {entry}
                </li>
            ))}
        </ul>
    )
}
export default CheckedList