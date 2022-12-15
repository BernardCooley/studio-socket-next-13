"use client";

import React, { FormEvent, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import CustomTextInput from "../../../components/CustomTextInput";
import { getFormMessages, RegisterFormSchema } from "../../../formValidation";
import { getErrorMessages, getRoute } from "../../../utils";
import AuthForm from "../../../components/AuthForm";

interface Props {}

const Register = ({}: Props) => {
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const repeatPasswordRef = useRef<HTMLInputElement>(null);
    const [errors, setErrors] = useState([]);
    const router = useRouter();
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

            if (
                emailRef.current &&
                passwordRef.current &&
                repeatPasswordRef.current
            ) {
                try {
                    clearMessages();
                    router.push(getRoute("Dashboard").path);
                } catch (err: any) {
                    setFormMessages(getFormMessages(err.code, formMessages));
                }
            }
        }
    };

    const validate = () => {
        try {
            RegisterFormSchema.parse({
                email: emailRef.current?.value,
                password: passwordRef.current?.value,
                repeatPassword: repeatPasswordRef.current?.value,
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
        <div className="register pt-14" data-testid="register-page">
            <AuthForm
                handleSubmit={handleSubmit}
                onFormClick={onFormClick}
                formMessages={formMessages}
                showFormMessages={showFormMessages}
                submitButtonDisabled={submitButtonDisabled}
                buttonLabel="Register"
            >
                <CustomTextInput
                    id="email"
                    type="email"
                    label="Email"
                    name="email"
                    className=""
                    ref={emailRef}
                    defaultValue={
                        !isProduction ? "bernardcooley@gmail.com" : ""
                    }
                    errorMessages={getErrorMessages(errors, "email")}
                    onBlur={validate}
                />
                <CustomTextInput
                    className=""
                    type="password"
                    id="password"
                    label="Password"
                    name="password"
                    ref={passwordRef}
                    defaultValue={!isProduction ? "Yeloocc1" : ""}
                    errorMessages={getErrorMessages(errors, "password")}
                    onBlur={validate}
                />
                <CustomTextInput
                    className=""
                    type="password"
                    id="repeatPassword"
                    label="Repeat password"
                    name="repeatPassword"
                    ref={repeatPasswordRef}
                    defaultValue={!isProduction ? "Yeloocc1" : ""}
                    errorMessages={getErrorMessages(errors, "repeatPassword")}
                    onBlur={validate}
                />
            </AuthForm>
        </div>
    );
};

export default Register;
