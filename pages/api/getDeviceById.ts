import { Device } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

type Error = {
    message: string;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Device | Error>
) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    try {
        const device = await prisma?.device.findUnique({
            where: {
                id: req.body.id,
            },
            include: {
                connections: {
                    include: {
                        connector: true,
                        description: true,
                        devices: true,
                    },
                },
                manufacturers: true,
                deviceTypes: true,
                users: true,
                formFactor: true,
                signalPath: true,
            },
        });
        if (device) {
            res.status(200).json(device);
        }
    } catch (error) {
        res.status(400).json({
            message: "Server error. Something went wrong.",
        });
    }
}
