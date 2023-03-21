import { FaLink, FaThumbsUp, FaShieldVirus } from 'react-icons/fa'

function Features() {
    return (
        <section className="mt-20">
            <div className='max-w-xl mx-auto mb-24'>
                <h1 className='text-center font-bold text-2xl mb-2'>Fast & Simple URL shortener</h1>
                <p className='text-center'>
                    This site allows to reduce long links from any site on the Internet.
                    Just paste the long URL and click the &quot;Short this link&quot; button.
                    Coyp the generated short URL and share it with your friends.
                </p>
            </div>
            <div className="container mx-auto grid justify-center gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div className="flex flex-col items-center p-4">
                    <FaThumbsUp className="w-8 h-8 text-green-500" />
                    <h3 className="my-3 text-3xl font-semibold">Easy</h3>
                    <div className="space-y-1 leading-tight">
                        <p>Easy and fast, enter the long</p>
                        <p>link to get your shortened link</p>
                    </div>
                </div>
                <div className="flex flex-col items-center p-4">
                    <FaLink className="w-8 h-8 text-green-500" />
                    <h3 className="my-3 text-3xl font-semibold">Shortened</h3>
                    <div className="space-y-1 leading-tight">
                        <p>Use any link, no matter what size</p>
                    </div>
                </div>
                <div className="flex flex-col items-center p-4">
                    <FaShieldVirus className="w-8 h-8 text-green-500" />
                    <h3 className="my-3 text-3xl font-semibold">Secure</h3>
                    <div className="space-y-1 leading-tight">
                        <p>It is fast and secure, our service</p>
                        <p>has HTTPS protocol on all pages</p>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default Features