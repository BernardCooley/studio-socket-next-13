/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import BackButton from "../../../../components/BackButton";
import CustomButton from "../../../../components/CustomButton";
import DetailItem from "../../../../components/DetailItem";
import ImageWithFallback from "../../../../components/ImageWithFallback";
import { useFormContext } from "../../../../contexts/FormContext";
import { getFirebaseImage, getUserData } from "../../../../firebase/functions";
import {
    FormMessageTypes,
    IDevice,
    IFirebaseImage,
    UserData,
} from "../../../../types";
import LibraryAddCheckIcon from "@mui/icons-material/LibraryAddCheck";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../../firebase/clientApp";
import { useSession } from "next-auth/react";
import routes from "../../../../routes";
import Connections from "../../../../components/Connections";
import { useNavContext } from "../../../../contexts/NavContext";
import { fetchDeviceById } from "../../../../bff/requests";

interface Props {
    params: { id: number };
}

const Device = ({ params }: Props) => {
    const { navOpen } = useNavContext();
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
    const [deviceImage, setDeviceImage] = useState<IFirebaseImage | null>(null);
    const [device, setDevice] = useState<IDevice | null>(null);

    useEffect(() => {
        getDevice();
    }, []);

    useEffect(() => {
        if (device) {
            (async () => {
                const image = (await getFirebaseImage(
                    "gear_images",
                    device.deviceId,
                    "png"
                )) as IFirebaseImage;
                setDeviceImage(image);
            })();
        }
    }, [device]);

    const getDevice = async () => {
        const dev = (await fetchDeviceById(params.id.toString())) as IDevice;
        setDevice(dev);
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
        if (userData && device) {
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

                if (userData && userData.devices && device) {
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
        <div
            className={`p-8 pt-28 relative flex flex-col items-center ${
                navOpen ? "disable" : ""
            }`}
        >
            <div className="absolute left-6 top-16">
                <BackButton />
            </div>
            {device && (
                <>
                    <div className="w-full">
                        <div className="text-2xl mb-4">
                            {device.manufacturers &&
                                device.manufacturers
                                    .map((manufacturer) => manufacturer.name)
                                    .join(", ")}
                        </div>
                        <div className="text-4xl">{device.title || ""}</div>
                        <div className="w-full relative aspect-video m-auto my-4">
                            <ImageWithFallback
                                fit="contain"
                                title={device.title}
                                fallbackImage="/assets/images/image_not_found.png"
                                image={deviceImage}
                                size={{
                                    width: 200,
                                    height: 200,
                                }}
                            />
                        </div>
                        <DetailItem
                            title="Type"
                            subtitle={
                                device.deviceTypes &&
                                device.deviceTypes
                                    .map((deviceType) => deviceType.name)
                                    .join(", ")
                            }
                        />
                        <DetailItem
                            title="Form factor"
                            subtitle={device.formFactor?.name}
                        />
                        <DetailItem
                            title="Signal path"
                            subtitle={device.signalPath?.name}
                        />
                        <DetailItem
                            title="Year"
                            subtitle={device.datesProduced || ""}
                        />
                        <DetailItem
                            title="Country"
                            subtitle={device.countryOfManufacturer || ""}
                        />
                        {/* TODO: */}
                        {/* {device.connections && (
                            <Connections connections={device.connections} />
                        )} */}
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
