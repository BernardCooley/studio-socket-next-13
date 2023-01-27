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
import ErrorMessages from "./ErrorMessages";

interface Props {
    options: SelectOption[];
    name: string;
    label: string;
    className?: string;
    errorMessages: string[];
    defaultOptions: SelectOption[] | null;
}

const CustomMultiSelect = forwardRef(
    (
        { options, label, className, errorMessages, defaultOptions }: Props,
        ref: LegacyRef<HTMLInputElement> | undefined
    ) => {
        const containerRef = useRef<HTMLDivElement>(null);
        const [values, setValues] = useState<SelectOption[]>(
            defaultOptions ? defaultOptions : [options[0]]
        );
        const [optionsDisplayed, setOptionsDisplayed] = useState(false);

        const handleClickOutside = () => {
            setOptionsDisplayed(false);
        };

        useOnClickOutside(
            containerRef as RefObject<HTMLInputElement>,
            handleClickOutside
        );

        const handleChange = (option: SelectOption) => {
            if (option) {
                if (option.value === "") {
                    setValues([options[0]]);
                } else {
                    const newValues = values.filter((val) => val.value !== "");
                    if (values.map((val) => val.value).includes(option.value)) {
                        setValues(
                            newValues.filter(
                                (val) => val.value !== option.value
                            )
                        );
                    } else {
                        setValues((val) =>
                            [...val, option].filter((v) => v.value !== "")
                        );
                    }
                }
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
                        <span>{values.map((val) => val.label).join(", ")}</span>
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
                                    values
                                        .map((val) => val.value)
                                        .includes(option.value)
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
                <ErrorMessages errorMessages={errorMessages} />
                <input
                    className="opacity-0 absolute top-0 left-0"
                    ref={ref}
                    value={JSON.stringify(values.map((val) => val.value))}
                    onChange={noop}
                />
            </div>
        );
    }
);

CustomMultiSelect.displayName = "CustomMultiSelect";

export default CustomMultiSelect;
