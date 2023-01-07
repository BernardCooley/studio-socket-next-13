import React, { useEffect, useState } from "react";
import { IOrderBy } from "../bff/types";
import { filters, sortButtons } from "../consts";
import { shallowEqual } from "../utils";

interface Props {
    sortBy: IOrderBy[];
    filterKeys: string[];
}

const FilterSortLabel = ({ sortBy, filterKeys }: Props) => {
    const [parsedFilterKeys, setParsedFilterKeys] = useState<string[]>([]);
    const [parsedSortKey, setParsedSortKey] = useState<string>("");

    useEffect(() => {
        getFilterTitles(filterKeys);
        getSortTitle(sortBy);
    }, [filterKeys, sortBy]);

    const getFilterTitles = (filterKeys: string[]) => {
        const filtersss: string[] = [];

        filterKeys.forEach((key) => {
            filters.forEach((filterType) => {
                filterType.buttons.forEach((button) => {
                    if (button.filterKey === key) {
                        filtersss.push(button.label);
                    }
                });
            });
        });

        setParsedFilterKeys(filtersss);
    };

    const getSortTitle = (sortKey: IOrderBy) => {
        let sort = "";
        sortButtons.forEach((button) => {
            if (shallowEqual(button.sortKey[0], sortKey[0])) {
                sort = button.label;
            }
        });
        setParsedSortKey(sort);
    };

    return (
        <div className="m-4 text-md">
            {parsedSortKey.length > 0 && <div>Sorted by: {parsedSortKey}</div>}
            {parsedFilterKeys.length > 0 && (
                <div>Filtered by: {parsedFilterKeys.join(", ")}</div>
            )}
        </div>
    );
};

export default FilterSortLabel;
