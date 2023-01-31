// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Connection, User } from "@prisma/client";
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
    res: NextApiResponse<User | Error>
) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    let newUser: User | undefined = undefined;

    try {
        const getUser = await prisma?.user.findUnique({
            where: {
                userId: req.body.userId,
            },
        });

        if (!getUser) {
            newUser = await prisma?.user.create({
                data: {
                    userId: req.body.userId,
                },
            });
        } else {
            newUser = getUser;
        }

        if (newUser) {
            const updateUserDevice = await prisma?.user.update({
                where: {
                    id: newUser.id,
                },
                data: {
                    devices: {
                        connect: {
                            id: req.body.deviceId,
                        },
                    },
                },
            });
            if (updateUserDevice) {
                res.status(200).json(updateUserDevice);
            }
        }
    } catch (error) {
        res.status(400).json({
            message: "Server error. Something went wrong.",
        });
    }
}
