import Link from "next/link"
import { Suspense, memo } from "react"
import Logout from "./Logout"
import Login from "./Login"
import Image from 'next/image'
import logo from '../public/linkit.png'

function Navigation() {
    return (
        <nav className="py-2 w-full bg-white shadow-sm shadow-slate-300 flex items-center mb-2 justify-between border-b">
            <div className="flex items-center gap-3">
                <Image src={logo} alt='Website Logo' height={36} width={36} priority className="ml-3 max-[400px]:hidden" />
                <Link href='/'><p className="text-2xl font-bold cursor-pointer ml-1">{process.env.HEADER_SITE_NAME}</p></Link>
            </div>
            <div className="mr-10 flex gap-3">
                <Suspense fallback={<div>Loading...</div>}>
                    <Logout />
                </Suspense>
                <Suspense fallback={<div>Loading...</div>}>
                    <Login />
                </Suspense>
            </div>
        </nav>
    )
}
export default memo(Navigation)