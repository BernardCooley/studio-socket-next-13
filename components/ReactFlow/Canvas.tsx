import React from "react";
import {
    Background,
    Controls,
    Edge,
    EdgeTypes,
    MiniMap,
    NodeTypes,
    OnConnect,
    OnEdgesChange,
    OnEdgeUpdateFunc,
    OnNodesChange,
    ReactFlow,
} from "reactflow";
import { IDeviceNode } from "../../bff/types";
import { IDevice } from "../../types";
import FlowPanel from "./FlowPanel";

interface Props {
    nodes: IDeviceNode[];
    edges: Edge[];
    onNodesChange: OnNodesChange;
    onEdgesChange: OnEdgesChange;
    onConnect: OnConnect;
    onEdgeUpdate: OnEdgeUpdateFunc;
    nodeTypes: NodeTypes;
    edgeTypes: EdgeTypes;
    updateHistory: () => void;
    devicesShowing: boolean;
    devices: IDevice[] | null;
    addDevice: (device: IDevice) => void;
    setDevicesShowing: (devicesShowing: boolean) => void;
}

const Canvas = ({
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    onEdgeUpdate,
    nodeTypes,
    edgeTypes,
    updateHistory,
    devicesShowing,
    devices,
    addDevice,
    setDevicesShowing,
}: Props) => {
    return (
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
            onNodeDragStop={updateHistory}
        >
            <MiniMap />
            <Controls />
            <Background />
            <FlowPanel
                devicesShowing={devicesShowing}
                devices={devices}
                addDevice={addDevice}
                setDevicesShowing={setDevicesShowing}
            />
        </ReactFlow>
    );
};

export default Canvas;
