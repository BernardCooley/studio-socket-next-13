import React from "react";
import Icons from "../icons";

interface Props {
    sortBy: string;
    onSortClick: () => void;
    filterKeys: string[];
    onFilterClick: () => void;
}

const FilterIcons = ({
    sortBy,
    onSortClick,
    filterKeys,
    onFilterClick,
}: Props) => {
    return (
        <div>
            <div className="text-primary absolute w-full flex justify-between px-3 top-1">
                <Icons
                    iconType="sort"
                    className={`z-30 rounded-lg shadow-lg ${
                        sortBy.length > 0
                            ? "filterSortIconActive"
                            : "filterSortIconInactive"
                    }`}
                    onClick={onSortClick}
                />
                <Icons
                    className={`z-30 rounded-lg shadow-lg ${
                        filterKeys.length > 0
                            ? "filterSortIconActive"
                            : "filterSortIconInactive"
                    }`}
                    iconType="filter"
                    onClick={onFilterClick}
                />
            </div>
        </div>
    );
};

export default FilterIcons;
