"use client";

import React from "react";
import ImageWithFallback from "../../components/ImageWithFallback";
import { useRouter, useSelectedLayoutSegment } from "next/navigation";
import CustomButton from "../../components/CustomButton";
import FormDialog from "../../components/FormDialog";
import { useAuthContext } from "../../contexts/AuthContext";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    const { dialogMessages, icon } = useAuthContext();
    const router = useRouter();
    const currentPage = useSelectedLayoutSegment();

    const getPageProps = (page: string | null) => {
        switch (page) {
            case "signin":
                return {
                    title: "Sign in",
                    buttonText: "Log in",
                    linkText: "Not registered? Register now",
                    linkTo: "/register",
                };
            case "register":
                return {
                    title: "Register",
                    buttonText: "Register",
                    linkText: "Already registered? Log in",
                    linkTo: "/signin",
                };
            default:
                return {
                    title: "Sign in",
                    buttonText: "Log in",
                    linkText: "Not registered? Register now",
                    linkTo: "/register",
                };
        }
    };

    return (
        <div className="AuthLayout">
            <FormDialog formMessages={dialogMessages} messageIcon={icon} />
            <div
                className={`flex flex-col items-center ${
                    dialogMessages.length > 0 ? "opacity-30" : "opacity-100"
                }`}
            >
                <div
                    className="absolute top-4 left-4 h-10 w-8"
                    onClick={() => router.push("/")}
                >
                    <ImageWithFallback
                        title=""
                        image={{
                            url: "/assets/icons/back.png",
                            name: "Back",
                        }}
                        fit="contain"
                        layout="responsive"
                        containerClassname="w-full"
                    />
                </div>
                <div className="text-4xl mt-20 capitalize">
                    {getPageProps(currentPage).title}
                </div>
                <div className="w-full">{children}</div>
                <div className="absolute top-4 right-4">
                    <CustomButton
                        label={getPageProps(currentPage).linkText}
                        type="button"
                        buttonClassName=""
                        labelClassName="capitalize"
                        onClick={() =>
                            router.push(getPageProps(currentPage).linkTo)
                        }
                    />
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;
