/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Box } from "@chakra-ui/react";
import { YDevFilterContextProvider } from "../../../../contexts/YDevFilterContext";
import { SearchContextProvider } from "../../../../contexts/SearchContext";

interface Props {
    children: React.ReactNode;
}

const AllDevicesWrapperLayout = ({ children }: Props) => {
    return (
        <SearchContextProvider>
            <YDevFilterContextProvider>
                <Box>{children}</Box>
            </YDevFilterContextProvider>
        </SearchContextProvider>
    );
};

export default AllDevicesWrapperLayout;
