/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useEffect } from "react";
import DeviceDetail from "../../../../components/DeviceDetail";
import ImageWithFallback from "../../../../components/ImageWithFallback";
import { devicesRef } from "../../../../firebase/firebaseRefs";
import {
    getDocumentsWhere,
    getFirebaseImage,
} from "../../../../firebase/functions";
import { IFirebaseImage } from "../../../../types";

interface Props {
    params: { id: number };
}

const Device = ({ params }: Props) => {
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
        <div className="p-8">
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
                        title="Year"
                        subtitle={device.dates_produced}
                    />
                    <DeviceDetail
                        title="Country"
                        subtitle={device.country_of_manufacture}
                    />
                </div>
            )}
        </div>
    );
};

export default Device;
