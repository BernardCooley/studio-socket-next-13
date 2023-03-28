import { Box, Flex } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { IOrderBy, ISearchQuery } from "../bff/types";
import { sortButtons } from "../consts";
import Icons from "../icons";
import { shallowEqual } from "../utils";

interface Props {
    sortBy: IOrderBy[];
    filterKeys: string[][];
    searchKeys: ISearchQuery[];
    onClearSearchClick: () => void;
}

const FilterSortLabel = ({
    sortBy,
    filterKeys,
    searchKeys,
    onClearSearchClick,
}: Props) => {
    const mergedFilterKeys: string[] = [];

    filterKeys.forEach((keys) => {
        keys.forEach((filter) => {
            mergedFilterKeys.push(filter);
        });
    });

    const mergedSearchKeys: string[] = [];

    searchKeys.map((searchKey) => {
        mergedSearchKeys.push(searchKey.title.search);
    });

    const [parsedSortKey, setParsedSortKey] = useState<string>("");

    useEffect(() => {
        getSortTitle(sortBy);
    }, [mergedFilterKeys, sortBy]);

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
            {mergedFilterKeys.length > 0 &&
                mergedFilterKeys.filter((key) => key !== "").length > 0 && (
                    <Box>
                        Filtered by{" "}
                        {mergedFilterKeys
                            .filter((key) => key !== "")
                            .join(", ")}
                    </Box>
                )}
            {mergedSearchKeys.length > 0 &&
                mergedSearchKeys.filter((key) => key !== "").length > 0 && (
                    <Flex alignItems="center">
                        <Box mr={1}>
                            Results for{" "}
                            {mergedSearchKeys
                                .filter((key) => key !== "")
                                .join(", ")}
                        </Box>
                        <Icons
                            iconType="close"
                            onClick={onClearSearchClick}
                            fontSize="22px"
                        />
                    </Flex>
                )}
        </Box>
    );
};

export default FilterSortLabel;
