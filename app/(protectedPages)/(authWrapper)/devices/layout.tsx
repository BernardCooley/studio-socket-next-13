/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Box } from "@chakra-ui/react";
import { ODevFilterContextProvider } from "../../../../contexts/ODevFilterContext";
import { SearchContextProvider } from "../../../../contexts/SearchContext";
import { YDevFilterContextProvider } from "../../../../contexts/YDevFilterContext";

interface Props {
    children: React.ReactNode;
}

const DevicesWrapperLayout = ({ children }: Props) => {
    return (
        <SearchContextProvider>
            <ODevFilterContextProvider>
                <YDevFilterContextProvider>
                    <Box>{children}</Box>
                </YDevFilterContextProvider>
            </ODevFilterContextProvider>
        </SearchContextProvider>
    );
};

export default DevicesWrapperLayout;
