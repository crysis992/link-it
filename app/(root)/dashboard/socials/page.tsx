"use client"
import SaveSocialsButton from "./components/SaveSocialsButton"
import SocialList from "./components/SocialList"
import AddSocial from "./components/AddSocial"

function SocialsPage() {
    return (

        <section className="flex flex-col items-center">
            <h1>Socials</h1>
            <p>Add your social accounts. They appear as icons below your link list.</p>
            <div className="mx-auto w-1/4 min-w-[200px] flex flex-col gap-5">
                <AddSocial />
                <SocialList />
                <SaveSocialsButton />
            </div>
            <p className="text-sm mt-5">Social Medial Platform missing? <span className="underline">Contact us!</span></p>
        </section>
    )
}
export default SocialsPage