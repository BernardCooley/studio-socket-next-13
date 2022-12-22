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
    id: string;
    label: string;
    className?: string;
}

const CustomSelect = forwardRef(
    (
        { options, id, label, className }: Props,
        ref: LegacyRef<HTMLInputElement> | undefined
    ) => {
        const containerRef = useRef<HTMLDivElement>(null);
        const [value, setValue] = useState<SelectOption>(options[0]);
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
                <label
                    className="w-full text-2xl text-fieldLabel z-10 mb-4"
                    htmlFor={id}
                >
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
                        <Icons iconType="chevronDown" />
                    </div>
                    <div
                        className={`w-full absolute bg-primary-light transition-height duration-300 ease-in-out overflow-scroll rounded-b-md ${
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
