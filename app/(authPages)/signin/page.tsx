"use client";

import React, { useState, useRef, FormEvent, useEffect } from "react";
import CustomTextInput from "../../../components/CustomTextInput";
import { getFormMessages, LoginFormSchema } from "../../../formValidation";
import { getErrorMessages, noop } from "../../../utils";
import AuthForm from "../../../components/AuthForm";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useFormContext } from "../../../contexts/FormContext";
import TogglePassword from "../../../components/TogglePassword";
import { FormMessageTypes } from "../../../types";
import Icons from "../../../icons";
import { auth } from "../../../firebase/clientApp";
import { signInWithEmailAndPassword } from "firebase/auth";

interface Props {}

const SignIn = ({}: Props) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { addFormMessages, formMessages, updateIcon } = useFormContext();
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const [errors, setErrors] = useState([]);
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);

    useEffect(() => {
        const messages = getFormMessages(searchParams.getAll("error")[0]);
        addFormMessages(messages);
    }, []);

    const validateAndSignin = async (e: FormEvent) => {
        e.preventDefault();

        try {
            LoginFormSchema.parse({
                email: emailRef.current?.value,
                password: passwordRef.current?.value,
            });
            setSubmitting(true);

            addFormMessages(
                new Set([
                    {
                        message: "Signing in...",
                        type: FormMessageTypes.INFO,
                    },
                ])
            );
            updateIcon(
                <Icons
                    iconType="signIn"
                    className="text-primary"
                    fontSize="132px"
                />
            );
            if (emailRef.current && passwordRef.current) {
                try {
                    await signInWithEmailAndPassword(
                        auth,
                        emailRef.current.value,
                        passwordRef.current.value
                    );
                    await signIn("credentials", {
                        email: emailRef.current.value,
                        password: passwordRef.current.value,
                        callbackUrl: "/dashboard",
                    });
                } catch (err: any) {
                    setSubmitting(false);
                    updateIcon(
                        <Icons
                            iconType="warning"
                            className="text-error"
                            fontSize="132px"
                        />
                    );
                    addFormMessages(getFormMessages(err.code));
                    console.error(err);
                }
            }
        } catch (err: any) {
            setSubmitting(false);
            addFormMessages(new Set([]));
            setErrors(err.errors);
        }
    };

    return (
        <div
            className={`signin pt-14 flex flex-col items-center ${
                submitting ? "opacity-40 pointer-events-none" : ""
            }`}
            data-testid="signin-page"
        >
            <AuthForm
                handleSubmit={validateAndSignin}
                buttonLabel={submitting ? "Signing in..." : `Sign in`}
                onFormClick={formMessages.size > 0 ? () => router.back() : noop}
            >
                <CustomTextInput
                    className={`${
                        formMessages.size > 0 ? "pointer-events-none" : ""
                    }`}
                    id="email"
                    type="email"
                    label="Email"
                    name="email"
                    ref={emailRef}
                    errorMessages={getErrorMessages(errors, "email")}
                />
                <CustomTextInput
                    className={`${
                        formMessages.size > 0 ? "pointer-events-none" : ""
                    }`}
                    type={showPassword ? "text" : "password"}
                    id="password"
                    label="Password"
                    name="password"
                    ref={passwordRef}
                    errorMessages={getErrorMessages(errors, "password")}
                    fieldIcon={
                        <TogglePassword
                            isShowing={showPassword}
                            onClick={() => setShowPassword(!showPassword)}
                        />
                    }
                />
            </AuthForm>
        </div>
    );
};

export default SignIn;
