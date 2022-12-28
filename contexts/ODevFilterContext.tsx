import React, { createContext, ReactNode, useContext, useState } from "react";

interface ODevFilterContextProps {
    filterModalShowing: boolean;
    showFilter: (type: "sort" | "filter") => void;
    hideFilter: () => void;
    sortOrFilter: "sort" | "filter";
    sortBy: string;
    updateSortBy: (value: string) => void;
    filterKeys: string[];
    clearFilterKeys: () => void;
    updateFilterKeys: (keys: string[]) => void;
    searchQuery: string;
    updateSearchQuery: (query: string) => void;
}

export const ODevFilterContext = createContext<ODevFilterContextProps>({
    filterModalShowing: false,
    showFilter: () => {},
    hideFilter: () => {},
    sortOrFilter: "sort",
    sortBy: "",
    updateSortBy: () => {},
    filterKeys: [],
    clearFilterKeys: () => {},
    updateFilterKeys: () => {},
    searchQuery: "",
    updateSearchQuery: () => {},
});

export const useODevFilterContext = () => useContext(ODevFilterContext);

export const ODevFilterContextProvider = ({
    children,
}: {
    children: ReactNode;
}) => {
    const [filterModalShowing, setShowFilterModal] = useState<boolean>(false);
    const [sortOrFilter, setSortOrFilter] = useState<"sort" | "filter">("sort");
    const [sortBy, setSortBy] = useState<string>("");
    const [filterKeys, setFilterKeys] = useState<string[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>("");

    const showFilter = (type: "sort" | "filter") => {
        setShowFilterModal(true);
        setSortOrFilter(type);
    };

    const hideFilter = () => {
        setShowFilterModal(false);
    };

    const updateSortBy = (value: string) => {
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
            }}
        >
            {children}
        </ODevFilterContext.Provider>
    );
};
