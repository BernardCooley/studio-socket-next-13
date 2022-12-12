import Head from "next/head";
import "./globals.css";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <Head>
                <title>My page title</title>
                <meta name="viewport" />
            </Head>
            <body className="h-screen bg-primary-light font-default">
                {children}
            </body>
        </html>
    );
}
