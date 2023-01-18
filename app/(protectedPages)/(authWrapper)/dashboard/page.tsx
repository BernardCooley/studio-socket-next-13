"use client";

import React, { useEffect, useState } from "react";
import { fetchDevices } from "../../../../bff/requests";
import DeviceItem from "../../../../components/DeviceItem";
import PageSection from "../../../../components/PageSection";
import PageTitle from "../../../../components/PageTitle";
import { useNavContext } from "../../../../contexts/NavContext";
import routes from "../../../../routes";
import { IDevice } from "../../../../types";

interface Props {}

const Dashboard = ({}: Props) => {
    const { navOpen } = useNavContext();
    const [devices, setDevices] = useState<any[]>([]);

    useEffect(() => {
        getDevices();
    }, []);

    const getDevices = async () => {
        const devices = (await fetchDevices({
            skip: 0,
            limit: 20,
            filters: [],
            andOr: "",
            orderBy: [],
        })) as IDevice[];
        if (devices) {
            setDevices(devices);
        }
    };

    return (
        <div
            className={`flex flex-col items-center bg-primary-light pb-10 pt-16 ${
                navOpen ? "disable" : ""
            }`}
        >
            <PageTitle title="Dashboard" />
            <PageSection title="Your top devices">
                {devices &&
                    devices.length > 0 &&
                    devices.map((device) => (
                        <DeviceItem
                            key={device.id}
                            device={device}
                            href={routes.device(device.id).as}
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
