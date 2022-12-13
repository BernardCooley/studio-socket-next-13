"use client";

import Head from "next/head";
import "./globals.css";
import { SessionProvider } from "next-auth/react";

interface Props {
    children: React.ReactNode;
}

export default function RootLayout({ children }: Props) {
    return (
        <html lang="en">
            <Head>
                <title>Studio socket</title>
                <meta name="viewport" />
            </Head>
            <SessionProvider>
                <body className="h-screen bg-primary-light font-default">
                    {children}
                </body>
            </SessionProvider>
        </html>
    );
}
