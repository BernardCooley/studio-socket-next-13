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
        const formFactor = await prisma?.formFactor.findUnique({
            where: {
                id: req.body.id,
            },
            include: {
                devices: true,
            },
        });
        if (formFactor) {
            res.status(200).json(formFactor.devices);
        }
    } catch (error) {
        res.status(400).json({
            message: "Server error. Something went wrong.",
        });
    }
}
