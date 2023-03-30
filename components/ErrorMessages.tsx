import { Box } from "@chakra-ui/react";
import React from "react";

interface Props {
    errorMessages?: string[];
}

const ErrorMessages = ({ errorMessages }: Props) => {
    return (
        <Box color="red.500" fontSize="2xs">
            {errorMessages &&
                errorMessages.length > 0 &&
                errorMessages.map((error) => (
                    <Box key={JSON.stringify(error)}>{error}</Box>
                ))}
        </Box>
    );
};

export default ErrorMessages;
