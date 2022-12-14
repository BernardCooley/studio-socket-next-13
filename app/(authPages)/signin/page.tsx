"use client";

import React, { useState, useRef, FormEvent, useEffect } from "react";
import CustomTextInput from "../../../components/CustomTextInput";
import { generateFormMessages, LoginFormSchema } from "../../../formValidation";
import { getErrorMessages } from "../../../utils";
import AuthForm from "../../../components/AuthForm";
import { signIn } from "next-auth/react";
import ImageWithFallback from "../../../components/ImageWithFallback";

interface Props {}

const SignIn = ({}: Props) => {
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const [errors, setErrors] = useState([]);
    const [formMessages, setFormMessages] = useState<string[]>([]);
    const [showFormMessages, setShowFormMessages] = useState<boolean>(false);
    const [submitButtonDisabled, setSubmitButtonDisabled] =
        useState<boolean>(false);
    const isProduction = process.env.NODE_ENV === "production";

    useEffect(() => {
        if (formMessages.length > 0) {
            setShowFormMessages(true);
        } else {
            setShowFormMessages(false);
        }
    }, [formMessages]);

    const clearMessages = () => {
        setFormMessages([]);
        setShowFormMessages(false);
        setErrors([]);
        setSubmitButtonDisabled(false);
    };

    const handleSubmit = async (e: FormEvent) => {
        clearMessages();
        e.preventDefault();

        if (validate() && errors.length === 0) {
            setSubmitButtonDisabled(true);

            if (emailRef.current && passwordRef.current) {
                try {
                    await signIn("credentials", {
                        email: emailRef.current.value,
                        password: passwordRef.current.value,
                        callbackUrl: "/dashboard",
                    });
                    clearMessages();
                } catch (err: any) {
                    setFormMessages(
                        generateFormMessages(err.code, formMessages)
                    );
                }
            }
        }
    };

    const validate = () => {
        try {
            LoginFormSchema.parse({
                email: emailRef.current?.value,
                password: passwordRef.current?.value,
            });
            setSubmitButtonDisabled(false);
            return true;
        } catch (err: any) {
            setSubmitButtonDisabled(true);
            setErrors(err.errors);
            return false;
        }
    };

    const onFormClick = () => {
        setShowFormMessages(false);
        setFormMessages([]);
    };

    return (
        <div
            className="signin pt-14 flex flex-col items-center"
            data-testid="signin-page"
        >
            <AuthForm
                handleSubmit={handleSubmit}
                onFormClick={onFormClick}
                formMessages={formMessages}
                showFormMessages={showFormMessages}
                submitButtonDisabled={submitButtonDisabled}
                buttonLabel="Sign in with email and password"
            >
                <CustomTextInput
                    id="email"
                    type="email"
                    label="Email"
                    name="email"
                    className={`${
                        showFormMessages ? "pointer-events-none" : ""
                    }`}
                    defaultValue={
                        !isProduction ? "bernardcooley@gmail.com" : ""
                    }
                    ref={emailRef}
                    errorMessages={getErrorMessages(errors, "email")}
                    onBlur={validate}
                />
                <CustomTextInput
                    className={`${
                        showFormMessages ? "pointer-events-none" : ""
                    }`}
                    type="password"
                    id="password"
                    label="Password"
                    name="password"
                    defaultValue={!isProduction ? "Yeloocc1" : ""}
                    ref={passwordRef}
                    errorMessages={getErrorMessages(errors, "password")}
                    onBlur={validate}
                />
            </AuthForm>
            <ImageWithFallback
                title=""
                image={{
                    url: "/assets/backgrounds/google-sign-in-button.png",
                    name: "google logo",
                }}
                fit="contain"
                layout="responsive"
                containerClassname="w-64 h-14"
                onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
                size={{ width: 30, height: 10 }}
            />
        </div>
    );
};

export default SignIn;
