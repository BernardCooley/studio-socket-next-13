import { devicesInclude } from "./includes";
import { IFetchDevicesBody, IOrderBy } from "./types";
import { fetchWithErrorHandling } from "./utils";

export const fetchDevices = async (
    limit: number | null = null,
    filters: any = null,
    andOr: "AND" | "OR" = "OR",
    orderBy: IOrderBy[] | null = null
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

    if (orderBy && orderBy.length > 0) {
        body["orderBy"] = orderBy;
    }

    return fetchWithErrorHandling(`/api/getDevices`, "POST", body);
};
