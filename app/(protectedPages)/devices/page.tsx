/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useEffect, useRef, useState } from "react";
import { getFirebaseImage } from "../../../firebase/functions";
import { IDevice } from "../../../types";
import { useYDevFilterContext } from "../../../contexts/YDevFilterContext";
import { useODevFilterContext } from "../../../contexts/ODevFilterContext";
import { useNavContext } from "../../../contexts/NavContext";
import DeviceList from "../../../components/DeviceList";
import { useSearchContext } from "../../../contexts/SearchContext";
import useIntersectionObserver from "@react-hook/intersection-observer";
import Icons from "../../../icons";
import routes from "../../../routes";
import { fetchDevices } from "../../../bff/requests";
import { IOrderBy } from "../../../bff/types";

interface Props {}

const Devices = ({}: Props) => {
    const {
        sortBy: YDevSortBy,
        filterModalShowing,
        filterKeys: YDevFilterKeys,
    } = useYDevFilterContext();
    const { sortBy: ODevSortBy, filterKeys: ODevFilterKeys } =
        useODevFilterContext();
    const { searchOpen } = useSearchContext();
    const { updateDeviceListInView, navOpen } = useNavContext();
    const [devices, setDevices] = useState<IDevice[]>([]);
    const scrollElementRef = useRef<HTMLDivElement>(null);
    const yourDevicesRef = useRef<HTMLDivElement>(null);
    const ourDevicesRef = useRef<HTMLDivElement>(null);
    const { isIntersecting } = useIntersectionObserver(yourDevicesRef);

    const limit = 10;
    const filters = [
        { countryOfManufacturer: "Germany" },
        {
            formFactor: {
                name: "Keyboard",
            },
        },
    ];
    const andOr = "OR";
    const orderBy = [
        {
            title: "desc",
        },
    ];

    const getDevices = async () => {
        const dev = await fetchDevices(
            limit,
            filters,
            andOr,
            orderBy as IOrderBy[]
        );
        if (dev) {
            setDevices(dev as IDevice[]);
        }
    };

    useEffect(() => {
        if (devices.length > 0) {
            devices.forEach(async (device) => {
                const image = await getImage(device.deviceId);
                if (image) {
                    device.image = image;
                }
            });
        }
    }, [devices]);

    useEffect(() => {
        getDevices();
    }, []);

    useEffect(() => {
        if (isIntersecting) {
            updateDeviceListInView("yours");
        } else {
            updateDeviceListInView("ours");
        }
    }, [isIntersecting]);

    const getImage = async (deviceId: string) => {
        try {
            const image = await getFirebaseImage(
                "gear_images",
                `${deviceId}.png`
            );
            return image;
        } catch (err) {
            return null;
        }
    };

    const scroll = (toLeft: boolean) => {
        if (scrollElementRef.current) {
            scrollElementRef.current.scrollTo({
                behavior: "smooth",
                left: toLeft ? 600 : -600,
            });
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
                    onScrollClick={() => scroll(true)}
                    elementRef={yourDevicesRef}
                    devices={devices}
                    pageTitle="Your devices"
                    iconType="right"
                    sortBy={YDevSortBy}
                    filterKeys={YDevFilterKeys}
                />
                <DeviceList
                    onScrollClick={() => scroll(false)}
                    elementRef={ourDevicesRef}
                    devices={devices}
                    pageTitle="Our devices"
                    iconType="left"
                    sortBy={ODevSortBy}
                    filterKeys={ODevFilterKeys}
                />
            </div>
        </div>
    );
};

export default Devices;
