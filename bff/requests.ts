import { devicesInclude } from "./includes";
import { IFetchDevicesBody } from "./types";
import { fetchWithErrorHandling } from "./utils";

export const fetchAllDevices = async (limit: number | null = null) => {
    const body: IFetchDevicesBody = {
        include: devicesInclude,
    };

    if (limit) {
        body["take"] = limit;
    }

    return fetchWithErrorHandling(`/api/getDevices`, "POST", body);
};
