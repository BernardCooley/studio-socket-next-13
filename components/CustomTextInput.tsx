/* eslint-disable react-hooks/exhaustive-deps */
import React, {
    ChangeEvent,
    forwardRef,
    LegacyRef,
    useEffect,
    useState,
} from "react";
import { useFormContext } from "../contexts/FormContext";
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
    hide?: boolean;
    resetValue?: boolean;
    fieldIcon?: React.ReactNode;
    errorClassName?: string;
    onClick?: () => void;
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
            scaleLabel = true,
            hide,
            resetValue,
            fieldIcon,
            errorClassName = "",
            onClick,
        }: Props,
        ref: LegacyRef<HTMLInputElement> | undefined
    ) => {
        const { updateFile } = useFormContext();
        const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
            if (isFile) {
                if (e.target.files) {
                    const image = await imageToBase65(e.target.files[0]);
                    updateFile(image as string);
                }
            } else {
                setValue(e.target.value);
            }
        };

        const [value, setValue] = useState(defaultValue);
        const [firstLoad, setFirstLoad] = useState(true);

        useEffect(() => {
            if (!firstLoad) {
                updateFile("");
                setValue("");
            }
            setFirstLoad(false);
        }, [resetValue]);

        return (
            <div
                className={`w-full ${className ? className : ""} ${
                    hide ? "h-4" : "h-32"
                }`}
            >
                <div className="relative">
                    <div className="relative">
                        <input
                            className={`block px-2.5 pb-2.5 pt-5 w-full text-2xl text-primary bg-primary-light border-primary border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-b-4 focus:border-primary peer ${
                                borderless
                                    ? "border-0 border-b-0"
                                    : "border-0 border-b-2"
                            } ${hide ? "opacity-0 h-0 pointer-events-none" : ""}
                            ${inputClassName}`}
                            placeholder=" "
                            type={type}
                            name={name}
                            id={id}
                            value={value}
                            onChange={handleChange}
                            onBlur={onBlur}
                            ref={ref}
                            onClick={onClick}
                        />
                        {fieldIcon}
                        <label
                            htmlFor={id}
                            className={`absolute text-2xl text-fieldLabel duration-300 z-10 ${labelClasses} ${
                                scaleLabel
                                    ? "transform -translate-y-6 scale-75 top-4 origin-[0] left-2.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-2 peer-focus:scale-75 peer-focus:-translate-y-6"
                                    : "-top-6"
                            }`}
                        >
                            {label}
                        </label>
                    </div>
                </div>
                <div className={`text-error ${errorClassName}`}>
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
