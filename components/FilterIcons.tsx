import { Flex } from "@chakra-ui/react";
import React from "react";
import { IOrderBy, ISearchQuery } from "../bff/types";
import Icons from "../icons";

interface Props {
    sortBy: IOrderBy;
    onSortClick: () => void;
    filterKeys: string[][];
    onFilterClick: () => void;
    onSearchClick: () => void;
    searchTerm: ISearchQuery[];
}

const FilterIcons = ({
    sortBy,
    onSortClick,
    filterKeys,
    onFilterClick,
    onSearchClick,
    searchTerm,
}: Props) => {
    let merged: string[] = [];

    filterKeys.forEach((keys) => {
        keys.forEach((filter) => {
            merged.push(filter);
        });
    });

    return (
        <Flex>
            <Icons
                iconType="sort"
                className={`z-30 rounded-sm shadow-lg ${
                    sortBy.length > 0
                        ? "filterSortIconActive"
                        : "filterSortIconInactive"
                }`}
                onClick={onSortClick}
                fontSize="42px"
            />
            <Icons
                className={`z-30 rounded-sm shadow-lg ${
                    merged.length > 0 &&
                    merged.filter((key) => key !== "").length > 0
                        ? "filterSortIconActive"
                        : "filterSortIconInactive"
                }`}
                iconType="filter"
                onClick={onFilterClick}
                fontSize="42px"
            />
            <Icons
                className={`z-30 rounded-sm shadow-lg ${
                    searchTerm.length > 0
                        ? "filterSortIconActive"
                        : "filterSortIconInactive"
                }`}
                iconType="search"
                fontSize="42px"
                onClick={onSearchClick}
            />
        </Flex>
    );
};

export default FilterIcons;
