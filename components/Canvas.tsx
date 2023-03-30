/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useEffect, useState } from "react";
import createEngine, {
    DefaultLinkModel,
    DefaultNodeModel,
    DefaultPortModel,
    DiagramModel,
} from "@projectstorm/react-diagrams";
import { CanvasWidget } from "@projectstorm/react-canvas-core";
import { createCanvasNode, createNodeLink } from "../utils";
import { fetchDevices, IRequestOptions } from "../bff/requests";
import { IDevice } from "../types";
import { useSession } from "next-auth/react";

interface Props {}

interface NodesAndPorts {
    deviceId: string;
    node: DefaultNodeModel;
    port: DefaultPortModel;
}

const Canvas = ({}: Props) => {
    const { data: user } = useSession();
    const engine = createEngine();
    const links: DefaultLinkModel[] = [];
    const [devices, setDevices] = useState<IDevice[] | null>(null);
    const [nodesAndPorts, setNodesAndPorts] = useState<NodesAndPorts[]>([]);

    useEffect(() => {
        if (user) {
            getDevices(user.user.id);
        }
    }, [user]);

    useEffect(() => {
        if (devices) {
            const n: NodesAndPorts[] = [];
            devices.forEach((device) => {
                n.push(
                    createCanvasNode(
                        device.manufacturers[0].name,
                        device.id,
                        "rgb(0,192,255)",
                        randomNumber(0, 350),
                        randomNumber(0, 700),
                        device.title
                    )
                );
            });
            setNodesAndPorts(n);
        }
    }, [devices]);

    const randomNumber = (min: number, max: number) => {
        return Math.floor(Math.random() * (max - min + 1) + min);
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

    const getPort = (deviceId: string) => {
        return nodesAndPorts.filter((n: any) => n.deviceId === deviceId)[0]
            ?.port;
    };

    const model = new DiagramModel();

    model.addAll(...nodesAndPorts.map((n) => n.node), ...links);
    engine.repaintCanvas();

    engine.setModel(model);

    return <CanvasWidget engine={engine} />;
};

export default Canvas;
