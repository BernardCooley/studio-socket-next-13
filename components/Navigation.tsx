import React, { useRef } from "react";
import Link from "next/link";
import Icons from "../icons";
import routes from "../routes";
import { useNavContext } from "../contexts/NavContext";
import useOnClickOutside from "../hooks/useClickOutside";

interface Props {}

const Navigation = ({}: Props) => {
    const { navOpen, closeNav, openNav } = useNavContext();
    const navigationRef = useRef<HTMLDivElement>(null);
    useOnClickOutside(navigationRef, closeNav);

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
    ];

    return (
        <div
            className={`font-default fixed top-0 w-full pt-2 bg-primary px-4 ease-in-out duration-200 shadow-3xl z-40 ${
                navOpen ? "h-72" : "h-11"
            }`}
            ref={navigationRef}
        >
            <div
                className={`flex justify-between ${
                    navOpen ? "" : "items-center"
                }`}
            >
                {!navOpen ? (
                    <Icons
                        iconType="menu"
                        className="text-primary-light"
                        onClick={openNav}
                        fontSize="72px"
                    />
                ) : (
                    <Link
                        className=""
                        href={routes.account().as}
                        onClick={closeNav}
                    >
                        <Icons
                            iconType="account"
                            className="text-primary-light"
                            fontSize="84px"
                        />
                    </Link>
                )}

                <div
                    className={`text-primary-light text-2xl ease-in-out duration-200`}
                >
                    Studio Socket
                </div>
            </div>

            <div
                className={`mt-10 font-regular text-primary-light text-3xl w-full flex justify-center items-center flex-col ease-in-out duration-200 ${
                    navOpen ? "opacity-100" : "opacity-0 h-0 mt-0"
                }`}
            >
                {navLinks.map((link) => (
                    <Link
                        key={link.name}
                        className={`my-3 ${navOpen ? "block" : "hidden"}`}
                        href={link.path}
                        onClick={closeNav}
                    >
                        {link.name}
                    </Link>
                ))}
            </div>
            {navOpen && (
                <Icons
                    iconType="close"
                    className="text-primary-light relative bottom-8"
                    onClick={closeNav}
                    fontSize="92px"
                />
            )}
        </div>
    );
};

export default Navigation;
