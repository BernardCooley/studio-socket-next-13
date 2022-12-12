import { useRouter } from "next/router";
import React, { ReactNode, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import Navigation from "./Navigation";
import { routes } from "../routes";

interface Props {
    children: ReactNode;
}

const ProtectedRoute = ({ children }: Props) => {
    const { isLoggedIn } = useAuth();
    const router = useRouter();

    const protestedRoutePaths = () => {
        return routes
            .filter((route) => route.protected === false)
            .map((route) => route.path);
    };

    useEffect(() => {
        if (!isLoggedIn && !protestedRoutePaths().includes(router.pathname)) {
            router.push("/landing");
        }
    }, [router, isLoggedIn]);

    return (
        <div>
            {isLoggedIn && (
                <div>
                    <Navigation />
                    <div>{children}</div>
                </div>
            )}
        </div>
    );
};

export default ProtectedRoute;
