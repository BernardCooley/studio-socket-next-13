"use client";

import React from "react";
import ImageWithFallback from "../../components/ImageWithFallback";
import { useRouter, useSelectedLayoutSegment } from "next/navigation";
import CustomButton from "../../components/CustomButton";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const currentPage = useSelectedLayoutSegment();

    const getPageProps = (page: string | null) => {
        switch (page) {
            case "login":
                return {
                    title: "Log in",
                    buttonText: "Log in",
                    linkText: "Not registered? Register now",
                    linkTo: "/register",
                };
            case "register":
                return {
                    title: "Register",
                    buttonText: "Register",
                    linkText: "Already registered? Log in",
                    linkTo: "/login",
                };
            default:
                return {
                    title: "Log in",
                    buttonText: "Log in",
                    linkText: "Not registered? Register now",
                    linkTo: "/register",
                };
        }
    };

    return (
        <div className="AuthLayout flex flex-col items-center">
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
            <div className="absolute bottom-4 right-4">
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
    );
};

export default AuthLayout;
