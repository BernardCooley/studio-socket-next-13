import React, { createContext, ReactNode, useContext, useState } from "react";
import { IOrderBy } from "../bff/types";

interface YDevFilterContextProps {
    filterModalShowing: boolean;
    showFilter: (type: "sort" | "filter") => void;
    hideFilter: () => void;
    sortOrFilter: "sort" | "filter";
    sortBy: IOrderBy[];
    updateSortBy: (value: IOrderBy[]) => void;
    filterKeys: string[];
    clearFilterKeys: () => void;
    updateFilterKeys: (keys: string[]) => void;
    searchQuery: string;
    updateSearchQuery: (query: string) => void;
}

export const YDevFilterContext = createContext<YDevFilterContextProps>({
    filterModalShowing: false,
    showFilter: () => {},
    hideFilter: () => {},
    sortOrFilter: "sort",
    sortBy: [
        {
            title: "asc",
        },
    ],
    updateSortBy: () => {},
    filterKeys: [],
    clearFilterKeys: () => {},
    updateFilterKeys: () => {},
    searchQuery: "",
    updateSearchQuery: () => {},
});

export const useYDevFilterContext = () => useContext(YDevFilterContext);

export const YDevFilterContextProvider = ({
    children,
}: {
    children: ReactNode;
}) => {
    const [filterModalShowing, setShowFilterModal] = useState<boolean>(false);
    const [sortOrFilter, setSortOrFilter] = useState<"sort" | "filter">("sort");
    const [sortBy, setSortBy] = useState<IOrderBy[]>([
        {
            title: "asc",
        },
    ]);
    const [filterKeys, setFilterKeys] = useState<string[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>("");

    const showFilter = (type: "sort" | "filter") => {
        setShowFilterModal(true);
        setSortOrFilter(type);
    };

    const hideFilter = () => {
        setShowFilterModal(false);
    };

    const updateSortBy = (value: IOrderBy[]) => {
        setSortBy(value);
    };

    const clearFilterKeys = () => {
        setFilterKeys([]);
    };

    const updateFilterKeys = (filterKeys: string[]) => {
        setFilterKeys(filterKeys);
    };

    const updateSearchQuery = (query: string) => {
        setSearchQuery(query);
    };

    return (
        <YDevFilterContext.Provider
            value={{
                filterModalShowing,
                showFilter,
                hideFilter,
                sortOrFilter,
                sortBy,
                updateSortBy,
                filterKeys,
                clearFilterKeys,
                updateFilterKeys,
                searchQuery,
                updateSearchQuery,
            }}
        >
            {children}
        </YDevFilterContext.Provider>
    );
};
