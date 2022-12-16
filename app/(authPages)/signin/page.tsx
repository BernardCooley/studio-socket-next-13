"use client";

import React, { useState, useRef, FormEvent, useEffect } from "react";
import CustomTextInput from "../../../components/CustomTextInput";
import { getFormMessages, LoginFormSchema } from "../../../formValidation";
import { getErrorMessages, noop } from "../../../utils";
import AuthForm from "../../../components/AuthForm";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthContext } from "../../../contexts/AuthContext";

interface Props {}

const SignIn = ({}: Props) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { updateDialogMessages, dialogMessages } = useAuthContext();
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const [errors, setErrors] = useState([]);
    const [submitting, setSubmitting] = useState<boolean>(false);

    useEffect(() => {
        const messages = getFormMessages(searchParams.getAll("error")[0]);
        updateDialogMessages(messages);
    }, []);

    const clearMessages = () => {
        setSubmitting(false);
    };

    const handleSubmit = async (e: FormEvent) => {
        clearMessages();
        setSubmitting(true);
        e.preventDefault();

        if (validate() && errors.length === 0) {
            if (emailRef.current && passwordRef.current) {
                setSubmitting(true);
                try {
                    await signIn("credentials", {
                        email: emailRef.current.value,
                        password: passwordRef.current.value,
                        callbackUrl: "/account",
                    });
                } catch (err: any) {
                    setSubmitting(false);
                    console.error(err);
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
            return true;
        } catch (err: any) {
            setSubmitting(false);
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
                submitButtonDisabled={submitting}
                buttonLabel={submitting ? "Signing in..." : `Sign in`}
                onFormClick={
                    dialogMessages.length > 0 ? () => router.back() : noop
                }
            >
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
                />
            </AuthForm>
        </div>
    );
};

export default SignIn;
