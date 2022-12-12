"use client";

import React, { FormEvent, useEffect, useRef, useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { useRouter } from "next/navigation";
import CustomTextInput from "../../../components/CustomTextInput";
import CustomButton from "../../../components/CustomButton";
import {
    generateFormMessages,
    RegisterFormSchema,
} from "../../../formValidation";
import { getErrorMessages, getRoute } from "../../../utils";
import FormDialog from "../../../components/FormDialog";

interface Props {}

const Register = ({}: Props) => {
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const repeatPasswordRef = useRef<HTMLInputElement>(null);
    const [errors, setErrors] = useState([]);
    const router = useRouter();
    const { register } = useAuth();
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
                    await register(
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
            RegisterFormSchema.parse({
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

    const onFormClick = () => {
        setShowFormMessages(false);
        setFormMessages([]);
        setSubmitButtonDisabled(false);
    };

    return (
        <div className="register pt-14" data-testid="register-page">
            <form
                onSubmit={handleSubmit}
                className="w-full flexCenter flex-col p-8"
                noValidate={true}
                onClick={onFormClick}
            >
                <div className="text-4xl mb-28">Create account</div>

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
                        className=""
                        ref={emailRef}
                        defaultValue={
                            !isProduction ? "bernardcooley@gmail.com" : ""
                        }
                        errorMessages={getErrorMessages(errors, "email")}
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
                    />
                    <CustomTextInput
                        className=""
                        type="password"
                        id="repeatPassword"
                        label="Repeat password"
                        name="repeatPassword"
                        ref={repeatPasswordRef}
                        defaultValue={!isProduction ? "Yeloocc1" : ""}
                        errorMessages={getErrorMessages(
                            errors,
                            "repeatPassword"
                        )}
                    />
                    <CustomButton
                        label="Register"
                        type="submit"
                        buttonClassName="authSubmitButton"
                        disabled={submitButtonDisabled}
                    />
                </div>
                <div className="absolute bottom-4 right-4">
                    <span>Already registered?</span>
                    <CustomButton
                        label="Log in"
                        type="button"
                        buttonClassName=""
                        labelClassName=""
                        onClick={() => router.push("/login")}
                    />
                </div>
            </form>
        </div>
    );
};

export default Register;
