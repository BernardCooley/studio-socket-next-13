"use client";

import React from "react";
import { useRouter, useSelectedLayoutSegment } from "next/navigation";
import CustomButton from "../../components/CustomButton";
import FormDialog from "../../components/FormDialog";
import { useFormContext } from "../../contexts/FormContext";
import routes from "../../routes";
import BackButton from "../../components/BackButton";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    const { icon, formMessages } = useFormContext();
    const router = useRouter();
    const currentPage = useSelectedLayoutSegment();

    const pageProps = (page: string | null) => {
        switch (page) {
            case "signin":
                return {
                    title: "Sign in",
                    buttonText: "Log in",
                    linkText: "Not registered? Register now",
                    linkTo: routes.register().as,
                };
            case "register":
                return {
                    title: "Register",
                    buttonText: "Register",
                    linkText: "Already registered? Log in",
                    linkTo: routes.signin().as,
                };
            default:
                return {
                    title: "Sign in",
                    buttonText: "Log in",
                    linkText: "Not registered? Register now",
                    linkTo: routes.register().as,
                };
        }
    };

    return (
        <div className="AuthLayout">
            <FormDialog messages={formMessages} messageIcon={icon} />
            <div
                className={`flex flex-col items-center ${
                    formMessages.size > 0 ? "opacity-30" : "opacity-100"
                }`}
            >
                <BackButton onClick={() => router.push(routes.home().as)} />
                <div className="text-4xl mt-20 capitalize">
                    {pageProps(currentPage).title}
                </div>
                <div className="w-full">{children}</div>
                <div className="absolute top-4 right-4">
                    <CustomButton
                        label={pageProps(currentPage).linkText}
                        type="button"
                        buttonClassName=""
                        labelClassName="capitalize"
                        onClick={() =>
                            router.push(pageProps(currentPage).linkTo)
                        }
                    />
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;
