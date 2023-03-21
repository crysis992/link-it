import Link from "next/link"

function Footer() {
    return (
        <footer className="w-full h-[30px] bg-white border-t shadow-sm shadow-slate-300 flex justify-end">
            <ul className="flex gap-3 items-center">
                <li><Link href='/about'>About</Link></li>
                <li><Link href='/privacy'>Privacy</Link></li>
                <li><Link href='/terms'>Terms of Service</Link></li>
            </ul>
        </footer>
    )
}
export default Footer