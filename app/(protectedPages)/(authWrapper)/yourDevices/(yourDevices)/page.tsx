/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useEffect, useRef, useState } from "react";
import { useYDevFilterContext } from "../../../../../contexts/YDevFilterContext";
import { useSearchContext } from "../../../../../contexts/SearchContext";
import {
    fetchDevices,
    IRequestOptions,
    removeDeviceFromUser,
} from "../../../../../bff/requests";
import { useSession } from "next-auth/react";
import { FormMessage, IDevice } from "../../../../../types";
import LoadingSpinner from "../../../../../components/LoadingSpinner";
import { AndOr, IActionButton, IOrderBy } from "../../../../../bff/types";
import Dialog from "../../../../../components/Dialog";
import { getDialogMessages } from "../../../../../utils";
import { Box, useToast, VStack } from "@chakra-ui/react";
import FilterModal from "../../../../../components/FilterModal";
import SearchModal from "../../../../../components/SearchModal";
import DeviceItem from "../../../../../components/DeviceItem";
import routes from "../../../../../routes";
import FilterSortLabel from "../../../../../components/FilterSortLabel";
import FilterIcons from "../../../../../components/FilterIcons";
import PageTitle from "../../../../../components/PageTitle";
import { AnimatePresence } from "framer-motion";
import ToTop from "../../../../../components/ToTop";

interface Props {}

const YourDevices = ({}: Props) => {
    const toast = useToast();
    const { data: user } = useSession();
    const {
        filterModalShowing,
        searchLabel,
        showFilter,
        updateSearchLabel,
        sortOrFilter,
        hideFilter,
        clearFilterKeys,
        updateFilterKeys,
        updateSelectedFilterOptions,
        selectedFilterOptions,
        clearSelectedFilterOptions,
        filterKeys,
    } = useYDevFilterContext();
    const limit = 50;
    const andOr: AndOr = "AND";
    const [skip, setSkip] = useState<number>(0);
    const [sortBy, setSortBy] = useState<IOrderBy[]>([]);
    const [filteredByLabel, setFilteredByLabel] = useState<string[]>([]);
    const { openSearch, searchQuery, updateSearchQuery } = useSearchContext();
    const [devices, setDevices] = useState<IDevice[]>([]);
    const [moreLoading, setMoreLoading] = useState<boolean>(false);
    const [showToTopButton, setShowToTopButton] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [dialogMessage, setDialogMessage] = useState<FormMessage | null>(
        null
    );
    const cancelRef = useRef<HTMLButtonElement>(null);
    const [isDialogShowing, setIsDialogShowing] = useState<boolean>(false);

    const showDialog = (actionType: string) => {
        setIsDialogShowing(true);
        setDialogMessage(getDialogMessages(actionType));
    };
    const [deviceIdClicked, setDeviceIdClicked] = useState<string | null>(null);

    const actionButtons: IActionButton[] = [
        {
            type: "close",
            onClick: () => showDialog("remove"),
            confirmAction: "remove",
        },
        {
            type: "edit",
            onClick: () => showDialog("edit"),
            confirmAction: "edit",
        },
    ];

    useEffect(() => {
        if (user?.user.id) {
            getDevices();
        }
    }, [sortBy, filterKeys, user, searchQuery]);

    const getRequestOptions = (customSkip: number | null): IRequestOptions => {
        return {
            skip: customSkip ? customSkip : skip,
            limit: limit,
            filters: filterKeys,
            andOr: andOr,
            orderBy: sortBy,
            userId: user?.user.id,
            searchQuery: searchQuery,
        };
    };

    const getDevices = async () => {
        const requestBody = getRequestOptions(null);
        const devices = (await fetchDevices(requestBody)) as IDevice[];
        if (devices) {
            setDevices(devices);
            setLoading(false);
        }
    };

    const getMoreDevices = async (skip: number) => {
        const requestBody = getRequestOptions(skip);
        const moreDevices = (await fetchDevices(requestBody)) as IDevice[];
        if (moreDevices) {
            setDevices((devices) => [...devices, ...moreDevices]);
        }
        setMoreLoading(false);
    };

    const handleVerticalScroll = (
        e: React.UIEvent<HTMLDivElement, UIEvent>
    ) => {
        console.log("scrolling");
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
            getMoreDevices(skip + limit);
        }
    };

    const remove = async () => {
        if (deviceIdClicked && user) {
            const resp = await removeDeviceFromUser(
                user.user.id,
                deviceIdClicked
            );

            if (resp) {
                getDevices();

                toast({
                    title: "Success",
                    description: dialogMessage?.successMessage,
                    status: "success",
                    duration: 2000,
                    isClosable: false,
                    position: "bottom",
                });
            }
        }
    };

    const edit = async () => {
        console.log("edit", user?.user.id, deviceIdClicked);
    };

    const performAction = async (actionType: string) => {
        if (actionType === "remove") {
            await remove();
        } else if (actionType === "edit") {
            await edit();
        }
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
                updateSortBy={setSortBy}
                clearFilterKeys={clearFilterKeys}
                updateFilterKeys={updateFilterKeys}
                updateFilteredByLabel={setFilteredByLabel}
                updateSelectedFilterOptions={updateSelectedFilterOptions}
                selectedFilterOptions={selectedFilterOptions}
                clearSelectedFilterOptions={clearSelectedFilterOptions}
                sortBy={sortBy}
                filterKeys={filterKeys}
            />
            <PageTitle title="Your devices" />
            <FilterIcons
                searchTerm={searchQuery}
                filterKeys={filterKeys}
                sortBy={sortBy}
                onFilterClick={() => showFilter("filter")}
                onSortClick={() => showFilter("sort")}
                onSearchClick={openSearch}
            />
            <FilterSortLabel
                filterKeys={filterKeys}
                sortBy={sortBy}
                searchKeys={searchLabel}
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
                                actionButtons={actionButtons}
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

export default YourDevices;
