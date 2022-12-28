"use client";

import { signOut, useSession } from "next-auth/react";
import React, { useEffect, useRef, useState } from "react";
import Avatar from "../../../components/Avatar";
import PageTitle from "../../../components/PageTitle";
import { FormMessageTypes, UserData } from "../../../types";
import {
    getFirebaseImage,
    getSingleDocument,
} from "../../../firebase/functions";
import Icons from "../../../icons";
import { db, auth } from "../../../firebase/clientApp";
import EditableDetailItem from "../../../components/EditableDetailItem";
import {
    UpdateEmailSchema,
    UpdateUsernameSchema,
} from "../../../formValidation";
import { useFormContext } from "../../../contexts/FormContext";
import { doc, updateDoc } from "firebase/firestore";
import { getErrorMessages } from "../../../utils";
import {
    sendEmailVerification,
    sendPasswordResetEmail,
    updateEmail,
} from "firebase/auth";
import DetailItem from "../../../components/DetailItem";

interface Props {}

const Account = ({}: Props) => {
    const { data: user } = useSession();
    const [userData, setUserData] = useState<UserData>({
        username: "",
        devices: [],
    });
    const [editing, setEditing] = useState<string>("");
    const { addFormMessages, updateIcon, updateDialogButtons } =
        useFormContext();
    const [errors, setErrors] = useState<string[]>([]);
    const usernameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setErrors([]);
        if (user?.user && db) {
            getUserData();
        }
    }, [user, db, auth]);

    const getUserData = async () => {
        try {
            const userData = await getSingleDocument("users", user?.user.id);
            if (userData) {
                userData.email = user?.user.email || "";

                const image = await getFirebaseImage(
                    "users/avatars",
                    `${user?.user.id}`
                );

                if (image) {
                    userData.imageUrl = image.url;
                }

                setUserData(userData as UserData);
            }
        } catch (err) {}
    };

    const editIcon = (type: string) => {
        switch (type) {
            case "username":
                setEditing("username");
                break;
            case "email":
                setEditing("email");
                break;
            case "password":
                setEditing("password");
                break;
            default:
                break;
        }
    };

    const updateUsername = async () => {
        try {
            UpdateUsernameSchema.parse({
                username: usernameRef?.current?.value,
            });

            setErrors([]);

            addFormMessages(
                new Set([
                    {
                        message: "Updating username",
                        type: FormMessageTypes.INFO,
                    },
                ])
            );
            updateIcon(
                <Icons
                    iconType="accountCreated"
                    className="text-primary"
                    fontSize="132px"
                />
            );

            const userRef = doc(db, "users", user?.user.id);

            await updateDoc(userRef, {
                username: usernameRef?.current?.value,
            });
            addFormMessages(
                new Set([
                    {
                        message: "Username updated",
                        type: FormMessageTypes.INFO,
                    },
                ])
            );

            setTimeout(() => {
                addFormMessages(new Set([]));
                setEditing("");
            }, 2000);
        } catch (err: any) {
            setErrors(getErrorMessages(err.errors, "username"));
        }
    };

    const updateEmailAddress = async () => {
        try {
            UpdateEmailSchema.parse({
                email: emailRef?.current?.value,
            });

            setErrors([]);

            addFormMessages(
                new Set([
                    {
                        message: "Updating email",
                        type: FormMessageTypes.INFO,
                    },
                ])
            );
            updateIcon(
                <Icons
                    iconType="accountCreated"
                    className="text-primary"
                    fontSize="132px"
                />
            );

            if (auth.currentUser && emailRef?.current?.value) {
                await updateEmail(auth.currentUser, emailRef.current.value);
                await sendEmailVerification(auth.currentUser);

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

            setTimeout(() => {
                addFormMessages(new Set([]));
                setEditing("");
            }, 5000);
        } catch (err: any) {
            setErrors(getErrorMessages(err.errors, "email"));
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
                        await sendPasswordResetEmail(
                            auth,
                            auth.currentUser?.email || ""
                        );

                        updateDialogButtons([]);

                        addFormMessages(
                            new Set([
                                {
                                    message: `A password reset email has been sent to ${auth.currentUser?.email}. Please check your inbox and follow the instructions to reset your password.`,
                                    type: FormMessageTypes.INFO,
                                },
                            ])
                        );
                        setTimeout(() => {
                            addFormMessages(new Set([]));
                            setEditing("");
                        }, 5000);
                    } catch (err: any) {
                        console.log(
                            "🚀 ~ file: page.tsx:189 ~ passwordReset ~ error",
                            err
                        );
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
                updateUsername();
                break;
            case "email":
                updateEmailAddress();
                break;
            case "password":
                passwordReset();
                break;
        }
    };

    return (
        <div className="px-8 pt-16 flex flex-col items-center relative">
            <PageTitle title="Account" />
            <Icons
                iconType="logout"
                className="absolute top-16 right-6"
                onClick={() => signOut({ callbackUrl: "/" })}
                fontSize="84px"
            />
            <div className="aspect-square w-full flex justify-center px-8">
                {userData?.imageUrl && (
                    <div className="w-full mt-8">
                        <Avatar
                            image={userData.imageUrl || ""}
                            icon={
                                <Icons
                                    iconType="edit"
                                    className="border-2 border-primary bg-primary-light rounded-full p-2 relative bottom-6"
                                    fontSize="102px"
                                />
                            }
                        />
                    </div>
                )}
            </div>
            {userData && (
                <div className="w-full">
                    <EditableDetailItem
                        clasName="w-full"
                        title="Username"
                        subtitle={userData.username}
                        iconNotEditing={
                            <Icons
                                iconType="edit"
                                onClick={() => editIcon("username")}
                                fontSize="72px"
                            />
                        }
                        iconEditing={
                            <Icons
                                iconType="tick"
                                onClick={() => updateItem("username")}
                                fontSize="72px"
                            />
                        }
                        editing={editing === "username"}
                        defaultValue={userData.username}
                        ref={usernameRef}
                        showIcons={true}
                        errorMessages={errors}
                    />
                    <EditableDetailItem
                        clasName="w-full"
                        title="Email address"
                        subtitle={userData.email || ""}
                        iconNotEditing={
                            <Icons
                                iconType="edit"
                                onClick={() => editIcon("email")}
                                fontSize="72px"
                            />
                        }
                        iconEditing={
                            <Icons
                                iconType="tick"
                                onClick={() => updateItem("email")}
                                fontSize="72px"
                            />
                        }
                        editing={editing === "email"}
                        defaultValue={userData.email || ""}
                        ref={emailRef}
                        showIcons={true}
                        errorMessages={errors}
                    />
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
        </div>
    );
};

export default Account;
