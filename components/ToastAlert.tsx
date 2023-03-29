import { Flex, Heading, Text } from "@chakra-ui/react";
import React from "react";
import Icons from "../icons";

interface Props {
    title?: string;
    details: string;
    children?: React.ReactNode;
    status?: "error" | "success" | "info" | "warning";
}

const BaseAlert = ({ title, details, children, status }: Props) => {
    let color: string = "";
    switch (status) {
        case "error":
            color = "red.400";
            break;
        case "success":
            color = "green.500";
            break;
        case "info":
            color = "blue.500";
            break;
        case "warning":
            color = "yellow.500";
            break;
        default:
            color = "brand.primary";
    }

    return (
        <Flex
            alignItems="center"
            justifyContent="center"
            bgColor={color}
            color="brand.primary-light"
            py={3}
            px={2}
            fontFamily="default"
            rounded={10}
        >
            {children}
            <Flex flexDirection="column">
                {title && (
                    <Heading as="h4" fontSize="2xs" m={0} mb={2}>
                        {title}
                    </Heading>
                )}
                {details && (
                    <Text fontSize="2xs" m={0}>
                        {details}
                    </Text>
                )}
            </Flex>
        </Flex>
    );
};

export const SuccessAlert = ({ title, details }: Props) => {
    return (
        <BaseAlert title={title} details={details} status="success">
            <Icons
                iconType="tick"
                className="text-primary-light mr-2 rounded-full"
                fontSize="52px"
            />
        </BaseAlert>
    );
};

export const ErrorAlert = ({ title, details }: Props) => {
    return (
        <BaseAlert title={title} details={details} status="error">
            <Icons
                iconType="error"
                className="text-primary-light mr-2 rounded-full"
                fontSize="52px"
            />
        </BaseAlert>
    );
};

export const WarningAlert = ({ title, details }: Props) => {
    return (
        <BaseAlert title={title} details={details} status="warning">
            <Icons
                iconType="warning"
                className="text-primary-light mr-2 rounded-full"
                fontSize="52px"
            />
        </BaseAlert>
    );
};

export const InfoAlert = ({ title, details }: Props) => {
    return (
        <BaseAlert title={title} details={details} status="info">
            <Icons
                iconType="info"
                className="text-primary-light mr-2 rounded-full"
                fontSize="52px"
            />
        </BaseAlert>
    );
};

export default BaseAlert;
