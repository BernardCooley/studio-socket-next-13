import React, { useEffect, useState } from "react";
import { IOrderBy } from "../bff/types";
import { sortButtons } from "../consts";
import { shallowEqual } from "../utils";

interface Props {
    sortBy: IOrderBy[];
    filterKeys: string[];
    searchKeys: string[];
}

const FilterSortLabel = ({ sortBy, filterKeys, searchKeys }: Props) => {
    const [parsedSortKey, setParsedSortKey] = useState<string>("");

    useEffect(() => {
        getSortTitle(sortBy);
    }, [filterKeys, sortBy]);

    const getSortTitle = (sortKey: IOrderBy) => {
        let sort = "";
        if (sortKey[0]) {
            sortButtons.forEach((button) => {
                if (shallowEqual(button.sortKey[0], sortKey[0])) {
                    sort = button.label;
                }
            });
        }
        setParsedSortKey(sort);
    };

    return (
        <div className="m-4 text-md">
            {parsedSortKey.length > 0 && <div>Sorted by {parsedSortKey}</div>}
            {filterKeys.length > 0 &&
                filterKeys.filter((key) => key !== "").length > 0 && (
                    <div>
                        Filtered by{" "}
                        {filterKeys.filter((key) => key !== "").join(", ")}
                    </div>
                )}
            {searchKeys.length > 0 &&
                searchKeys.filter((key) => key !== "").length > 0 && (
                    <div>
                        Results for{" "}
                        {searchKeys.filter((key) => key !== "").join(", ")}
                    </div>
                )}
        </div>
    );
};

export default FilterSortLabel;
