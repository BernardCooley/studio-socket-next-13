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
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    if (req.body.userId) {
        req.body.body = {
            ...req.body.body,
            where: {
                ...req.body.body.where,
                users: {
                    some: {
                        userId: req.body.userId,
                    },
                },
            },
        };
    }

    if (req.body.searchQuery && req.body.searchQuery.length > 0) {
        req.body.body = {
            ...req.body.body,
            where: {
                ...req.body.body.where,
                ...req.body.searchQuery[0],
            },
        };
    }

    try {
        const devices = await prisma?.device.findMany(req.body.body);
        if (devices) {
            res.status(200).json(devices);
        }
    } catch (error) {
        res.status(400).json({
            message: "Server error. Something went wrong.",
        });
    }
}
