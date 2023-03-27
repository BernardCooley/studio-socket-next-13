/* eslint-disable react-hooks/exhaustive-deps */
import Link from "next/link";
import React, { memo } from "react";
import Icons, { deviceIcons } from "../icons";
import { IDevice } from "../types";
import { motion } from "framer-motion";
import { IActionButton } from "../bff/types";
import {
    Box,
    Card,
    CardBody,
    CardFooter,
    Flex,
    Heading,
    HStack,
    Image,
} from "@chakra-ui/react";

interface Props {
    device: IDevice;
    href?: string;
    actionButtons: IActionButton[];
    onDeviceClick?: () => void;
}

interface IDeviceIconProps {
    type: string;
    onClick: () => void;
    fontSize?: string;
}

const DeviceItem = memo(
    ({ device, href = "", actionButtons, onDeviceClick }: Props) => {
        const MotionCard = motion(Card);
        const ActionIcon = ({
            type,
            onClick,
            fontSize = "64px",
        }: IDeviceIconProps): JSX.Element => {
            return (
                <div
                    className="flex justify-center items-center"
                    onClick={onClick}
                >
                    <Icons
                        iconType={type}
                        fontSize={fontSize}
                        className="text-primary"
                    />
                </div>
            );
        };

        return (
            <MotionCard
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                layout
                direction={{ base: "column", sm: "row" }}
                overflow="hidden"
                variant="outline"
                onClick={onDeviceClick}
            >
                <HStack
                    w="full"
                    pl="45px"
                    borderRadius="lg"
                    border="1px"
                    borderColor="dark.500"
                >
                    <Link className="flex grow items-center" href={href}>
                        <Box>
                            <Image
                                src={
                                    deviceIcons[
                                        device.deviceTypes[0]
                                            ?.name as keyof typeof deviceIcons
                                    ] ||
                                    "/assets/icons/devices/devices_default.png"
                                }
                                alt={device.deviceTypes[0]?.name}
                                fit="contain"
                                htmlWidth="150px"
                            />
                        </Box>
                        <CardBody ml="12px">
                            <Heading size="md" my="0px">
                                {device.manufacturers
                                    .map((manufacturer) => manufacturer.name)
                                    .join(", ")}
                            </Heading>

                            <Box fontSize="52px">{device.title}</Box>

                            <Box fontSize="32px">
                                {device.deviceTypes[0]?.name}
                            </Box>
                        </CardBody>
                    </Link>

                    <CardFooter h="full">
                        <Flex
                            justifyContent="space-between"
                            direction="column"
                            h="full"
                        >
                            {actionButtons.map((actionButton) => (
                                <ActionIcon
                                    key={actionButton.type}
                                    type={actionButton.type}
                                    fontSize="80px"
                                    onClick={() => {
                                        actionButton.onClick();
                                    }}
                                />
                            ))}
                        </Flex>
                    </CardFooter>
                </HStack>
            </MotionCard>
        );
    },
    (prevProps, nextProps) => {
        return prevProps.device === nextProps.device;
    }
);

DeviceItem.displayName = "DeviceItem";

export default DeviceItem;
