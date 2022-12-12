import React, { forwardRef, LegacyRef, useState } from "react";

interface Props {
    name: string;
    id: string;
    label: string;
    className?: string;
    inputClassName?: string;
    defaultValue?: string;
    type: string;
    errorMessages: string[];
}

const CustomTextInput = forwardRef(
    (
        {
            name,
            id,
            label,
            className,
            inputClassName,
            defaultValue,
            type,
            errorMessages,
        }: Props,
        ref: LegacyRef<HTMLInputElement> | undefined
    ) => {
        const [value, setValue] = useState(defaultValue);

        return (
            <div className={`h-32 w-full ${className ? className : ""}`}>
                <div className="relative">
                    <input
                        className={`block px-2.5 pb-2.5 pt-5 w-full text-primary text-2xl bg-primary-light border-0 border-b-2 border-primary appearance-none focus:outline-none focus:ring-0 focus:border-b-4 focus:border-primary peer ${
                            errorMessages.length > 0 ? "" : ""
                        } ${inputClassName ? inputClassName : ""}`}
                        type={type}
                        name={name}
                        id={id}
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        ref={ref}
                        placeholder=" "
                    />
                    <label
                        className={`absolute text-2xl text-primary duration-200 transform -translate-y-6 scale-50 top-4 z-10 origin-[0] left-2.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-50 peer-focus:-translate-y-6 ${
                            errorMessages.length > 0 ? "" : ""
                        }`}
                        htmlFor={id}
                    >
                        {label}
                    </label>
                </div>
                <div className="text-error">
                    {errorMessages.length > 0 &&
                        errorMessages.map((error) => (
                            <div key={JSON.stringify(error)}>{error}</div>
                        ))}
                </div>
            </div>
        );
    }
);

CustomTextInput.displayName = "CustomTextInput";

export default CustomTextInput;
