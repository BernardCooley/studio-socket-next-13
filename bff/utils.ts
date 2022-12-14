import { IFetchDevicesBody, IOrderBy } from "./types";

export class GoneError extends Error {
    statusCode = 410;
}
export class NotFoundError extends Error {
    statusCode = 404;
}
export class BadRequestError extends Error {
    statusCode = 400;
}
export class UnauthorisedError extends Error {
    statusCode = 401;
}
export class InternalError extends Error {
    statusCode = 500;
}

export const handleFetchErrors = (response: Response) => {
    switch (response.status) {
        case 401:
            throw new UnauthorisedError(response.statusText);
        case 400:
            throw new BadRequestError(response.statusText);
        case 404:
            throw new NotFoundError(response.statusText);
        case 410:
            throw new GoneError(response.statusText);
        default:
            null;
    }
};

export const fetchWithErrorHandling = async <T>(
    input: RequestInfo,
    method: "GET" | "POST" | "PUT" | "DELETE",
    body: any
) => {
    try {
        const res = await fetch(input, {
            method: method,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });
        if (res.ok) {
            return (await res.json()) as T;
        }
        handleFetchErrors(res);
    } catch (e) {
        throw e;
    }
    return null;
};

export const buildQuery = (
    body: IFetchDevicesBody,
    limit: number | null = null,
    filters: any = null,
    andOr: "AND" | "OR" = "OR",
    orderBy: IOrderBy[] | null = null
) => {
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

    return body;
};
