import { Manufacturer } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

type Error = {
    message: string;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Manufacturer[] | Error>
) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    console.log("========================================================");
    try {
        const data = req.body;
        console.log("🚀 ~ file: populateDB.ts:20 ~ data", data.length);

        const promises = data.map(async (element: any) => {
            return await prisma?.device.create({
                data: element,
            });
        });
        console.log(
            "🚀 ~ file: populateDB.ts:26 ~ promises ~ promises",
            promises.length
        );

        console.log(data.length === promises.length);

        const resolve = (values: any) => {
            console.log(
                "++++++++++++++++++++++++++++++++++++++++++++++++++++++++++"
            );
            console.log(values.length);
            res.status(200).json({
                message: "Data was created successfully",
            });
        };

        if (data.length === promises.length) {
            console.log("processing");
            Promise.all(promises).then((values) => {
                resolve(values);
            });
        } else {
            console.log("length not equal");
        }

        // data.forEach(async (element: any) => {
        //     console.log(element);

        //     const savedData = await prisma?.connection.create({
        //         data: element,
        //     });
        // });

        // const data = req.body;
        // const savedData = await prisma?.$transaction([
        //     prisma?.connection.createMany({ data: data }),
        // ]);

        // console.log("🚀 ~ file: populateDB.ts:19 ~ data", data[0].connector);
        // // const savedData = await prisma?.connection.createMany({
        // //     data: data,
        // // });
        // if (savedData) {
        //     res.status(200).json({
        //         message: "Data was created successfully",
        //     });
        // }
    } catch (error) {
        // console.log("🚀 ~ file: populateDB.ts:28 ~ error", error);
        // console.log("========================================================");
        res.status(400).json({
            message: "Server error. Something went wrong.",
        });
    }
}
