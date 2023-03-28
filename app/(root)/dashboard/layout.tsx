import SidebarEntry from "./components/SidebarEntry"

function ProfileLayout({ children }: { children: React.ReactNode }) {
    return (
        <main>
            <div className="flex justify-start">
                <aside className="h-full w-[150px] bg-yellow-200">
                    <div className="flex flex-col items-stretch">
                        <SidebarEntry title="Profile Settings" link="/dashboard/settings" />
                        <SidebarEntry title="Social Icons" link="/dashboard/socials" />
                        <SidebarEntry title="Sensitive Warning" link="/dashboard/sensitive" />
                        <SidebarEntry title="Linktree" link="linktree" />
                        <SidebarEntry title="Statistics" link="/dashboard/statistics" />
                    </div>
                </aside>
                <section className="w-full p-5">
                    {children}
                </section>
            </div>
        </main>
    )
}
export default ProfileLayout