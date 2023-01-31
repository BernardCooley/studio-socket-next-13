"use client";

import React, { FormEvent, useRef, useState } from "react";
import { useFormContext } from "../contexts/FormContext";
import { useNavContext } from "../contexts/NavContext";
import { useODevFilterContext } from "../contexts/ODevFilterContext";
import { useSearchContext } from "../contexts/SearchContext";
import { useYDevFilterContext } from "../contexts/YDevFilterContext";
import { SearchSchema } from "../formValidation";
import Icons from "../icons";
import { FormMessageTypes } from "../types";
import { getErrorMessages } from "../utils";
import CustomButton from "./CustomButton";
import CustomTextInput from "./CustomTextInput";

interface Props {
    searchType: string | undefined;
}

const SearchModal = ({ searchType }: Props) => {
    const searchRef = useRef<HTMLInputElement>(null);
    const { searchOpen, closeSearch } = useSearchContext();
    const [errors, setErrors] = useState([]);
    const { addFormMessages, updateIcon } = useFormContext();
    const { updateSearchQuery: updateYourDevicesSearchQuery } =
        useYDevFilterContext();

    const { updateSearchQuery: updateAllDevicesSearchQuery } =
        useODevFilterContext();

    const { deviceListInView } = useNavContext();
    const isAllDevices = deviceListInView === "ours";

    const handleSearch = (e: FormEvent) => {
        setErrors([]);
        e.preventDefault();
        validateAndSearch();
    };

    const search = async () => {
        if (searchRef.current) {
            addFormMessages(
                new Set([
                    {
                        message: "Searching...",
                        type: FormMessageTypes.INFO,
                    },
                ])
            );
            updateIcon(
                <Icons
                    iconType="searching"
                    className="text-primary"
                    fontSize="132px"
                />
            );

            if (isAllDevices) {
                updateAllDevicesSearchQuery([
                    {
                        title: {
                            search: searchRef.current.value,
                        },
                    },
                ]);
            } else {
                updateYourDevicesSearchQuery([
                    {
                        title: {
                            search: searchRef.current.value,
                        },
                    },
                ]);
            }

            setTimeout(() => {
                addFormMessages(new Set([]));
                closeSearch();
            }, 1000);
        }
    };

    const validateAndSearch = () => {
        try {
            SearchSchema.parse({
                searchTerm: searchRef.current?.value,
            });
            search();
            return true;
        } catch (err: any) {
            setErrors(err.errors);
            return false;
        }
    };

    return (
        <div>
            {searchOpen && (
                <div className="absolute modal z-50">
                    <Icons
                        iconType="close"
                        className="z-30 absolute right-2 top-2"
                        onClick={closeSearch}
                        fontSize="92px"
                    />
                    <div className="w-full text-2xl mb-4">
                        Search {searchType ? searchType : ""}
                    </div>
                    <CustomTextInput
                        className="mt-10"
                        name="search"
                        id="search"
                        label="Name"
                        type="text"
                        ref={searchRef}
                        errorMessages={getErrorMessages(errors, "search")}
                    />
                    <CustomButton
                        buttonClassName="filterSortDialogButton"
                        labelClassName="text-xl"
                        label="Search"
                        type="button"
                        onClick={handleSearch}
                    />
                </div>
            )}
        </div>
    );
};

export default SearchModal;
