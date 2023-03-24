"use client";

import {
    Box,
    Button,
    ButtonGroup,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
} from "@chakra-ui/react";
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
import CustomTextInput from "./CustomTextInput";

interface Props {
    searchType: string | undefined;
}

const SearchModal = ({ searchType }: Props) => {
    const searchRef = useRef<HTMLInputElement>(null);
    const { searchOpen, closeSearch } = useSearchContext();
    const [errors, setErrors] = useState([]);
    const { addFormMessages, updateIcon } = useFormContext();
    const {
        updateSearchQuery: updateYourDevicesSearchQuery,
        updateSearchLabel: updateYourDevicesSearchLabel,
        searchLabel: yourDevicesSearchLabel,
    } = useYDevFilterContext();

    const {
        updateSearchQuery: updateAllDevicesSearchQuery,
        updateSearchLabel: updateAllDevicesSearchLabel,
        searchLabel: allDevicesSearchLabel,
    } = useODevFilterContext();

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
                updateAllDevicesSearchLabel([
                    `Title: ${searchRef.current.value}`,
                ]);
                updateAllDevicesSearchQuery([
                    {
                        title: {
                            search: searchRef.current.value,
                        },
                    },
                ]);
            } else {
                updateYourDevicesSearchLabel([
                    `Title: ${searchRef.current.value}`,
                ]);
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

    const clearSearch = () => {
        if (isAllDevices) {
            updateAllDevicesSearchLabel([]);
            updateAllDevicesSearchQuery([]);
        } else {
            updateYourDevicesSearchLabel([]);
            updateYourDevicesSearchQuery([]);
        }
        closeSearch();
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
        <Modal
            isOpen={searchOpen}
            onClose={closeSearch}
            blockScrollOnMount
            isCentered
            returnFocusOnClose
            size="xl"
        >
            <ModalOverlay />
            <ModalContent
                fontFamily="default"
                w="90vw"
                bg="brand.primary-light"
            >
                <ModalHeader>Search {searchType ? searchType : ""}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <CustomTextInput
                        className="mt-10"
                        name="search"
                        id="search"
                        label="Name"
                        type="text"
                        ref={searchRef}
                        errorMessages={getErrorMessages(errors, "search")}
                    />
                </ModalBody>

                <ModalFooter>
                    <ButtonGroup
                        w="full"
                        display="flex"
                        justifyContent="space-between"
                    >
                        <Button
                            isDisabled={
                                isAllDevices
                                    ? allDevicesSearchLabel.length === 0
                                    : yourDevicesSearchLabel.length === 0
                            }
                            size="lg"
                            variant="primary"
                            onClick={clearSearch}
                        >
                            Clear
                        </Button>
                        <Button
                            size="lg"
                            variant="primary"
                            onClick={handleSearch}
                        >
                            Search
                        </Button>
                    </ButtonGroup>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default SearchModal;
