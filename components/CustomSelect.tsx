"use client";

import React, {
    forwardRef,
    LegacyRef,
    RefObject,
    useRef,
    useState,
} from "react";
import { SelectOption } from "../types";
import Icons from "../icons";
import useOnClickOutside from "../hooks/useClickOutside";
import { noop } from "../utils";

interface Props {
    options: SelectOption[];
    name: string;
    label: string;
    className?: string;
    errorMessages: string[];
    defaultOption?: SelectOption | null;
}

const CustomSelect = forwardRef(
    (
        { options, label, className, errorMessages, defaultOption }: Props,
        ref: LegacyRef<HTMLInputElement> | undefined
    ) => {
        const containerRef = useRef<HTMLDivElement>(null);
        const [value, setValue] = useState<SelectOption>(
            defaultOption && defaultOption.value ? defaultOption : options[0]
        );
        const [optionsDisplayed, setOptionsDisplayed] = useState(false);

        const handleClickOutside = () => {
            setOptionsDisplayed(false);
        };

        useOnClickOutside(
            containerRef as RefObject<HTMLInputElement>,
            handleClickOutside
        );

        const handleChange = (value: SelectOption) => {
            if (value) {
                setValue(value);
                setOptionsDisplayed(false);
            }
        };

        return (
            <div className={`w-full ${className}`} ref={containerRef}>
                <label className="w-full text-2xl text-primary z-10 mb-4">
                    {label}
                </label>
                <div className="relative w-full mb-8 text-2xl">
                    <div
                        className={`w-full p-2 border-4 flex justify-between ${
                            optionsDisplayed
                                ? "border-primary rounded-t-md"
                                : "border-fieldLabel rounded-md"
                        }`}
                        onClick={() => setOptionsDisplayed(!optionsDisplayed)}
                    >
                        <span>{value.label}</span>
                        <Icons
                            iconType="chevronDown"
                            className="text-primary"
                            fontSize="72px"
                        />
                    </div>
                    <div
                        className={`w-full absolute z-50 bg-primary-light transition-height duration-300 ease-in-out overflow-scroll rounded-b-md ${
                            optionsDisplayed
                                ? "h-52 border-4 border-primary"
                                : "h-0"
                        }`}
                    >
                        {options.map((option) => (
                            <div
                                onClick={() => handleChange(option)}
                                className={`w-full border-2 p-2 border-primary ${
                                    option.value === value.value
                                        ? "bg-primary text-primary-light font-medium border-l-8 border-l-primary-light"
                                        : "bg-primary-light text-primary"
                                }`}
                                key={option.value}
                            >
                                {option.label}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="text-error relative -top-8">
                    {errorMessages &&
                        errorMessages.length > 0 &&
                        errorMessages.map((error) => (
                            <div key={JSON.stringify(error)}>{error}</div>
                        ))}
                </div>
                <input
                    className="opacity-0 absolute top-0 left-0"
                    ref={ref}
                    value={value.value}
                    onChange={noop}
                />
            </div>
        );
    }
);

CustomSelect.displayName = "CustomSelect";

export default CustomSelect;
