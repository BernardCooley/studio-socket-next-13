/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { filters, sortButtons } from "../consts";
import { useYDevFilterContext } from "../contexts/YDevFilterContext";
import { useODevFilterContext } from "../contexts/ODevFilterContext";
import Icons from "../icons";
import CustomButton from "./CustomButton";
import { useNavContext } from "../contexts/NavContext";
import { IOrderBy } from "../bff/types";
import { shallowEqual } from "../utils";

interface Props {}

const FilterModal = ({}: Props) => {
    const {
        filterModalShowing,
        hideFilter,
        updateSortBy: updateYourDevicesSortBy,
        sortBy: yourDevicesSortBy,
        sortOrFilter,
        filterKeys: yourDevicesFilterKeys,
        clearFilterKeys: clearYourDevicesFilterKeys,
        updateFilterKeys: updateYourDevicesFilterKeys,
    } = useYDevFilterContext();

    const {
        updateSortBy: updateAllDevicesSortBy,
        sortBy: allDevicesSortBy,
        filterKeys: allDevicesFilterKeys,
        clearFilterKeys: clearAllDevicesFilterKeys,
        updateFilterKeys: updateAllDevicesFilterKeys,
    } = useODevFilterContext();

    const { deviceListInView } = useNavContext();

    const [filterList, setFilterList] = useState<string[]>(
        deviceListInView === "yours"
            ? yourDevicesFilterKeys
            : allDevicesFilterKeys
    );
    const [sort, setSort] = useState<IOrderBy[]>(
        deviceListInView === "yours" ? yourDevicesSortBy : allDevicesSortBy
    );

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
        } else if (deviceListInView === "ours") {
            clearAllDevicesFilterKeys();
        }
        setFilterList([]);
    };

    const handleSubmitSort = () => {
        hideFilter();
        if (deviceListInView === "yours") {
            updateYourDevicesSortBy(sort);
        } else if (deviceListInView === "ours") {
            updateAllDevicesSortBy(sort);
        }
    };

    const handleSubmitFilters = () => {
        hideFilter();
        if (deviceListInView === "yours") {
            updateYourDevicesFilterKeys(filterList);
        } else if (deviceListInView === "ours") {
            updateAllDevicesFilterKeys(filterList);
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

    const Filter = () => {
        return (
            <>
                <div>
                    {filters.map((filter) => (
                        <div
                            className="mb-3 border-b-2 border-primary-light-border last-of-type:border-b-0"
                            key={filter.title}
                        >
                            <div className="mb-2 text-xl">{filter.title}</div>
                            <div className="mb-3">
                                {filter.buttons.map((button) => (
                                    <CustomButton
                                        buttonClassName={`filterSortButton ${
                                            filterList.includes(
                                                button.filterKey
                                            )
                                                ? "filterSortButtonActive"
                                                : "filterSortButtonInactive"
                                        }`}
                                        labelClassName="text-xl"
                                        key={button.filterKey}
                                        label={button.label}
                                        type="button"
                                        onClick={() =>
                                            filterList.includes(
                                                button.filterKey
                                            )
                                                ? setFilterList(
                                                      filterList.filter(
                                                          (filterKey) =>
                                                              filterKey !==
                                                              button.filterKey
                                                      )
                                                  )
                                                : setFilterList([
                                                      ...filterList,
                                                      button.filterKey,
                                                  ])
                                        }
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
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
                        disabled={filterList.length === 0}
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
