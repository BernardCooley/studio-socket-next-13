/* eslint-disable react-hooks/exhaustive-deps */
import Link from "next/link";
import React from "react";
import Icons, { DeviceIcon } from "../icons";
import { IDevice } from "../types";

interface Props {
    device: IDevice;
    href?: string;
}

interface IDeviceIconProps {
    type: string;
    onClick: () => void;
}

const DeviceItem = ({ device, href = "" }: Props) => {
    const ActionIcon = ({ type, onClick }: IDeviceIconProps): JSX.Element => {
        return (
            <div className="flex justify-center items-center" onClick={onClick}>
                <Icons
                    iconType={type}
                    fontSize="64px"
                    className="text-primary"
                />
            </div>
        );
    };

    const removeDeviice = () => {
        console.log("Remove device", device.id);
    };

    const editDeviice = () => {
        console.log("Edit device", device.id);
    };

    return (
        <div className="border-primary-light-border border-2 shadow-lg rounded-md">
            {device && Object.keys(device).length > 0 && (
                <div className="p-2 h-full flex relative items-start">
                    <Link
                        className="flex grow border-primary-light-border border-r-2"
                        href={href}
                    >
                        <div className="min-w-deviceIconWidth flex flex-col items-center  mr-4">
                            <DeviceIcon
                                className="h-20 w-full relative flex items-center justify-center"
                                name={device.deviceTypes[0]?.name || ""}
                            />
                        </div>
                        <div className="grow">
                            <div className="text-lg w-4/5">
                                {device.manufacturers
                                    .map((manufacturer) => manufacturer.name)
                                    .join(", ")}
                            </div>
                            <div className="text-2xl">{device.title}</div>
                            <div>{device.deviceTypes[0]?.name}</div>
                        </div>
                    </Link>
                    <div className="w-10 h-full grid grid-cols-1 grid-rows-2 items-center justify-end relative">
                        <ActionIcon type="close" onClick={removeDeviice} />
                        <ActionIcon type="edit" onClick={editDeviice} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default DeviceItem;
