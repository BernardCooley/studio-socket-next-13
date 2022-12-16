import React, { forwardRef, LegacyRef, useEffect, useState } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import { imageToBase65 } from "../utils";

interface Props {
    name: string;
    id: string;
    label: string;
    className?: string;
    inputClassName?: string;
    defaultValue?: string;
    type: string;
    errorMessages: string[];
    onBlur?: () => void;
    labelClasses?: string;
    isFile?: boolean;
    borderless?: boolean;
    scaleLabel?: boolean;
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
            onBlur,
            labelClasses,
            isFile,
            borderless,
            scaleLabel,
        }: Props,
        ref: LegacyRef<HTMLInputElement> | undefined
    ) => {
        const { updateFile } = useAuthContext();
        const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
            if (isFile) {
                if (e.target.files) {
                    const image = await imageToBase65(e.target.files[0]);
                    updateFile(image as string);
                }
            }
            setValue(e.target.value);
        };

        const [value, setValue] = useState(defaultValue);

        return (
            <div className={`h-32 w-full ${className ? className : ""}`}>
                <div className="relative">
                    <input
                        className={`block px-2.5 pb-2.5 pt-5 w-full text-primary text-2xl bg-primary-light border-primary appearance-none focus:outline-none focus:ring-0 focus:border-b-4 focus:border-primary peer ${inputClassName} ${
                            borderless
                                ? "border-0 border-b-0"
                                : "border-0 border-b-2"
                        }`}
                        type={type}
                        name={name}
                        id={id}
                        value={value}
                        onChange={handleChange}
                        onBlur={onBlur}
                        ref={ref}
                        placeholder=" "
                    />
                    <label
                        className={`absolute text-2xl text-primary duration-200 transform -translate-y-6 z-10 origin-[0] left-2.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-50 peer-focus:-translate-y-6 ${labelClasses} ${
                            scaleLabel ? "scale-50 top-4" : "scale-100 top-0"
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
