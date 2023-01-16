"use client";

import { signOut, useSession } from "next-auth/react";
import React, { useEffect, useRef, useState } from "react";
import Avatar from "../../../components/Avatar";
import PageTitle from "../../../components/PageTitle";
import { FormMessageTypes, UserData } from "../../../types";
import Icons from "../../../icons";
import { db, auth } from "../../../firebase/clientApp";
import EditableDetailItem from "../../../components/EditableDetailItem";
import {
    UpdateEmailSchema,
    UpdateUsernameSchema,
} from "../../../formValidation";
import { useFormContext } from "../../../contexts/FormContext";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { getErrorMessages } from "../../../utils";
import {
    deleteUser,
    sendEmailVerification,
    sendPasswordResetEmail,
    updateEmail,
} from "firebase/auth";
import DetailItem from "../../../components/DetailItem";
import { fetchUserData } from "../../../firebase/functions";
import CustomButton from "../../../components/CustomButton";
import { useNavContext } from "../../../contexts/NavContext";

interface Props {}

const Account = ({}: Props) => {
    const { data: user } = useSession();
    // TODO: Take user data and auth from supabase instead of firebase
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
    const { navOpen } = useNavContext();

    const editingIcons = [
        {
            iconType: "tick",
            onClick: () => updateItem("username"),
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
            subtitle: userData.username,
            name: "username",
            defaultValue: userData.username,
            ref: usernameRef,
        },
        {
            title: "Email",
            subtitle: userData.email,
            name: "email",
            defaultValue: userData.email,
            ref: emailRef,
        },
    ];

    useEffect(() => {
        setErrors([]);
        if (user?.user && db) {
            getUserData();
        }
    }, [user, db, auth]);

    const getUserData = async () => {
        if (user) {
            const data = await fetchUserData(user);
            setUserData(data as UserData);
        }
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

    const updateUserDetail = async (
        type: string,
        validation: () => void,
        preFormMessage: string,
        icon: string,
        updateFunction: () => Promise<void>,
        postFormMessage: string
    ) => {
        try {
            validation();
            setErrors([]);

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
                updateUserDetail(
                    "username",
                    () =>
                        UpdateUsernameSchema.parse({
                            username: usernameRef?.current?.value,
                        }),
                    "Updating username",
                    "accountCreated",
                    async () => {
                        const userRef = doc(db, "users", user?.user.id);

                        await updateDoc(userRef, {
                            username: usernameRef?.current?.value,
                        });
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
                        if (auth.currentUser && emailRef?.current?.value) {
                            await updateEmail(
                                auth.currentUser,
                                emailRef.current.value
                            );
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
                    },
                    "Email address updated"
                );
                break;
            case "password":
                passwordReset();
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
                        if (auth.currentUser) {
                            addFormMessages(
                                new Set([
                                    {
                                        message: "Deleting account",
                                        type: FormMessageTypes.INFO,
                                    },
                                ])
                            );

                            await deleteDoc(
                                doc(db, "users", auth.currentUser.uid)
                            );
                            await deleteUser(auth.currentUser);
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

    return (
        <div
            className={`px-8 pt-16 flex flex-col items-center relative h-screen ${
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
                    {editableDetailItems.map((item) => (
                        <EditableDetailItem
                            key={item.name}
                            clasName="w-full"
                            title={item.title}
                            subtitle={item.subtitle || ""}
                            iconNotEditing={
                                <Icons
                                    iconType="edit"
                                    onClick={() => editIcon(item.name)}
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
