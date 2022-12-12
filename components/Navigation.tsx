import Link from "next/link";
import React, { useEffect, useState } from "react";
import { routes } from "../routes";
import {
    AccountCircleRounded,
    Settings,
    Logout,
    Close,
    Menu,
} from "@mui/icons-material";
import { getRoute } from "../utils";
import { useAuth } from "../contexts/AuthContext";
import useRouter from "next/router";
import { useNavigationContext } from "../contexts/NavigationContext";

interface Props {}

const Navigation = ({}: Props) => {
    const router = useRouter;
    const { logout } = useAuth();
    const { scrollPosition, scrollingDown } = useNavigationContext();
    const [showNav, setShowNav] = useState<boolean>(false);
    const [navScrollClasses, setNavScrollClasses] = useState<string>("");

    useEffect(() => {
        setNavScrollClasses(getScrollClasses);
    }, [scrollPosition]);

    const getScrollClasses = () => {
        if (scrollPosition < 50) return "translate-y-0";
        if (scrollPosition > 50 && !scrollingDown) return "translate-y-0";
        return "-translate-y-full";
    };

    const signOut = async () => {
        toggleNav();
        await logout();
        router.push("/login");
    };

    const toggleNav = () => {
        setShowNav(!showNav);
    };

    return (
        <div className={`${showNav ? "" : ""}${navScrollClasses}`}>
            <div>
                <div onClick={toggleNav} className={``}>
                    <Close sx={{ fontSize: 40 }} />
                </div>

                <div onClick={toggleNav} className={``}>
                    <Menu sx={{ fontSize: 35 }} />
                </div>
            </div>

            <ul className={``}>
                {routes.map((route) => {
                    if (route.protected && route.showInNav) {
                        return (
                            <li key={route.name} className="">
                                <Link legacyBehavior passHref href={route.path}>
                                    <a onClick={toggleNav} className={``}>
                                        {route.name}
                                    </a>
                                </Link>
                            </li>
                        );
                    }
                })}
                <div className="">
                    <Link passHref href={getRoute("Account").path}>
                        <div onClick={toggleNav} className="">
                            <AccountCircleRounded sx={{ fontSize: 40 }} />
                        </div>
                    </Link>
                    <Link passHref href={getRoute("Settings").path}>
                        <div onClick={toggleNav} className="">
                            <Settings sx={{ fontSize: 40 }} />
                        </div>
                    </Link>
                    <div className="" onClick={signOut}>
                        <Logout sx={{ fontSize: 40 }} />
                    </div>
                </div>
            </ul>
        </div>
    );
};

export default Navigation;
