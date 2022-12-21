import React, { useEffect, useState } from "react";
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
        sortBy,
        sortOrFilter,
        filterKeys,
        clearFilterKeys,
        updateFilterKeys,
    } = useFilterContext();

    const [filterList, setFilterList] = useState<string[]>(filterKeys);
    const [sort, setSort] = useState<string>(sortBy);

    useEffect(() => {
        if (!filterModalShowing) {
            setFilterList(filterKeys);
            setSort(sortBy);
        }
    }, [filterModalShowing]);

    const handleClearSort = () => {
        hideFilter();
        updateSortSelected("");
    };

    const handleClearFilters = () => {
        hideFilter();
        clearFilterKeys();
        setFilterList([]);
    };

    const handleSubmitSort = () => {
        hideFilter();
        updateSortSelected(sort);
    };

    const handleSubmitFilters = () => {
        hideFilter();
        updateFilterKeys(filterList);
    };

    const Sort = () => {
        return (
            <>
                <div className="mb-10">
                    {sortButtons.map((button) => (
                        <CustomButton
                            buttonClassName={`filterSortButton ${
                                sort === button.sortKey
                                    ? "filterSortButtonActive"
                                    : "filterSortButtonInactive"
                            }`}
                            labelClassName="text-xl"
                            key={button.sortKey}
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
                        label="Clear"
                        type="button"
                        onClick={handleClearSort}
                    />
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
                <div className="absolute modal">
                    <Icons
                        iconType="close"
                        className="z-30 absolute right-2 top-2"
                        onClick={hideFilter}
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
