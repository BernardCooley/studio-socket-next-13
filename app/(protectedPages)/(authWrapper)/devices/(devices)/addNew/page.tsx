"use client";

import React, { useState, FormEvent, useRef, useEffect } from "react";
import { DeviceType, Connector, FormFactor, Connection } from "@prisma/client";
import { Button } from "@chakra-ui/react";
import AddConnectionSection from "../../../../../../components/AddConnectionSection";
import BackButton from "../../../../../../components/BackButton";
import { useFormContext } from "../../../../../../contexts/FormContext";
import { useNavContext } from "../../../../../../contexts/NavContext";
import {
    FormMessageTypes,
    NewDevice,
    SelectOption,
} from "../../../../../../types";
import {
    getErrorMessages,
    getSelectionOptions,
    noop,
} from "../../../../../../utils";
import {
    fetchConnectors,
    fetchDeviceTypes,
    fetchFormFactors,
} from "../../../../../../bff/requests";
import {
    AddDeviceSchema,
    ConnectionDescriptionSchema,
    ConnectionSchema,
    getFormMessages,
} from "../../../../../../formValidation";
import { db } from "../../../../../../firebase/clientApp";
import Icons from "../../../../../../icons";
import PageTitle from "../../../../../../components/PageTitle";
import CustomTextInput from "../../../../../../components/CustomTextInput";
import CustomMultiSelect from "../../../../../../components/CustomMultiSelect";
import CustomSelect from "../../../../../../components/CustomSelect";
import Avatar from "../../../../../../components/Avatar";

interface Props {}

const AddNewDevice = ({}: Props) => {
    db;
    const {
        formMessages,
        file,
        updateFile,
        addFormMessages,
        updateIcon,
        updateCanCloseDialog,
    } = useFormContext();
    const { environment, navOpen } = useNavContext();
    const titleRef = useRef<HTMLInputElement>(null);
    const manufacturerRef = useRef<HTMLInputElement>(null);
    const deviceTypesRef = useRef<HTMLInputElement>(null);
    const formFactorRef = useRef<HTMLInputElement>(null);
    const nameRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLInputElement>(null);
    const connectorRef = useRef<HTMLInputElement>(null);
    const imageRef = useRef<HTMLInputElement>(null);
    const [errors, setErrors] = useState([]);
    const [connectionErrors, setConnectionErrors] = useState([]);
    const [audioConnectionShow, setAudioConnectionFormShow] =
        useState<boolean>(false);
    const [midiConnectionShow, setMidiConnectionFormShow] =
        useState<boolean>(false);
    const [audioConnections, setAudioConnections] = useState<Connection[]>([]);
    const [midiConnections, setMidiConnections] = useState<Connection[]>([]);
    const [descriptions, setDescriptions] = useState<string[]>([]);
    const [triggerResetValue, setTriggerResetValue] = useState<boolean>(false);
    const [typeOptions, setTypeOptions] = useState<SelectOption[]>([]);
    const [connectorOptions, setConnectorOptions] = useState<SelectOption[]>(
        []
    );
    const [formFactorOptions, setFormFactorOptions] = useState<SelectOption[]>(
        []
    );

    useEffect(() => {
        (async () => {
            await getSelectOptions();
        })();
    }, []);

    const getSelectOptions = async () => {
        setTypeOptions(
            getSelectionOptions(
                ((await fetchDeviceTypes()) as DeviceType[])
                    .map((t) => t.name)
                    .sort()
            )
        );
        setConnectorOptions(
            getSelectionOptions(
                ((await fetchConnectors()) as Connector[])
                    .map((t) => t.name)
                    .sort()
            )
        );
        setFormFactorOptions(
            getSelectionOptions(
                ((await fetchFormFactors()) as FormFactor[])
                    .map((t) => t.name)
                    .sort()
            )
        );
    };

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
            setConnectionErrors(err.errors);
            return false;
        }
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrors([]);
        try {
            AddDeviceSchema.parse({
                title: titleRef.current?.value,
                manufacturer: manufacturerRef.current?.value,
                deviceTypes: deviceTypesRef.current?.value
                    ? JSON.parse(deviceTypesRef.current?.value)
                    : [""],
                formFactor: formFactorRef.current?.value,
            });

            if (
                titleRef.current &&
                manufacturerRef.current &&
                deviceTypesRef.current &&
                formFactorRef.current
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
                    <Icons
                        iconType="keyboard"
                        className="text-primary"
                        fontSize="132px"
                    />
                );

                const newDevice: NewDevice = {
                    title: titleRef.current?.value,
                    manufacturer: manufacturerRef.current?.value,
                    deviceTypes: JSON.parse(deviceTypesRef.current?.value),
                    connections: [...audioConnections, ...midiConnections],
                    requiresVerification: environment === "prod",
                    isTestDevice: environment !== "prod",
                };

                try {
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
            }

            return true;
        } catch (err: any) {
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
        <div className={`pt-16 relative ${navOpen ? "disable" : ""}`}>
            <div className="absolute left-6">
                <BackButton />
            </div>
            <PageTitle title="Add new device" />
            <form
                onSubmit={handleSubmit}
                className="w-full flexCenter flex-col p-8 bg-primary-light"
                noValidate={true}
                onClick={noop}
            >
                {typeOptions?.length > 0 && formFactorOptions?.length > 0 && (
                    <div className="w-full flex flex-col justify-center items-center">
                        <CustomTextInput
                            className={`${
                                formMessages.size > 0
                                    ? "pointer-events-none"
                                    : ""
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
                                formMessages.size > 0
                                    ? "pointer-events-none"
                                    : ""
                            }`}
                            id="manufacturer"
                            type="text"
                            label="Manufacturer *"
                            name="manufacturer"
                            ref={manufacturerRef}
                            errorMessages={getErrorMessages(
                                errors,
                                "manufacturer"
                            )}
                        />
                        <CustomMultiSelect
                            className={`${
                                formMessages.size > 0
                                    ? "pointer-events-none"
                                    : ""
                            }`}
                            name="deviceTypes"
                            options={typeOptions}
                            label="Device Types"
                            ref={deviceTypesRef}
                            errorMessages={getErrorMessages(
                                errors,
                                "deviceTypes"
                            )}
                        />
                        <CustomSelect
                            className={`${
                                formMessages.size > 0
                                    ? "pointer-events-none"
                                    : ""
                            }`}
                            name="formFactor"
                            options={formFactorOptions}
                            label="Form Factor"
                            ref={formFactorRef}
                            errorMessages={getErrorMessages(
                                errors,
                                "formFactor"
                            )}
                        />
                        <div className="relative top-6 flex flex-col items-center">
                            <CustomTextInput
                                className={`${
                                    formMessages.size > 0
                                        ? "pointer-events-none"
                                        : ""
                                }`}
                                type="file"
                                id="avatar"
                                label="Device image (jpg, jpeg, png)"
                                name="avatar"
                                ref={imageRef}
                                errorMessages={getErrorMessages(
                                    errors,
                                    "deviceImage"
                                )}
                                isFile={true}
                                borderless={true}
                                scaleLabel={false}
                                resetValue={triggerResetValue}
                                hide={file.length > 0}
                            />
                            {file && (
                                <Avatar
                                    imageClassname="rounded-none"
                                    image={file}
                                    containerClassname="w-3/4 mb-4 mt-6"
                                    fit="contain"
                                    icon={
                                        <Icons
                                            iconType="close"
                                            className="relative -top-6 border-2 rounded-full bg-primary-light text-primary"
                                            onClick={handleDeleteAvatar}
                                            fontSize="92px"
                                        />
                                    }
                                />
                            )}
                        </div>
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
                                options={connectorOptions}
                                onAddConnection={section.onAddConnection}
                                onAddDescription={addDescrption}
                                onDeleteConnection={section.onDeleteConnection}
                                onHideForm={section.onHideForm}
                                onShowForm={section.onShowForm}
                            />
                        ))}
                        <Button
                            mt="82px"
                            borderRadius="full"
                            size="2xl"
                            variant="primary"
                            type="submit"
                        >
                            Save
                        </Button>
                    </div>
                )}
            </form>
        </div>
    );
};

export default AddNewDevice;
