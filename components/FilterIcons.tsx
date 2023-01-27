import React from "react";
import { IOrderBy } from "../bff/types";
import Icons from "../icons";

interface Props {
    sortBy: IOrderBy;
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
            <div className="text-primary absolute w-full flex justify-between px-3 top-16">
                <Icons
                    iconType="sort"
                    className={`z-30 rounded-lg shadow-lg ${
                        sortBy.length > 0
                            ? "filterSortIconActive"
                            : "filterSortIconInactive"
                    }`}
                    onClick={onSortClick}
                    fontSize="92px"
                />
                <Icons
                    className={`z-30 rounded-lg shadow-lg ${
                        filterKeys.length > 0 &&
                        filterKeys.filter((key) => key !== "").length > 0
                            ? "filterSortIconActive"
                            : "filterSortIconInactive"
                    }`}
                    iconType="filter"
                    onClick={onFilterClick}
                    fontSize="92px"
                />
            </div>
        </div>
    );
};

export default FilterIcons;
