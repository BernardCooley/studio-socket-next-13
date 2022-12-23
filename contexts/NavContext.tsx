import React, {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from "react";

interface NavContextProps {
    navOpen: boolean;
    closeNav: () => void;
    openNav: () => void;
    deviceListInView: "yours" | "ours";
    updateDeviceListInView: (view: "yours" | "ours") => void;
    environment: "dev" | "prod";
}

export const NavContext = createContext<NavContextProps>({
    navOpen: false,
    closeNav: () => {},
    openNav: () => {},
    deviceListInView: "yours",
    updateDeviceListInView: () => {},
    environment: "dev",
});

export const useNavContext = () => useContext(NavContext);

export const NavContextProvider = ({ children }: { children: ReactNode }) => {
    const [navOpen, setNavOpen] = useState<boolean>(false);
    const [deviceListInView, setDeviceListInView] = useState<"yours" | "ours">(
        "yours"
    );
    const [environment, setEnvironment] = useState<"dev" | "prod">("dev");

    const closeNav = () => {
        setNavOpen(false);
    };

    const openNav = () => {
        setNavOpen(true);
    };

    const updateDeviceListInView = (view: "yours" | "ours") => {
        setDeviceListInView(view);
    };

    useEffect(() => {
        const env = process.env.NODE_ENV;
        if (env == "development") {
            setEnvironment("dev");
        } else if (env == "production") {
            setEnvironment("prod");
        }
    }, []);

    return (
        <NavContext.Provider
            value={{
                navOpen,
                closeNav,
                openNav,
                deviceListInView,
                updateDeviceListInView,
                environment,
            }}
        >
            {children}
        </NavContext.Provider>
    );
};
