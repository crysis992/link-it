import { HTMLInputTypeAttribute } from "react";
import clsx from "clsx"
interface InputProps {
    id: string;
    type: HTMLInputTypeAttribute
    placeholder: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
}

function Input({ id, type, placeholder, onChange, value, className }: InputProps) {
    return (
        <div className={clsx('relative', className)}>
            <input autoComplete='off'
                id={id}
                name={id}
                type={type}
                className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />

            <label
                htmlFor="username"
                className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
            >
                {placeholder}</label>
        </div>
    )
}
export default Input