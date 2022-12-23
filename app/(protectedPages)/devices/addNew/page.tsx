"use client";

import { useRouter } from "next/navigation";
import React, { useState, FormEvent, useRef } from "react";
import AddConnectionSection from "../../../../components/AddConnectionSection";
import BackButton from "../../../../components/BackButton";
import CustomButton from "../../../../components/CustomButton";
import CustomSelect from "../../../../components/CustomSelect";
import CustomTextInput from "../../../../components/CustomTextInput";
import PageTitle from "../../../../components/PageTitle";
import { useFormContext } from "../../../../contexts/FormContext";
import {
    AddDeviceSchema,
    ConnectionDescriptionSchema,
    ConnectionSchema,
    getFormMessages,
} from "../../../../formValidation";
import {
    Connection,
    DeviceType,
    FormMessageTypes,
    NewDevice,
} from "../../../../types";
import { getErrorMessages, noop } from "../../../../utils";
import { options } from "../../../../testData/testData";
import Avatar from "../../../../components/Avatar";
import Icons from "../../../../icons";
import { useNavContext } from "../../../../contexts/NavContext";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../../firebase/clientApp";
import { deviceTypes } from "../../../../consts";
import { getStorage, ref, uploadBytes } from "firebase/storage";

interface Props {}

const AddNewDevice = ({}: Props) => {
    const storage = getStorage();
    const {
        formMessages,
        file,
        updateFile,
        addFormMessages,
        updateIcon,
        updateCanCloseDialog,
    } = useFormContext();
    const { environment } = useNavContext();
    const titleRef = useRef<HTMLInputElement>(null);
    const manufacturerRef = useRef<HTMLInputElement>(null);
    const deviceTypeRef = useRef<HTMLInputElement>(null);
    const nameRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLInputElement>(null);
    const connectorRef = useRef<HTMLInputElement>(null);
    const imageRef = useRef<HTMLInputElement>(null);
    const router = useRouter();
    const [errors, setErrors] = useState([]);
    const [connectionErrors, setConnectionErrors] = useState([]);
    const [audioConnectionShow, setAudioConnectionFormShow] =
        useState<boolean>(false);
    const [midiConnectionShow, setMidiConnectionFormShow] =
        useState<boolean>(false);
    const [audioConnections, setAudioConnections] = useState<Connection[]>([]);
    const [midiConnections, setMidiConnections] = useState<Connection[]>([]);
    const [descriptions, setDescriptions] = useState<string[]>([]);
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [triggerResetValue, setTriggerResetValue] = useState<boolean>(false);

    const connectionSections = [
        {
            title: "Audio Connections",
            connectionShow: audioConnectionShow,
            connections: audioConnections,
            onAddConnection: () => handleAddConnection("audio"),
            onShowForm: () => setAudioConnectionFormShow(true),
            onHideForm: () => setAudioConnectionFormShow(false),
            onDeleteConnection: (index: number) =>
                deleteConnection(index, "audio"),
        },
        {
            title: "Midi Connections",
            connectionShow: midiConnectionShow,
            connections: midiConnections,
            onAddConnection: () => handleAddConnection("midi"),
            onShowForm: () => setMidiConnectionFormShow(true),
            onHideForm: () => setMidiConnectionFormShow(false),
            onDeleteConnection: (index: number) =>
                deleteConnection(index, "midi"),
        },
    ];

    const addDescrption = () => {
        try {
            ConnectionDescriptionSchema.parse({
                description: descriptionRef.current?.value,
            });
            setConnectionErrors([]);
            setDescriptions((descriptions) => [
                ...descriptions,
                descriptionRef.current ? descriptionRef.current.value : "",
            ]);
            setTimeout(() => {
                if (descriptionRef.current) {
                    descriptionRef.current.value = "";
                }
            }, 0);
        } catch (err: any) {
            setSubmitting(false);
            setConnectionErrors(err.errors);
            return false;
        }
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            AddDeviceSchema.parse({
                title: titleRef.current?.value,
                manufacturer: manufacturerRef.current?.value,
                deviceType: deviceTypeRef.current?.value,
            });

            if (
                titleRef.current &&
                manufacturerRef.current &&
                deviceTypeRef.current
            ) {
                addFormMessages(
                    new Set([
                        {
                            message: "Adding new device...",
                            type: FormMessageTypes.INFO,
                        },
                    ])
                );
                updateIcon(
                    <Icons iconType="keyboard" className="text-primary" />
                );

                const newDevice: NewDevice = {
                    title: titleRef.current?.value,
                    manufacturer: manufacturerRef.current?.value,
                    deviceTypes: [deviceTypeRef.current?.value] as DeviceType[],
                    connections: [...audioConnections, ...midiConnections],
                    requiresVerification: environment === "prod",
                };

                try {
                    const docRef = await addDoc(
                        collection(
                            db,
                            environment === "prod" ? "devices" : "testDevices"
                        ),
                        newDevice
                    );

                    if (imageRef.current?.files) {
                        const storageRef = ref(
                            storage,
                            `${
                                environment === "prod"
                                    ? "gear_images"
                                    : "gear_images_test"
                            }/${docRef.id}`
                        );
                        await uploadBytes(
                            storageRef,
                            imageRef.current?.files[0]
                        );
                    }

                    addFormMessages(
                        new Set([
                            {
                                message:
                                    "New device has been stored. Please allow some time for our moderators to review the device and add any additional details. You can still use your new device in the mean time.",
                                type: FormMessageTypes.INFO,
                            },
                        ])
                    );
                    updateCanCloseDialog(true);
                } catch (err: any) {
                    addFormMessages(getFormMessages(err.code));
                }
                console.log("Add device");
            }

            return true;
        } catch (err: any) {
            setSubmitting(false);
            setErrors(err.errors);
            return false;
        }
    };

    const handleAddConnection = (connectionType: "audio" | "midi") => {
        try {
            ConnectionSchema.parse({
                name: nameRef.current?.value,
                description: descriptions,
                connector: connectorRef.current?.value,
            });
            setConnectionErrors([]);
            if (connectorRef.current && nameRef.current) {
                const newConnection: Connection = {
                    connector: connectorRef.current?.value,
                    description: descriptions,
                    name: nameRef.current?.value,
                };

                if (connectionType === "audio") {
                    setAudioConnections((connections) => [
                        ...connections,
                        newConnection,
                    ]);
                } else if (connectionType === "midi") {
                    setMidiConnections((connections) => [
                        ...connections,
                        newConnection,
                    ]);
                }
                setAudioConnectionFormShow(false);
                setMidiConnectionFormShow(false);
                setDescriptions([]);
            }
            return true;
        } catch (err: any) {
            setConnectionErrors(err.errors);
            return false;
        }
    };

    const deleteConnection = (
        index: number | undefined,
        type: "audio" | "midi"
    ) => {
        if (type === "audio" && index !== undefined) {
            setAudioConnections((connections) =>
                connections.filter((_, i) => i !== index)
            );
        } else if (type === "midi" && index !== undefined) {
            setMidiConnections((connections) =>
                connections.filter((_, i) => i !== index)
            );
        }
    };

    const handleDeleteAvatar = () => {
        updateFile("");
        setTriggerResetValue(!triggerResetValue);
    };

    return (
        <div className="">
            <div className="w-full flex items-start relative">
                <BackButton onClick={() => router.back()} left="10" />
            </div>
            <PageTitle title="Add new device" />
            <form
                onSubmit={handleSubmit}
                className="w-full flexCenter flex-col p-8 bg-primary-light"
                noValidate={true}
                onClick={noop}
            >
                <div className="w-full flex flex-col justify-center items-center">
                    <CustomTextInput
                        className={`${
                            formMessages.size > 0 ? "pointer-events-none" : ""
                        }`}
                        id="title"
                        type="text"
                        label="Title *"
                        name="title"
                        ref={titleRef}
                        errorMessages={getErrorMessages(errors, "title")}
                    />
                    <CustomTextInput
                        className={`${
                            formMessages.size > 0 ? "pointer-events-none" : ""
                        }`}
                        id="manufacturer"
                        type="text"
                        label="Manufacturer *"
                        name="manufacturer"
                        ref={manufacturerRef}
                        errorMessages={getErrorMessages(errors, "manufacturer")}
                    />
                    <CustomSelect
                        className={`${
                            formMessages.size > 0 ? "pointer-events-none" : ""
                        }`}
                        name="deviceType"
                        options={deviceTypes.map((type) => ({
                            value: type === "Please select" ? "" : type,
                            label: type,
                        }))}
                        label="Device type *"
                        ref={deviceTypeRef}
                        errorMessages={getErrorMessages(errors, "deviceType")}
                    />
                    <CustomTextInput
                        className={`mt-16 ${
                            formMessages.size > 0 ? "pointer-events-none" : ""
                        }`}
                        type="file"
                        id="avatar"
                        label="Device image (jpg, jpeg, png)"
                        name="avatar"
                        ref={imageRef}
                        errorMessages={getErrorMessages(errors, "deviceImage")}
                        isFile={true}
                        borderless={true}
                        scaleLabel={false}
                        resetValue={triggerResetValue}
                        hide={file.length > 0}
                    />
                    {file && (
                        <Avatar
                            image={file}
                            containerClassname="w-3/4 mb-4 mt-6"
                            icon={
                                <Icons
                                    iconType="close"
                                    className="relative -top-6 border-2 rounded-full bg-primary-light text-primary"
                                    onClick={handleDeleteAvatar}
                                />
                            }
                        />
                    )}
                    {connectionSections.map((section) => (
                        <AddConnectionSection
                            key={section.title}
                            title={section.title}
                            connectionShow={section.connectionShow}
                            connections={section.connections}
                            connectorRef={connectorRef}
                            descriptionRef={descriptionRef}
                            errors={connectionErrors}
                            descriptions={descriptions}
                            nameRef={nameRef}
                            options={options}
                            onAddConnection={section.onAddConnection}
                            onAddDescription={addDescrption}
                            onDeleteConnection={section.onDeleteConnection}
                            onHideForm={section.onHideForm}
                            onShowForm={section.onShowForm}
                        />
                    ))}
                    <CustomButton
                        label="Save"
                        type="submit"
                        buttonClassName={`authSubmitButton mt-10`}
                        // TODO: Fix disabled button
                        // disabled={submitButtonDisabled}
                    />
                </div>
            </form>
        </div>
    );
};

export default AddNewDevice;
