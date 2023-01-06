import { devicesInclude } from "./includes";
import { IFetchDevicesBody } from "./types";
import { fetchWithErrorHandling } from "./utils";

export const fetchDevices = async (
    limit: number | null = null,
    filters: any = null,
    andOr: "AND" | "OR" = "OR"
) => {
    const body: IFetchDevicesBody = {
        select: devicesInclude,
    };

    if (limit) {
        body["take"] = limit;
    }

    if (filters && andOr === "OR") {
        body["where"] = {
            OR: filters,
        };
    } else if (filters && andOr === "AND") {
        body["where"] = {
            AND: filters,
        };
    }

    return fetchWithErrorHandling(`/api/getDevices`, "POST", body);
};
