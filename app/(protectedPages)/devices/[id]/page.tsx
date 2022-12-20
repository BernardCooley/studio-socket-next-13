/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import BackButton from "../../../../components/BackButton";
import CustomButton from "../../../../components/CustomButton";
import DeviceDetail from "../../../../components/DeviceDetail";
import ImageWithFallback from "../../../../components/ImageWithFallback";
import { useFormContext } from "../../../../contexts/FormContext";
import { devicesRef } from "../../../../firebase/firebaseRefs";
import {
    getDocumentsWhere,
    getFirebaseImage,
    getUserData,
} from "../../../../firebase/functions";
import {
    Connection,
    FormMessageTypes,
    IFirebaseImage,
    UserData,
} from "../../../../types";
import LibraryAddCheckIcon from "@mui/icons-material/LibraryAddCheck";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../../firebase/clientApp";
import { useSession } from "next-auth/react";
import routes from "../../../../routes";

interface Props {
    params: { id: number };
}

const Device = ({ params }: Props) => {
    const { data: user } = useSession();
    const {
        addFormMessages,
        updateIcon,
        updateDialogButtons,
        clearFormMessages,
        clearDialogButtons,
        resetIcon,
    } = useFormContext();
    const router = useRouter();
    const [deviceImage, setDeviceImage] = useState<IFirebaseImage | undefined>(
        undefined
    );
    const [device, setDevice] = useState<any | null>(null);

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

    const setErrorMessage = () => {
        addFormMessages(
            new Set([
                {
                    message: "Something went wrong. Please try again later.",
                    type: FormMessageTypes.ERROR,
                },
            ])
        );
    };

    const addDevice = async (userData: UserData | null, userId: string) => {
        if (userData) {
            await updateDoc(doc(db, "users", userId), {
                devices: userData.devices
                    ? [...userData.devices, device.id]
                    : [device.id],
            });

            clearDialogButtons();

            addFormMessages(
                new Set([
                    {
                        message: "Device has been added to your devices",
                        type: FormMessageTypes.INFO,
                    },
                ])
            );
            updateIcon(<LibraryAddCheckIcon />);

            setTimeout(() => {
                resetIcon();
                clearFormMessages();
                router.push(routes.devices().as);
            }, 2000);
        }
    };

    const handleClick = async () => {
        if (user && user.user.id) {
            try {
                const userData: UserData | null = await getUserData(
                    doc(db, "users", user.user.id)
                );

                if (userData && userData.devices) {
                    if (userData.devices.includes(device.id)) {
                        addFormMessages(
                            new Set([
                                {
                                    message:
                                        "Device is already in your devices. Add anyway?",
                                    type: FormMessageTypes.INFO,
                                },
                            ])
                        );
                        updateDialogButtons([
                            {
                                text: "Yes",
                                onClick: () =>
                                    addDevice(userData, user.user.id),
                                classes:
                                    "bg-primary p-2 px-4 min-w-dialogButton rounded-lg",
                            },
                            {
                                text: "No",
                                onClick: () => clearFormMessages(),
                                classes:
                                    "bg-primary p-2 px-4 min-w-dialogButton rounded-lg",
                            },
                        ]);
                        return;
                    } else {
                        addDevice(userData, user.user.id);
                    }
                } else {
                    addDevice(userData, user.user.id);
                }
            } catch (error) {
                setErrorMessage();
            }
        } else {
            setErrorMessage();
        }
    };

    return (
        <div className="p-8 pt-14 relative flex flex-col items-center">
            <div className="w-full flex items-start">
                <BackButton onClick={() => router.back()} left="10" />
            </div>
            {device && (
                <>
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
                        {device.connections &&
                            device.connections.length > 0 && (
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
                                                        <tr
                                                            key={
                                                                connection.name
                                                            }
                                                        >
                                                            <td className="text-center capitalize border-primary">
                                                                {connection.name.toLowerCase()}
                                                            </td>
                                                            <td className="text-center border-primary">
                                                                {
                                                                    connection.connector
                                                                }
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
                    <CustomButton
                        label="Add to your devices"
                        type="button"
                        buttonClassName="bg-primary text-primary-light p-3 px-6 rounded-full shadow-2xl text-2xl"
                        onClick={handleClick}
                    />
                </>
            )}
        </div>
    );
};

export default Device;