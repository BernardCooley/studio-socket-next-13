import { ReadonlyURLSearchParams } from "next/navigation";
import { IOrderBy, ISearchQuery, QueryParam } from "./bff/types";
import { defaultSortList } from "./consts";
import {
    FilterKeys,
    FormMessage,
    FormMessageTypes,
    SelectOption,
} from "./types";

export const getErrorMessages = (errors: any, fieldName: string): string[] => {
    if (!errors || errors.length === 0) return [];
    return errors
        .filter(
            (error: any) =>
                error.path.filter((path: string) => path === fieldName).length >
                0
        )
        .map((error: any) => error.message);
};

export const trimFileExtension = (filename: string): string => {
    return filename.substring(0, filename.lastIndexOf(".")) || filename;
};

export const noop = () => {};

export const imageToBase65 = (
    image: File
): Promise<string | ArrayBuffer | null> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onloadend = () => {
            resolve(reader?.result);
        };
        reader.onerror = (error) => reject(error);
    });
};

export const shallowEqual = (object1: any, object2: any) => {
    const keys1 = Object.keys(object1);
    const keys2 = Object.keys(object2);
    if (keys1.length !== keys2.length) {
        return false;
    }
    for (let key of keys1) {
        if (object1[key] !== object2[key]) {
            return false;
        }
    }
    return true;
};

export const getSelectionOptions = (options: string[]): SelectOption[] => {
    const defaultOption = [{ value: "", label: "None" }];
    const opts = options.map((o) => {
        return {
            value: o,
            label: o,
        };
    });
    return [...defaultOption, ...opts];
};

export const noopPromise = (): Promise<{ [key: string]: string } | null> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                message: "Noop",
            });
        }, 2000);
    });
};

export const getDialogMessages = (actionType: string): FormMessage | null => {
    let message = null;
    switch (actionType) {
        case "remove":
            message = {
                headerText: "Remove Device",
                bodyText: "Are you sure you want to remove this device?",
                type: FormMessageTypes.WARNING,
                actionType: "remove",
                successMessage: "Device removed successfully",
            };
            break;
        case "add":
            message = {
                headerText: "Add device to your library",
                bodyText: "Are you sure you want to add this device?",
                type: FormMessageTypes.WARNING,
                actionType: "add",
                successMessage: "Device added successfully",
            };
            break;
        case "edit":
            message = {
                headerText: "Edit Device",
                bodyText: "Are you sure you want to edit this device?",
                type: FormMessageTypes.WARNING,
                actionType: "edit",
                successMessage: "",
            };
            break;
        case "username":
            message = {
                headerText: "Update username",
                bodyText: "Are you sure you want to update your username",
                type: FormMessageTypes.WARNING,
                actionType: "edit",
                successMessage: "",
            };
            break;
        case "email":
            message = {
                headerText: "Update email address",
                bodyText: "Are you sure you want to update your email",
                type: FormMessageTypes.WARNING,
                actionType: "edit",
                successMessage: "",
            };
            break;
        case "deleteAccount":
            message = {
                headerText: "Delete Account",
                bodyText:
                    "Are you sure you want to delete your account? This cannot be undone.",
                type: FormMessageTypes.WARNING,
                actionType: "edit",
                successMessage: "",
            };
            break;
        default:
            break;
    }
    return message;
};

export const paramBuilder = (params: QueryParam[]) => {
    return params
        .map((param) => {
            return `${param.key}=${param.value}`;
        })
        .join("&");
};

export const updateParams = (
    pathname: string,
    existingParams: QueryParam[],
    newParams: QueryParam[],
    paramsToRemove: string[] = []
): string => {
    const newQueryParams = [
        ...existingParams.filter(
            (param) => !newParams.map((p) => p.key).includes(param.key)
        ),
        ...newParams,
    ];
    const removedParams = newQueryParams.filter(
        (param) => !paramsToRemove.includes(param.key)
    );
    return `${pathname}?${paramBuilder(removedParams)}`;
};

export const buildFilterQuery = (filterList: FilterKeys[]): any[] => {
    const filts: any[] = [];
    filterList.forEach((filter) => {
        if (filter.name === "deviceTypes" && filter.filters[0] !== "") {
            filts.push({
                deviceTypes: {
                    some: {
                        name: {
                            in: filter.filters,
                        },
                    },
                },
            });
        }
        if (filter.name === "formFactors" && filter.filters[0] !== "") {
            filts.push({
                formFactor: {
                    name: {
                        in: filter.filters,
                    },
                },
            });
        }
        if (filter.name === "connectors" && filter.filters[0] !== "") {
            filts.push({
                connections: {
                    some: {
                        connector: {
                            name: {
                                in: filter.filters,
                            },
                        },
                    },
                },
            });
        }
    });
    return filts;
};

export const generateSortByFromParams = (
    searchParams: ReadonlyURLSearchParams
): { [key: string]: string }[] => {
    const sortParam = searchParams.get("sort")?.split("-");

    if (sortParam) {
        const key = sortParam[0];
        const value = sortParam[1];
        return [
            {
                [key]: value,
            },
        ];
    }
    return defaultSortList;
};

export const generateFilterByFromParams = (
    searchParams: ReadonlyURLSearchParams
): FilterKeys[] => {
    const deviceTypes = searchParams.get("deviceTypes")?.split(",");
    const connectors = searchParams.get("connectors")?.split(",");
    const formFactors = searchParams.get("formFactors")?.split(",");

    const params: FilterKeys[] = [];

    if (deviceTypes && deviceTypes.length > 0) {
        params.push({
            name: "deviceTypes",
            filters: deviceTypes,
        });
    }
    if (connectors && connectors.length > 0) {
        params.push({
            name: "connectors",
            filters: connectors,
        });
    }
    if (formFactors && formFactors.length > 0) {
        params.push({
            name: "formFactors",
            filters: formFactors,
        });
    }

    return params;
};

export const generateSearchQueryByParams = (
    searchParams: ReadonlyURLSearchParams
): ISearchQuery[] => {
    const searchQuery = searchParams.get("search");

    const q: ISearchQuery[] = [];

    searchQuery?.split(",").forEach((query) => {
        const searchQuery = query.split("-");
        const key = searchQuery[0];
        const value = searchQuery[1];
        q.push({
            [key]: {
                search: value,
            },
        });
    });
    return q;
};

export const generateSortParams = (
    sort: IOrderBy[],
    pathname: string,
    existingParams: QueryParam[]
) => {
    const sortParams = updateParams(pathname || "", existingParams, [
        {
            key: "sort",
            value: `${Object.keys(sort[0])[0]}-${Object.values(sort[0])[0]}`,
        },
    ]);
    return sortParams;
};

export const generateFilterParams = (
    filters: FilterKeys[],
    pathname: string,
    existingParams: QueryParam[]
) => {
    const params: QueryParam[] = [];
    const paramsToRemove: string[] = [];

    filters.forEach((filter) => {
        if (filter.filters.length > 0 && filter.filters[0]) {
            params.push({
                key: filter.name,
                value: filter.filters.join(","),
            });
        } else {
            paramsToRemove.push(filter.name);
        }
    });
    const filterParams = updateParams(
        pathname || "",
        existingParams,
        params,
        paramsToRemove
    );

    return filterParams;
};

export const generateSearchParams = (
    searchTerm: string,
    pathname: string,
    existingParams: QueryParam[]
) => {
    let searchParams: string = "";
    if (searchTerm.length > 0) {
        const search: QueryParam[] = [
            {
                key: "search",
                value: `title-${searchTerm}`,
            },
        ];

        searchParams = updateParams(pathname || "", existingParams, search);
    } else {
        searchParams = updateParams(
            pathname || "",
            existingParams,
            [],
            ["search"]
        );
    }

    return searchParams;
};
