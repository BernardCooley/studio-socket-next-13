/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Box, Slide } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import React, { useEffect, useMemo, useState } from "react";
import { useCallback } from "react";
import ReactFlow, {
    MiniMap,
    Controls,
    Background,
    useNodesState,
    useEdgesState,
    addEdge,
    Panel,
    updateEdge,
    Edge,
    Connection,
    BezierEdge,
} from "reactflow";
import { UnorderedList } from "@chakra-ui/react";
import "reactflow/dist/style.css";
import { fetchDevices, IRequestOptions } from "../../../../bff/requests";
import { IDevice } from "../../../../types";
import DeviceNode from "../../../../components/DeviceNode";
import { IDeviceNode } from "../../../../bff/types";
import DeviceItem from "../../../../components/DeviceItem";
import Icons from "../../../../icons";
import { defaultNodes, defaultEdges } from "../../../../testData/testData";
import { generateRandomString } from "../../../../utils";

interface Studio {
    nodes: IDeviceNode[];
    edges: Edge[];
}

interface Props {}

const Studios = ({}: Props) => {
    const nodeTypes = useMemo(
        () => ({
            deviceNode: DeviceNode,
        }),
        []
    );
    const edgeTypes = useMemo(
        () => ({
            default: BezierEdge,
        }),
        []
    );
    const { data: user } = useSession();
    const [nodes, setNodes, onNodesChange] = useNodesState(defaultNodes as any);
    const [edges, setEdges, onEdgesChange] = useEdgesState(defaultEdges);
    const [devices, setDevices] = useState<IDevice[] | null>(null);
    const [devicesShowing, setDevicesShowing] = useState(false);
    const [currentStudio, setCurrentStudio] = useState<Studio | null>(null);

    useEffect(() => {
        if (user) {
            getDevices(user.user.id);
        }
    }, [user]);

    useEffect(() => {
        console.log("get edges");
        setCurrentStudio({
            nodes: nodes as IDeviceNode[],
            edges: edges,
        });
    }, [edges]);

    const getNodes = () => {
        console.log("get nodes");
        setCurrentStudio({
            nodes: nodes as IDeviceNode[],
            edges: edges,
        });
    };

    const randomNumber = (min: number, max: number) => {
        return Math.floor(Math.random() * (max - min) + min);
    };

    const getRequestOptions = (
        skip: number | null,
        userId: string | null
    ): IRequestOptions => {
        return {
            skip: skip ? skip : 0,
            limit: 50,
            filters: [],
            andOr: "AND",
            orderBy: [],
            userId,
            searchQuery: [],
        };
    };

    const getDevices = async (userId: string | null) => {
        const requestBody = getRequestOptions(null, userId);
        const devices = (await fetchDevices(requestBody)) as IDevice[];
        if (devices) {
            setDevices(devices);
        }
    };

    const onConnect = useCallback(
        (params: any) => setEdges((eds) => addEdge(params, eds)),
        [setEdges]
    );

    const onEdgeUpdate = useCallback(
        (oldEdge: Edge, newConnection: Connection) =>
            setEdges((els) => updateEdge(oldEdge, newConnection, els)),
        []
    );

    const addDevice = (device: IDevice) => {
        const nodeIds = nodes.map((node) => node.id.split("-")[0]);

        let nodeId = generateRandomString(25);

        while (nodeIds.includes(nodeId)) {
            nodeId = generateRandomString(25);
        }

        const newNode: IDeviceNode = {
            id: `${nodeId}-${device.id}`,
            position: {
                x: randomNumber(0, 350),
                y: randomNumber(0, 750),
            },
            type: "deviceNode",
            data: device,
            targetPosition: "left",
            sourcePosition: "right",
        };
        setNodes((nodes) => [...nodes, newNode as any]);
        setDevicesShowing(false);
    };

    return (
        <Box pt="50px" w="100vw" h="100vh" bg="brand.primary-light-border">
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onEdgeUpdate={onEdgeUpdate}
                fitView
                nodeTypes={nodeTypes}
                edgeTypes={edgeTypes}
                defaultEdgeOptions={{
                    label: "test",
                    labelStyle: {
                        fontSize: 32,
                    },
                    labelBgStyle: {
                        fill: "transparent",
                    },
                    style: {
                        stroke: "black",
                    },
                    markerStart: "arrow",
                    markerEnd: "arrow",
                }}
                onNodeDragStop={getNodes}
                elevateNodesOnSelect
            >
                <MiniMap />
                <Controls />
                <Background />
                <Panel position="top-left">
                    <Slide
                        direction="left"
                        in={devicesShowing}
                        style={{ zIndex: 10, marginTop: "50px" }}
                    >
                        <Box position="relative">
                            <UnorderedList
                                bg="brand.primary-light"
                                listStyleType="none"
                                p={1}
                                fontSize="2xs"
                                color="brand.primary"
                                h="500px"
                                w="300px"
                                overflow="scroll"
                            >
                                {devices &&
                                    devices.map((device) => (
                                        <DeviceItem
                                            actionButtons={[
                                                {
                                                    type: "add",
                                                    onClick: () =>
                                                        addDevice(device),
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
            </ReactFlow>
        </Box>
    );
};

export default Studios;
