interface CheckBoxProps {
    id: string;
    label: string;
    handleCheck: () => void;
    checked?: boolean;
}

export default function CheckBox({ id, label, handleCheck, checked = false }: CheckBoxProps) {
    return (
        <div className="flex items-center gap-3">
            <input type="radio" name="18+" id={id} className="w-5 h-5" onChange={handleCheck} checked={checked} />
            <label htmlFor={id} className="">{label}</label>
        </div>
    )
}