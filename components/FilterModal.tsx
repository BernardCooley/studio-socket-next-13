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
import { FilterKeys, SelectOption } from "../types";
import CustomSelect from "./CustomSelect";
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
    const deviceTypesRef = useRef<HTMLInputElement>(null);
    const connectorsRef = useRef<HTMLInputElement>(null);
    const formFactorsRef = useRef<HTMLInputElement>(null);
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
        filteredByLabel: yourDevicesFilteredByLabel,
    } = useYDevFilterContext();

    const {
        updateSortBy: updateAllDevicesSortBy,
        sortBy: allDevicesSortBy,
        filterKeys: allDevicesFilterKeys,
        clearFilterKeys: clearAllDevicesFilterKeys,
        updateFilterKeys: updateAllDevicesFilterKeys,
        updateFilteredByLabel: updateAllDevicesFilteredByLabel,
        filteredByLabel: allDevicesFilteredByLabel,
    } = useODevFilterContext();

    const { deviceListInView } = useNavContext();

    const [filterList, setFilterList] = useState<FilterKeys[]>(
        deviceListInView === "yours"
            ? yourDevicesFilterKeys
            : allDevicesFilterKeys
    );
    const [sort, setSort] = useState<IOrderBy[]>(
        deviceListInView === "yours" ? yourDevicesSortBy : allDevicesSortBy
    );

    useEffect(() => {
        (async () => {
            await getFilterOptions();
        })();
    }, []);

    useEffect(() => {
        setFilterList(
            deviceListInView === "yours"
                ? yourDevicesFilterKeys
                : allDevicesFilterKeys
        );
        setSort(
            deviceListInView === "yours" ? yourDevicesSortBy : allDevicesSortBy
        );
    }, [filterModalShowing, deviceListInView]);

    const handleClearFilters = () => {
        hideFilter();
        if (deviceListInView === "yours") {
            clearYourDevicesFilterKeys();
            updateYourDevicesFilteredByLabel([]);
        } else if (deviceListInView === "ours") {
            clearAllDevicesFilterKeys();
            updateAllDevicesFilteredByLabel([]);
        }
        setFilterList([]);
    };

    const getFilterOptions = async () => {
        setTypes(
            getSelectionOptions(
                ((await fetchDeviceTypes()) as DeviceType[]).map((t) => t.name)
            )
        );
        setConnectors(
            getSelectionOptions(
                ((await fetchConnectors()) as Connector[]).map((t) => t.name)
            )
        );
        setFormFactors(
            getSelectionOptions(
                ((await fetchFormFactors()) as FormFactor[]).map((t) => t.name)
            )
        );
    };

    const handleSubmitSort = () => {
        hideFilter();
        if (deviceListInView === "yours") {
            updateYourDevicesSortBy(sort);
        } else if (deviceListInView === "ours") {
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
        const selectedFilters = [
            {
                name: "deviceTypes",
                filters: [deviceTypesRef.current?.value || ""],
            },
            {
                name: "connectors",
                filters: [connectorsRef.current?.value || ""],
            },
            {
                name: "formFactors",
                filters: [formFactorsRef.current?.value || ""],
            },
        ];
        const filterLabels = selectedFilters
            .filter((filt) => filt.filters.length > 0)
            .map((key) => key.filters.join(", "));

        hideFilter();
        if (deviceListInView === "yours") {
            updateYourDevicesFilteredByLabel(filterLabels);
            updateYourDevicesFilterKeys(buildFilterQuery(selectedFilters));
        } else if (deviceListInView === "ours") {
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

    const getDefaultOption = (i: number) => {
        return yourDevicesFilteredByLabel[i] !== ""
            ? {
                  value:
                      deviceListInView === "yours"
                          ? yourDevicesFilteredByLabel[i]
                          : allDevicesFilteredByLabel[i],
                  label:
                      deviceListInView === "yours"
                          ? yourDevicesFilteredByLabel[i]
                          : allDevicesFilteredByLabel[i],
              }
            : null;
    };

    const Filter = () => {
        return (
            <>
                <div className="w-full">
                    <CustomSelect
                        name="Device Type"
                        options={types}
                        label="Device Type"
                        ref={deviceTypesRef}
                        errorMessages={[]}
                        defaultOption={getDefaultOption(0)}
                    />
                    <CustomSelect
                        name="Connector"
                        options={connectors}
                        label="Connector"
                        ref={connectorsRef}
                        errorMessages={[]}
                        defaultOption={getDefaultOption(1)}
                    />
                    <CustomSelect
                        name="Form factor"
                        options={formFactors}
                        label="Form factor"
                        ref={formFactorsRef}
                        errorMessages={[]}
                        defaultOption={getDefaultOption(2)}
                    />
                </div>
                <div className="flex justify-between w-full">
                    <CustomButton
                        disabled={filterList.length === 0}
                        buttonClassName="filterSortDialogButton"
                        labelClassName="text-xl"
                        label="Clear"
                        type="button"
                        onClick={handleClearFilters}
                    />
                    <CustomButton
                        // disabled={filterList.length === 0}
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
