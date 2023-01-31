import React, { createContext, ReactNode, useContext, useState } from "react";
import { AndOr, IOrderBy, ISearchQuery, SortFilter } from "../bff/types";
import { SelectedFilterOptions } from "../types";

interface ODevFilterContextProps {
    filterModalShowing: boolean;
    showFilter: (type: SortFilter) => void;
    hideFilter: () => void;
    sortOrFilter: SortFilter;
    sortBy: IOrderBy[];
    updateSortBy: (value: IOrderBy[]) => void;
    filterKeys: any[];
    clearFilterKeys: () => void;
    updateFilterKeys: (keys: any[]) => void;
    filteredByLabel: string[];
    updateFilteredByLabel: (label: string[]) => void;
    selectedFilterOptions: SelectedFilterOptions | null;
    updateSelectedFilterOptions: (options: SelectedFilterOptions) => void;
    clearSelectedFilterOptions: () => void;
    searchQuery: ISearchQuery[];
    updateSearchQuery: (query: any[]) => void;
    andOr: AndOr;
    updateAndOr: (value: AndOr) => void;
    limit: number;
    updateLimit: (value: number) => void;
    skip: number;
    updateSkip: (value: number) => void;
}

export const ODevFilterContext = createContext<ODevFilterContextProps>({
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
    filteredByLabel: [],
    updateFilteredByLabel: () => {},
    selectedFilterOptions: null,
    updateSelectedFilterOptions: () => {},
    clearSelectedFilterOptions: () => {},
    searchQuery: [],
    updateSearchQuery: () => {},
    andOr: "AND",
    updateAndOr: () => {},
    limit: 50,
    updateLimit: () => {},
    skip: 0,
    updateSkip: () => {},
});

export const useODevFilterContext = () => useContext(ODevFilterContext);

export const ODevFilterContextProvider = ({
    children,
}: {
    children: ReactNode;
}) => {
    const [filterModalShowing, setShowFilterModal] = useState<boolean>(false);
    const [sortOrFilter, setSortOrFilter] = useState<SortFilter>("sort");
    const [sortBy, setSortBy] = useState<IOrderBy[]>([
        {
            title: "asc",
        },
    ]);
    const [filterKeys, setFilterKeys] = useState<any[]>([]);
    const [searchQuery, setSearchQuery] = useState<ISearchQuery[]>([]);
    const [filteredByLabel, setFilteredByLabel] = useState<string[]>([]);
    const [andOr, setAndOr] = useState<AndOr>("AND");
    const [limit, setLimit] = useState<number>(50);
    const [skip, setSkip] = useState<number>(0);
    const [selectedFilterOptions, setFilterOptions] =
        useState<SelectedFilterOptions | null>(null);

    const showFilter = (type: SortFilter) => {
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

    const updateFilterKeys = (filterKeys: any[]) => {
        setFilterKeys(filterKeys);
    };

    const updateSearchQuery = (query: ISearchQuery[]) => {
        setSearchQuery(query);
    };

    const updateFilteredByLabel = (label: string[]) => {
        setFilteredByLabel(label);
    };

    const updateAndOr = (value: AndOr) => {
        setAndOr(value);
    };

    const updateLimit = (value: number) => {
        setLimit(value);
    };

    const updateSkip = (value: number) => {
        setSkip(value);
    };

    const updateSelectedFilterOptions = (options: SelectedFilterOptions) => {
        setFilterOptions((op) => ({ ...op, ...options }));
    };

    const clearSelectedFilterOptions = () => {
        setFilterOptions(null);
    };

    return (
        <ODevFilterContext.Provider
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
                filteredByLabel,
                updateFilteredByLabel,
                andOr,
                updateAndOr,
                limit,
                updateLimit,
                skip,
                updateSkip,
                selectedFilterOptions,
                updateSelectedFilterOptions,
                clearSelectedFilterOptions,
            }}
        >
            {children}
        </ODevFilterContext.Provider>
    );
};
