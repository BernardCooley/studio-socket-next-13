import { Box } from "@chakra-ui/react";
import React from "react";

interface Props {
    title: string;
}

const PageTitle = ({ title }: Props) => {
    return (
        <Box
            fontSize="xl"
            w="full"
            textAlign="center"
            textTransform="capitalize"
            fontFamily="default"
        >
            {title}
        </Box>
    );
};

export default PageTitle;
