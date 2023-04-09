import { Box, Flex, Image } from "@chakra-ui/react";
import { memo } from "react";
import { deviceIcons } from "../../icons";
import { IDevice } from "../../types";
import CustomHandle from "./CustomHandle";

const DeviceNode = memo(
    (device: { data: IDevice }) => {
        return (
            <Box
                cursor="grabbing"
                border="1px"
                position="relative"
                transitionDuration="0.1s"
                transitionTimingFunction="ease-in-out"
                shadow="lg"
                borderColor="brand.primary-light"
                _hover={{
                    shadow: "2xl",
                    borderColor: "brand.primary",
                }}
                borderRadius="md"
                bg="brand.primary-light"
            >
                <Box
                    width="100%"
                    display="flex"
                    justifyContent="space-around"
                    position="absolute"
                    top="-16px"
                >
                    <CustomHandle id="a" label="Out1" type="source" />
                    <CustomHandle id="a1" label="Out" type="source" />
                </Box>
                <Flex
                    direction="column"
                    alignItems="center"
                    pointerEvents="none"
                    m={1}
                >
                    {device.data.manufacturers &&
                        device.data.manufacturers.length > 0 && (
                            <Box>{device.data.manufacturers[0].name}</Box>
                        )}
                    <Image
                        src={
                            deviceIcons[
                                device.data.deviceTypes[0]
                                    ?.name as keyof typeof deviceIcons
                            ] || "/assets/icons/devices/devices_default.png"
                        }
                        alt={device.data.deviceTypes[0]?.name}
                        fit="contain"
                        htmlWidth="50px"
                    />

                    <Box maxW="300px" textAlign="center">
                        {device.data.title}
                    </Box>
                </Flex>
                <Box
                    width="100%"
                    display="flex"
                    justifyContent="space-around"
                    position="absolute"
                    bottom="-16px"
                >
                    <CustomHandle id="b" label="In" type="target" />
                    <CustomHandle id="b1" label="In" type="target" />
                    <CustomHandle id="b2" label="In" type="target" />
                </Box>
            </Box>
        );
    },
    (prevProps, nextProps) => {
        return prevProps.data === nextProps.data;
    }
);

DeviceNode.displayName = "DeviceNode";

export default DeviceNode;
