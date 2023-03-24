"use client"

import PropagateLoader from "react-spinners/PropagateLoader"

export default function DashboardLoader() {
    return (
        <div className="mx-auto -translate-y-1/2 transition-all duration-700">
            <PropagateLoader size={20} color="#26D38A" />
        </div>
    )
}