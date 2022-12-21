import React, { createContext, ReactNode, useContext, useState } from "react";

interface SearchContextProps {
    searchOpen: boolean;
    openSearch: () => void;
    closeSearch: () => void;
}

export const SearchContext = createContext<SearchContextProps>({
    searchOpen: false,
    openSearch: () => {},
    closeSearch: () => {},
});

export const useSearchContext = () => useContext(SearchContext);

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
