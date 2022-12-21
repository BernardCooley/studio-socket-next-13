"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import DeviceItem from "../../../components/DeviceItem";
import PageTitle from "../../../components/PageTitle";
import {
    getFirebaseDevices,
    getFirebaseImage,
    getUserData,
} from "../../../firebase/functions";
import routes from "../../../routes";
import { useSession } from "next-auth/react";
import { doc } from "firebase/firestore";
import { db } from "../../../firebase/clientApp";
import { UserData } from "../../../types";
import Icons from "../../../icons";
import { useFilterContext } from "../../../contexts/FilterContext";
import FilterSortLabel from "../../../components/FilterSortLabel";

interface Props {}

const Devices = ({}: Props) => {
    const { showFilter, sortBy, filterModalShowing, filterKeys } =
        useFilterContext();
    const { data: user } = useSession();
    const router = useRouter();
    const [userDeviceIds, setUserDeviceIds] = useState<string[]>([]);
    const [userDevices, setUserDevices] = useState<any[]>([]);
    const [allDevices, setAllDevices] = useState<any[]>([]);
    const scrollElement = useRef<HTMLDivElement>(null);

    useEffect(() => {
        fetchDevices();
    }, []);

    useEffect(() => {
        fetchUserDeviceIds();
    }, [user]);

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
            <div className="text-primary absolute w-full flex justify-between px-3 top-1">
                <Icons
                    iconType="sort"
                    className={`filterSortIcons ${
                        sortBy.length > 0
                            ? "filterSortIconActive"
                            : "filterSortIconInactive"
                    }`}
                    onClick={() => showFilter("sort")}
                />
                <Icons
                    className={`filterSortIcons ${
                        filterKeys.length > 0
                            ? "filterSortIconActive"
                            : "filterSortIconInactive"
                    }`}
                    iconType="filter"
                    onClick={() => showFilter("filter")}
                />
            </div>
            <div
                ref={scrollElement}
                className="w-full h-screen flex snap-mandatory snap-x mx:auto overflow-y-scroll"
            >
                <div className="snapScrollPane mb-20">
                    <Icons
                        className="absolute top-1 right-14"
                        iconType="chevronRight"
                        onClick={() => scroll(true)}
                    />
                    <PageTitle title="Your devices" />
                    <div>
                        <FilterSortLabel
                            filterKeys={filterKeys}
                            sortBy={sortBy}
                        />
                        <div className="deviceList">
                            {userDevices &&
                                userDevices.length > 0 &&
                                userDevices.map((device) => (
                                    <DeviceItem
                                        key={device.id}
                                        device={device}
                                        onClick={() =>
                                            router.push(
                                                routes.device(device.id).as
                                            )
                                        }
                                    />
                                ))}
                        </div>
                    </div>
                </div>
                <div className="snapScrollPane mb-20">
                    <Icons
                        className="absolute top-1 left-14"
                        iconType="chevronLeft"
                        onClick={() => scroll(false)}
                    />
                    <PageTitle title="Our devices" />
                    <div className="deviceList">
                        {allDevices &&
                            allDevices.length > 0 &&
                            allDevices.map((device) => (
                                <DeviceItem
                                    key={device.id}
                                    device={device}
                                    onClick={() =>
                                        router.push(routes.device(device.id).as)
                                    }
                                />
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Devices;
