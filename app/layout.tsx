"use client";

import Head from "next/head";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { FormContextProvider } from "../contexts/FormContext";
import { ChakraProvider } from "@chakra-ui/react";

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
                <body>
                    <ChakraProvider>
                        <FormContextProvider>
                            <div
                                className={`h-full min-h-screen bg-primary-light font-default`}
                            >
                                {children}
                            </div>
                        </FormContextProvider>
                    </ChakraProvider>
                </body>
            </SessionProvider>
        </html>
    );
}
