import React from "react";
import { NavContextProvider } from "./NavContext";
import { ODevFilterContextProvider } from "./ODevFilterContext";
import { YDevFilterContextProvider } from "./YDevFilterContext";

interface Props {
    children: React.ReactNode;
}

const AllContexts = ({ children }: Props) => {
    return (
        <ODevFilterContextProvider>
            <YDevFilterContextProvider>
                <NavContextProvider>{children}</NavContextProvider>
            </YDevFilterContextProvider>
        </ODevFilterContextProvider>
    );
};

export default AllContexts;
