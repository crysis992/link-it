import PropagateLoader from "react-spinners/PropagateLoader"

export default function DashboardLoader() {
    return (
        <div className="flex justify-center">
            <PropagateLoader size={20} color="#26D38A" />
        </div>
    )
}