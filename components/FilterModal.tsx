/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    ButtonGroup,
    Box,
    VStack,
} from "@chakra-ui/react";
import CustomMultiSelect from "./CustomMultiSelect";
import { IOrderBy, SortFilter } from "../bff/types";
import { getSelectionOptions, shallowEqual } from "../utils";
import {
    fetchConnectors,
    fetchDeviceTypes,
    fetchFormFactors,
} from "../bff/requests";
import { Connector, DeviceType, FormFactor } from "@prisma/client";
import { FilterKeys, SelectedFilterOptions, SelectOption } from "../types";
import { sortButtons } from "../consts";

interface Props {
    sortOrFilter: SortFilter;
    filterModalShowing: boolean;
    hideFilter: () => void;
    updateSortBy: (sort: IOrderBy[]) => void;
    sortBy: IOrderBy[];
    filterKeys: FilterKeys[];
    clearFilterKeys: () => void;
    updateFilterKeys: (filterKeys: FilterKeys[]) => void;
    updateFilteredByLabel: (label: string[]) => void;
    updateSelectedFilterOptions: (options: SelectedFilterOptions) => void;
    selectedFilterOptions: SelectedFilterOptions | null;
    clearSelectedFilterOptions: () => void;
}

const FilterModal = ({
    sortOrFilter,
    filterModalShowing,
    hideFilter,
    updateSortBy,
    sortBy,
    filterKeys,
    clearFilterKeys,
    updateFilterKeys,
    updateFilteredByLabel,
    updateSelectedFilterOptions,
    selectedFilterOptions,
    clearSelectedFilterOptions,
}: Props) => {
    const [types, setTypes] = useState<SelectOption[]>([]);
    const [connectors, setConnectors] = useState<SelectOption[]>([]);
    const [formFactors, setFormFactors] = useState<SelectOption[]>([]);
    const refs: {
        [key: string]: React.RefObject<HTMLInputElement>;
    } = {
        deviceTypes: useRef<HTMLInputElement>(null),
        connectors: useRef<HTMLInputElement>(null),
        formFactors: useRef<HTMLInputElement>(null),
    };

    const [filterList, setFilterList] = useState<FilterKeys[]>(filterKeys);
    const [sort, setSort] = useState<IOrderBy[]>(sortBy);

    useEffect(() => {
        (async () => {
            await getFilterOptions();
        })();
    }, []);

    useEffect(() => {
        setFilterList(filterKeys);
        setSort(sortBy);
    }, [filterModalShowing]);

    const handleClearFilters = () => {
        hideFilter();

        clearFilterKeys();
        updateFilteredByLabel([]);
        clearSelectedFilterOptions();
        setFilterList([]);
    };

    const getFilterOptions = async () => {
        setTypes(
            getSelectionOptions(
                ((await fetchDeviceTypes()) as DeviceType[])
                    .map((t) => t.name)
                    .sort()
            )
        );
        setConnectors(
            getSelectionOptions(
                ((await fetchConnectors()) as Connector[])
                    .map((t) => t.name)
                    .sort()
            )
        );
        setFormFactors(
            getSelectionOptions(
                ((await fetchFormFactors()) as FormFactor[])
                    .map((t) => t.name)
                    .sort()
            )
        );
    };

    const handleSubmitSort = () => {
        hideFilter();
        updateSortBy(sort);
    };

    const buildFilterQuery = (filterList: FilterKeys[]): any[] => {
        const filts: any[] = [];
        filterList.forEach((filter) => {
            if (filter.name === "deviceTypes" && filter.filters[0] !== "") {
                filts.push({
                    deviceTypes: {
                        some: {
                            name: {
                                in: filter.filters,
                            },
                        },
                    },
                });
            }
            if (filter.name === "formFactors" && filter.filters[0] !== "") {
                filts.push({
                    formFactor: {
                        name: {
                            in: filter.filters,
                        },
                    },
                });
            }
            if (filter.name === "connectors" && filter.filters[0] !== "") {
                filts.push({
                    connections: {
                        some: {
                            connector: {
                                name: {
                                    in: filter.filters,
                                },
                            },
                        },
                    },
                });
            }
        });
        return filts;
    };

    const handleSubmitFilters = () => {
        const selectedFilters = Object.keys(refs).map((refKey) => {
            return {
                name: refKey,
                filters: [
                    ...(JSON.parse(refs[refKey].current?.value || "") || ""),
                ],
            };
        });
        const selectedFilterOptions: SelectedFilterOptions = {};
        Object.keys(refs).forEach((refKey) => {
            selectedFilterOptions[refKey] = JSON.parse(
                refs[refKey].current?.value || ""
            ).map((d: string) => {
                return {
                    value: d === "" ? "" : d,
                    label: d === "" ? "None" : d,
                };
            });
        });
        const filterLabels = selectedFilters
            .filter((filt) => filt.filters.length > 0)
            .map((key) => key.filters.join(", "));

        hideFilter();

        updateSelectedFilterOptions(selectedFilterOptions);
        updateFilteredByLabel(filterLabels);
        updateFilterKeys(buildFilterQuery(selectedFilters));
    };

    const getDefaultOption = (filterField: string): SelectOption[] | null => {
        if (selectedFilterOptions) {
            return selectedFilterOptions[
                filterField as keyof typeof selectedFilterOptions
            ];
        }

        return null;
    };

    const SortBody = () => {
        return (
            <Box mb="50px">
                <ButtonGroup gap="4" flexWrap="wrap" flexDir="column" w="full">
                    {sortButtons.map((button) => (
                        <Button
                            size="lg"
                            key={button.sortKey[0].toString()}
                            isDisabled={sort.length === 0}
                            isActive={shallowEqual(sort[0], button.sortKey[0])}
                            variant={
                                shallowEqual(sort[0], button.sortKey[0])
                                    ? "primary"
                                    : "ghost"
                            }
                            onClick={() => setSort(button.sortKey)}
                        >
                            {button.label}
                        </Button>
                    ))}
                </ButtonGroup>
            </Box>
        );
    };

    const SortFooter = () => {
        return (
            <Box>
                <Button
                    size="lg"
                    isDisabled={sort.length === 0}
                    variant="primary"
                    onClick={handleSubmitSort}
                >
                    Show results
                </Button>
            </Box>
        );
    };

    const FilterBody = () => {
        return (
            <VStack align="stretch">
                <CustomMultiSelect
                    name="Device Type"
                    options={types}
                    label="Device Type"
                    ref={refs.deviceTypes}
                    errorMessages={[]}
                    defaultOptions={getDefaultOption("deviceTypes")}
                />
                <CustomMultiSelect
                    name="Connector"
                    options={connectors}
                    label="Connector"
                    ref={refs.connectors}
                    errorMessages={[]}
                    defaultOptions={getDefaultOption("connectors")}
                />
                <CustomMultiSelect
                    name="Form factor"
                    options={formFactors}
                    label="Form factor"
                    ref={refs.formFactors}
                    errorMessages={[]}
                    defaultOptions={getDefaultOption("formFactors")}
                />
            </VStack>
        );
    };

    const FilterFooter = () => {
        return (
            <ButtonGroup gap="4">
                <Button
                    size="lg"
                    variant="primary"
                    onClick={handleClearFilters}
                >
                    Clear
                </Button>
                <Button
                    size="lg"
                    variant="primary"
                    onClick={handleSubmitFilters}
                    fontSize="lg"
                >
                    Show results
                </Button>
            </ButtonGroup>
        );
    };

    return (
        <Modal
            isOpen={filterModalShowing}
            onClose={hideFilter}
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
                <ModalHeader>
                    {sortOrFilter === "sort" ? "Sort by" : "Filter by"}
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    {sortOrFilter === "sort" ? <SortBody /> : <FilterBody />}
                </ModalBody>

                <ModalFooter>
                    {sortOrFilter === "sort" ? (
                        <SortFooter />
                    ) : (
                        <FilterFooter />
                    )}
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default FilterModal;
