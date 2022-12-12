"use client";

import React, { useState, useRef, FormEvent, useEffect } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { useRouter } from "next/navigation";
import CustomTextInput from "../../../components/CustomTextInput";
import CustomButton from "../../../components/CustomButton";
import FormDialog from "../../../components/FormDialog";
import { NextPage } from "next";
import { generateFormMessages, LoginFormSchema } from "../../../formValidation";
import { getErrorMessages, getRoute } from "../../../utils";

interface Props {}

const Login: NextPage<any> = ({}: Props) => {
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const [errors, setErrors] = useState([]);
    const [formMessages, setFormMessages] = useState<string[]>([]);
    const [showFormMessages, setShowFormMessages] = useState<boolean>(false);
    const router = useRouter();
    const { login } = useAuth();
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
                    await login(
                        emailRef.current.value,
                        passwordRef.current.value
                    );
                    clearMessages();
                    router.push(getRoute("Dashboard").path);
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
            return true;
        } catch (err: any) {
            setErrors(err.errors);
            return false;
        }
    };

    const onFormClick = () => {
        setShowFormMessages(false);
        setFormMessages([]);
        setSubmitButtonDisabled(false);
    };

    return (
        <div className="login pt-14" data-testid="login-page">
            <form
                onSubmit={handleSubmit}
                className="w-full flexCenter flex-col p-8"
                noValidate={true}
                onClick={onFormClick}
            >
                <div className="text-4xl mb-28">Log in</div>

                <div className="w-full flex flex-col justify-center items-center">
                    <FormDialog
                        formMessages={formMessages}
                        showFormMessages={showFormMessages}
                    />
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
                    />
                    <CustomButton
                        label="Log in"
                        type="submit"
                        buttonClassName={`authSubmitButton ${
                            showFormMessages ? "pointer-events-none" : ""
                        }`}
                        disabled={submitButtonDisabled}
                    />
                </div>
                <div className="absolute bottom-4 right-4">
                    <span>Not registered?</span>
                    <CustomButton
                        label="Register"
                        type="button"
                        buttonClassName=""
                        labelClassName=""
                        onClick={() => router.push("/register")}
                    />
                </div>
            </form>
        </div>
    );
};

export default Login;
