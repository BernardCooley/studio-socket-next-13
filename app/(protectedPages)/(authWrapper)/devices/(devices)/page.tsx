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
import {
    FilterKeys,
    FormMessage,
    IDevice,
    SelectedFilterOptions,
} from "../../../../../types";
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
    generateSortByFromParams,
    generateFilterByFromParams,
    generateSearchQueryByParams,
    generateSortParams,
    generateFilterParams,
    generateSearchParams,
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
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import Icons from "../../../../../icons";
import { defaultFilterList, defaultSortList } from "../../../../../consts";

interface Props {}

const Devices = ({}: Props) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const [existingParams, setExistingParams] = useState<QueryParam[]>([]);
    const toast = useToast();
    const { data: user } = useSession();
    const [selectedFilterOptions, setSelectedFilterOptions] =
        useState<SelectedFilterOptions | null>(null);

    const [showFilterOrSort, setShowFilterOrSort] = useState<SortFilter>(null);
    const limit = 50;
    const andOr: AndOr = "AND";
    const [skip, setSkip] = useState<number>(0);
    const [sortParam, setSortParam] = useState<IOrderBy[]>([]);
    const [sort, setSort] =
        useState<{ [key: string]: string }[]>(defaultSortList);
    const [filteredByLabel, setFilteredByLabel] = useState<string[]>([]);
    const [devices, setAllDevices] = useState<IDevice[]>([]);
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

        setSort(generateSortByFromParams(searchParams));
        setFilterList(generateFilterByFromParams(searchParams));
        setFilterByRequest(
            buildFilterQuery(generateFilterByFromParams(searchParams))
        );
        setSearchQuery(generateSearchQueryByParams(searchParams));
        setExistingParams(vals);
        setDefaultList(vals);
    }, [searchParams]);

    useEffect(() => {
        if (sortParam.length > 0 && pathname) {
            router.replace(
                generateSortParams(sortParam, pathname, existingParams)
            );
        }
    }, [sortParam]);

    useEffect(() => {
        if (pathname) {
            router.replace(
                generateFilterParams(filterList, pathname, existingParams)
            );
        }
    }, [filterList]);

    useEffect(() => {
        if (pathname) {
            router.replace(
                generateSearchParams(searchTerm, pathname, existingParams)
            );
        }
    }, [searchTerm]);

    useEffect(() => {
        const selectedFilterOptions: SelectedFilterOptions = {};
        existingParams.forEach((param) => {
            selectedFilterOptions[param.key] = param.value
                .split(",")
                .map((d: string) => {
                    return {
                        value: d === "" ? "" : d,
                        label: d === "" ? "None" : d,
                    };
                });
        });

        setSelectedFilterOptions(selectedFilterOptions);
    }, [existingParams]);

    const setDefaultList = (vals: QueryParam[]) => {
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
    };

    const showDialog = (actionType: string) => {
        setIsDialogShowing(true);
        setDialogMessage(getDialogMessages(actionType));
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
                updateSelectedFilterOptions={setSelectedFilterOptions}
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
                    {devices &&
                        devices.length > 0 &&
                        devices.map((device) => (
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
