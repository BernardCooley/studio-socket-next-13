/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Box, useToast } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import React, { memo, useEffect, useMemo, useRef, useState } from "react";
import { useCallback } from "react";
import {
    useNodesState,
    useEdgesState,
    addEdge,
    updateEdge,
    Edge,
    Connection,
    Position,
    EdgeTypes,
} from "reactflow";
import "reactflow/dist/style.css";
import "reactflow/dist/style.css";
import {
    fetchDevices,
    fetchStudios,
    IRequestOptions,
    updateStudio,
} from "../../../../bff/requests";
import { IDevice } from "../../../../types";
import DeviceNode from "../../../../components/ReactFlow/DeviceNode";
import { IDeviceNode } from "../../../../bff/types";
import {
    generateRandomNumber,
    generateRandomString,
    transformNode,
} from "../../../../utils";
import { Studio } from "@prisma/client";
import { ErrorAlert } from "../../../../components/ToastAlert";
import CustomEdge from "../../../../components/ReactFlow/CustomEdge";
import Canvas from "../../../../components/ReactFlow/Canvas";

interface IStudio {
    nodes: IDeviceNode[];
    edges: Edge[];
}

interface Props {}

const Studios = memo(
    ({}: Props) => {
        // TODO: use this
        const [newEdge, setNewEdge] = useState<Edge | null>(null);
        const [isSaving, setIsSaving] = useState(false);
        const [triggerSave, setTriggerSave] = useState(false);
        const toast = useToast();
        const nodeTypes = useMemo(
            () => ({
                deviceNode: DeviceNode,
            }),
            []
        );
        const edgeTypes = useMemo(
            () => ({
                default: CustomEdge,
            }),
            []
        );
        const { data: user } = useSession();
        const [nodes, setNodes, onNodesChange] = useNodesState([]);
        const [edges, setEdges, onEdgesChange] = useEdgesState([]);
        const [devices, setDevices] = useState<IDevice[] | null>(null);
        const [devicesShowing, setDevicesShowing] = useState(false);
        const [history, setHistory] = useState<IStudio[]>([
            {
                nodes: [],
                edges: [],
            },
        ]);
        const [studioLayout, setStudioLayout] = useState<IStudio | null>(null);
        const [studio, setStudio] = useState<Studio | null>(null);
        const firstLoad = useRef<boolean>(true);

        useEffect(() => {
            if (user && firstLoad) {
                getDevices(user.user.id);
                getStudios(user.user.id);
                firstLoad.current = false;
            }
        }, [user]);

        useEffect(() => {
            if (studioLayout) {
                setNodes(studioLayout.nodes);
                setEdges(studioLayout.edges);
            }
        }, [studioLayout]);

        useEffect(() => {
            if (history) {
                storeStudioUpdates();
            }
        }, [history]);

        useEffect(() => {
            updateHistory();
        }, [edges, triggerSave]);

        const storeStudioUpdates = async () => {
            if (studio) {
                setIsSaving(true);
                try {
                    await updateStudio({
                        id: studio.id,
                        layout: JSON.stringify({
                            nodes,
                            edges,
                        }),
                        name: studio.name,
                        userId: studio.userId,
                    });
                } catch (error) {
                    console.log(error);
                    if (!toast.isActive("studio-update")) {
                        toast({
                            position: "bottom",
                            isClosable: false,
                            duration: 5000,
                            id: "studio-update",
                            render: () => (
                                <ErrorAlert
                                    title="Error"
                                    details={
                                        "Something went wrong, please check your internet connection and try again."
                                    }
                                />
                            ),
                        });
                    }
                }
            }
            setTimeout(() => {
                setIsSaving(false);
            }, 500);
        };

        const getStudios = async (userId: string) => {
            const studios = (await fetchStudios(userId)) as Studio[];
            setStudio(studios[0]);
            setStudioLayout(JSON.parse(studios[0].layout));
        };

        const updateHistory = () => {
            if (history.length > 0) {
                const oldNodes = history[history.length - 1].nodes.map(
                    (node) => {
                        return transformNode(node);
                    }
                );

                const newNodes = nodes.map((node) => {
                    return transformNode(node);
                });

                const oldEdges = history[history.length - 1].edges;

                if (
                    JSON.stringify(oldNodes) !== JSON.stringify(newNodes) ||
                    JSON.stringify(oldEdges) !== JSON.stringify(edges)
                ) {
                    setHistory((history) => [
                        ...history,
                        {
                            nodes: nodes as IDeviceNode[],
                            edges: edges,
                        },
                    ]);
                }
            }
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
            (params: any) => {
                console.log(params);
                setNewEdge(params);
                setEdges((eds) =>
                    addEdge(
                        {
                            ...params,
                            type: "default",
                            animated: true,
                            style: {
                                stroke: "blue",
                            },
                            data: {
                                label: "Out",
                                connectionType: "midi",
                            },
                        },
                        eds
                    )
                );
            },
            [setEdges]
        );

        const onEdgeUpdate = useCallback(
            (oldEdge: Edge, newConnection: Connection) =>
                setEdges((els) => updateEdge(oldEdge, newConnection, els)),
            []
        );

        // TODO: Fix this
        const addNewEdge = (params: any) => {
            setEdges((eds) =>
                addEdge(
                    {
                        ...params,
                        type: "default",
                        animated: true,
                        style: {
                            stroke: "blue",
                        },
                        data: {
                            label: "Out",
                            connectionType: "midi",
                        },
                    },
                    eds
                )
            );
        };

        const addDevice = (device: IDevice) => {
            const nodeIds = nodes.map((node) => node.id);

            let nodeId = generateRandomString(25);

            while (nodeIds.includes(nodeId)) {
                nodeId = generateRandomString(25);
            }

            const newNode: IDeviceNode = {
                id: nodeId,
                position: {
                    x: generateRandomNumber(0, 350),
                    y: generateRandomNumber(0, 750),
                },
                type: "deviceNode",
                data: device,
                targetPosition: Position.Left,
                sourcePosition: Position.Right,
            };
            setNodes((nodes) => [...nodes, newNode as IDeviceNode]);
            setTriggerSave(!triggerSave);
            setDevicesShowing(false);
        };

        return (
            <Box
                position="relative"
                pt="50px"
                w="100vw"
                h="100vh"
                bg="brand.primary-light-border"
            >
                {isSaving && (
                    <Box fontSize="2xs" position="absolute" right={1} top={6}>
                        Saving...
                    </Box>
                )}
                <Canvas
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    onEdgeUpdate={onEdgeUpdate}
                    nodeTypes={nodeTypes}
                    edgeTypes={edgeTypes as EdgeTypes}
                    updateHistory={updateHistory}
                    devicesShowing={devicesShowing}
                    devices={devices}
                    addDevice={addDevice}
                    setDevicesShowing={setDevicesShowing}
                />
            </Box>
        );
    },
    (prevProps, nextProps) => {
        return prevProps === nextProps;
    }
);

Studios.displayName = "Studios";

export default Studios;
