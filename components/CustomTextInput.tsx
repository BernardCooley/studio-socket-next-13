/* eslint-disable react-hooks/exhaustive-deps */
import { Box } from "@chakra-ui/react";
import React, {
    ChangeEvent,
    forwardRef,
    LegacyRef,
    useEffect,
    useState,
} from "react";
import { useFormContext } from "../contexts/FormContext";
import { imageToBase65 } from "../utils";
import ErrorMessages from "./ErrorMessages";

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
                    hide ? "h-1" : "h-12"
                }`}
            >
                <Box className="relative">
                    <div className="relative">
                        <input
                            className={`block w-full text-2xs text-primary bg-primary-light border-primary border-0 border-b-1 appearance-none focus:outline-none focus:ring-0 focus:border-b-2 focus:border-primary peer ${
                                borderless
                                    ? "border-0 border-b-0"
                                    : "border-0 border-b-1"
                            } ${
                                hide
                                    ? "opacity-0 h-0 pointer-events-none"
                                    : "h-4"
                            }
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
                            className={`absolute text-2xs text-fieldLabel duration-300 z-10 ${labelClasses} ${
                                scaleLabel
                                    ? "transform -translate-y-6 scale-75 top-4 origin-[0] left-2.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-2 peer-focus:scale-75 peer-focus:-translate-y-6"
                                    : "-top-6"
                            }`}
                        >
                            {label}
                        </label>
                    </div>
                </Box>
                <ErrorMessages errorMessages={errorMessages} />
            </div>
        );
    }
);

CustomTextInput.displayName = "CustomTextInput";

export default CustomTextInput;
