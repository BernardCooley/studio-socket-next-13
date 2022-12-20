import React, { createContext, ReactNode, useContext, useState } from "react";

interface FilterContextProps {
    filterModalShowing: boolean;
    showFilter: (type: "sort" | "filter") => void;
    hideFilter: () => void;
    filterType: "sort" | "filter";
    sortSelected: string;
    updateSortSelected: (value: string) => void;
    filterKeys: string[];
    addToFilterKeys: (key: string) => void;
    removeFromFilterKeys: (key: string) => void;
    clearFilterKeys: () => void;
}

export const FilterContext = createContext<FilterContextProps>({
    filterModalShowing: false,
    showFilter: () => {},
    hideFilter: () => {},
    filterType: "sort",
    sortSelected: "",
    updateSortSelected: () => {},
    filterKeys: [],
    addToFilterKeys: () => {},
    removeFromFilterKeys: () => {},
    clearFilterKeys: () => {},
});

export const useFilterContext = () => useContext(FilterContext);

export const FilterContextProvider = ({
    children,
}: {
    children: ReactNode;
}) => {
    const [filterModalShowing, setShowFilterModal] = useState<boolean>(false);
    const [filterType, setFilterType] = useState<"sort" | "filter">("sort");
    const [sortSelected, setSortSelected] = useState<string>("");
    const [filterKeys, setFilterKeys] = useState<string[]>([]);

    const showFilter = (type: "sort" | "filter") => {
        setShowFilterModal(true);
        setFilterType(type);
    };

    const hideFilter = () => {
        setShowFilterModal(false);
    };

    const updateSortSelected = (value: string) => {
        setSortSelected(value);
    };

    const addToFilterKeys = (key: string) => {
        setFilterKeys([...filterKeys, key]);
    };

    const removeFromFilterKeys = (key: string) => {
        setFilterKeys(filterKeys.filter((filterKey) => filterKey !== key));
    };

    const clearFilterKeys = () => {
        setFilterKeys([]);
    };

    return (
        <FilterContext.Provider
            value={{
                filterModalShowing,
                showFilter,
                hideFilter,
                filterType,
                sortSelected,
                updateSortSelected,
                filterKeys,
                addToFilterKeys,
                removeFromFilterKeys,
                clearFilterKeys,
            }}
        >
            {children}
        </FilterContext.Provider>
    );
};
