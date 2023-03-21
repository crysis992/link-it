import Link from "next/link"
import { Suspense } from "react"
import Logout from "./Logout"
import Login from "./Login"

function Navigation() {
    return (
        <nav className="h-[50px] w-full bg-white shadow-sm shadow-slate-300 flex items-center mb-2 justify-between border-b">
            <div className="flex items-center gap-3">
                <div className="max-[400px]:hidden block h-[36px] w-[36px] bg-green-200 ml-3"></div>
                <Link href='/'><p className="text-2xl font-bold cursor-pointer">Hab noch kein namen..und logo</p></Link>

            </div>
            <div>
                <ul className="flex gap-3">
                    {/* <li className="hover:underline hover:cursor-pointer"><Link href='/polls'>Polls</Link></li> */}
                    {/* <li className="hover:underline hover:cursor-pointer"><Link href='/linktree'>Linktree</Link></li> */}
                </ul>
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
export default Navigation