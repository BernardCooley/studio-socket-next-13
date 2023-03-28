/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Box } from "@chakra-ui/react";
import { SearchContextProvider } from "../../../../contexts/SearchContext";

interface Props {
    children: React.ReactNode;
}

const AllDevicesWrapperLayout = ({ children }: Props) => {
    return (
        <SearchContextProvider>
            <Box>{children}</Box>
        </SearchContextProvider>
    );
};

export default AllDevicesWrapperLayout;
