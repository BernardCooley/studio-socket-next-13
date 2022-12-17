import React, { useState } from "react";
import Link from "next/link";
import { getRoute } from "../utils";
import Icons from "../icons";

interface Props {}

const Navigation = ({}: Props) => {
    const [isExpanded, setIsexpanded] = useState<boolean>(false);

    const links = [
        {
            name: "Dashboard",
            path: getRoute("Dashboard").path,
        },
        {
            name: "Devices",
            path: getRoute("Devices").path,
        },
        {
            name: "Studios",
            path: getRoute("Studios").path,
        },
    ];

    return (
        <div
            className={`font-default fixed top-0 w-full pt-2 bg-primary px-4 ease-in-out duration-200 shadow-3xl z-20 ${
                isExpanded ? "h-72" : "h-11"
            }`}
        >
            <div
                className={`flex justify-between ${
                    isExpanded ? "" : "items-center"
                }`}
            >
                {!isExpanded ? (
                    <Icons
                        iconType="menu"
                        className="text-primary-light"
                        onClick={() => setIsexpanded(true)}
                    />
                ) : (
                    <Link
                        className=""
                        href={getRoute("Account").path}
                        onClick={() => setIsexpanded(false)}
                    >
                        <Icons
                            iconType="account"
                            className="text-primary-light"
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
                    isExpanded ? "opacity-100" : "opacity-0"
                }`}
            >
                {links.map((link) => (
                    <Link
                        key={link.name}
                        className="my-3"
                        href={link.path}
                        onClick={() => setIsexpanded(false)}
                    >
                        {link.name}
                    </Link>
                ))}
            </div>
            {isExpanded && (
                <Icons
                    iconType="close"
                    className="text-primary-light relative bottom-8"
                    onClick={() => setIsexpanded(false)}
                />
            )}
        </div>
    );
};

export default Navigation;
