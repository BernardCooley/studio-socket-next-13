"use client";

import { signOut } from "next-auth/react";
import React, { useEffect, useRef, useState } from "react";
import Avatar from "../../../../components/Avatar";
import PageTitle from "../../../../components/PageTitle";
import { FormMessage } from "../../../../types";
import Icons from "../../../../icons";
import EditableDetailItem from "../../../../components/EditableDetailItem";
import {
    UpdateAvatarSizeSchema,
    UpdateAvatarTypeSchema,
    UpdateEmailSchema,
    UpdateUsernameSchema,
} from "../../../../formValidation";
import { useFormContext } from "../../../../contexts/FormContext";
import { getDialogMessages, getErrorMessages } from "../../../../utils";
import DetailItem from "../../../../components/DetailItem";
import { useAuthContext } from "../../../../contexts/AuthContext";
import {
    changePassword,
    deleteUser,
    updateUserProfile,
} from "../../../../bff/requests";
import CustomTextInput from "../../../../components/CustomTextInput";
import {
    deleteFirebaseImage,
    uploadFirebaseImage,
} from "../../../../firebase/functions";
import { Box, Button, Flex, Square, useToast } from "@chakra-ui/react";
import Dialog from "../../../../components/Dialog";
import { ErrorAlert, SuccessAlert } from "../../../../components/ToastAlert";
import LoadingSpinner from "../../../../components/LoadingSpinner";

interface Props {}

const Account = ({}: Props) => {
    const toast = useToast();
    const { user, updateUser } = useAuthContext();
    const [existingImageName, setExistingImageName] = useState<string>("");
    const [editing, setEditing] = useState<string>("");
    const { file, updateFile } = useFormContext();
    const [errors, setErrors] = useState<string[]>([]);
    const usernameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const avatarRef = useRef<HTMLInputElement>(null);
    const [dialogMessage, setDialogMessage] = useState<FormMessage | null>(
        null
    );
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const cancelRef = useRef<HTMLButtonElement>(null);
    const toastRefs = useRef<Function[]>([]);

    useEffect(() => {
        if (user) {
            setExistingImageName(getImageNameFromUrl(user.picture));
            setLoading(false);
        }
    }, [user]);

    const closeToast = () => {
        toastRefs.current.forEach((cb) => cb());
        toastRefs.current = [];
        signOut({ callbackUrl: "/" });
    };

    useEffect(() => {
        if (editing) {
            setDialogMessage(getDialogMessages(editing));
        }
    }, [editing]);

    const editableDetailItems = [
        {
            title: "Username",
            subtitle: user?.username,
            name: "username",
            defaultValue: user?.username,
            ref: usernameRef,
            onTickClick: () => setDialogOpen(true),
            onXClick: () => setEditing(""),
        },
        {
            title: "Email",
            subtitle: user?.email,
            name: "email",
            defaultValue: user?.email,
            ref: emailRef,
            onTickClick: () => setDialogOpen(true),
            onXClick: () => setEditing(""),
        },
    ];

    const getImageNameFromUrl = (url: string) => {
        return decodeURI(url.split("avatars%2F")[1].split("?alt")[0]);
    };

    const updateUserDetail = async (
        type: string,
        validation: () => void,
        updateFunction: () => Promise<void>
    ) => {
        try {
            setErrors([]);
            validation();

            await updateFunction();

            setTimeout(() => {
                setEditing("");
            }, 3000);
        } catch (err: any) {
            setErrors(getErrorMessages(err.errors, type));
        }
    };

    const passwordReset = async () => {
        try {
            return (await changePassword(user?.email)) as Promise<{
                [key: string]: string;
            }>;
        } catch (err: any) {
            return null;
        }
    };

    const updateItem = (type: String) => {
        switch (type) {
            case "username":
                updateUserDetail(
                    "username",
                    () =>
                        UpdateUsernameSchema.parse({
                            username: usernameRef?.current?.value,
                        }),
                    async () => {
                        if (usernameRef?.current?.value && user?.user_id) {
                            try {
                                const newUserData = await updateUserProfile(
                                    user.user_id,
                                    {
                                        username: usernameRef.current.value,
                                    }
                                );
                                updateUser(newUserData);

                                toast({
                                    position: "bottom",
                                    duration: 3000,
                                    render: () => (
                                        <SuccessAlert
                                            title="Success"
                                            details="Username updated successfully"
                                        />
                                    ),
                                });
                            } catch (err: any) {}
                        }
                    }
                );
                break;
            case "email":
                updateUserDetail(
                    "email",
                    () =>
                        UpdateEmailSchema.parse({
                            email: emailRef?.current?.value,
                        }),
                    async () => {
                        if (emailRef?.current?.value && user?.user_id) {
                            try {
                                const newUserData = await updateUserProfile(
                                    user.user_id,
                                    {
                                        email: emailRef.current.value,
                                        verify_email: true,
                                    }
                                );

                                updateUser({
                                    ...(newUserData as Object),
                                    email_verified: false,
                                });

                                toast({
                                    position: "bottom",
                                    duration: 10000,
                                    render: ({ onClose }) => {
                                        toastRefs.current.push(onClose);
                                        return (
                                            <SuccessAlert
                                                title="Success"
                                                details={`Email updated successfully. A confirmation email has been sent ${emailRef?.current?.value}. Please confirm your new email address to continue using your account. You will now be logged out`}
                                                onClose={closeToast}
                                            />
                                        );
                                    },
                                });
                                setTimeout(() => {
                                    signOut({ callbackUrl: "/" });
                                }, 10000);
                            } catch (err: any) {
                                console.log(err);
                                toast({
                                    position: "bottom",
                                    duration: 3000,
                                    render: () => {
                                        return (
                                            <ErrorAlert
                                                title="Error"
                                                details="Something went wrong. Please try again later"
                                            />
                                        );
                                    },
                                });
                            }
                        }
                    }
                );
                break;
            case "password":
                passwordReset();
                break;
            case "avatar":
                updateUserDetail(
                    "avatar",
                    () => {
                        if (
                            avatarRef?.current?.value &&
                            avatarRef.current?.files
                        ) {
                            UpdateAvatarTypeSchema.parse({
                                avatar: avatarRef.current.value,
                            });
                            UpdateAvatarSizeSchema.parse({
                                avatar: avatarRef.current?.files[0].size,
                            });
                        }
                    },
                    async () => {
                        if (
                            avatarRef?.current?.value &&
                            user?.user_id &&
                            avatarRef.current?.files
                        ) {
                            try {
                                const response = await uploadFirebaseImage(
                                    "users/avatars",
                                    avatarRef.current.files[0],
                                    user.user_id
                                );

                                const newUserData = await updateUserProfile(
                                    user.user_id,
                                    {
                                        picture: response,
                                    }
                                );
                                updateUser(newUserData);

                                if (
                                    getImageNameFromUrl(response) !==
                                    existingImageName
                                ) {
                                    await deleteFirebaseImage(
                                        "users/avatars",
                                        existingImageName
                                    );
                                }

                                toast({
                                    position: "bottom",
                                    duration: 3000,
                                    render: () => (
                                        <SuccessAlert
                                            title="Success"
                                            details="Avatar updated successfully"
                                        />
                                    ),
                                });
                            } catch (err: any) {
                                console.log(err);
                            }
                        }
                    }
                );
                break;
        }
    };

    const deleteAccount = async () => {
        return (await deleteUser(user.email)) as Promise<{
            [key: string]: string;
        }>;
    };

    return (
        <Flex
            px={2}
            pt={6}
            pb={10}
            direction="column"
            alignItems="center"
            h="full"
            position="relative"
            minH="screen"
        >
            <LoadingSpinner loading={loading} label="Loading..." />
            <Dialog
                headerText={dialogMessage?.headerText || ""}
                bodyText={dialogMessage?.bodyText || ""}
                isOpen={dialogOpen}
                onClose={() => {
                    setDialogMessage(null);
                    setEditing("");
                }}
                buttons={[
                    {
                        text: "No",
                        onClick: () => {
                            setDialogMessage(null);
                            setDialogOpen(false);
                        },
                    },
                    {
                        text: "Yes",
                        onClick: () => {
                            if (editing === "deleteAccount") {
                                deleteAccount();
                            } else {
                                updateItem(editing);
                            }
                            setDialogMessage(null);
                            setEditing("");
                            setDialogOpen(false);
                            setDialogMessage(null);
                        },
                    },
                ]}
                cancelRef={cancelRef}
            />
            <PageTitle title="Account" />
            {user && (
                <Icons
                    iconType="logout"
                    className="absolute top-8 right-2"
                    onClick={() => signOut({ callbackUrl: "/" })}
                    fontSize="38px"
                />
            )}
            <Square size="full" p={3}>
                {user?.picture && (
                    <Box mt={4} w="full">
                        <Avatar
                            image={file ? file : user.picture || ""}
                            icon={
                                <Icons
                                    styles={{
                                        border: "1px solid #383B43",
                                    }}
                                    iconType="edit"
                                    className={`border-primary border-1 bg-primary-light rounded-full p-1 relative bottom-2 ${
                                        editing === "avatar" ? "hidden" : ""
                                    }`}
                                    fontSize="42px"
                                    onClick={() => setEditing("avatar")}
                                />
                            }
                        />
                    </Box>
                )}
            </Square>
            {editing === "avatar" && (
                <Flex alignItems="center">
                    <CustomTextInput
                        type="file"
                        id="avatar"
                        label="Avatar (jpg, jpeg, png)"
                        name="avatar"
                        ref={avatarRef}
                        errorMessages={errors}
                        isFile={true}
                        borderless={true}
                        scaleLabel={false}
                        className="flex items-start flex-col justify-center relative"
                        errorClassName="absolute bottom-2"
                        onClick={() => setErrors([])}
                    />
                    <Flex>
                        {file.length > 0 && (
                            <Box mx={1}>
                                <Icons
                                    iconType="tick"
                                    onClick={() => updateItem(editing)}
                                    fontSize="28px"
                                />
                            </Box>
                        )}
                        <Box mx={1}>
                            <Icons
                                iconType="close"
                                onClick={() => {
                                    setEditing("");
                                    updateFile("");
                                    setErrors([]);
                                }}
                                fontSize="28px"
                            />
                        </Box>
                    </Flex>
                </Flex>
            )}
            {user && (
                <Box w="full">
                    {editableDetailItems.map((item) => (
                        <EditableDetailItem
                            onXClick={item.onXClick}
                            onTickClick={item.onTickClick}
                            key={item.name}
                            clasName="w-full"
                            title={item.title}
                            subtitle={item.subtitle || ""}
                            iconNotEditing={
                                <Icons
                                    iconType="edit"
                                    onClick={() => setEditing(item.name)}
                                    fontSize="28px"
                                />
                            }
                            editing={editing === item.name}
                            defaultValue={item.defaultValue}
                            ref={item.ref}
                            showIcons={true}
                            errorMessages={errors}
                        />
                    ))}
                    <DetailItem
                        clasName="w-full"
                        title="password"
                        subtitle="********"
                        icon={
                            <Icons
                                iconType="edit"
                                onClick={() => updateItem("password")}
                                fontSize="28px"
                            />
                        }
                    />
                    <Button
                        fontSize="2xs"
                        bottom={0}
                        right={1}
                        pos="absolute"
                        variant="ghost"
                        colorScheme="red"
                        onClick={() => {
                            setEditing("deleteAccount");
                            setDialogMessage(
                                getDialogMessages("deleteAccount")
                            );
                        }}
                    >
                        Delete account
                    </Button>
                </Box>
            )}
        </Flex>
    );
};

export default Account;
