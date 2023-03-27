import { Flex } from "@chakra-ui/react";
import React from "react";
import { IOrderBy, ISearchQuery } from "../bff/types";
import Icons from "../icons";

interface Props {
    sortBy: IOrderBy;
    onSortClick: () => void;
    filterKeys: string[];
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
    return (
        <Flex>
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
            <Icons
                className={`z-30 rounded-lg shadow-lg ${
                    searchTerm.length > 0
                        ? "filterSortIconActive"
                        : "filterSortIconInactive"
                }`}
                iconType="search"
                fontSize="92px"
                onClick={onSearchClick}
            />
        </Flex>
    );
};

export default FilterIcons;
