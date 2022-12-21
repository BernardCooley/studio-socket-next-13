import React, { createContext, ReactNode, useContext, useState } from "react";

interface FilterContextProps {
    filterModalShowing: boolean;
    showFilter: (type: "sort" | "filter") => void;
    hideFilter: () => void;
    sortOrFilter: "sort" | "filter";
    sortSelected: string;
    updateSortSelected: (value: string) => void;
    filterKeys: string[];
    clearFilterKeys: () => void;
    updateFilterKeys: (keys: string[]) => void;
}

export const FilterContext = createContext<FilterContextProps>({
    filterModalShowing: false,
    showFilter: () => {},
    hideFilter: () => {},
    sortOrFilter: "sort",
    sortSelected: "",
    updateSortSelected: () => {},
    filterKeys: [],
    clearFilterKeys: () => {},
    updateFilterKeys: () => {},
});

export const useFilterContext = () => useContext(FilterContext);

export const FilterContextProvider = ({
    children,
}: {
    children: ReactNode;
}) => {
    const [filterModalShowing, setShowFilterModal] = useState<boolean>(false);
    const [sortOrFilter, setSortOrFilter] = useState<"sort" | "filter">("sort");
    const [sortSelected, setSortSelected] = useState<string>("");
    const [filterKeys, setFilterKeys] = useState<string[]>([]);

    const showFilter = (type: "sort" | "filter") => {
        setShowFilterModal(true);
        setSortOrFilter(type);
    };

    const hideFilter = () => {
        setShowFilterModal(false);
    };

    const updateSortSelected = (value: string) => {
        setSortSelected(value);
    };

    const clearFilterKeys = () => {
        setFilterKeys([]);
    };

    const updateFilterKeys = (filterKeys: string[]) => {
        setFilterKeys(filterKeys);
    };

    return (
        <FilterContext.Provider
            value={{
                filterModalShowing,
                showFilter,
                hideFilter,
                sortOrFilter,
                sortSelected,
                updateSortSelected,
                filterKeys,
                clearFilterKeys,
                updateFilterKeys,
            }}
        >
            {children}
        </FilterContext.Provider>
    );
};
