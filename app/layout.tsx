"use client";

import Head from "next/head";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { FormContextProvider } from "../contexts/FormContext";
import { fetchDevices } from "../bff/requests";
import { IOrderBy } from "../bff/types";

interface Props {
    children: React.ReactNode;
}

export default function RootLayout({ children }: Props) {
    const limit = 100;
    const filters = [
        { countryOfManufacturer: "Germany" },
        {
            formFactor: {
                name: "Keyboard",
            },
        },
    ];
    const andOr = "OR";
    const orderBy = [
        {
            title: "desc",
        },
    ];

    const devices = async () => {
        const dev = await fetchDevices(
            limit,
            filters,
            andOr,
            orderBy as IOrderBy[]
        );
    };

    devices();

    return (
        <html lang="en">
            <Head>
                <title>Studio socket</title>
                <meta name="viewport" />
            </Head>
            <SessionProvider>
                <body>
                    <FormContextProvider>
                        <div
                            className={`h-full min-h-screen bg-primary-light font-default`}
                        >
                            {children}
                        </div>
                    </FormContextProvider>
                </body>
            </SessionProvider>
        </html>
    );
}
