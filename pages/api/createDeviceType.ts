import { DeviceType } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

type Data = {
    deviceType: DeviceType;
};

type Error = {
    message: string;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data | Error>
) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    try {
        const deviceType = req.body;
        const savedDeviceType = await prisma?.deviceType.create({
            data: deviceType,
        });
        if (savedDeviceType) {
            res.status(200).json({ deviceType: savedDeviceType });
        }
    } catch (error) {
        res.status(400).json({
            message: "Server error. Something went wrong.",
        });
    }
}
