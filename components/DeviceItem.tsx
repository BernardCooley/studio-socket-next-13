import Link from "next/link";
import React, { useEffect } from "react";
import { getFirebaseImage } from "../firebase/functions";
import { IFirebaseImage } from "../types";
import { noop } from "../utils";
import ImageWithFallback from "./ImageWithFallback";

interface Props {
    // TODO: Add device type
    device: any;
    href?: string;
}

const DeviceItem = ({ device, href = "" }: Props) => {
    const [deviceImage, setDeviceImage] = React.useState<IFirebaseImage | null>(
        null
    );

    useEffect(() => {
        getImage();
    }, [device]);

    const getImage = async () => {
        try {
            const image = await getFirebaseImage(
                "gear_images",
                `${device.id}.png`
            );
            setDeviceImage(image);
        } catch (err) {}
    };

    return (
        <Link
            className="border-primary-light-border border-2 shadow-lg rounded-md"
            href={href}
        >
            {device && Object.keys(device).length > 0 && (
                <div className="p-2 h-full flex flex-col justify-between">
                    <div>
                        <div className="text-lg">
                            {device.manufacturers.join(", ")}
                        </div>
                        <div className="text-2xl">{device.title}</div>
                    </div>
                    <div className="relative w-full aspect-square mt-2">
                        <ImageWithFallback
                            fit="cover"
                            title={device.title}
                            fallbackImage="/assets/images/image_not_found.png"
                            image={deviceImage}
                        />
                    </div>
                </div>
            )}
        </Link>
    );
};

export default DeviceItem;
