"use client";

import {
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
import { useSearchContext } from "../contexts/SearchContext";
import { SearchSchema } from "../formValidation";
import { getErrorMessages } from "../utils";
import CustomTextInput from "./CustomTextInput";

interface Props {
    searchType: string | undefined;
    updateSearchQuery: (query: any[]) => void;
    updateSearchLabel: (label: string[]) => void;
    searchLabel: string[];
}

const SearchModal = ({
    searchType,
    updateSearchQuery,
    updateSearchLabel,
    searchLabel,
}: Props) => {
    const searchRef = useRef<HTMLInputElement>(null);
    const { searchOpen, closeSearch } = useSearchContext();
    const [errors, setErrors] = useState([]);
    const { addFormMessages, updateIcon } = useFormContext();

    const handleSearch = (e: FormEvent) => {
        setErrors([]);
        e.preventDefault();
        validateAndSearch();
    };

    const search = async () => {
        if (searchRef.current) {
            updateSearchLabel([`Title: ${searchRef.current.value}`]);
            updateSearchQuery([
                {
                    title: {
                        search: searchRef.current.value,
                    },
                },
            ]);

            setTimeout(() => {
                addFormMessages(new Set([]));
                closeSearch();
            }, 1000);
        }
    };

    const clearSearch = () => {
        updateSearchLabel([]);
        updateSearchQuery([]);
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
                            isDisabled={searchLabel.length === 0}
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
