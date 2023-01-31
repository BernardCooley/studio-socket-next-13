/* eslint-disable react-hooks/exhaustive-deps */
import Link from "next/link";
import React from "react";
import { addDeviceToUser, removeDeviceFromUser } from "../bff/requests";
import { useYDevFilterContext } from "../contexts/YDevFilterContext";
import useUpdateDialog from "../hooks/useUpdateDialog";
import Icons, { DeviceIcon } from "../icons";
import { FormMessageTypes, IDevice } from "../types";
import { noopPromise } from "../utils";

interface Props {
    device: IDevice;
    href?: string;
    listId?: string;
    userId: string;
}

interface IDeviceIconProps {
    type: string;
    onClick: () => void;
    fontSize?: string;
}

const DeviceItem = ({ device, href = "", listId = "", userId }: Props) => {
    const { triggerRefetch } = useYDevFilterContext();
    const { update } = useUpdateDialog();
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

    const removeDevice = () => {
        update({
            question: `Are you sure you want to remove ${device.title} from your device list?`,
            messageType: FormMessageTypes.WARNING,
            defaultIcon: (
                <Icons
                    iconType="removeFromList"
                    className="text-warning"
                    fontSize="132px"
                />
            ),
            successIcon: (
                <Icons
                    iconType="removeFromList"
                    className="text-success"
                    fontSize="132px"
                />
            ),
            successAction: () => remove(userId, device.id),
            successMessage: `${device.title} has been removed from your devices`,
            successMessageType: FormMessageTypes.SUCCESS,
            messageTimeout: 3000,
            loadingMessage: "Removing device...",
        });
    };

    const editDeviice = (yoursOurs: string) => {
        console.log("Edit device", yoursOurs, device.id);
    };

    const addDevice = () => {
        update({
            question: `Add ${device.title} to your device list?`,
            messageType: FormMessageTypes.INFO,
            defaultIcon: (
                <Icons
                    iconType="addToList"
                    className="text-primary"
                    fontSize="132px"
                />
            ),
            successIcon: (
                <Icons
                    iconType="addToList"
                    className="text-success"
                    fontSize="132px"
                />
            ),
            successAction: () => add(userId, device.id),
            successMessage: `${device.title} has been added to your devices`,
            successMessageType: FormMessageTypes.SUCCESS,
            messageTimeout: 3000,
            loadingMessage: "Adding device...",
        });
    };

    const remove = async (userId: string, deviceId: string) => {
        const resp = await removeDeviceFromUser(userId, deviceId);

        if (resp) {
            triggerRefetch();
        }

        return null;
    };

    const add = async (userId: string, deviceId: string) => {
        const resp = await addDeviceToUser(userId, deviceId);

        if (resp) {
            triggerRefetch();
        }

        return null;
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
                                onClick={removeDevice}
                            />
                        )}
                        {listId === "ours" && (
                            <ActionIcon
                                type="add"
                                fontSize="80px"
                                onClick={addDevice}
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
