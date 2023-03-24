import React, { createContext, ReactNode, useContext, useState } from "react";

interface SearchContextProps {
    searchOpen: boolean;
    openSearch: () => void;
    closeSearch: () => void;
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

    const openSearch = () => {
        setSearchOpen(true);
    };

    const closeSearch = () => {
        setSearchOpen(false);
    };

    return (
        <SearchContext.Provider
            value={{
                searchOpen,
                openSearch,
                closeSearch,
            }}
        >
            {children}
        </SearchContext.Provider>
    );
};
