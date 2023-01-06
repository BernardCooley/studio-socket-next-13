import { devicesInclude } from "./includes";
import { IFetchDevicesBody, IOrderBy } from "./types";
import { buildQuery, fetchWithErrorHandling } from "./utils";

export interface IRequestOptions {
    skip: number;
    limit: number | null;
    filters: any;
    andOr: "AND" | "OR";
    orderBy: IOrderBy[] | null;
}

export const fetchDevices = async ({
    skip = 0,
    limit = null,
    filters = null,
    andOr = "OR",
    orderBy = null,
}: IRequestOptions) => {
    const body: IFetchDevicesBody = {
        skip: skip,
        select: devicesInclude,
    };

    return fetchWithErrorHandling(
        `/api/getDevices`,
        "POST",
        buildQuery(body, limit, filters, andOr, orderBy)
    );
};
