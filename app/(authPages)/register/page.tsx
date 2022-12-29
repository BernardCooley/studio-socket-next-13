"use client";

import React, { FormEvent, useRef, useState } from "react";
import CustomTextInput from "../../../components/CustomTextInput";
import { getFormMessages, RegisterFormSchema } from "../../../formValidation";
import { getErrorMessages } from "../../../utils";
import AuthForm from "../../../components/AuthForm";
import { useFormContext } from "../../../contexts/FormContext";
import {
    createUserWithEmailAndPassword,
    deleteUser,
    sendEmailVerification,
} from "firebase/auth";
import { auth, db } from "../../../firebase/clientApp";
import { signIn } from "next-auth/react";
import { doc, setDoc } from "firebase/firestore";
import Avatar from "../../../components/Avatar";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import TogglePassword from "../../../components/TogglePassword";
import { FormMessageTypes } from "../../../types";
import Icons from "../../../icons";
import { useRouter } from "next/navigation";
import routes from "../../../routes";

interface Props {}

const Register = ({}: Props) => {
    const router = useRouter();
    const storage = getStorage();
    const { file, updateFile, addFormMessages, formMessages, updateIcon } =
        useFormContext();
    const emailRef = useRef<HTMLInputElement>(null);
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const repeatPasswordRef = useRef<HTMLInputElement>(null);
    const avatarRef = useRef<HTMLInputElement>(null);
    const [errors, setErrors] = useState([]);
    const [triggerResetValue, setTriggerResetValue] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const handleSubmit = async (e: FormEvent) => {
        setErrors([]);
        e.preventDefault();

        if (validate() && errors?.length === 0) {
            if (
                usernameRef.current &&
                emailRef.current &&
                passwordRef.current &&
                repeatPasswordRef.current
            ) {
                addFormMessages(
                    new Set([
                        {
                            message: "Creating account...",
                            type: FormMessageTypes.INFO,
                        },
                    ])
                );
                updateIcon(
                    <Icons
                        iconType="formLoading"
                        className="text-primary"
                        fontSize="132px"
                    />
                );

                let user = null;
                try {
                    user = await createUserWithEmailAndPassword(
                        auth,
                        emailRef.current.value,
                        passwordRef.current.value
                    );

                    await setDoc(doc(db, "users", user.user.uid), {
                        username: usernameRef.current.value,
                    });

                    if (avatarRef.current?.files) {
                        try {
                            const storageRef = ref(
                                storage,
                                `users/avatars/${user.user.uid}_${avatarRef.current?.files[0].name}`
                            );
                            await uploadBytes(
                                storageRef,
                                avatarRef.current?.files[0]
                            );
                        } catch (err) {
                            console.log(err);
                        }
                    }

                    if (user.user) {
                        await sendEmailVerification(user.user);

                        addFormMessages(
                            new Set([
                                {
                                    message: `Account created. Welcome to Studio Socket. A confirmation email has been sent to ${emailRef.current.value}. Please check your inbox and spam folder.`,
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

                        setTimeout(async () => {
                            router.push(routes.signin().as);
                        }, 5000);
                    } else {
                        addFormMessages(
                            new Set([
                                {
                                    message:
                                        "Error creating account. Please try again.",
                                    type: FormMessageTypes.INFO,
                                },
                            ])
                        );
                    }
                } catch (err: any) {
                    if (user) {
                        await deleteUser(user.user);
                    }
                    addFormMessages(getFormMessages(err.code));
                }
            }
        }
    };

    const validate = () => {
        try {
            RegisterFormSchema.parse({
                username: usernameRef.current?.value,
                email: emailRef.current?.value,
                password: passwordRef.current?.value,
                repeatPassword: repeatPasswordRef.current?.value,
                avatar: avatarRef.current?.files
                    ? avatarRef.current?.files[0]?.name
                    : null,
            });
            return true;
        } catch (err: any) {
            setErrors(err.errors);
            return false;
        }
    };

    const handleDeleteAvatar = () => {
        updateFile("");
        setTriggerResetValue(!triggerResetValue);
    };

    return (
        <div
            className={`register pt-14 flex flex-col items-center ${
                formMessages.size > 0 ? "opacity-40 pointer-events-none" : ""
            }`}
            data-testid="register-page"
        >
            <AuthForm handleSubmit={handleSubmit} buttonLabel="Register">
                <CustomTextInput
                    className={`${
                        formMessages.size > 0 ? "pointer-events-none" : ""
                    }`}
                    id="username"
                    type="text"
                    label="Username *"
                    name="username"
                    ref={usernameRef}
                    errorMessages={getErrorMessages(errors, "username")}
                />
                <CustomTextInput
                    className={`${
                        formMessages.size > 0 ? "pointer-events-none" : ""
                    }`}
                    id="email"
                    type="email"
                    label="Email *"
                    name="email"
                    ref={emailRef}
                    errorMessages={getErrorMessages(errors, "email")}
                    defaultValue="bernardcooley1@gmail.com"
                />
                <CustomTextInput
                    className={`${
                        formMessages.size > 0 ? "pointer-events-none" : ""
                    }`}
                    type={showPassword ? "text" : "password"}
                    id="password"
                    label="Password *"
                    name="password"
                    ref={passwordRef}
                    errorMessages={getErrorMessages(errors, "password")}
                    defaultValue="password"
                    fieldIcon={
                        <TogglePassword
                            isShowing={showPassword}
                            onClick={() => setShowPassword(!showPassword)}
                        />
                    }
                />
                <CustomTextInput
                    className={`${
                        formMessages.size > 0 ? "pointer-events-none" : ""
                    }`}
                    type={showPassword ? "text" : "password"}
                    id="repeatPassword"
                    label="Repeat password *"
                    name="repeatPassword"
                    ref={repeatPasswordRef}
                    errorMessages={getErrorMessages(errors, "repeatPassword")}
                    defaultValue="password"
                    fieldIcon={
                        <TogglePassword
                            isShowing={showPassword}
                            onClick={() => setShowPassword(!showPassword)}
                        />
                    }
                />
                <CustomTextInput
                    className={`${
                        formMessages.size > 0 ? "pointer-events-none" : ""
                    }`}
                    type="file"
                    id="avatar"
                    label="Avatar (jpg, jpeg, png)"
                    name="avatar"
                    ref={avatarRef}
                    errorMessages={getErrorMessages(errors, "avatar")}
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
                                fontSize="92px"
                            />
                        }
                    />
                )}
            </AuthForm>
        </div>
    );
};

export default Register;
