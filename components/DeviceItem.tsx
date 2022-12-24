import React, { useEffect } from "react";
import { getFirebaseImage } from "../firebase/functions";
import { IFirebaseImage } from "../types";
import { noop } from "../utils";
import ImageWithFallback from "./ImageWithFallback";

interface Props {
    // TODO: Add device type
    device: any;
    onClick?: () => void;
}

const DeviceItem = ({ device, onClick = noop }: Props) => {
    const [deviceImage, setDeviceImage] = React.useState<IFirebaseImage | void>(
        undefined
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
        <div
            className="border-primary-light-border border-2 shadow-lg rounded-md"
            onClick={onClick}
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
        </div>
    );
};

export default DeviceItem;
