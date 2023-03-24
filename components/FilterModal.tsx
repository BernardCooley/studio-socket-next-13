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
import { useYDevFilterContext } from "../contexts/YDevFilterContext";
import { useODevFilterContext } from "../contexts/ODevFilterContext";
import { useNavContext } from "../contexts/NavContext";
import { IOrderBy } from "../bff/types";
import { getSelectionOptions, shallowEqual } from "../utils";
import {
    fetchConnectors,
    fetchDeviceTypes,
    fetchFormFactors,
} from "../bff/requests";
import { Connector, DeviceType, FormFactor } from "@prisma/client";
import { FilterKeys, SelectedFilterOptions, SelectOption } from "../types";
import { sortButtons } from "../consts";

interface Props {}

const FilterModal = ({}: Props) => {
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
    const {
        filterModalShowing,
        hideFilter,
        updateSortBy: updateYourDevicesSortBy,
        sortBy: yourDevicesSortBy,
        sortOrFilter,
        filterKeys: yourDevicesFilterKeys,
        clearFilterKeys: clearYourDevicesFilterKeys,
        updateFilterKeys: updateYourDevicesFilterKeys,
        updateFilteredByLabel: updateYourDevicesFilteredByLabel,
        updateSelectedFilterOptions: updateYourDevicesSelectedFilterOptions,
        selectedFilterOptions: yourDevicesSelectedFilterOptions,
        clearSelectedFilterOptions: clearYourDevicesSelectedFilterOptions,
    } = useYDevFilterContext();

    const {
        updateSortBy: updateAllDevicesSortBy,
        sortBy: allDevicesSortBy,
        filterKeys: allDevicesFilterKeys,
        clearFilterKeys: clearAllDevicesFilterKeys,
        updateFilterKeys: updateAllDevicesFilterKeys,
        updateFilteredByLabel: updateAllDevicesFilteredByLabel,
        updateSelectedFilterOptions: updateAllDevicesSelectedFilterOptions,
        selectedFilterOptions: allDevicesSelectedFilterOptions,
        clearSelectedFilterOptions: clearAllDevicesSelectedFilterOptions,
    } = useODevFilterContext();

    const { deviceListInView } = useNavContext();
    const isAllDevices = deviceListInView === "ours";

    const [filterList, setFilterList] = useState<FilterKeys[]>(
        !isAllDevices ? yourDevicesFilterKeys : allDevicesFilterKeys
    );
    const [sort, setSort] = useState<IOrderBy[]>(
        !isAllDevices ? yourDevicesSortBy : allDevicesSortBy
    );

    useEffect(() => {
        (async () => {
            await getFilterOptions();
        })();
    }, []);

    useEffect(() => {
        setFilterList(
            !isAllDevices ? yourDevicesFilterKeys : allDevicesFilterKeys
        );
        setSort(!isAllDevices ? yourDevicesSortBy : allDevicesSortBy);
    }, [filterModalShowing, deviceListInView]);

    const handleClearFilters = () => {
        hideFilter();
        if (isAllDevices) {
            clearAllDevicesFilterKeys();
            updateAllDevicesFilteredByLabel([]);
            clearAllDevicesSelectedFilterOptions();
        } else {
            clearYourDevicesFilterKeys();
            updateYourDevicesFilteredByLabel([]);
            clearYourDevicesSelectedFilterOptions();
        }
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
        if (!isAllDevices) {
            updateYourDevicesSortBy(sort);
        } else if (isAllDevices) {
            updateAllDevicesSortBy(sort);
        }
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
        if (!isAllDevices) {
            updateYourDevicesSelectedFilterOptions(selectedFilterOptions);
            updateYourDevicesFilteredByLabel(filterLabels);
            updateYourDevicesFilterKeys(buildFilterQuery(selectedFilters));
        } else if (isAllDevices) {
            updateAllDevicesSelectedFilterOptions(selectedFilterOptions);
            updateAllDevicesFilteredByLabel(filterLabels);
            updateAllDevicesFilterKeys(buildFilterQuery(selectedFilters));
        }
    };

    const getDefaultOption = (filterField: string): SelectOption[] | null => {
        if (!isAllDevices) {
            if (yourDevicesSelectedFilterOptions) {
                return yourDevicesSelectedFilterOptions[
                    filterField as keyof typeof yourDevicesSelectedFilterOptions
                ];
            }
        } else if (isAllDevices) {
            if (allDevicesSelectedFilterOptions) {
                return allDevicesSelectedFilterOptions[
                    filterField as keyof typeof allDevicesSelectedFilterOptions
                ];
            }
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
