import { Studio } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

type Data = {
    studio: Studio;
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
        const newStudio = req.body;
        const savedStudio = await prisma?.studio.update({
            where: {
                id: newStudio.studio.id,
            },
            data: {
                id: newStudio.studio.id,
                name: newStudio.studio.name,
                layout: newStudio.studio.layout,
                userId: newStudio.studio.userId,
            },
        });
        if (savedStudio) {
            res.status(200).json({ studio: savedStudio });
        }
    } catch (error) {
        res.status(400).json({
            message: "Server error. Something went wrong.",
        });
    }
}
