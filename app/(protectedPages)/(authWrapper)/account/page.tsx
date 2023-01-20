"use client";

import { signOut } from "next-auth/react";
import React, { useEffect, useRef, useState } from "react";
import Avatar from "../../../../components/Avatar";
import PageTitle from "../../../../components/PageTitle";
import { FormMessageTypes } from "../../../../types";
import Icons from "../../../../icons";
import EditableDetailItem from "../../../../components/EditableDetailItem";
import {
    UpdateAvatarSizeSchema,
    UpdateAvatarTypeSchema,
    UpdateEmailSchema,
    UpdateUsernameSchema,
} from "../../../../formValidation";
import { useFormContext } from "../../../../contexts/FormContext";
import { getErrorMessages } from "../../../../utils";
import DetailItem from "../../../../components/DetailItem";
import CustomButton from "../../../../components/CustomButton";
import { useNavContext } from "../../../../contexts/NavContext";
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

interface Props {}

const Account = ({}: Props) => {
    const { user, updateUser } = useAuthContext();
    const [existingImageName, setExistingImageName] = useState<string>("");
    const [editing, setEditing] = useState<string>("");
    const {
        file,
        updateFile,
        addFormMessages,
        updateIcon,
        updateDialogButtons,
    } = useFormContext();
    const [errors, setErrors] = useState<string[]>([]);
    const usernameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const avatarRef = useRef<HTMLInputElement>(null);
    const { navOpen } = useNavContext();

    useEffect(() => {
        if (user) {
            setExistingImageName(getImageNameFromUrl(user.picture));
        }
    }, [user]);

    const editingIcons = [
        {
            iconType: "tick",
            onClick: () => updateItem(editing),
            fontSize: "82px",
        },
        {
            iconType: "close",
            onClick: () => setEditing(""),
            fontSize: "82px",
        },
    ];

    const editableDetailItems = [
        {
            title: "Username",
            subtitle: user?.username,
            name: "username",
            defaultValue: user?.username,
            ref: usernameRef,
        },
        {
            title: "Email",
            subtitle: user?.email,
            name: "email",
            defaultValue: user?.email,
            ref: emailRef,
        },
    ];

    const getImageNameFromUrl = (url: string) => {
        return decodeURI(url.split("avatars%2F")[1].split("?alt")[0]);
    };

    const updateUserDetail = async (
        type: string,
        validation: () => void,
        preFormMessage: string,
        icon: string,
        updateFunction: () => Promise<void>,
        postFormMessage: string
    ) => {
        try {
            setErrors([]);
            validation();

            addFormMessages(
                new Set([
                    {
                        message: preFormMessage,
                        type: FormMessageTypes.INFO,
                    },
                ])
            );
            updateIcon(
                <Icons
                    iconType={icon}
                    className="text-primary"
                    fontSize="132px"
                />
            );

            await updateFunction();

            addFormMessages(
                new Set([
                    {
                        message: postFormMessage,
                        type: FormMessageTypes.INFO,
                    },
                ])
            );

            setTimeout(() => {
                addFormMessages(new Set([]));
                setEditing("");
            }, 2000);
        } catch (err: any) {
            setErrors(getErrorMessages(err.errors, type));
        }
    };

    const passwordReset = async () => {
        addFormMessages(
            new Set([
                {
                    message: "Are you sure you want to reset your password?",
                    type: FormMessageTypes.INFO,
                },
            ])
        );

        updateIcon(
            <Icons
                iconType="password"
                className="text-primary"
                fontSize="132px"
            />
        );

        updateDialogButtons([
            {
                text: "Yes",
                onClick: async () => {
                    try {
                        const response = (await changePassword(
                            user?.email
                        )) as {
                            message: string;
                        };

                        updateDialogButtons([]);

                        addFormMessages(
                            new Set([
                                {
                                    message: response?.message,
                                    type: FormMessageTypes.INFO,
                                },
                            ])
                        );
                        setTimeout(() => {
                            addFormMessages(new Set([]));
                            setEditing("");
                        }, 5000);
                    } catch (err: any) {
                        const errorCode = err.code;
                        const errorMessage = err.message;
                    }
                },
                classes: "bg-primary p-2 px-4 min-w-dialogButton rounded-lg",
            },
            {
                text: "No",
                onClick: () => {
                    addFormMessages(new Set([]));
                    updateDialogButtons([]);
                },
                classes: "bg-primary p-2 px-4 min-w-dialogButton rounded-lg",
            },
        ]);
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
                    "Updating username",
                    "accountCreated",
                    async () => {
                        if (usernameRef?.current?.value && user?.user_id) {
                            const newUserData = await updateUserProfile(
                                user.user_id,
                                {
                                    username: usernameRef.current.value,
                                }
                            );
                            updateUser(newUserData);
                        }
                    },
                    "Username updated"
                );
                break;
            case "email":
                updateUserDetail(
                    "email",
                    () =>
                        UpdateEmailSchema.parse({
                            email: emailRef?.current?.value,
                        }),
                    "Updating email",
                    "accountCreated",
                    async () => {
                        if (emailRef?.current?.value && user?.user_id) {
                            const newUserData = await updateUserProfile(
                                user.user_id,
                                {
                                    email: emailRef.current.value,
                                }
                            );
                            updateUser(newUserData);

                            addFormMessages(
                                new Set([
                                    {
                                        message:
                                            "Email sddress updated. Please check your inbox and confirm your new email address.",
                                        type: FormMessageTypes.INFO,
                                    },
                                ])
                            );
                        }
                    },
                    "Email address updated"
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
                    "Updating avatar",
                    "accountCreated",
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
                            } catch (err: any) {
                                addFormMessages(
                                    new Set([
                                        {
                                            message: err.message,
                                            type: FormMessageTypes.ERROR,
                                        },
                                    ])
                                );
                            }
                        }
                    },
                    "Avatar updated"
                );
                break;
        }
    };

    const deleteAccount = async () => {
        addFormMessages(
            new Set([
                {
                    message:
                        "Are you sure you want to delete your account? This cannot be undone.",
                    type: FormMessageTypes.ERROR,
                },
            ])
        );

        updateIcon(
            <Icons
                iconType="deleteAccount"
                className="text-error"
                fontSize="132px"
            />
        );

        updateDialogButtons([
            {
                text: "Yes",
                onClick: async () => {
                    try {
                        if (user) {
                            addFormMessages(
                                new Set([
                                    {
                                        message: "Deleting account",
                                        type: FormMessageTypes.INFO,
                                    },
                                ])
                            );

                            await deleteUser(user.email);
                        }

                        updateDialogButtons([]);

                        addFormMessages(
                            new Set([
                                {
                                    message:
                                        "Your account has now been deleted. We are sorry to see you go.",
                                    type: FormMessageTypes.INFO,
                                },
                            ])
                        );
                        setTimeout(() => {
                            addFormMessages(new Set([]));
                            setEditing("");
                            signOut({ callbackUrl: "/" });
                        }, 5000);
                    } catch (err: any) {}
                },
                classes: "bg-primary p-2 px-4 min-w-dialogButton rounded-lg",
            },
            {
                text: "No",
                onClick: () => {
                    addFormMessages(new Set([]));
                    updateDialogButtons([]);
                },
                classes: "bg-primary p-2 px-4 min-w-dialogButton rounded-lg",
            },
        ]);
    };

    return (
        <div
            className={`px-8 pt-16 flex flex-col items-center relative h-full min-h-screen ${
                navOpen ? "disable" : ""
            }`}
        >
            <PageTitle title="Account" />
            <Icons
                iconType="logout"
                className="absolute top-16 right-6"
                onClick={() => signOut({ callbackUrl: "/" })}
                fontSize="84px"
            />
            <div className="aspect-square w-full flex justify-center px-8">
                {user?.picture && (
                    <div className="w-full mt-8">
                        <Avatar
                            image={file ? file : user.picture || ""}
                            icon={
                                <Icons
                                    iconType="edit"
                                    className={`border-2 border-primary bg-primary-light rounded-full p-2 relative bottom-6 ${
                                        editing === "avatar" ? "hidden" : ""
                                    }`}
                                    fontSize="102px"
                                    onClick={() => setEditing("avatar")}
                                />
                            }
                        />
                    </div>
                )}
            </div>
            {editing === "avatar" && (
                <div>
                    <div className="flex items-center">
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
                        <div className="flex">
                            {file.length > 0 && (
                                <div className="mx-1">
                                    <Icons
                                        iconType="tick"
                                        onClick={() => updateItem(editing)}
                                        fontSize="82px"
                                    />
                                </div>
                            )}
                            <div className="mx-1">
                                <Icons
                                    iconType="close"
                                    onClick={() => {
                                        setEditing("");
                                        updateFile("");
                                        setErrors([]);
                                    }}
                                    fontSize="82px"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {user && (
                <div className="w-full">
                    {editableDetailItems.map((item) => (
                        <EditableDetailItem
                            key={item.name}
                            clasName="w-full"
                            title={item.title}
                            subtitle={item.subtitle || ""}
                            iconNotEditing={
                                <Icons
                                    iconType="edit"
                                    onClick={() => setEditing(item.name)}
                                    fontSize="72px"
                                />
                            }
                            iconsEditing={editingIcons}
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
                                fontSize="72px"
                            />
                        }
                    />
                </div>
            )}
            <CustomButton
                label="Delete account"
                type="button"
                onClick={() => deleteAccount()}
                buttonClassName="text-error text-xl absolute bottom-4 right-4"
            />
        </div>
    );
};

export default Account;
