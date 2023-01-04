import { FormFactor } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

type Data = {
    formFactor: FormFactor;
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
        const formFactor = req.body;
        const savedFormFactor = await prisma?.formFactor.create({
            data: formFactor,
        });
        if (savedFormFactor) {
            res.status(200).json({ formFactor: savedFormFactor });
        }
    } catch (error) {
        res.status(400).json({
            message: "Server error. Something went wrong.",
        });
    }
}
