"use client";

import React from "react";
import ImageWithFallback from "../../components/ImageWithFallback";
import { useRouter } from "next/navigation";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    return (
        <div className="AuthLayout">
            <div
                className="absolute bernard top-4 left-4 h-10 w-8"
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
            <div>{children}</div>
        </div>
    );
};

export default AuthLayout;
