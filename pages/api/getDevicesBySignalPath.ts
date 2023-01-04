import { Device } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

type Error = {
    message: string;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Device[] | Error>
) {
    if (req.method !== "GET") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    try {
        const signalPath = await prisma?.signalPath.findUnique({
            where: {
                id: req.body.id,
            },
            include: {
                devices: true,
            },
        });
        if (signalPath) {
            res.status(200).json(signalPath.devices);
        }
    } catch (error) {
        res.status(400).json({
            message: "Server error. Something went wrong.",
        });
    }
}
