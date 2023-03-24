/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import { sortButtons } from "../consts";
import { useYDevFilterContext } from "../contexts/YDevFilterContext";
import { useODevFilterContext } from "../contexts/ODevFilterContext";
import Icons from "../icons";
import CustomButton from "./CustomButton";
import { useNavContext } from "../contexts/NavContext";
import { IOrderBy } from "../bff/types";
import { getSelectionOptions, shallowEqual } from "../utils";
import { FilterKeys, SelectedFilterOptions, SelectOption } from "../types";
import CustomMultiSelect from "./CustomMultiSelect";
import {
    fetchConnectors,
    fetchDeviceTypes,
    fetchFormFactors,
} from "../bff/requests";
import { Connector, DeviceType, FormFactor } from "@prisma/client";

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

    const Sort = () => {
        return (
            <>
                <div className="mb-10">
                    {sortButtons.map((button) => (
                        <CustomButton
                            buttonClassName={`filterSortButton ${
                                shallowEqual(sort[0], button.sortKey[0])
                                    ? "filterSortButtonActive"
                                    : "filterSortButtonInactive"
                            }`}
                            labelClassName="text-xl"
                            key={button.sortKey[0].toString()}
                            label={button.label}
                            type="button"
                            onClick={() => setSort(button.sortKey)}
                        />
                    ))}
                </div>
                <div className="flex justify-between w-full">
                    <CustomButton
                        disabled={sort.length === 0}
                        buttonClassName="filterSortDialogButton"
                        labelClassName="text-xl"
                        label="Show results"
                        type="button"
                        onClick={handleSubmitSort}
                    />
                </div>
            </>
        );
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

    const Filter = () => {
        return (
            <>
                <div className="w-full">
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
                </div>
                <div className="flex justify-between w-full">
                    <CustomButton
                        buttonClassName="filterSortDialogButton"
                        labelClassName="text-xl"
                        label="Clear"
                        type="button"
                        onClick={handleClearFilters}
                    />
                    <CustomButton
                        buttonClassName="filterSortDialogButton"
                        labelClassName="text-xl"
                        label="Show results"
                        type="button"
                        onClick={handleSubmitFilters}
                    />
                </div>
            </>
        );
    };

    return (
        <div>
            {filterModalShowing && (
                <div className="absolute modal z-50">
                    <Icons
                        iconType="close"
                        className="z-30 absolute right-2 top-2"
                        onClick={hideFilter}
                        fontSize="92px"
                    />
                    <div className="w-full text-2xl mb-4">
                        {sortOrFilter === "sort" ? "Sort by" : "Filter by"}
                    </div>
                    {sortOrFilter === "sort" ? <Sort /> : <Filter />}
                </div>
            )}
        </div>
    );
};

export default FilterModal;
