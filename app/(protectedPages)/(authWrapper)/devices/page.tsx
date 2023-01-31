/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useEffect, useRef, useState } from "react";
import { FormMessageTypes, IDevice } from "../../../../types";
import { useYDevFilterContext } from "../../../../contexts/YDevFilterContext";
import { useODevFilterContext } from "../../../../contexts/ODevFilterContext";
import { useNavContext } from "../../../../contexts/NavContext";
import DeviceList from "../../../../components/DeviceList";
import { useSearchContext } from "../../../../contexts/SearchContext";
import useIntersectionObserver from "@react-hook/intersection-observer";
import Icons from "../../../../icons";
import routes from "../../../../routes";
import { fetchDevices, IRequestOptions } from "../../../../bff/requests";
import { useFormContext } from "../../../../contexts/FormContext";
import { useSession } from "next-auth/react";

interface Props {}

const Devices = ({}: Props) => {
    const { data: user } = useSession();
    const {
        sortBy: yourDevicesSortBy,
        filterModalShowing,
        filterKeys: yourDevicesFilterKeys,
        filteredByLabel: yourDevicesFilteredByLabel,
        andOr: yourDevicesAndOr,
        limit: yourDevicesLimit,
        skip: yourDevicesSkip,
        updateSkip: updateYourDevicesSkip,
        refetch,
        searchQuery: yourDevicesSearchQuery,
        searchLabel: yourDevicesSearchLabel,
    } = useYDevFilterContext();
    const {
        sortBy: allDevicesSortBy,
        filterKeys: allDevicesFilterKeys,
        filteredByLabel: allDevicesFilteredByLabel,
        andOr: allDevicesAndOr,
        limit: allDevicesLimit,
        skip: allDevicesSkip,
        updateSkip: updateAllDevicesSkip,
        searchQuery: allDevicesSearchQuery,
        searchLabel: allDevicesSearchLabel,
    } = useODevFilterContext();
    const { searchOpen } = useSearchContext();
    const { updateDeviceListInView, navOpen } = useNavContext();
    const [allDevices, setAllDevices] = useState<IDevice[]>([]);
    const [yourDevices, setYourDevices] = useState<IDevice[] | null>(null);
    const scrollElementRef = useRef<HTMLDivElement>(null);
    const yourDevicesRef = useRef<HTMLDivElement>(null);
    const ourDevicesRef = useRef<HTMLDivElement>(null);
    const { isIntersecting } = useIntersectionObserver(yourDevicesRef);
    const [moreLoading, setMoreLoading] = useState<boolean>(false);
    const { addFormMessages, updateIcon } = useFormContext();
    const [showYourToTopButton, setShowYourToTopButton] =
        useState<boolean>(false);
    const [showAllToTopButton, setShowAllToTopButton] =
        useState<boolean>(false);

    useEffect(() => {
        onLoadingChange(moreLoading);
    }, [moreLoading]);

    const onLoadingChange = (isLoading: boolean) => {
        if (isLoading) {
            addFormMessages(
                new Set([
                    {
                        message: "Loading more devices...",
                        type: FormMessageTypes.INFO,
                    },
                ])
            );
            updateIcon(
                <Icons
                    iconType="formLoading"
                    className="text-primary"
                    fontSize="132px"
                />
            );
        } else {
            setTimeout(() => {
                addFormMessages(new Set([]));
            }, 500);
        }
    };

    useEffect(() => {
        scroll(false);
        // TODO: not getting devices every time
        getDevices(false);
    }, [refetch]);

    useEffect(() => {
        getDevices(true);
        if (isIntersecting) {
            getDevices(false);
        }
    }, [
        allDevicesSortBy,
        yourDevicesSortBy,
        yourDevicesFilterKeys,
        allDevicesFilterKeys,
        user,
        allDevicesSearchQuery,
        yourDevicesSearchQuery,
    ]);

    useEffect(() => {
        updateDeviceListInView(isIntersecting ? "yours" : "ours");
    }, [isIntersecting]);

    const getRequestOptions = (
        isAllDevices: boolean,
        customSkip: number | null
    ): IRequestOptions => {
        return {
            skip: customSkip
                ? customSkip
                : isAllDevices
                ? allDevicesSkip
                : yourDevicesSkip,
            limit: isAllDevices ? allDevicesLimit : yourDevicesLimit,
            filters: isAllDevices
                ? allDevicesFilterKeys
                : yourDevicesFilterKeys,
            andOr: isAllDevices ? allDevicesAndOr : yourDevicesAndOr,
            orderBy: isAllDevices ? allDevicesSortBy : yourDevicesSortBy,
            userId: isAllDevices ? null : user?.user.id,
            searchQuery: isAllDevices
                ? allDevicesSearchQuery
                : yourDevicesSearchQuery,
        };
    };

    const getDevices = async (isAllDevices: boolean) => {
        const requestBody = getRequestOptions(isAllDevices, null);
        const devices = (await fetchDevices(requestBody)) as IDevice[];
        if (devices) {
            if (isAllDevices) {
                setAllDevices(devices);
            } else {
                setYourDevices(devices);
            }
        }
    };

    const getMoreDevices = async (skip: number, isAllDevices: boolean) => {
        const requestBody = getRequestOptions(isAllDevices, skip);
        const moreDevices = (await fetchDevices(requestBody)) as IDevice[];
        if (moreDevices) {
            if (isAllDevices) {
                setAllDevices((devices) => [...devices, ...moreDevices]);
            } else {
                setYourDevices((devices) =>
                    devices ? [...devices, ...moreDevices] : null
                );
            }
        }
        setMoreLoading(false);
    };

    const scroll = (toLeft: boolean) => {
        if (scrollElementRef.current) {
            scrollElementRef.current.scrollTo({
                behavior: "smooth",
                left: toLeft ? 600 : -600,
            });
        }
    };

    const handleVerticalScroll = (
        e: React.UIEvent<HTMLDivElement, UIEvent>,
        isAllDevices: boolean
    ) => {
        const target = e.target as HTMLDivElement;
        const scrollPosition = target.scrollHeight - target.scrollTop;

        if (target.scrollTop > 500) {
            if (isAllDevices) {
                setShowAllToTopButton(true);
            } else {
                setShowYourToTopButton(true);
            }
        } else {
            if (isAllDevices) {
                setShowAllToTopButton(false);
            } else {
                setShowYourToTopButton(false);
            }
        }

        if (
            scrollPosition <= target.clientHeight &&
            scrollPosition >= target.clientHeight - 700
        ) {
            setMoreLoading(true);

            if (isAllDevices) {
                updateAllDevicesSkip(allDevicesSkip + allDevicesLimit);
                getMoreDevices(allDevicesSkip + allDevicesLimit, isAllDevices);
            } else {
                updateYourDevicesSkip(yourDevicesSkip + yourDevicesLimit);
                getMoreDevices(
                    yourDevicesSkip + yourDevicesLimit,
                    isAllDevices
                );
            }
        }
    };

    return (
        <div
            className={`relative overflow-hidden h-screen ${
                filterModalShowing || searchOpen
                    ? "opacity-40 pointer-events-none"
                    : "opacity-100 pointer-events-auto"
            } ${navOpen ? "disable" : ""}`}
        >
            {!isIntersecting && (
                <Icons
                    iconType="add"
                    fontSize="142px"
                    className="absolute bottom-6 right-4 border-8 text-primary-light bg-primary rounded-full z-50"
                    href={routes.addDevice().as}
                />
            )}
            <div
                ref={scrollElementRef}
                className="w-full flex snap-mandatory snap-x mx:auto overflow-y-scroll"
            >
                <DeviceList
                    onScroll={(e) =>
                        yourDevices && yourDevices.length > 0
                            ? handleVerticalScroll(e, false)
                            : null
                    }
                    onScrollClick={() => scroll(true)}
                    elementRef={yourDevicesRef}
                    devices={yourDevices}
                    pageTitle="Your devices"
                    iconType="right"
                    sortBy={yourDevicesSortBy}
                    filterKeys={yourDevicesFilteredByLabel}
                    showToTopButton={showYourToTopButton && isIntersecting}
                    listId="yours"
                    userId={user?.user.id}
                    searchKeys={yourDevicesSearchLabel}
                />
                <DeviceList
                    onScroll={(e) => handleVerticalScroll(e, true)}
                    onScrollClick={() => scroll(false)}
                    elementRef={ourDevicesRef}
                    devices={allDevices}
                    pageTitle="Our devices"
                    iconType="left"
                    sortBy={allDevicesSortBy}
                    filterKeys={allDevicesFilteredByLabel}
                    showToTopButton={showAllToTopButton && !isIntersecting}
                    listId="ours"
                    userId={user?.user.id}
                    searchKeys={allDevicesSearchLabel}
                />
            </div>
        </div>
    );
};

export default Devices;
