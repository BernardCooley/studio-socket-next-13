import { Studio } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

type Error = {
    message: string;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Studio[] | Error>
) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    const user = await prisma?.user.findUnique({
        where: {
            userId: req.body.userId,
        },
    });

    if (req.body.userId) {
        req.body.body = {
            where: {
                userId: user?.id,
            },
        };
    }

    try {
        const studio = await prisma?.studio.findMany(req.body.body);
        if (studio) {
            res.status(200).json(studio);
        }
    } catch (error) {
        res.status(400).json({
            message: "Server error. Something went wrong.",
        });
    }
}
