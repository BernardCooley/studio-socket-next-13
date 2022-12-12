"use client";

import Head from "next/head";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import Navigation from "../components/Navigation";

interface Props {
    children: React.ReactNode;

    session: any;
}

export default function RootLayout({ children, session }: Props) {
    return (
        <html lang="en">
            <Head>
                <title>My page title</title>
                <meta name="viewport" />
            </Head>
            <SessionProvider session={session}>
                <Navigation />
                <body className="h-screen bg-primary-light font-default">
                    {children}
                </body>
            </SessionProvider>
        </html>
    );
}
