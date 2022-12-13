import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";
import { getRoute } from "../utils";
import CloseIcon from "@mui/icons-material/Close";
import Person2Icon from "@mui/icons-material/Person2";

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
            className={`font-default fixed top-0 w-full pt-2 bg-primary px-4 ease-in-out duration-200 shadow-3xl ${
                isExpanded ? "h-72" : "h-11"
            }`}
        >
            <div
                className={`flex justify-between ${
                    isExpanded ? "" : "items-center"
                }`}
            >
                {!isExpanded ? (
                    <MenuIcon
                        className="text-primary-light h-8 w-8"
                        onClick={() => setIsexpanded(true)}
                    />
                ) : (
                    <Link
                        className=""
                        href={getRoute("Account").path}
                        onClick={() => setIsexpanded(false)}
                    >
                        <Person2Icon className="text-primary-light h-8 w-8" />
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
                <CloseIcon
                    className="text-primary-light h-10 w-10 relative bottom-8"
                    onClick={() => setIsexpanded(false)}
                />
            )}
        </div>
    );
};

export default Navigation;
