"use client";

import React, { useEffect, useRef, useState } from "react";
import {
    getFirebaseData,
    getFirebaseImage,
    getUserData,
} from "../../../firebase/functions";
import { useSession } from "next-auth/react";
import { doc } from "firebase/firestore";
import { db } from "../../../firebase/clientApp";
import { UserData } from "../../../types";
import { useYDevFilterContext } from "../../../contexts/YDevFilterContext";
import { useODevFilterContext } from "../../../contexts/ODevFilterContext";
import { useNavContext } from "../../../contexts/NavContext";
import DeviceList from "../../../components/DeviceList";
import { useSearchContext } from "../../../contexts/SearchContext";
import { devicesRef } from "../../../firebase/firebaseRefs";
import { allDevicesTest, userDevicesTest } from "../../../testData/testData";
import useIntersectionObserver from "@react-hook/intersection-observer";

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
    const { updateDeviceListInView, environment } = useNavContext();
    const { data: user } = useSession();
    const [userDeviceIds, setUserDeviceIds] = useState<string[]>([]);
    const [userDevices, setUserDevices] = useState<any[]>([]);
    const [allDevices, setAllDevices] = useState<any[]>([]);
    const scrollElementRef = useRef<HTMLDivElement>(null);
    const yourDevicesRef = useRef<HTMLDivElement>(null);
    const ourDevicesRef = useRef<HTMLDivElement>(null);
    const { isIntersecting } = useIntersectionObserver(yourDevicesRef);

    useEffect(() => {
        fetchDevices();
    }, []);

    useEffect(() => {
        if (environment === "prod") {
            fetchUserDeviceIds();
        } else {
            fetchUserDevices();
        }
    }, [user]);

    useEffect(() => {
        if (userDeviceIds.length > 0) {
            fetchUserDevices();
        }
    }, [userDeviceIds]);

    useEffect(() => {
        if (isIntersecting) {
            updateDeviceListInView("yours");
        } else {
            updateDeviceListInView("ours");
        }
    }, [isIntersecting]);

    useEffect(() => {
        if (userDevices.length > 0) {
            userDevices.forEach(async (device) => {
                const image = await getImage(device.id);
                if (image) {
                    device.image = image;
                }
            });
        }
    }, [userDevices]);

    useEffect(() => {
        if (allDevices.length > 0) {
            allDevices.forEach(async (device) => {
                const image = await getImage(device.id);
                if (image) {
                    device.image = image;
                }
            });
        }
    }, [allDevices]);

    const fetchDevices = async () => {
        if (environment === "prod") {
            const devices = await getFirebaseData(devicesRef, 20);
            if (devices) {
                setAllDevices(devices);
            }
        } else {
            setAllDevices(allDevicesTest);
        }
    };

    const fetchUserDevices = async () => {
        if (environment === "prod") {
            if (userDeviceIds.length > 0) {
                const devices = await getFirebaseData(
                    devicesRef,
                    20,
                    "id",
                    "in",
                    userDeviceIds
                );
                if (devices) {
                    setUserDevices(devices);
                }
            }
        } else {
            setUserDevices(userDevicesTest);
        }
    };

    const fetchUserDeviceIds = async () => {
        if (user?.user) {
            const userData: UserData | null = await getUserData(
                doc(db, "users", user.user.id)
            );
            if (userData && userData.devices) {
                setUserDeviceIds(userData.devices);
            }
        }
    };

    const getImage = async (deviceId: string) => {
        const image = await getFirebaseImage("gear_images", `${deviceId}.png`);
        if (image) {
            return image;
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
            }`}
        >
            <div
                ref={scrollElementRef}
                className="w-full h-screen flex snap-mandatory snap-x mx:auto overflow-y-scroll"
            >
                <DeviceList
                    onScrollClick={() => scroll(true)}
                    elementRef={yourDevicesRef}
                    userDevices={userDevices}
                    pageTitle="Your devices"
                    iconType="right"
                    sortBy={YDevSortBy}
                    filterKeys={YDevFilterKeys}
                />
                <DeviceList
                    onScrollClick={() => scroll(false)}
                    elementRef={ourDevicesRef}
                    userDevices={allDevices}
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
