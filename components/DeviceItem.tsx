/* eslint-disable react-hooks/exhaustive-deps */
import Link from "next/link";
import React from "react";
import Icons, { DeviceIcon } from "../icons";
import { IDevice } from "../types";

interface Props {
    device: IDevice;
    href?: string;
    listId?: string;
}

interface IDeviceIconProps {
    type: string;
    onClick: () => void;
    fontSize?: string;
}

const DeviceItem = ({ device, href = "", listId = "" }: Props) => {
    const ActionIcon = ({
        type,
        onClick,
        fontSize = "64px",
    }: IDeviceIconProps): JSX.Element => {
        return (
            <div className="flex justify-center items-center" onClick={onClick}>
                <Icons
                    iconType={type}
                    fontSize={fontSize}
                    className="text-primary"
                />
            </div>
        );
    };

    const removeDeviice = () => {
        console.log("Remove device", device.id);
    };

    const editDeviice = (yoursOurs: string) => {
        console.log("Edit device", yoursOurs, device.id);
    };

    const addDeviice = () => {
        console.log("Add device", device.id);
    };

    return (
        <div className="border-primary-light-border border-2 shadow-lg rounded-md">
            {device && Object.keys(device).length > 0 && (
                <div className="p-2 h-full flex relative items-start">
                    <Link
                        className="flex grow border-primary-light-border border-r-2"
                        href={href}
                    >
                        <div className="min-w-deviceIconWidth flex flex-col items-center mr-4 justify-center">
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
                            <div>{device.formFactor?.name}</div>
                        </div>
                    </Link>
                    <div className="min-w-deviceActions h-full grid grid-cols-1 grid-rows-2 items-center justify-end relative">
                        {listId === "yours" && (
                            <ActionIcon
                                type="close"
                                fontSize="80px"
                                onClick={removeDeviice}
                            />
                        )}
                        {listId === "ours" && (
                            <ActionIcon
                                type="add"
                                fontSize="80px"
                                onClick={addDeviice}
                            />
                        )}
                        <ActionIcon
                            type="edit"
                            onClick={() => editDeviice(listId)}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default DeviceItem;
