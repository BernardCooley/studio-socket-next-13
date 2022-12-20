import React from "react";
import { filters, sortButtons } from "../consts";
import { useFilterContext } from "../contexts/FilterContext";
import Icons from "../icons";
import CustomButton from "./CustomButton";

interface Props {}

const FilterModal = ({}: Props) => {
    const {
        filterModalShowing,
        hideFilter,
        updateSortSelected,
        sortSelected,
        filterType,
        addToFilterKeys,
        filterKeys,
        removeFromFilterKeys,
        clearFilterKeys,
    } = useFilterContext();

    const handleClearSort = () => {
        hideFilter();
        updateSortSelected("");
    };

    const handleClearFilters = () => {
        hideFilter();
        clearFilterKeys();
    };

    const Sort = () => {
        return (
            <>
                <div className="mb-10">
                    {sortButtons.map((button) => (
                        <CustomButton
                            buttonClassName={`m-2 p-2 rounded-md border-2 ${
                                sortSelected === button.sortKey
                                    ? "text-primary-light bg-primary border-primary-light"
                                    : "text-primary bg-primary-light border-primary"
                            }`}
                            labelClassName="text-xl"
                            key={button.sortKey}
                            label={button.label}
                            type="button"
                            onClick={() => updateSortSelected(button.sortKey)}
                        />
                    ))}
                </div>
                <div className="flex justify-between w-full">
                    <CustomButton
                        disabled={sortSelected.length === 0}
                        buttonClassName={`m-2 p-2 rounded-md border-2 text-primary-light bg-primary border-primary min-w-dialogSubmitButton`}
                        labelClassName="text-xl"
                        label="Clear"
                        type="button"
                        onClick={handleClearSort}
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
                            className="mb-3  border-b-2 border-primary-light-border last-of-type:border-b-0"
                            key={filter.title}
                        >
                            <div className="mb-2 text-xl">{filter.title}</div>
                            <div className="mb-3">
                                {filter.buttons.map((button) => (
                                    <CustomButton
                                        buttonClassName={`m-2 p-2 rounded-md border-2 ${
                                            filterKeys.includes(
                                                button.filterKey
                                            )
                                                ? "text-primary-light bg-primary border-primary-light"
                                                : "text-primary bg-primary-light border-primary"
                                        }`}
                                        labelClassName="text-xl"
                                        key={button.filterKey}
                                        label={button.label}
                                        type="button"
                                        onClick={() =>
                                            filterKeys.includes(
                                                button.filterKey
                                            )
                                                ? removeFromFilterKeys(
                                                      button.filterKey
                                                  )
                                                : addToFilterKeys(
                                                      button.filterKey
                                                  )
                                        }
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex justify-between w-full">
                    <CustomButton
                        disabled={filterKeys.length === 0}
                        buttonClassName={`m-2 p-2 rounded-md border-2 text-primary-light bg-primary border-primary min-w-dialogSubmitButton`}
                        labelClassName="text-xl"
                        label="Clear"
                        type="button"
                        onClick={handleClearFilters}
                    />
                </div>
            </>
        );
    };

    return (
        <div>
            {filterModalShowing && (
                <div className="absolute modal">
                    <Icons
                        iconType="close"
                        className="z-40 absolute right-2 top-2"
                        onClick={hideFilter}
                    />
                    <div className="w-full text-2xl mb-4">
                        {filterType === "sort" ? "Sort by" : "Filter by"}
                    </div>
                    {filterType === "sort" ? <Sort /> : <Filter />}
                </div>
            )}
        </div>
    );
};

export default FilterModal;
