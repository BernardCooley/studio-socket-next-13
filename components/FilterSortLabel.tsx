import { Box } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { IOrderBy } from "../bff/types";
import { sortButtons } from "../consts";
import { shallowEqual } from "../utils";

interface Props {
    sortBy: IOrderBy[];
    filterKeys: string[][];
    searchKeys: string[];
}

const FilterSortLabel = ({ sortBy, filterKeys, searchKeys }: Props) => {
    const merged: string[] = [];

    filterKeys.forEach((keys) => {
        keys.forEach((filter) => {
            merged.push(filter);
        });
    });

    const [parsedSortKey, setParsedSortKey] = useState<string>("");

    useEffect(() => {
        getSortTitle(sortBy);
    }, [merged, sortBy]);

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
        <Box fontSize="18px" m={1}>
            {parsedSortKey.length > 0 && <Box>Sorted by {parsedSortKey}</Box>}
            {merged.length > 0 &&
                merged.filter((key) => key !== "").length > 0 && (
                    <Box>
                        Filtered by{" "}
                        {merged.filter((key) => key !== "").join(", ")}
                    </Box>
                )}
            {searchKeys.length > 0 &&
                searchKeys.filter((key) => key !== "").length > 0 && (
                    <Box>
                        Results for{" "}
                        {searchKeys.filter((key) => key !== "").join(", ")}
                    </Box>
                )}
        </Box>
    );
};

export default FilterSortLabel;
