import UserTest from "./UserTest";

async function ProfileSettingsPage() {

    return (
        <div className="w-2/4 mx-auto max-sm:w-full">
            <h1>Profile Settings</h1>

            <div>
                <h2>Profile</h2>
                <section className="flex flex-col gap-3 items-start border-b border-slate-200">
                    <div className="flex gap-3 flex-wrap">
                        <p className="min-w-[100px]">Username:</p>
                        <input type="text" name="username" placeholder="@username" className="border border-black" />
                    </div>

                    <div className="flex gap-3 flex-wrap">
                        <p className="min-w-[100px]">Password:</p>
                        <div className="flex flex-col">
                            <input type="text" name="password" placeholder="Password" className="border border-black" />
                            <input type="text" name="confirmPassword" placeholder="Confirm Password" className="border border-black" />
                        </div>
                    </div>

                    <div className="flex gap-3 flex-wrap">
                        <p className="min-w-[100px]">E-mail:</p>
                        <input type="text" name="password" placeholder="New E-Mail" className="border border-black" />
                    </div>
                    <button className="mb-3 self-end">Update</button>
                </section>
                <h2>Avatar & Banner</h2>
                <section className="flex flex-col gap-3 items-start border-b border-slate-200">
                    <p>Coming soon</p>
                    <button className="mb-3 self-end">Update</button>
                </section>
                <h2 className="text-red-500">Danger Zone!</h2>
                <section className="flex flex-col gap-3 items-start border-b border-slate-200">
                    <p>Delete your account, this action cannot be undone!</p>
                    <button className="btn-red mb-3">Delete Account</button>
                </section>
            </div>
        </div>
    )
}
export default ProfileSettingsPage