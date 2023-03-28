/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useEffect, useRef, useState } from "react";
import {
    addDeviceToUser,
    fetchDevices,
    IRequestOptions,
    removeDeviceFromUser,
} from "../../../../../bff/requests";
import { useSession } from "next-auth/react";
import { FilterKeys, FormMessage, IDevice } from "../../../../../types";
import LoadingSpinner from "../../../../../components/LoadingSpinner";
import {
    AndOr,
    IActionButtons,
    IOrderBy,
    ISearchQuery,
    QueryParam,
    SortFilter,
} from "../../../../../bff/types";
import Dialog from "../../../../../components/Dialog";
import {
    updateParams,
    buildFilterQuery,
    getDialogMessages,
} from "../../../../../utils";
import {
    Box,
    Button,
    ButtonGroup,
    Center,
    Flex,
    Input,
    InputGroup,
    useToast,
    VStack,
} from "@chakra-ui/react";
import FilterModal from "../../../../../components/FilterModal";
import DeviceItem from "../../../../../components/DeviceItem";
import routes from "../../../../../routes";
import FilterSortLabel from "../../../../../components/FilterSortLabel";
import PageTitle from "../../../../../components/PageTitle";
import { AnimatePresence } from "framer-motion";
import ToTop from "../../../../../components/ToTop";
import { useODevFilterContext } from "../../../../../contexts/ODevFilterContext";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import Icons from "../../../../../icons";

interface Props {}

const Devices = ({}: Props) => {
    const defaultFilterList = [
        {
            name: "deviceTypes",
            filters: [""],
        },
        {
            name: "connectors",
            filters: [""],
        },
        {
            name: "formFactors",
            filters: [""],
        },
    ];
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const [existingParams, setExistingParams] = useState<QueryParam[]>([]);
    const toast = useToast();
    const { data: user } = useSession();
    const { updateSelectedFilterOptions, selectedFilterOptions } =
        useODevFilterContext();
    const [showFilterOrSort, setShowFilterOrSort] = useState<SortFilter>(null);
    const limit = 50;
    const andOr: AndOr = "AND";
    const [skip, setSkip] = useState<number>(0);
    const [sortParam, setSortParam] = useState<IOrderBy[]>([]);
    const [sort, setSort] = useState<{ [key: string]: string }[]>([
        {
            title: "asc",
        },
    ]);
    const [filteredByLabel, setFilteredByLabel] = useState<string[]>([]);
    const [allDevices, setAllDevices] = useState<IDevice[]>([]);
    const [moreLoading, setMoreLoading] = useState<boolean>(false);
    const [showToTopButton, setShowToTopButton] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [dialogMessage, setDialogMessage] = useState<FormMessage | null>(
        null
    );
    const cancelRef = useRef<HTMLButtonElement>(null);
    const [isDialogShowing, setIsDialogShowing] = useState<boolean>(false);
    const [deviceIdClicked, setDeviceIdClicked] = useState<string | null>(null);
    const [listSelected, setListSelected] = useState<"yours" | "all">(
        searchParams?.get("list") as "yours" | "all"
    );
    const [filterList, setFilterList] = useState<FilterKeys[]>([]);
    const [filterByRequest, setFilterByRequest] = useState<FilterKeys[]>([]);
    const [searchQuery, setSearchQuery] = useState<ISearchQuery[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>("");

    useEffect(() => {
        const vals: QueryParam[] = [];
        searchParams?.forEach((value, key) => {
            vals.push({ key, value });
        });

        setExistingParams(vals);
        generateSortByFromParams();
        generateFilterByFromParams();
        generateSearchQueryByParams();

        if (pathname === "/devices" && !searchParams?.get("list")) {
            const params = updateParams(pathname, vals, [
                {
                    key: "list",
                    value: "yours",
                },
            ]);
            setListSelected("yours");
            router.replace(params);
        } else {
            setListSelected(searchParams?.get("list") as "yours" | "all");
        }
    }, [searchParams]);

    useEffect(() => {
        if (sortParam.length > 0) {
            generateSortParams(sortParam);
        }
    }, [sortParam]);

    useEffect(() => {
        generateFilterParams(filterList);
    }, [filterList]);

    useEffect(() => {
        generateSearchParams();
    }, [searchTerm]);

    const showDialog = (actionType: string) => {
        setIsDialogShowing(true);
        setDialogMessage(getDialogMessages(actionType));
    };

    const generateFilterByFromParams = () => {
        const deviceTypes = searchParams?.get("deviceTypes")?.split(",");
        const connectors = searchParams?.get("connectors")?.split(",");
        const formFactors = searchParams?.get("formFactors")?.split(",");

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

        if (params.length > 0) {
            setFilterList(params);
            setFilterByRequest(buildFilterQuery(params));
        }
    };

    const generateSortByFromParams = () => {
        const sortParam = searchParams?.get("sort")?.split("-");

        if (sortParam) {
            const key = sortParam[0];
            const value = sortParam[1];
            setSort([
                {
                    [key]: value,
                },
            ]);
        }
    };

    const generateSearchQueryByParams = () => {
        const searchQuery = searchParams?.get("search");

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
        setSearchQuery(q);
    };

    const generateSortParams = (sort: IOrderBy[]) => {
        const sortParams = updateParams(pathname || "", existingParams, [
            {
                key: "sort",
                value: `${Object.keys(sort[0])[0]}-${
                    Object.values(sort[0])[0]
                }`,
            },
        ]);
        router.replace(sortParams);
    };

    const generateFilterParams = (filters: FilterKeys[]) => {
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
            const filterParams = updateParams(
                pathname || "",
                existingParams,
                params,
                paramsToRemove
            );
            router.replace(filterParams);
        });
    };

    const generateSearchParams = () => {
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
        router.replace(searchParams);
    };

    const actionButtons: IActionButtons = {
        yours: [
            {
                type: "close",
                onClick: () => showDialog("remove"),
                confirmAction: "remove",
            },
        ],
        all: [
            {
                type: "add",
                onClick: () => showDialog("add"),
                confirmAction: "add",
            },
        ],
    };

    useEffect(() => {
        if (listSelected === "yours" && user) {
            getDevices(user?.user.id);
        } else if (listSelected === "all") {
            getDevices(null);
        }
    }, [sort, user, listSelected, filterList, searchQuery]);

    const getRequestOptions = (
        customSkip: number | null,
        userId: string | null
    ): IRequestOptions => {
        return {
            skip: customSkip ? customSkip : skip,
            limit: limit,
            filters: filterByRequest,
            andOr: andOr,
            orderBy: sort,
            userId,
            searchQuery: searchQuery,
        };
    };

    const getDevices = async (userId: string | null) => {
        const requestBody = getRequestOptions(null, userId);
        const devices = (await fetchDevices(requestBody)) as IDevice[];
        if (devices) {
            setAllDevices(devices);
            setLoading(false);
        }
    };

    const getMoreDevices = async (skip: number, userId: string | null) => {
        const requestBody = getRequestOptions(skip, userId);
        const moreDevices = (await fetchDevices(requestBody)) as IDevice[];
        if (moreDevices) {
            setAllDevices((devices) => [...devices, ...moreDevices]);
        }
        setMoreLoading(false);
    };

    const handleVerticalScroll = (
        e: React.UIEvent<HTMLDivElement, UIEvent>
    ) => {
        const target = e.target as HTMLDivElement;
        const scrollPosition = target.scrollHeight - target.scrollTop;

        if (target.scrollTop > 500) {
            setShowToTopButton(true);
        } else {
            setShowToTopButton(false);
        }

        if (
            scrollPosition <= target.clientHeight &&
            scrollPosition >= target.clientHeight - 700
        ) {
            setMoreLoading(true);

            setSkip(skip + limit);
            getMoreDevices(skip + limit, user?.user.id);
        }
    };

    const add = async () => {
        if (deviceIdClicked && user) {
            const resp = await addDeviceToUser(user.user.id, deviceIdClicked);

            if (resp) {
                toast({
                    title: "Success",
                    description: dialogMessage?.successMessage,
                    status: "success",
                    duration: 2000,
                    isClosable: false,
                    position: "bottom-left",
                    size: "xs",
                    containerStyle: {
                        width: "300px",
                        maxWidth: "90%",
                        fontSize: "22px",
                        lineHeight: "28px",
                        fontFamily: "default",
                    },
                });
            }
        }
    };

    const remove = async () => {
        if (deviceIdClicked && user) {
            const resp = await removeDeviceFromUser(
                user.user.id,
                deviceIdClicked
            );

            if (resp) {
                getDevices(user.user.id);

                toast({
                    title: "Success",
                    description: dialogMessage?.successMessage,
                    status: "success",
                    duration: 2000,
                    isClosable: false,
                    position: "bottom-left",
                    size: "xs",
                    containerStyle: {
                        width: "300px",
                        maxWidth: "90%",
                        fontSize: "22px",
                        lineHeight: "28px",
                        fontFamily: "default",
                        padding: "10px",
                    },
                });
            }
        }
    };

    const performAction = async (actionType: string) => {
        if (actionType === "add") {
            await add();
        } else if (actionType === "remove") {
            await remove();
        }
    };

    const mergeFilterKeys = () => {
        let merged: string[] = [];

        filterList
            .map((filter) => filter.filters)
            .forEach((keys) => {
                keys.forEach((filter) => {
                    merged.push(filter);
                });
            });

        return merged;
    };

    return (
        <Box pt="52px" onScroll={handleVerticalScroll}>
            <Dialog
                headerText={dialogMessage?.headerText || ""}
                bodyText={dialogMessage?.bodyText || ""}
                isOpen={isDialogShowing}
                onClose={() => {
                    setIsDialogShowing(false);
                    setDialogMessage(null);
                }}
                buttons={[
                    {
                        text: "No",
                        onClick: () => {
                            setIsDialogShowing(false);
                            setDialogMessage(null);
                        },
                    },
                    {
                        text: "Yes",
                        onClick: () => {
                            performAction(dialogMessage?.actionType || "");
                            setIsDialogShowing(false);
                            setDialogMessage(null);
                        },
                    },
                ]}
                cancelRef={cancelRef}
            />
            <LoadingSpinner
                loading={loading || moreLoading}
                label="Loading devices..."
            />
            <FilterModal
                sortOrFilter={showFilterOrSort}
                filterModalShowing={
                    showFilterOrSort === "filter" || showFilterOrSort === "sort"
                }
                hideFilter={() => setShowFilterOrSort(null)}
                updateSortBy={setSortParam}
                clearFilterKeys={() => setFilterList(defaultFilterList)}
                updateFilterKeys={setFilterList}
                updateFilteredByLabel={setFilteredByLabel}
                updateSelectedFilterOptions={updateSelectedFilterOptions}
                selectedFilterOptions={selectedFilterOptions}
                sortBy={sort}
                filterKeys={filterList}
            />
            <PageTitle
                title={`${listSelected === "yours" ? "Your" : "All"} devices`}
            />
            <Center>
                <ButtonGroup gap="0" spacing={0}>
                    <Button
                        _hover={{
                            bg: "brand.primary",
                            color: "brand.primary-light",
                        }}
                        onClick={() =>
                            router.replace(
                                updateParams(pathname || "", existingParams, [
                                    {
                                        key: "list",
                                        value: "yours",
                                    },
                                ])
                            )
                        }
                        size="xs"
                        fontSize="16px"
                        variant={listSelected === "yours" ? "primary" : "ghost"}
                        roundedLeft="full"
                        h={4}
                    >
                        Yours
                    </Button>
                    <Button
                        _hover={{
                            bg: "brand.primary",
                            color: "brand.primary-light",
                        }}
                        onClick={() =>
                            router.replace(
                                updateParams(pathname || "", existingParams, [
                                    {
                                        key: "list",
                                        value: "all",
                                    },
                                ])
                            )
                        }
                        size="xs"
                        fontSize="16px"
                        variant={listSelected === "all" ? "primary" : "ghost"}
                        ml={0}
                        roundedRight="full"
                        h={4}
                    >
                        All
                    </Button>
                </ButtonGroup>
            </Center>
            <Flex alignItems="center" p={1} justifyContent="space-between">
                <Icons
                    iconType="sort"
                    className={`z-30 rounded-sm shadow-lg ${
                        sort.length > 0
                            ? "filterSortIconActive"
                            : "filterSortIconInactive"
                    }`}
                    onClick={() => setShowFilterOrSort("sort")}
                    fontSize="42px"
                />
                <Center display="flex" flexGrow="2">
                    <InputGroup display="flex" alignItems="center">
                        <Input
                            pl={1}
                            fontSize="22px"
                            color="brand.primary"
                            variant="outline"
                            colorScheme="dark"
                            placeholder="Search"
                            m={1}
                            w="96%"
                            h="40px"
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                            }}
                        />
                    </InputGroup>
                </Center>
                <Icons
                    className={`z-30 rounded-sm shadow-lg ${
                        mergeFilterKeys().length > 0 &&
                        mergeFilterKeys().filter((key) => key !== "").length > 0
                            ? "filterSortIconActive"
                            : "filterSortIconInactive"
                    }`}
                    iconType="filter"
                    onClick={() => setShowFilterOrSort("filter")}
                    fontSize="42px"
                />
            </Flex>
            <FilterSortLabel
                onClearSearchClick={() => setSearchTerm("")}
                filterKeys={filterList.map((filter) => filter.filters)}
                sortBy={sort}
                searchKeys={searchQuery}
            />
            <VStack mx={1} align="stretch" onScroll={handleVerticalScroll}>
                <AnimatePresence>
                    {allDevices &&
                        allDevices.length > 0 &&
                        allDevices.map((device) => (
                            <DeviceItem
                                onDeviceClick={() =>
                                    setDeviceIdClicked(device.id)
                                }
                                actionButtons={actionButtons[listSelected]}
                                key={device.id}
                                device={device}
                                href={routes.device(device.id).as}
                            />
                        ))}
                </AnimatePresence>
            </VStack>
            <ToTop showButton={showToTopButton} listId="deviceList" />
        </Box>
    );
};

export default Devices;
