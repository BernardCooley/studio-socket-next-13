import { devicesInclude } from "./includes";
import { IFetchDevicesBody, IOrderBy } from "./types";
import { buildQuery, fetchWithErrorHandling } from "./utils";

export interface IRequestOptions {
    skip: number;
    limit: number | null;
    filters: any;
    andOr: "AND" | "OR" | "";
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

export const fetchDeviceById = async (id: string) => {
    return fetchWithErrorHandling(`/api/getDeviceById`, "POST", { id: id });
};

export const updateUserProfile = async (
    userId: string,
    updateData: { [key: string]: string }
) => {
    return fetchWithErrorHandling("./api/auth/updateUserProfile", "POST", {
        userId: userId,
        updateData: updateData,
    });
};

export const getUserProfile = async (userId: string) => {
    return fetchWithErrorHandling(`./api/auth/getUserProfile`, "POST", {
        userId,
    });
};

export const changePassword = async (email: string) => {
    return fetchWithErrorHandling(`./api/auth/passwordReset`, "POST", {
        email,
    });
};
