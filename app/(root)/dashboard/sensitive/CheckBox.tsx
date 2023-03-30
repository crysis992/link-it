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
            <label>
                <input
                    type="checkbox"
                    value={props.value}
                    checked={props.checked}
                    onChange={props.onChange}
                />
                {props.label}
            </label>
        </div>
    );
}

export default CheckBox;