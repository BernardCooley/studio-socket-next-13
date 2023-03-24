import React from "react";
import { AuthContextProvider } from "./AuthContext";
import { NavContextProvider } from "./NavContext";

interface Props {
    children: React.ReactNode;
}

const AllContexts = ({ children }: Props) => {
    return (
        <AuthContextProvider>
            <NavContextProvider>{children}</NavContextProvider>
        </AuthContextProvider>
    );
};

export default AllContexts;
