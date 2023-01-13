import { getDownloadURL, getStorage, ref } from "firebase/storage";
import type { NextApiRequest, NextApiResponse } from "next";
import { IFirebaseImage } from "../../types";

type Error = {
    message: string;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<IFirebaseImage | Error | null>
) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    try {
        const storage = getStorage();

        const pathReference = ref(
            storage,
            `${req.body.folder}/${req.body.id}.${req.body.extension}`
        );

        try {
            const url = await getDownloadURL(pathReference);
            res.status(200).json({
                url,
                name: `${req.body.id}.${req.body.extension}`,
            });
        } catch (err) {
            res.status(200).json(null);
        }
    } catch (error) {
        res.status(400).json({
            message: "Server error. Something went wrong.",
        });
    }
}
