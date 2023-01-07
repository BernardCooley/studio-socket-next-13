/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useEffect, useRef, useState } from "react";
import { fetchFirebaseImage } from "../../../firebase/functions";
import { FormMessageTypes, IDevice, IFirebaseImage } from "../../../types";
import { useYDevFilterContext } from "../../../contexts/YDevFilterContext";
import { useODevFilterContext } from "../../../contexts/ODevFilterContext";
import { useNavContext } from "../../../contexts/NavContext";
import DeviceList from "../../../components/DeviceList";
import { useSearchContext } from "../../../contexts/SearchContext";
import useIntersectionObserver from "@react-hook/intersection-observer";
import Icons from "../../../icons";
import routes from "../../../routes";
import { fetchDevices, IRequestOptions } from "../../../bff/requests";
import { useFormContext } from "../../../contexts/FormContext";

interface Props {}

const Devices = ({}: Props) => {
    const {
        sortBy: yourDevicesSortBy,
        filterModalShowing,
        filterKeys: yourDevicesFilterKeys,
    } = useYDevFilterContext();
    const { sortBy: allDevicesSortBy, filterKeys: allDevicesFilterKeys } =
        useODevFilterContext();
    const { searchOpen } = useSearchContext();
    const { updateDeviceListInView, navOpen } = useNavContext();
    const [allDevices, setAllDevices] = useState<IDevice[]>([]);
    const [yourDevices, setYourDevices] = useState<IDevice[]>([]);
    const scrollElementRef = useRef<HTMLDivElement>(null);
    const yourDevicesRef = useRef<HTMLDivElement>(null);
    const ourDevicesRef = useRef<HTMLDivElement>(null);
    const { isIntersecting } = useIntersectionObserver(yourDevicesRef);
    const [skip, setSkip] = useState<{
        allDevices: number;
        yourDevices: number;
    }>({
        allDevices: 0,
        yourDevices: 0,
    });
    const [moreLoading, setMoreLoading] = useState<boolean>(false);
    const { addFormMessages, updateIcon } = useFormContext();

    const [allDevicesLimit, setAllDevicesLimit] = useState<number>(10);
    const [yourDevicesLimit, setYourDevicesLimit] = useState<number>(10);
    const [allDevicesfilters, setAllDevicesFilters] = useState([
        { countryOfManufacturer: "Germany" },
        {
            formFactor: {
                name: "Keyboard",
            },
        },
    ]);
    // TODO: update to only get user's devices when auth is sorted
    const [yourDevicesfilters, setYourDevicesFilters] = useState([
        { countryOfManufacturer: "Germany" },
        {
            formFactor: {
                name: "Desktop",
            },
        },
    ]);
    const [allDevicesAndOr, setAllDevicesAndOr] = useState<"OR" | "AND">("OR");
    const [yourDevicesAndOr, setYourDevicesAndOr] = useState<"OR" | "AND">(
        "AND"
    );

    useEffect(() => {
        if (allDevices.length > 0) {
            console.log(allDevices.length);
            allDevices.forEach(async (device) => {
                if (!device.image) {
                    const image: IFirebaseImage | null =
                        await fetchFirebaseImage(
                            "gear_images",
                            device.deviceId
                        );
                    if (image) {
                        device.image = image;
                    } else {
                        device.image = {
                            name: "",
                            url: "",
                        };
                    }
                }
            });
        }
    }, [allDevices]);

    useEffect(() => {
        if (yourDevices.length > 0) {
            yourDevices.forEach(async (device) => {
                if (!device.image) {
                    const image: IFirebaseImage | null =
                        await fetchFirebaseImage(
                            "gear_images",
                            device.deviceId
                        );
                    if (image) {
                        device.image = image;
                    } else {
                        device.image = {
                            name: "",
                            url: "",
                        };
                    }
                }
            });
        }
    }, [yourDevices]);

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
        getDevices(true);
        getDevices(false);
    }, [allDevicesSortBy, yourDevicesSortBy]);

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
                : skip[isAllDevices ? "allDevices" : "yourDevices"],
            limit: isAllDevices ? allDevicesLimit : yourDevicesLimit,
            filters: isAllDevices ? allDevicesfilters : yourDevicesfilters,
            andOr: isAllDevices ? allDevicesAndOr : yourDevicesAndOr,
            orderBy: isAllDevices ? allDevicesSortBy : yourDevicesSortBy,
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
                setYourDevices((devices) => [...devices, ...moreDevices]);
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

        if (target.scrollHeight - target.scrollTop === target.clientHeight) {
            setMoreLoading(true);

            const deviceListKey = isAllDevices ? "allDevices" : "yourDevices";

            getMoreDevices(
                skip[deviceListKey] +
                    (isAllDevices ? allDevicesLimit : yourDevicesLimit),
                isAllDevices
            );
            setSkip((skip) => ({
                ...skip,
                [deviceListKey]:
                    skip[deviceListKey] +
                    (isAllDevices ? allDevicesLimit : yourDevicesLimit),
            }));
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
                    className="absolute bottom-20 right-4 border-8 text-primary-light bg-primary rounded-full z-50"
                    href={routes.addDevice().as}
                />
            )}
            <div
                ref={scrollElementRef}
                className="w-full flex snap-mandatory snap-x mx:auto overflow-y-scroll"
            >
                <DeviceList
                    onScroll={(e) => handleVerticalScroll(e, false)}
                    onScrollClick={() => scroll(true)}
                    elementRef={yourDevicesRef}
                    devices={yourDevices}
                    pageTitle="Your devices"
                    iconType="right"
                    sortBy={yourDevicesSortBy}
                    filterKeys={yourDevicesFilterKeys}
                />
                <DeviceList
                    onScroll={(e) => handleVerticalScroll(e, true)}
                    onScrollClick={() => scroll(false)}
                    elementRef={ourDevicesRef}
                    devices={allDevices}
                    pageTitle="Our devices"
                    iconType="left"
                    sortBy={allDevicesSortBy}
                    filterKeys={allDevicesFilterKeys}
                />
            </div>
        </div>
    );
};

export default Devices;
