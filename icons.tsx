import React, { ReactNode } from "react";
import CloseIcon from "@mui/icons-material/Close";
import Person2Icon from "@mui/icons-material/Person2";
import MenuIcon from "@mui/icons-material/Menu";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import LoginIcon from "@mui/icons-material/Login";
import FilterListIcon from "@mui/icons-material/FilterList";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import SearchIcon from "@mui/icons-material/Search";
import PlagiarismIcon from "@mui/icons-material/Plagiarism";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import PianoIcon from "@mui/icons-material/Piano";
import { noop } from "./utils";
import Link from "next/link";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

interface Props {
    iconType: string;
    className?: string;
    onClick?: () => void;
    fontSize?: string;
    href?: string;
}

interface IconProps {
    children: ReactNode;
}

const Icons = ({
    iconType,
    className,
    onClick = noop,
    fontSize,
    href = "",
}: Props) => {
    const Icon = ({ children }: IconProps) => {
        if (href) {
            return <Link href={href}>{children}</Link>;
        }

        return <>{children}</>;
    };

    switch (iconType) {
        case "close":
            return (
                <Icon>
                    <CloseIcon
                        className={className}
                        onClick={onClick}
                        style={{
                            fontSize: fontSize || "92px",
                        }}
                    />
                </Icon>
            );
        case "account":
            return (
                <Icon>
                    <Person2Icon
                        className={className}
                        onClick={onClick}
                        style={{
                            fontSize: "84px",
                        }}
                    />
                </Icon>
            );
        case "menu":
            return (
                <Icon>
                    <MenuIcon
                        className={`${className}`}
                        onClick={onClick}
                        style={{
                            fontSize: fontSize || "72px",
                        }}
                    />
                </Icon>
            );
        case "showPassword":
            return (
                <Icon>
                    <VisibilityIcon
                        className={`text-primary ${className}`}
                        onClick={onClick}
                        style={{
                            fontSize: fontSize || "62px",
                        }}
                    />
                </Icon>
            );
        case "hidePassword":
            return (
                <Icon>
                    <VisibilityOffIcon
                        className={`text-primary ${className}`}
                        onClick={onClick}
                        style={{
                            fontSize: fontSize || "62px",
                        }}
                    />
                </Icon>
            );
        case "warning":
            return (
                <Icon>
                    <WarningAmberIcon
                        className={`text-error ${className}`}
                        onClick={onClick}
                        style={{
                            fontSize: fontSize || "132px",
                        }}
                    />
                </Icon>
            );
        case "formLoading":
            return (
                <Icon>
                    <AutorenewIcon
                        className={`${className}`}
                        onClick={onClick}
                        style={{
                            fontSize: fontSize || "132px",
                        }}
                    />
                </Icon>
            );
        case "accountCreated":
            return (
                <Icon>
                    <HowToRegIcon
                        className={`${className}`}
                        onClick={onClick}
                        style={{
                            fontSize: fontSize || "132px",
                        }}
                    />
                </Icon>
            );
        case "signIn":
            return (
                <Icon>
                    <LoginIcon
                        className={`${className}`}
                        onClick={onClick}
                        style={{
                            fontSize: fontSize || "132px",
                        }}
                    />
                </Icon>
            );
        case "searching":
            return (
                <Icon>
                    <PlagiarismIcon
                        className={`${className}`}
                        onClick={onClick}
                        style={{
                            fontSize: fontSize || "132px",
                        }}
                    />
                </Icon>
            );
        case "keyboard":
            return (
                <Icon>
                    <PianoIcon
                        className={`${className}`}
                        onClick={onClick}
                        style={{
                            fontSize: fontSize || "132px",
                        }}
                    />
                </Icon>
            );
        case "sort":
            return (
                <Icon>
                    <FilterListIcon
                        className={`${className}`}
                        onClick={onClick}
                        style={{
                            fontSize: fontSize || "92px",
                        }}
                    />
                </Icon>
            );
        case "chevronRight":
            return (
                <Icon>
                    <ArrowForwardIosIcon
                        className={`${className}`}
                        onClick={onClick}
                        style={{
                            fontSize: fontSize || "92px",
                        }}
                    />
                </Icon>
            );
        case "chevronLeft":
            return (
                <Icon>
                    <ArrowBackIosNewIcon
                        className={`${className}`}
                        onClick={onClick}
                        style={{
                            fontSize: fontSize || "92px",
                        }}
                    />
                </Icon>
            );
        case "chevronDown":
            return (
                <Icon>
                    <KeyboardArrowDownIcon
                        className={`${className}`}
                        onClick={onClick}
                        style={{
                            fontSize: fontSize || "72px",
                        }}
                    />
                </Icon>
            );
        case "add":
            return (
                <Icon>
                    <AddIcon
                        className={`${className}`}
                        onClick={onClick}
                        style={{
                            fontSize: fontSize || "72px",
                        }}
                    />
                </Icon>
            );
        case "edit":
            return (
                <Icon>
                    <EditIcon
                        className={`${className}`}
                        onClick={onClick}
                        style={{
                            fontSize: fontSize || "72px",
                        }}
                    />
                </Icon>
            );
        case "filter":
            return (
                <Icon>
                    <FilterAltIcon
                        className={`${className}`}
                        onClick={onClick}
                        style={{
                            fontSize: fontSize || "92px",
                        }}
                    />
                </Icon>
            );
        case "search":
            return (
                <Icon>
                    <SearchIcon
                        className={`${className}`}
                        onClick={onClick}
                        style={{
                            fontSize: fontSize || "92px",
                        }}
                    />
                </Icon>
            );
        case "back":
            return (
                <Icon>
                    <ArrowBackIcon
                        className={`${className}`}
                        onClick={onClick}
                        style={{
                            fontSize: fontSize || "92px",
                        }}
                    />
                </Icon>
            );
        default:
            return null;
    }
};

export default Icons;
