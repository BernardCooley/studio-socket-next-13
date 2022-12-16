"use client";

import React, { FormEvent, useEffect, useRef, useState } from "react";
import CustomTextInput from "../../../components/CustomTextInput";
import { getFormMessages, RegisterFormSchema } from "../../../formValidation";
import { getErrorMessages } from "../../../utils";
import AuthForm from "../../../components/AuthForm";
import { useAuthContext } from "../../../contexts/AuthContext";
import { createUserWithEmailAndPassword, deleteUser } from "firebase/auth";
import { auth, db } from "../../../firebase/clientApp";
import { signIn } from "next-auth/react";
import { doc, setDoc } from "firebase/firestore";
import Avatar from "../../../components/Avatar";

interface Props {}

const Register = ({}: Props) => {
    const { updateDialogMessages, dialogMessages, file, updateFile } =
        useAuthContext();
    const emailRef = useRef<HTMLInputElement>(null);
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const repeatPasswordRef = useRef<HTMLInputElement>(null);
    const avatarRef = useRef<HTMLInputElement>(null);
    const [errors, setErrors] = useState([]);
    const [submitting, setSubmitting] = useState<boolean>(false);

    const clearMessages = () => {
        setErrors([]);
        setSubmitting(false);
    };

    const handleSubmit = async (e: FormEvent) => {
        setSubmitting(true);
        clearMessages();
        e.preventDefault();

        if (validate() && errors.length === 0) {
            if (
                usernameRef.current &&
                emailRef.current &&
                passwordRef.current &&
                repeatPasswordRef.current
            ) {
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

                    await signIn("credentials", {
                        email: emailRef.current.value,
                        password: passwordRef.current.value,
                        callbackUrl: "/account",
                    });
                } catch (err: any) {
                    if (user) {
                        await deleteUser(user.user);
                    }
                    setSubmitting(false);
                    updateDialogMessages(
                        getFormMessages(err.code, dialogMessages)
                    );
                }
            }
        }
    };

    const validate = () => {
        try {
            // TODO: Add avatar validation
            RegisterFormSchema.parse({
                username: usernameRef.current?.value,
                email: emailRef.current?.value,
                password: passwordRef.current?.value,
                repeatPassword: repeatPasswordRef.current?.value,
            });
            return true;
        } catch (err: any) {
            setErrors(err.errors);
            return false;
        }
    };

    return (
        <div
            className={`register pt-14 flex flex-col items-center ${
                submitting ? "opacity-40 pointer-events-none" : ""
            }`}
            data-testid="register-page"
        >
            <AuthForm
                handleSubmit={handleSubmit}
                submitButtonDisabled={submitting}
                buttonLabel="Register"
            >
                <CustomTextInput
                    className={`${
                        dialogMessages.length > 0 ? "pointer-events-none" : ""
                    }`}
                    id="username"
                    type="text"
                    label="Username"
                    name="username"
                    ref={usernameRef}
                    errorMessages={getErrorMessages(errors, "username")}
                    onBlur={validate}
                />
                <CustomTextInput
                    className={`${
                        dialogMessages.length > 0 ? "pointer-events-none" : ""
                    }`}
                    id="email"
                    type="email"
                    label="Email"
                    name="email"
                    ref={emailRef}
                    errorMessages={getErrorMessages(errors, "email")}
                    onBlur={validate}
                    defaultValue="bernardcooley1@gmail.com"
                />
                <CustomTextInput
                    className={`${
                        dialogMessages.length > 0 ? "pointer-events-none" : ""
                    }`}
                    type="password"
                    id="password"
                    label="Password"
                    name="password"
                    ref={passwordRef}
                    errorMessages={getErrorMessages(errors, "password")}
                    onBlur={validate}
                    defaultValue="password"
                />
                <CustomTextInput
                    className={`${
                        dialogMessages.length > 0 ? "pointer-events-none" : ""
                    }`}
                    type="password"
                    id="repeatPassword"
                    label="Repeat password"
                    name="repeatPassword"
                    ref={repeatPasswordRef}
                    errorMessages={getErrorMessages(errors, "repeatPassword")}
                    onBlur={validate}
                    defaultValue="password"
                />
                {file ? (
                    <Avatar
                        image={file}
                        containerClassname="w-3/4 mb-4"
                        buttonClassname="bg-primary text-primary-light w-24"
                        onClick={() => updateFile("")}
                    />
                ) : (
                    <CustomTextInput
                        className={`${
                            dialogMessages.length > 0
                                ? "pointer-events-none"
                                : ""
                        }`}
                        type="file"
                        id="avatar"
                        label="Avatar"
                        name="avatar"
                        ref={avatarRef}
                        errorMessages={getErrorMessages(errors, "avatar")}
                        onBlur={validate}
                        isFile={true}
                        borderless={true}
                        scaleLabel={false}
                    />
                )}
            </AuthForm>
        </div>
    );
};

export default Register;
