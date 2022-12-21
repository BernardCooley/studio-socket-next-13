import React, { createContext, ReactNode, useContext, useState } from "react";

interface NavContextProps {
    navOpen: boolean;
    closeNav: () => void;
    openNav: () => void;
    deviceListInView: "yours" | "ours";
    updateDeviceListInView: (view: "yours" | "ours") => void;
}

export const NavContext = createContext<NavContextProps>({
    navOpen: false,
    closeNav: () => {},
    openNav: () => {},
    deviceListInView: "yours",
    updateDeviceListInView: () => {},
});

export const useNavContext = () => useContext(NavContext);

export const NavContextProvider = ({ children }: { children: ReactNode }) => {
    const [navOpen, setNavOpen] = useState<boolean>(false);
    const [deviceListInView, setDeviceListInView] = useState<"yours" | "ours">(
        "yours"
    );

    const closeNav = () => {
        setNavOpen(false);
    };

    const openNav = () => {
        setNavOpen(true);
    };

    const updateDeviceListInView = (view: "yours" | "ours") => {
        setDeviceListInView(view);
    };

    return (
        <NavContext.Provider
            value={{
                navOpen,
                closeNav,
                openNav,
                deviceListInView,
                updateDeviceListInView,
            }}
        >
            {children}
        </NavContext.Provider>
    );
};
