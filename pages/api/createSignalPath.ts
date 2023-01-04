import { SignalPath } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

type Data = {
    signalPath: SignalPath;
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
        const signalPath = req.body;
        const savedSignalPath = await prisma?.signalPath.create({
            data: signalPath,
        });
        if (savedSignalPath) {
            res.status(200).json({ signalPath: savedSignalPath });
        }
    } catch (error) {
        res.status(400).json({
            message: "Server error. Something went wrong.",
        });
    }
}
