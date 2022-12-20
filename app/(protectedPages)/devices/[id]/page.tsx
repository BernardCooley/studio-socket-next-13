/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import BackButton from "../../../../components/BackButton";
import DeviceDetail from "../../../../components/DeviceDetail";
import ImageWithFallback from "../../../../components/ImageWithFallback";
import { devicesRef } from "../../../../firebase/firebaseRefs";
import {
    getDocumentsWhere,
    getFirebaseImage,
} from "../../../../firebase/functions";
import { Connection, IFirebaseImage } from "../../../../types";

interface Props {
    params: { id: number };
}

const Device = ({ params }: Props) => {
    const router = useRouter();
    const [deviceImage, setDeviceImage] = React.useState<
        IFirebaseImage | undefined
    >(undefined);
    const [device, setDevice] = React.useState<any | null>(null);

    useEffect(() => {
        getDevice();
    }, []);

    useEffect(() => {
        if (device) {
            getImage();
        }
    }, [device]);

    const getDevice = async () => {
        const device = await getDocumentsWhere(
            devicesRef,
            "id",
            "==",
            Number(params.id),
            true
        );
        setDevice(device);
    };

    const getImage = async () => {
        const image = await getFirebaseImage("gear_images", `${device.id}.png`);
        if (image) {
            setDeviceImage(image);
        }
    };

    return (
        <div className="p-8 pt-14 relative">
            <BackButton onClick={() => router.back()} left="10" />
            {device && (
                <div>
                    <div className="text-2xl mb-4">
                        {device.manufacturers.join(", ")}
                    </div>
                    <div className="text-4xl">{device.title}</div>
                    <div className="w-full relative aspect-video m-auto my-4">
                        <ImageWithFallback
                            fit="contain"
                            title={device.title}
                            fallbackImage="/assets/images/deviceFallbackImage.png"
                            image={deviceImage}
                            size={{
                                width: 200,
                                height: 200,
                            }}
                        />
                    </div>
                    <DeviceDetail
                        title="Type"
                        subtitle={device.deviceTypes.join(", ")}
                    />
                    <DeviceDetail
                        title="Form factor"
                        subtitle={device.form_factor}
                    />
                    <DeviceDetail
                        title="Signal path"
                        subtitle={device.signal_path}
                    />
                    <DeviceDetail
                        title="Year"
                        subtitle={device.dates_produced}
                    />
                    <DeviceDetail
                        title="Country"
                        subtitle={device.country_of_manufacture}
                    />
                    {device.connections && device.connections.length > 0 && (
                        <>
                            <div className="text-3xl">Connections</div>
                            <table className="table-fixed w-full text-xl mb-4 border-2 border-separate rounded-xl shadow-2xl">
                                <tbody>
                                    <tr className="font-medium">
                                        <th className="border-primary border-b-2">
                                            Name
                                        </th>
                                        <th className="border-primary border-b-2">
                                            Type
                                        </th>
                                        <th className="border-primary border-b-2">
                                            Description
                                        </th>
                                    </tr>
                                    {device &&
                                        device.connections &&
                                        device.connections.map(
                                            (
                                                connection: Connection,
                                                index: number
                                            ) => (
                                                <tr key={connection.name}>
                                                    <td className="text-center capitalize border-primary">
                                                        {connection.name.toLowerCase()}
                                                    </td>
                                                    <td className="text-center border-primary">
                                                        {connection.connector}
                                                    </td>
                                                    <td className="text-center border-primary">
                                                        {connection.description?.join(
                                                            ", "
                                                        )}
                                                    </td>
                                                </tr>
                                            )
                                        )}
                                </tbody>
                            </table>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default Device;
