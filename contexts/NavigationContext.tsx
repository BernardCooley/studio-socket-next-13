import React, {
    createContext,
    ReactNode,
    useCallback,
    useContext,
    useEffect,
    useState,
} from "react";

interface NavigationContextProps {
    scrollPosition: number;
    scrollingDown: boolean;
}

export const NavigationContext = createContext<NavigationContextProps>({
    scrollPosition: 0,
    scrollingDown: false,
});

export const useNavigationContext = () => useContext(NavigationContext);

export const NavigationContextProvider = ({
    children,
}: {
    children: ReactNode;
}) => {
    const [scrollPosition, setCcrollPosition] = useState<number>(0);
    const [scrollingDown, setScrollingDown] = useState<boolean>(false);

    const handleScroll = useCallback(() => {
        if (scrollPosition > window.scrollY) {
            setScrollingDown(false);
            console.log("scrolling up");
        } else if (scrollPosition < window.scrollY) {
            setScrollingDown(true);
        }
        setCcrollPosition(window.scrollY);
    }, [scrollPosition]);

    useEffect(() => {
        window.addEventListener("scroll", () => handleScroll());

        return () => {
            window.removeEventListener("scroll", () => handleScroll());
        };
    }, [handleScroll]);

    return (
        <NavigationContext.Provider
            value={{
                scrollPosition,
                scrollingDown,
            }}
        >
            {children}
        </NavigationContext.Provider>
    );
};
