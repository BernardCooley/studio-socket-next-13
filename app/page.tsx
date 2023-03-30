"use client";

import React, { useEffect, useState } from "react";
import ImageWithFallback from "../components/ImageWithFallback";
import { useRouter } from "next/navigation";
import { IFirebaseImage } from "../types";
import { getFirebaseImage } from "../firebase/functions";
import { signIn } from "next-auth/react";
import {
    Box,
    Button,
    Center,
    ListItem,
    Text,
    UnorderedList,
    VStack,
} from "@chakra-ui/react";

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
        <VStack bg="brand.primary-light">
            <VStack
                color="brand.primary-light"
                alignItems="center"
                backgroundImage="url('../assets/backgrounds/modular-side-dark.jpg')"
                backgroundPosition="center"
            >
                <Box w="full">
                    <Button
                        fontFamily="default"
                        size="sm"
                        variant="ghost"
                        onClick={login}
                        left={0}
                        position="relative"
                    >
                        Sign in
                    </Button>
                </Box>
                <Center w="full">
                    <ImageWithFallback
                        title=""
                        image={logo}
                        fit="contain"
                        layout="responsive"
                        containerClassname="w-full"
                        size={{ width: 300, height: 300 }}
                    />
                </Center>
                <Text textTransform="uppercase" fontSize="md">
                    Music studio designer
                </Text>
                <Text
                    mt={2}
                    p={1}
                    fontSize="xs"
                    textAlign="center"
                    bg="brand.primary-opaque"
                    className="shadow-3xl shadow-primary/80"
                >
                    Plan and map your music studio. Search from our database of
                    Synths, Drum machines, Mixers, etc..., connect them via
                    audio and midi cables to build working plans of your
                    current, or dream studio.
                </Text>
            </VStack>
            <Center w="full">
                <ImageWithFallback
                    title=""
                    image={tableImage}
                    fit="contain"
                    layout="responsive"
                    containerClassname="w-full px-2"
                    size={{ width: 250, height: 100 }}
                />
            </Center>
            <Box w="full" className="shadow-3xl shadow-primary/40">
                <UnorderedList
                    alignItems="flex-start"
                    p={1}
                    pl={2}
                    fontSize="2xs"
                >
                    {listItems.map((item) => (
                        <ListItem key={item} className="">
                            {item}
                        </ListItem>
                    ))}
                </UnorderedList>
            </Box>
        </VStack>
    );
};

export default Landing;
