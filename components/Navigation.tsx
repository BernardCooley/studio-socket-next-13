import React from "react";
import Link from "next/link";
import Icons from "../icons";
import routes from "../routes";
import { useNavContext } from "../contexts/NavContext";
import {
    Box,
    Center,
    Drawer,
    DrawerBody,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
    HStack,
} from "@chakra-ui/react";

interface Props {}

const Navigation = ({}: Props) => {
    const { navOpen, closeNav, openNav } = useNavContext();

    const navLinks = [
        {
            name: "Dashboard",
            path: routes.dashboard().as,
        },
        {
            name: "Devices",
            path: routes.devices().as,
        },
        {
            name: "Studios",
            path: routes.studios().as,
        },
        {
            name: "Account",
            path: routes.account().as,
        },
    ];

    return (
        <>
            <HStack
                bg="brand.primary"
                color="brand.primary-light"
                justifyContent="space-between"
                alignItems="center"
                fontFamily="default"
                px="2"
                shadow="xl"
                position="fixed"
                w="full"
                zIndex="40"
            >
                <Icons
                    iconType="menu"
                    onClick={openNav}
                    fontSize="32px"
                    className="text-primary-light"
                />
                <Box color="brand.primary-light" fontSize="sm">
                    Studio Socket
                </Box>
            </HStack>
            <Drawer
                placement="top"
                onClose={closeNav}
                isOpen={navOpen}
                blockScrollOnMount
                closeOnEsc
                preserveScrollBarGap
                closeOnOverlayClick
            >
                <DrawerOverlay />
                <DrawerContent
                    bg="brand.primary"
                    color="brand.primary-light"
                    fontFamily="default"
                >
                    <Icons
                        iconType="chevronUp"
                        className="text-primary-light relative top-1 left-1"
                        onClick={closeNav}
                        fontSize="62px"
                    />
                    <DrawerHeader
                        borderBottomWidth="1px"
                        paddingInline={2}
                        p={2}
                    >
                        <Center>Studio Socket</Center>
                    </DrawerHeader>
                    <DrawerBody pt={0}>
                        {navLinks.map((link) => (
                            <Center key={link.name}>
                                <Link
                                    className={`my-1 ${
                                        navOpen ? "block" : "hidden"
                                    }`}
                                    href={link.path}
                                    onClick={closeNav}
                                >
                                    {link.name}
                                </Link>
                            </Center>
                        ))}
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    );
};

export default Navigation;
