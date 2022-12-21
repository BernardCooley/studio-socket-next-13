import React, { createContext, ReactNode, useContext, useState } from "react";

interface NavContextProps {
    navOpen: boolean;
    closeNav: () => void;
    openNav: () => void;
}

export const NavContext = createContext<NavContextProps>({
    navOpen: false,
    closeNav: () => {},
    openNav: () => {},
});

export const useNavContext = () => useContext(NavContext);

export const NavContextProvider = ({ children }: { children: ReactNode }) => {
    const [navOpen, setNavOpen] = useState<boolean>(false);

    const closeNav = () => {
        setNavOpen(false);
    };

    const openNav = () => {
        setNavOpen(true);
    };

    return (
        <NavContext.Provider
            value={{
                navOpen,
                closeNav,
                openNav,
            }}
        >
            {children}
        </NavContext.Provider>
    );
};
