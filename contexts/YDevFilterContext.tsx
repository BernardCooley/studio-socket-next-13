import React, { createContext, ReactNode, useContext, useState } from "react";
import { AndOr, IOrderBy, ISearchQuery, SortFilter } from "../bff/types";
import { SelectedFilterOptions } from "../types";

interface YDevFilterContextProps {
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
    searchLabel: string[];
    updateSearchLabel: (label: string[]) => void;
    andOr: AndOr;
    updateAndOr: (value: AndOr) => void;
    limit: number;
    updateLimit: (value: number) => void;
    skip: number;
    updateSkip: (value: number) => void;
    refetch: boolean;
    triggerRefetch: () => void;
}

export const YDevFilterContext = createContext<YDevFilterContextProps | null>(
    null
);

export const useYDevFilterContext = () => {
    const yDevContext = useContext(YDevFilterContext);

    if (!yDevContext) {
        throw new Error(
            "useYDevFilterContext has to be used within <YDevFilterContext.Provider>"
        );
    }

    return yDevContext;
};

export const YDevFilterContextProvider = ({
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
    const [searchLabel, setSearchLabel] = useState<string[]>([]);
    const [filteredByLabel, setFilteredByLabel] = useState<string[]>([]);
    const [andOr, setAndOr] = useState<AndOr>("AND");
    const [limit, setLimit] = useState<number>(50);
    const [skip, setSkip] = useState<number>(0);
    const [selectedFilterOptions, setFilterOptions] =
        useState<SelectedFilterOptions | null>(null);
    const [refetch, setRefetch] = useState<boolean>(false);

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

    const triggerRefetch = () => {
        setRefetch((refetch) => !refetch);
    };

    const updateSearchLabel = (label: string[]) => {
        setSearchLabel(label);
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
                refetch,
                triggerRefetch,
                searchLabel,
                updateSearchLabel,
            }}
        >
            {children}
        </YDevFilterContext.Provider>
    );
};
