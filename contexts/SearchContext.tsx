import React, { createContext, ReactNode, useContext, useState } from "react";
import { ISearchQuery } from "../bff/types";

interface SearchContextProps {
    searchOpen: boolean;
    openSearch: () => void;
    closeSearch: () => void;
    searchQuery: ISearchQuery[];
    updateSearchQuery: (value: ISearchQuery[]) => void;
}

export const SearchContext = createContext<SearchContextProps | null>(null);

export const useSearchContext = () => {
    const searchContext = useContext(SearchContext);

    if (!searchContext) {
        throw new Error(
            "useSearchContext has to be used within <SearchContext.Provider>"
        );
    }

    return searchContext;
};

export const SearchContextProvider = ({
    children,
}: {
    children: ReactNode;
}) => {
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState<ISearchQuery[]>([]);

    const openSearch = () => {
        setSearchOpen(true);
    };

    const closeSearch = () => {
        setSearchOpen(false);
    };

    const updateSearchQuery = (value: ISearchQuery[]) => {
        setSearchQuery(value);
    };

    return (
        <SearchContext.Provider
            value={{
                searchOpen,
                openSearch,
                closeSearch,
                searchQuery,
                updateSearchQuery,
            }}
        >
            {children}
        </SearchContext.Provider>
    );
};
