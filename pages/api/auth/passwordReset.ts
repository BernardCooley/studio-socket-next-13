import type { NextApiRequest, NextApiResponse } from "next";
const axios = require("axios");

type Error = {
    message: string;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any | Error>
) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    const body = {
        client_id: process.env.AUTH0_MACHINE_CLIENT_ID || "",
        email: req.body.email,
        connection: process.env.AUTH0_DATABASE_CONNECTION_NAME || "",
    };

    var options = {
        method: "POST",
        url: `${process.env.AUTH0_ISSUER_BASE_URL}/dbconnections/change_password`,
        headers: { "content-type": "application/json" },
        data: JSON.stringify(body),
    };

    axios
        .request(options)
        .then(async () => {
            res.status(200).json({
                message: `A password reset email has been sent to ${req.body.email}. Please check your inbox and follow the instructions to reset your password.`,
            });
        })
        .catch(() => {
            res.status(400).json({
                message: "Server error. Something went wrong.",
            });
        });
}
