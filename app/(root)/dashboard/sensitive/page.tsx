"use client"
import { useState } from "react";
import CheckBox from "./CheckBox"

function SensitiveWarning() {
    const [selected, setSelected] = useState('');

    const handleSave = () => {

    }

    return (
        <div>
            <h1>Sensitive Warning</h1>
            <form onSubmit={(e) => e.preventDefault()}>
                <p>Display a sensitive content warning before visitors can view your linktree.</p>
                <fieldset className="flex flex-col">
                    <CheckBox id="18" label="18+" handleCheck={() => { setSelected('18') }} checked={selected === '18'} />
                    <CheckBox id="21" label="21+" handleCheck={() => { setSelected('21') }} checked={selected === '21'} />
                    <CheckBox id="25" label="25+" handleCheck={() => { setSelected('25') }} checked={selected === '25'} />
                    <CheckBox id="always" label="Always" handleCheck={() => { setSelected('always') }} checked={selected === 'always'} />
                </fieldset>
            </form>
            <button className="mt-3">Save</button>
        </div>
    )
}
export default SensitiveWarning