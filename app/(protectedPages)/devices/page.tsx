"use client";

import React, { useEffect, useRef, useState } from "react";
import {
    getFirebaseDevices,
    getFirebaseImage,
    getUserData,
} from "../../../firebase/functions";
import { useSession } from "next-auth/react";
import { doc } from "firebase/firestore";
import { db } from "../../../firebase/clientApp";
import { UserData } from "../../../types";
import { useYDevFilterContext } from "../../../contexts/YDevFilterContext";
import { useODevFilterContext } from "../../../contexts/ODevFilterContext";
import { useIsInViewport } from "../../../utils";
import { useNavContext } from "../../../contexts/NavContext";
import DeviceList from "../../../components/DeviceList";

interface Props {}

const Devices = ({}: Props) => {
    const {
        sortBy: YDevSortBy,
        filterModalShowing,
        filterKeys: YDevFilterKeys,
    } = useYDevFilterContext();
    const { sortBy: ODevSortBy, filterKeys: ODevFilterKeys } =
        useODevFilterContext();
    const { updateDeviceListInView } = useNavContext();
    const { data: user } = useSession();
    const [userDeviceIds, setUserDeviceIds] = useState<string[]>([]);
    const [userDevices, setUserDevices] = useState<any[]>([]);
    const [allDevices, setAllDevices] = useState<any[]>([]);
    const scrollElement = useRef<HTMLDivElement>(null);
    const yourDevicesRef = useRef<HTMLDivElement>(null);
    const ourDevicesRef = useRef<HTMLDivElement>(null);
    const yourDevicesInView = useIsInViewport(yourDevicesRef);
    const ourDevicesInView = useIsInViewport(ourDevicesRef);

    useEffect(() => {
        fetchDevices();
    }, []);

    useEffect(() => {
        fetchUserDeviceIds();
    }, [user]);

    useEffect(() => {
        if (yourDevicesInView) {
            updateDeviceListInView("yours");
        }
        if (ourDevicesInView) {
            updateDeviceListInView("ours");
        }
    }, [yourDevicesInView, ourDevicesInView]);

    useEffect(() => {
        if (userDeviceIds.length > 0) {
            fetchUserDevices();
        }
    }, [userDeviceIds]);

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
        const devices = await getFirebaseDevices(20);
        if (devices) {
            setAllDevices(devices);
        }
    };

    const fetchUserDevices = async () => {
        if (userDeviceIds.length > 0) {
            const devices = await getFirebaseDevices(
                20,
                "id",
                "in",
                userDeviceIds
            );
            if (devices) {
                setUserDevices(devices);
            }
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
        if (scrollElement.current) {
            scrollElement.current.scrollTo({
                behavior: "smooth",
                left: toLeft ? 600 : -600,
            });
        }
    };

    return (
        <div
            className={`relative overflow-hidden h-screen ${
                filterModalShowing
                    ? "opacity-40 pointer-events-none"
                    : "opacity-100 pointer-events-auto"
            }`}
        >
            <div
                ref={scrollElement}
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
                    userDevices={userDevices}
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
