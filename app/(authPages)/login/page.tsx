"use client";

import React, { useState, useRef, FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import CustomTextInput from "../../../components/CustomTextInput";
import { generateFormMessages, LoginFormSchema } from "../../../formValidation";
import { getErrorMessages, getRoute } from "../../../utils";
import AuthForm from "../../../components/AuthForm";
import { useSession, signIn } from "next-auth/react";

interface Props {}

const Login = ({}: Props) => {
    const { data: session } = useSession();
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const [errors, setErrors] = useState([]);
    const [formMessages, setFormMessages] = useState<string[]>([]);
    const [showFormMessages, setShowFormMessages] = useState<boolean>(false);
    const router = useRouter();
    const [submitButtonDisabled, setSubmitButtonDisabled] =
        useState<boolean>(false);
    const isProduction = process.env.NODE_ENV === "production";

    if (session) {
        router.push(getRoute("Dashboard").path);
    }

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
                    signIn("credentials", {
                        email: emailRef.current.value,
                        password: passwordRef.current.value,
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
        <div className="login pt-14" data-testid="login-page">
            <AuthForm
                handleSubmit={handleSubmit}
                onFormClick={onFormClick}
                formMessages={formMessages}
                showFormMessages={showFormMessages}
                submitButtonDisabled={submitButtonDisabled}
                buttonLabel="Login"
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

export default Login;
