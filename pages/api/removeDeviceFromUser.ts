// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Connection, User } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

type Data = {
    connection: Connection;
};

type Error = {
    message: string;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<User | Error>
) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    try {
        const removeDevice = await prisma?.user.update({
            where: {
                userId: req.body.userId,
            },
            data: {
                devices: {
                    disconnect: [{ id: req.body.deviceId }],
                },
            },
        });
        if (removeDevice) {
            res.status(200).json(removeDevice);
        }
    } catch (error) {
        console.log("🚀 ~ file: removeDeviceFromUser.ts:37 ~ error", error);
        res.status(400).json({
            message: "Server error. Something went wrong.",
        });
    }
}
