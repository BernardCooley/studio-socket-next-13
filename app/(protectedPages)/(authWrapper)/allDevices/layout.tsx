/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Box } from "@chakra-ui/react";
import { ODevFilterContextProvider } from "../../../../contexts/ODevFilterContext";
import { SearchContextProvider } from "../../../../contexts/SearchContext";

interface Props {
    children: React.ReactNode;
}

const AllDevicesWrapperLayout = ({ children }: Props) => {
    return (
        <SearchContextProvider>
            <ODevFilterContextProvider>
                <Box>{children}</Box>
            </ODevFilterContextProvider>
        </SearchContextProvider>
    );
};

export default AllDevicesWrapperLayout;
