import React from "react";
import { NavContextProvider } from "./NavContext";
import { ODevFilterContextProvider } from "./ODevFilterContext";
import { SearchContextProvider } from "./SearchContext";
import { YDevFilterContextProvider } from "./YDevFilterContext";

interface Props {
    children: React.ReactNode;
}

const AllContexts = ({ children }: Props) => {
    return (
        <SearchContextProvider>
            <ODevFilterContextProvider>
                <YDevFilterContextProvider>
                    <NavContextProvider>{children}</NavContextProvider>
                </YDevFilterContextProvider>
            </ODevFilterContextProvider>
        </SearchContextProvider>
    );
};

export default AllContexts;
