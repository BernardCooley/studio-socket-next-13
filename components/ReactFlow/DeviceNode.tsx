import { Box, Flex, Image } from "@chakra-ui/react";
import { memo } from "react";
import { Handle, Position } from "reactflow";
import { deviceIcons } from "../../icons";
import { IDevice } from "../../types";

const handleAStyle = { top: -5, width: "20px", height: "20px" };
const handleBStyle = { bottom: -5, width: "20px", height: "20px" };

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
                _hover={{
                    shadow: "2xl",
                    transform: "scale(1.05)",
                }}
                borderRadius="md"
                bg="brand.primary-light"
            >
                <Box position="absolute" top={-3} right="50%" fontSize="2xs">
                    in
                </Box>
                <Handle
                    type="source"
                    position={Position.Bottom}
                    id="a"
                    isConnectable={true}
                    style={handleAStyle}
                />
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
                <Handle
                    type="target"
                    position={Position.Bottom}
                    id="b"
                    isConnectable={true}
                    style={handleBStyle}
                />
                <Box position="absolute" bottom={-3} right="50%" fontSize="2xs">
                    out
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
