/* eslint-disable react-hooks/exhaustive-deps */
import Link from "next/link";
import React from "react";
import { IDevice } from "../types";
import ImageWithFallback from "./ImageWithFallback";

interface Props {
    device: IDevice;
    href?: string;
}

const DeviceItem = ({ device, href = "" }: Props) => {
    return (
        <Link
            className="border-primary-light-border border-2 shadow-lg rounded-md"
            href={href}
        >
            {device && Object.keys(device).length > 0 && (
                <div className="p-2 h-full flex flex-col justify-between">
                    <div>
                        <div className="text-lg">
                            {device.manufacturers
                                .map((manufacturer) => manufacturer.name)
                                .join(", ")}
                        </div>
                        <div className="text-2xl">{device.title}</div>
                    </div>
                    <div className="relative w-full aspect-square mt-2">
                        <ImageWithFallback
                            fit="cover"
                            title={device.title}
                            fallbackImage="/assets/images/image_not_found.png"
                            image={device.image}
                        />
                    </div>
                </div>
            )}
        </Link>
    );
};

export default DeviceItem;
