import { Manufacturer } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";
import signalPaths from "../../restoreDBData/signalPaths.json";
import manufacturers from "../../restoreDBData/manufacturers.json";
import formFactors from "../../restoreDBData/formFactors.json";
import deviceTypes from "../../restoreDBData/deviceTypes.json";
import connectors from "../../restoreDBData/connectors.json";
import connectionDescriptions from "../../restoreDBData/connectionDescriptions.json";
import allDevices from "../../restoreDBData/all-devices.json";

type Error = {
    message: string;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Manufacturer[] | Error>
) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    const getConnectionData = async () => {
        await prisma?.connector.createMany({
            data: connectors,
        });
        const allConnectors = await prisma?.connector.findMany();

        await prisma?.connectionDescription.createMany({
            data: connectionDescriptions,
        });
        const allConnectionDescriptions =
            await prisma?.connectionDescription.findMany();

        const getConnections = async () => {
            return Array.from(allDevices as [])
                .filter((device: any) => device.connections)
                .map((dev: any) => {
                    return dev.connections.map((connection: any) => {
                        const connector = allConnectors?.find(
                            (connector) =>
                                connector.name === connection.connector
                        );

                        const connectorDescription =
                            allConnectionDescriptions?.filter((descriptions) =>
                                connection.description?.includes(
                                    descriptions.name
                                )
                            );

                        const conns = connectorDescription?.map((c) => {
                            if (c.id) {
                                return {
                                    id: c.id,
                                };
                            }
                            return null;
                        });

                        const ggg = {
                            name: connection.name,
                        };

                        // if (connector && connector.id) {
                        //     ggg["connector"] = {
                        //         connect: {
                        //             id: connector.id,
                        //         },
                        //     };
                        // } else {
                        //     ggg["connector"] = "undefined";
                        // }

                        // if (conns && conns.length > 0) {
                        //     ggg["description"] = {
                        //         connect: conns,
                        //     };
                        // }

                        // ggg["deviceId"] = dev.id;

                        return ggg;
                    });
                });
        };

        const data = await getConnections();

        return data.flat();
    };

    const writeConnections = async (connections: any) => {
        const promises = connections.map(async (element: any) => {
            return await prisma?.connection.create({
                data: element,
            });
        });

        const resolve = (values: any) => {
            res.status(200).json({
                message: "Data was created successfully",
            });
        };

        Promise.all(promises).then((values) => {
            resolve(values);
        });
    };

    const writeDevices = async () => {
        await prisma?.signalPath.createMany({
            data: signalPaths,
        });
        const allSignalPaths = await prisma?.signalPath.findMany();

        await prisma?.manufacturer.createMany({
            data: manufacturers,
        });
        const allManufacturers = await prisma?.manufacturer.findMany();

        await prisma?.formFactor.createMany({
            data: formFactors,
        });
        const allFormFactors = await prisma?.formFactor.findMany();

        await prisma?.deviceType.createMany({
            data: deviceTypes,
        });
        const allDeviceTypes = await prisma?.deviceType.findMany();

        const allConnections = await prisma?.connection.findMany();

        const dataArray = Array.from(allDevices as []).map((device: any) => {
            const signalPath = allSignalPaths?.find(
                (signalPath) => signalPath.name === device.signal_path
            );

            const mans = allManufacturers?.filter((manufacturer) =>
                device.manufacturers.includes(manufacturer.name)
            );
            const man = mans?.map((m) => {
                return {
                    id: m.id,
                };
            });

            const form = allFormFactors?.find(
                (formFactor) => formFactor.name === device.form_factor
            );

            const devs = allDeviceTypes?.filter((deviceType) =>
                device.deviceTypes.includes(deviceType.name)
            );
            const dev = devs?.map((d) => {
                return {
                    id: d.id,
                };
            });

            const conn = allConnections?.filter(
                (connection) => connection.deviceId === device.id.toString()
            );

            const conns = conn?.map((c) => {
                return {
                    id: c.id,
                };
            });

            const ggg = {
                title: device.title,
                datesProduced: device.dates_produced,
                countryOfManufacturer: device.country_of_manufacture,
                slug: device.slug,
            };

            // if (man && man.length > 0) {
            //     ggg["manufacturers"] = {
            //         connect: man,
            //     };
            // }

            // if (dev && dev.length > 0) {
            //     ggg["deviceTypes"] = {
            //         connect: dev,
            //     };
            // }

            // if (conns && conns.length > 0) {
            //     ggg["connections"] = {
            //         connect: conns,
            //     };
            // }

            // if (signalPath) {
            //     ggg["signalPath"] = {
            //         connect: {
            //             id: signalPath.id,
            //         },
            //     };
            // }

            // if (form) {
            //     ggg["formFactor"] = {
            //         connect: {
            //             id: form.id,
            //         },
            //     };
            // }

            // ggg["deviceId"] = device.id;

            return ggg;
        });

        const uuu = sliceIntoChunks(Array.from(new Set(dataArray)), 2000);

        const promises1 = uuu.map((arr: any) => {
            return arr.map(async (element: any) => {
                return await prisma?.device.create({
                    data: element,
                });
            });
        });

        const resolve = (values: any) => {
            res.status(200).json({
                message: "Data was created successfully",
            });
        };

        promises1.forEach((promiseArray) => {
            Promise.all(promiseArray).then((values) => {
                resolve(values);
            });
        });
    };

    try {
        await writeConnections(await getConnectionData());

        await writeDevices();

        res.status(200).json({
            message: "Data was created successfully",
        });
    } catch (error) {
        res.status(400).json({
            message: "Server error. Something went wrong.",
        });
    }
}

const sliceIntoChunks = (arr: any, chunkSize: number) => {
    const res = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
        const chunk = arr.slice(i, i + chunkSize);
        res.push(chunk);
    }
    return res;
};
