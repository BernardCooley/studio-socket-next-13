import { Box, Slide, UnorderedList } from "@chakra-ui/react";
import React from "react";
import { Panel } from "reactflow";
import Icons from "../../icons";
import { IDevice } from "../../types";
import DeviceItem from "../DeviceItem";

interface Props {
    devicesShowing: boolean;
    devices: IDevice[] | null;
    addDevice: (device: IDevice) => void;
    setDevicesShowing: (devicesShowing: boolean) => void;
}

const FlowPanel = ({
    devicesShowing,
    devices,
    addDevice,
    setDevicesShowing,
}: Props) => {
    return (
        <Panel position="top-left">
            <Slide
                direction="left"
                in={devicesShowing}
                style={{ zIndex: 10, marginTop: "50px" }}
            >
                <Box position="relative" w="300px">
                    <Icons
                        iconType="close"
                        className="absolute top-0 -right-5 bernard"
                        onClick={() => setDevicesShowing(false)}
                        fontSize="24px"
                    />
                    <UnorderedList
                        bg="brand.primary-light"
                        listStyleType="none"
                        p={1}
                        fontSize="2xs"
                        color="brand.primary"
                        h="500px"
                        w="300px"
                        overflowY="scroll"
                        overflowX="auto"
                        position="relative"
                    >
                        {devices &&
                            devices.map((device) => (
                                <DeviceItem
                                    actionButtons={[
                                        {
                                            type: "add",
                                            onClick: () => addDevice(device),
                                            confirmAction: "add",
                                        },
                                    ]}
                                    key={device.id}
                                    device={device}
                                />
                            ))}
                    </UnorderedList>
                </Box>
            </Slide>
            {!devicesShowing && (
                <Icons
                    iconType="chevronRight"
                    onClick={() => setDevicesShowing(!devicesShowing)}
                    fontSize="42px"
                    className="absolute top-1/2 -right-3"
                />
            )}
        </Panel>
    );
};

export default FlowPanel;
