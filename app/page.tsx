"use client";

import React, { useEffect, useState } from "react";
import ImageWithFallback from "../components/ImageWithFallback";
import { useRouter } from "next/navigation";
import { IFirebaseImage } from "../types";
import { getFirebaseImage } from "../firebase/functions";
import { signIn } from "next-auth/react";
import { Button } from "@chakra-ui/react";

const listItems = [
    "Create a collection of your devices",
    "Add them to your studio",
    "Connect them together via midi and audio cables",
    "Create multiple studios",
    "Share your studios with the community",
    "Get feedback about your studio from the community",
];

interface Props {}

const Landing = ({}: Props) => {
    const router = useRouter();
    const [logo, setLogo] = useState<IFirebaseImage | null>();
    const [tableImage, setTableImage] = useState<IFirebaseImage | null>();

    useEffect(() => {
        getLogo();
        getTableImage();
    }, []);

    const getLogo = async () => {
        try {
            const logo = (await getFirebaseImage(
                "brand",
                "logo",
                "png"
            )) as IFirebaseImage;
            setLogo(logo);
        } catch (err) {}
    };

    const getTableImage = async () => {
        try {
            const tableImage = (await getFirebaseImage(
                "brand",
                "table",
                "png"
            )) as IFirebaseImage;
            setTableImage(tableImage);
        } catch (err) {}
    };

    const login = async () => {
        await signIn("auth0", {
            callbackUrl: "/dashboard",
        });
    };

    return (
        <div className="Home bg-primary-light">
            <section className="text-primary-light flex flex-col items-center bg-modular bg-centered">
                <div className="Links p-6 flex justify-between w-full text-2xl font-light">
                    <Button size="lg" variant="ghost" onClick={login}>
                        Sign in
                    </Button>
                </div>
                <div className="Logo w-full flex justify-center">
                    <ImageWithFallback
                        title=""
                        image={logo}
                        fit="contain"
                        layout="responsive"
                        containerClassname="w-full"
                        size={{ width: 300, height: 300 }}
                    />
                </div>
                <div className="Title uppercase text-2xl tracking-widest font-light">
                    Music studio designer
                </div>
                <div className="Description mt-3 p-4 text-lg text-center bg-primary/80 shadow-3xl shadow-primary">
                    Plan and map your music studio. Search from our database of
                    Synths, Drum machines, Mixers, etc..., connect them via
                    audio and midi cables to build working plans of your
                    current, or dream studio.
                </div>
            </section>
            <section className="py-3">
                <div className="Table w-full flex justify-center">
                    <ImageWithFallback
                        title=""
                        image={tableImage}
                        fit="contain"
                        layout="responsive"
                        containerClassname="w-full p-3"
                        size={{ width: 250, height: 100 }}
                    />
                </div>
            </section>
            <section className="shadow-3xl shadow-primary/40">
                <ul className="p-4 pl-8 list-disc text-lg">
                    {listItems.map((item) => (
                        <li key={item} className="">
                            {item}
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );
};

export default Landing;
