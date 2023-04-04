import React, { ChangeEventHandler } from "react";

interface CheckBoxProps {
    label: string;
    value: string;
    checked: boolean;
    onChange: ChangeEventHandler<HTMLInputElement>;
}

function CheckBox(props: CheckBoxProps) {
    return (
        <div>
            <label className="flex items-center gap-1">
                <input
                    type="checkbox"
                    value={props.value}
                    checked={props.checked}
                    onChange={props.onChange}
                    className='bg-green-400'
                />
                {props.label}
            </label>
        </div>
    );
}

export default CheckBox;