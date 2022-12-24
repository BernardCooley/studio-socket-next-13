"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import DeviceItem from "../../../components/DeviceItem";
import PageSection from "../../../components/PageSection";
import PageTitle from "../../../components/PageTitle";
import { useNavContext } from "../../../contexts/NavContext";
import { devicesRef } from "../../../firebase/firebaseRefs";
import { getFirebaseData } from "../../../firebase/functions";
import routes from "../../../routes";
import { userDevicesTest } from "../../../testData/testData";

interface Props {}

const Dashboard = ({}: Props) => {
    const { environment } = useNavContext();
    const router = useRouter();
    const [devices, setDevices] = useState<any[]>([]);

    useEffect(() => {
        fetchDevices();
    }, []);

    const fetchDevices = async () => {
        if (environment === "prod") {
            const devices = await getFirebaseData(devicesRef, 20);
            if (devices) {
                setDevices(devices);
            }
        } else {
            setDevices(userDevicesTest);
        }
    };

    return (
        <div className="flex flex-col items-center bg-primary-light pb-10">
            <PageTitle title="Dashboard" />
            <PageSection title="Your top devices">
                {devices &&
                    devices.length > 0 &&
                    devices.map((device) => (
                        <DeviceItem
                            key={device.id}
                            device={device}
                            onClick={() =>
                                router.push(routes.device(device.id).as)
                            }
                        />
                    ))}
                <div className="p-6">Page section content</div>
            </PageSection>
            <PageSection title="Your top studios">
                <div className="p-6">Page section content</div>
            </PageSection>
            <PageSection title="Community">
                <div className="p-6">Page section content</div>
            </PageSection>
            <PageSection title="Community top devices">
                <div className="p-6">Page section content</div>
            </PageSection>
        </div>
    );
};

export default Dashboard;
