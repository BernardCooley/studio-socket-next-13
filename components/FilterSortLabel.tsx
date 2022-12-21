import React, { useEffect, useState } from "react";
import { filters, sortButtons } from "../consts";

interface Props {
    sortBy: string;
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

    const getSortTitle = (sortKey: string) => {
        let sort = "";
        sortButtons.forEach((button) => {
            if (button.sortKey === sortKey) {
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
