import { AxiosResponse } from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
const axios = require("axios");

type Error = {
    message: string;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any | Error>
) {
    if (req.method !== "DELETE") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    var options = {
        method: "POST",
        url: `${process.env.AUTH0_ISSUER_BASE_URL}/oauth/token`,
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: new URLSearchParams({
            grant_type: "client_credentials",
            client_id: process.env.AUTH0_MACHINE_CLIENT_ID || "",
            client_secret: process.env.AUTH0_MACHINE_CLIENT_SECRET || "",
            audience: `${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/`,
        }),
    };

    axios
        .request(options)
        .then(async (response: AxiosResponse) => {
            deleteUser(response.data.access_token);
        })
        .catch(() => {
            res.status(400).json({
                message: "Server error. Something went wrong.",
            });
        });

    const deleteUser = async (accessToken: string) => {
        var options = {
            method: "DELETE",
            url: `${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/connections/${process.env.AUTH0_DATABASE_CONNECTION_ID}/users?email=${req.body.email}`,
            headers: {
                "content-type": "application/json",
                authorization: `Bearer ${accessToken}`,
            },
        };

        axios
            .request(options)
            .then(async (response: AxiosResponse) => {
                res.status(200).json(response.data);
            })
            .catch((error) => {
                res.status(400).json({
                    message: "Server error. Something went wrong.",
                });
            });
    };
}