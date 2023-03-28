/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useEffect, useRef, useState } from "react";
import { useSearchContext } from "../../../../../contexts/SearchContext";
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
    QueryParam,
} from "../../../../../bff/types";
import Dialog from "../../../../../components/Dialog";
import {
    addParams,
    buildFilterQuery,
    getDialogMessages,
} from "../../../../../utils";
import {
    Box,
    Button,
    ButtonGroup,
    Center,
    useToast,
    VStack,
} from "@chakra-ui/react";
import FilterModal from "../../../../../components/FilterModal";
import SearchModal from "../../../../../components/SearchModal";
import DeviceItem from "../../../../../components/DeviceItem";
import routes from "../../../../../routes";
import FilterSortLabel from "../../../../../components/FilterSortLabel";
import FilterIcons from "../../../../../components/FilterIcons";
import PageTitle from "../../../../../components/PageTitle";
import { AnimatePresence } from "framer-motion";
import ToTop from "../../../../../components/ToTop";
import { useODevFilterContext } from "../../../../../contexts/ODevFilterContext";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

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
    const {
        filterModalShowing,
        searchLabel,
        showFilter,
        updateSearchLabel,
        sortOrFilter,
        hideFilter,
        updateSelectedFilterOptions,
        selectedFilterOptions,
        clearSelectedFilterOptions,
    } = useODevFilterContext();
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
    const { openSearch, searchQuery, updateSearchQuery } = useSearchContext();
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

    useEffect(() => {
        const vals: QueryParam[] = [];
        searchParams?.forEach((value, key) => {
            vals.push({ key, value });
        });

        setExistingParams(vals);

        generateSortByFromParams();
        generateFilterByFromParams();

        if (!searchParams?.get("list")) {
            router.replace(
                addParams(pathname || "", vals, [
                    {
                        key: "list",
                        value: "yours",
                    },
                ])
            );
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

    const generateSortParams = (sort: IOrderBy[]) => {
        const sortParams = addParams(pathname || "", existingParams, [
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
            const filterParams = addParams(
                pathname || "",
                existingParams,
                params,
                paramsToRemove
            );
            router.replace(filterParams);
        });
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
    }, [sort, user, listSelected, filterList]);

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
                    position: "bottom",
                    size: "sm",
                });
                router.replace(
                    addParams(pathname || "", existingParams, [
                        {
                            key: "list",
                            value: "yours",
                        },
                    ])
                );
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
                    position: "bottom",
                    size: "sm",
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

    return (
        <Box pt="52px" onScroll={handleVerticalScroll}>
            {/* <Button onClick={addParams}></Button> */}
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
            <SearchModal
                updateSearchQuery={updateSearchQuery}
                updateSearchLabel={updateSearchLabel}
                searchLabel={searchLabel}
                searchType="devices"
            />
            <FilterModal
                sortOrFilter={sortOrFilter}
                filterModalShowing={filterModalShowing}
                hideFilter={hideFilter}
                updateSortBy={setSortParam}
                clearFilterKeys={() => setFilterList(defaultFilterList)}
                updateFilterKeys={setFilterList}
                updateFilteredByLabel={setFilteredByLabel}
                updateSelectedFilterOptions={updateSelectedFilterOptions}
                selectedFilterOptions={selectedFilterOptions}
                clearSelectedFilterOptions={clearSelectedFilterOptions}
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
                                addParams(pathname || "", existingParams, [
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
                                addParams(pathname || "", existingParams, [
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
            <FilterIcons
                searchTerm={searchQuery}
                filterKeys={filterList.map((filter) => filter.filters)}
                sortBy={sort}
                onFilterClick={() => showFilter("filter")}
                onSortClick={() => showFilter("sort")}
                onSearchClick={openSearch}
            />
            <FilterSortLabel
                filterKeys={filterList.map((filter) => filter.filters)}
                sortBy={sort}
                searchKeys={searchLabel}
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
