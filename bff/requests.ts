import { devicesInclude } from "./includes";
import { IFetchDevicesBody, IOrderBy } from "./types";
import { buildQuery, fetchWithErrorHandling } from "./utils";

export const fetchDevices = async (
    limit: number | null = null,
    filters: any = null,
    andOr: "AND" | "OR" = "OR",
    orderBy: IOrderBy[] | null = null
) => {
    const body: IFetchDevicesBody = {
        select: devicesInclude,
    };

    return fetchWithErrorHandling(
        `/api/getDevices`,
        "POST",
        buildQuery(body, limit, filters, andOr, orderBy)
    );
};
