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
import { Box, Input } from "@chakra-ui/react";

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
            <Box w="full" mb={2} ref={containerRef}>
                <Box w="full" fontSize="2xs" color="brand.primary">
                    {label}
                </Box>
                <Box position="relative" w="full" fontSize="2xs">
                    <Box
                        w="full"
                        p={2}
                        border={1}
                        display="flex"
                        justifyContent="space-between"
                        borderColor={
                            optionsDisplayed
                                ? "brand.primary"
                                : "brand.fieldLabel"
                        }
                        onClick={() => setOptionsDisplayed(!optionsDisplayed)}
                    >
                        <Box>{value.label}</Box>
                        <Icons
                            iconType="chevronDown"
                            className="text-primary"
                            fontSize="32px"
                        />
                    </Box>
                    <Box
                        w="full"
                        position="absolute"
                        bg="brand.primary-light"
                        transition="height 300ms ease-in-out"
                        overflowY="scroll"
                        overflowX="auto"
                        roundedBottom="md"
                        h={optionsDisplayed ? "250px" : "0px"}
                        zIndex={50}
                    >
                        {options.map((option) => (
                            <Box
                                onClick={() => handleChange(option)}
                                w="full"
                                p={1}
                                border={1}
                                borderColor={
                                    option.value === value.value
                                        ? "brand.primary"
                                        : "brand.primary-light"
                                }
                                bg={
                                    option.value === value.value
                                        ? "brand.primary"
                                        : "brand.primary-light"
                                }
                                color={
                                    option.value === value.value
                                        ? "brand.primary-light"
                                        : "brand.primary"
                                }
                                key={option.value}
                            >
                                {option.label}
                            </Box>
                        ))}
                    </Box>
                    <ErrorMessages errorMessages={errorMessages} />
                </Box>
                <Input
                    className="opacity-0 absolute top-0 left-0"
                    ref={ref}
                    value={value.value}
                    onChange={noop}
                />
            </Box>
        );
    }
);

CustomSelect.displayName = "CustomSelect";

export default CustomSelect;
