import CheckedList from "./CheckedList"

function Pricing() {
    return (
        <section className="container mx-auto my-10">
            <h1 className="font-semibold text-center text-3xl my-7">Get a free account to access more features</h1>


            <div className="w-full md:w-2/3 grid grid-cols-1 md:grid-cols-3 gap-6 mx-auto">

                <div className="shadow p-5 rounded-lg border-t-4 border-green-400 bg-white flex flex-col max-h-[300px]">
                    <p className="uppercase text-sm font-medium text-gray-500">No Account required</p>
                    <p className="mt-4 text-3xl text-gray-700 font-medium">Free</p>
                    <p className="mt-4 font-medium text-gray-700"> Up to 5 links</p>

                    <div className="mt-8 grow">
                        <CheckedList entries={['No special features', 'Ads on redirect pages']} />
                    </div>
                </div>

                <div className="shadow p-5 rounded-lg border-t-4 border-green-400 bg-white flex flex-col">
                    <p className="uppercase text-sm font-medium text-gray-500">Registered</p>
                    <p className="mt-4 text-3xl text-gray-700 font-medium">Free</p>
                    <p className="mt-4 font-medium text-gray-700"> Up to 100 links</p>

                    <div className="mt-8 grow">
                        <CheckedList entries={['Access to polls', 'Access to linktree', 'Statistics', 'Manage your links']} />
                    </div>

                    <div className="mt-8">
                        <button className="bg-gray-400 hover:bg-gray-500 px-3 py-2 rounded-lg w-full text-white">
                            Register now
                        </button>
                    </div>
                </div>

                <div className="shadow p-5 rounded-lg border-t-4 border-green-400 bg-white flex flex-col">
                    <p className="uppercase text-sm font-medium text-gray-500">Pro</p>
                    <p className="mt-4 text-3xl text-gray-700 font-medium">3,49€ / month</p>
                    <p className="mt-4 font-semibold text-gray-700"> Unlimited links</p>

                    <div className="mt-8">
                        <CheckedList entries={['Access to polls', 'Access to linktree', 'Statistics', 'Manage your links', 'No Ads', 'Custom redirect timers', 'Custom Styles']} />
                    </div>

                    <div className="mt-8 grow">
                        <button className="bg-green-400 hover:bg-green-500 px-3 py-2 rounded-lg w-full text-white">
                            Start subscription
                        </button>
                    </div>
                </div>


            </div>
        </section>
    )
}
export default Pricing