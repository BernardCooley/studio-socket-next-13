"use client";

import Head from "next/head";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { AuthContextProvider } from "../contexts/FormContext";
import { usePathname } from "next/navigation";

interface Props {
    children: React.ReactNode;
}

export default function RootLayout({ children }: Props) {
    const pathname = usePathname();

    return (
        <html lang="en">
            <Head>
                <title>Studio socket</title>
                <meta name="viewport" />
            </Head>
            <SessionProvider>
                <body
                    className={`relative ${
                        pathname === "/devices"
                            ? "overflow-hidden h-screen"
                            : ""
                    }`}
                >
                    <AuthContextProvider>
                        <div
                            className={`h-full min-h-screen bg-primary-light font-default`}
                        >
                            {children}
                        </div>
                    </AuthContextProvider>
                </body>
            </SessionProvider>
        </html>
    );
}
