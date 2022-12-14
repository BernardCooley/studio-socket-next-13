"use client";

import React, { useState, useRef, FormEvent, useEffect } from "react";
import CustomTextInput from "../../../components/CustomTextInput";
import { generateFormMessages, LoginFormSchema } from "../../../formValidation";
import { getErrorMessages } from "../../../utils";
import AuthForm from "../../../components/AuthForm";
import { signIn } from "next-auth/react";

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
    const [submitting, setSubmitting] = useState<boolean>(false);

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
            if (emailRef.current && passwordRef.current) {
                setSubmitting(true);
                try {
                    await signIn("credentials", {
                        email: emailRef.current.value,
                        password: passwordRef.current.value,
                        callbackUrl: "/dashboard",
                    });
                    clearMessages();
                } catch (err: any) {
                    setSubmitting(false);
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

    return (
        <div
            className={`signin pt-14 flex flex-col items-center ${
                submitting ? "opacity-40 pointer-events-none" : ""
            }`}
            data-testid="signin-page"
        >
            <AuthForm
                handleSubmit={handleSubmit}
                formMessages={formMessages}
                showFormMessages={showFormMessages}
                submitButtonDisabled={submitButtonDisabled}
                buttonLabel={submitting ? "Signing in..." : `Sign in`}
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
        </div>
    );
};

export default SignIn;
