import { Manufacturer } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

type Data = {
    manufacturer: Manufacturer;
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
        const manufacturer = req.body;
        const savedManufacturer = await prisma?.manufacturer.create({
            data: manufacturer,
        });
        if (savedManufacturer) {
            res.status(200).json({ manufacturer: savedManufacturer });
        }
    } catch (error) {
        res.status(400).json({
            message: "Server error. Something went wrong.",
        });
    }
}
