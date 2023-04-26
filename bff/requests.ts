import { Studio } from "@prisma/client";
import { devicesInclude } from "./includes";
import {
    AndOr,
    IConnector,
    IFetchDevicesBody,
    IOrderBy,
    ISearchQuery,
} from "./types";
import { buildQuery, fetchWithErrorHandling } from "./utils";

export interface IRequestOptions {
    skip: number;
    limit: number | null;
    filters: any;
    andOr: AndOr | "";
    orderBy: IOrderBy[] | null;
    userId?: string | null;
    searchQuery?: ISearchQuery[] | null;
}

export const fetchDevices = async ({
    skip = 0,
    limit = null,
    filters = null,
    andOr = "OR",
    orderBy = null,
    userId = null,
    searchQuery = null,
}: IRequestOptions) => {
    const body: IFetchDevicesBody = {
        skip: skip,
        select: devicesInclude,
    };

    return fetchWithErrorHandling(`/api/getDevices`, "POST", {
        body: buildQuery(body, limit, filters, andOr, orderBy),
        userId: userId,
        searchQuery: searchQuery,
    });
};

export const fetchDeviceById = async (id: string) => {
    return fetchWithErrorHandling(`/api/getDeviceById`, "POST", { id: id });
};

export const updateUserProfile = async (
    userId: string,
    updateData: { [key: string]: string | boolean }
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

export const deleteUser = async (email: string) => {
    return fetchWithErrorHandling(`./api/auth/deleteUser`, "DELETE", {
        email,
    });
};

export const fetchDeviceTypes = async () => {
    return fetchWithErrorHandling(`/api/getDeviceTypes`, "GET");
};

export const fetchConnectors = async () => {
    return fetchWithErrorHandling<IConnector[]>(`/api/getConnectors`, "GET");
};

export const fetchFormFactors = async () => {
    return fetchWithErrorHandling(`/api/getFormFactors`, "GET");
};

export const addDeviceToUser = async (userId: string, deviceId: string) => {
    return fetchWithErrorHandling(`/api/addDeviceToUser`, "POST", {
        userId: userId,
        deviceId: deviceId,
    });
};

export const removeDeviceFromUser = async (
    userId: string,
    deviceId: string
) => {
    return fetchWithErrorHandling(`/api/removeDeviceFromUser`, "POST", {
        userId: userId,
        deviceId: deviceId,
    });
};

export const createStudio = async (studio: Studio) => {
    return fetchWithErrorHandling(`/api/createStudio`, "POST", { studio });
};

export const fetchStudios = async (userId: string) => {
    return fetchWithErrorHandling(`/api/getStudios`, "POST", { userId });
};

export const updateStudio = async (studio: Studio) => {
    return fetchWithErrorHandling(`/api/updateStudio`, "POST", { studio });
};
