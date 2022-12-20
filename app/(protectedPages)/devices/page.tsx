"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
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

interface Props {}

const Devices = ({}: Props) => {
    const { data: user } = useSession();
    const router = useRouter();
    const [userDeviceIds, setUserDeviceIds] = useState<string[]>([]);
    const [userDevices, setUserDevices] = useState<any[]>([]);
    const [allDevices, setAllDevices] = useState<any[]>([]);

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
        if (user) {
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

    return (
        <div className="">
            <div className="w-full overflow-x-scroll">
                <div className="w-double h-screen flex">
                    <div className="w-full">
                        <PageTitle title="Your devices" />
                        <div className="grid gap-4 grid-cols-2 relative m-4">
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
                    <div className="w-full">
                        <PageTitle title="Our devices" />
                        <div className="grid gap-4 grid-cols-2 relative m-4">
                            {allDevices &&
                                allDevices.length > 0 &&
                                allDevices.map((device) => (
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
            </div>
        </div>
    );
};

export default Devices;
