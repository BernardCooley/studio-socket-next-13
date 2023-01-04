import { User } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

type Error = {
    message: string;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<User[] | Error>
) {
    if (req.method !== "GET") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    try {
        const device = await prisma?.device.findUnique({
            where: {
                id: req.body.id,
            },
            include: {
                users: true,
            },
        });
        if (device) {
            res.status(200).json(device.users);
        }
    } catch (error) {
        res.status(400).json({
            message: "Server error. Something went wrong.",
        });
    }
}
