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

export const NavContext = createContext<NavContextProps | null>(null);

export const useNavContext = () => {
    const ODevContext = useContext(NavContext);

    if (!ODevContext) {
        throw new Error(
            "useNavContext has to be used within <NavContext.Provider>"
        );
    }

    return ODevContext;
};

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
