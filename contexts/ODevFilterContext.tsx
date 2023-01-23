import React, { createContext, ReactNode, useContext, useState } from "react";
import { IOrderBy } from "../bff/types";

interface ODevFilterContextProps {
    filterModalShowing: boolean;
    showFilter: (type: "sort" | "filter") => void;
    hideFilter: () => void;
    sortOrFilter: "sort" | "filter";
    sortBy: IOrderBy[];
    updateSortBy: (value: IOrderBy[]) => void;
    filterKeys: any[];
    clearFilterKeys: () => void;
    updateFilterKeys: (keys: any[]) => void;
    filteredByLabel: string[];
    updateFilteredByLabel: (label: string[]) => void;
    searchQuery: string;
    updateSearchQuery: (query: string) => void;
    andOr: "AND" | "OR";
    updateAndOr: (value: "AND" | "OR") => void;
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
    searchQuery: "",
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
    const [sortOrFilter, setSortOrFilter] = useState<"sort" | "filter">("sort");
    const [sortBy, setSortBy] = useState<IOrderBy[]>([
        {
            title: "asc",
        },
    ]);
    const [filterKeys, setFilterKeys] = useState<any[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [filteredByLabel, setFilteredByLabel] = useState<string[]>([]);
    const [andOr, setAndOr] = useState<"AND" | "OR">("AND");
    const [limit, setLimit] = useState<number>(50);
    const [skip, setSkip] = useState<number>(0);

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

    const updateFilterKeys = (filterKeys: any[]) => {
        setFilterKeys(filterKeys);
    };

    const updateSearchQuery = (query: string) => {
        setSearchQuery(query);
    };

    const updateFilteredByLabel = (label: string[]) => {
        setFilteredByLabel(label);
    };

    const updateAndOr = (value: "AND" | "OR") => {
        setAndOr(value);
    };

    const updateLimit = (value: number) => {
        setLimit(value);
    };

    const updateSkip = (value: number) => {
        setSkip(value);
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
            }}
        >
            {children}
        </ODevFilterContext.Provider>
    );
};
