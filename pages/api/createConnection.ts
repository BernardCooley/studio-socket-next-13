// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Connection } from "@prisma/client";
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
    res: NextApiResponse<Data | Error>
) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    try {
        const connection = req.body;
        const savedConnection = await prisma?.connection.create({
            data: connection,
        });
        if (savedConnection) {
            res.status(200).json({ connection: savedConnection });
        }
    } catch (error) {
        res.status(400).json({
            message: "Server error. Something went wrong.",
        });
    }
}
