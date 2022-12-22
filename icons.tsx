import React from "react";
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

interface Props {
    iconType: string;
    className?: string;
    onClick?: () => void;
    fontSize?: string;
}

const Icons = ({ iconType, className, onClick, fontSize }: Props) => {
    switch (iconType) {
        case "close":
            return (
                <CloseIcon
                    className={className}
                    onClick={onClick}
                    style={{
                        fontSize: "92px",
                    }}
                />
            );
        case "account":
            return (
                <Person2Icon
                    className={className}
                    onClick={onClick}
                    style={{
                        fontSize: "84px",
                    }}
                />
            );
        case "menu":
            return (
                <MenuIcon
                    className={`${className}`}
                    onClick={onClick}
                    style={{
                        fontSize: fontSize || "72px",
                    }}
                />
            );
        case "showPassword":
            return (
                <VisibilityIcon
                    className={`text-primary ${className}`}
                    onClick={onClick}
                    style={{
                        fontSize: fontSize || "62px",
                    }}
                />
            );
        case "hidePassword":
            return (
                <VisibilityOffIcon
                    className={`text-primary ${className}`}
                    onClick={onClick}
                    style={{
                        fontSize: fontSize || "62px",
                    }}
                />
            );
        case "warning":
            return (
                <WarningAmberIcon
                    className={`text-error ${className}`}
                    onClick={onClick}
                    style={{
                        fontSize: fontSize || "132px",
                    }}
                />
            );
        case "formLoading":
            return (
                <AutorenewIcon
                    className={`${className}`}
                    onClick={onClick}
                    style={{
                        fontSize: fontSize || "132px",
                    }}
                />
            );
        case "accountCreated":
            return (
                <HowToRegIcon
                    className={`${className}`}
                    onClick={onClick}
                    style={{
                        fontSize: fontSize || "132px",
                    }}
                />
            );
        case "signIn":
            return (
                <LoginIcon
                    className={`${className}`}
                    onClick={onClick}
                    style={{
                        fontSize: fontSize || "132px",
                    }}
                />
            );
        case "searching":
            return (
                <PlagiarismIcon
                    className={`${className}`}
                    onClick={onClick}
                    style={{
                        fontSize: fontSize || "132px",
                    }}
                />
            );
        case "sort":
            return (
                <FilterListIcon
                    className={`${className}`}
                    onClick={onClick}
                    style={{
                        fontSize: fontSize || "92px",
                    }}
                />
            );
        case "chevronRight":
            return (
                <ArrowForwardIosIcon
                    className={`${className}`}
                    onClick={onClick}
                    style={{
                        fontSize: fontSize || "92px",
                    }}
                />
            );
        case "chevronLeft":
            return (
                <ArrowBackIosNewIcon
                    className={`${className}`}
                    onClick={onClick}
                    style={{
                        fontSize: fontSize || "92px",
                    }}
                />
            );
        case "chevronDown":
            return (
                <KeyboardArrowDownIcon
                    className={`${className}`}
                    onClick={onClick}
                    style={{
                        fontSize: fontSize || "72px",
                    }}
                />
            );
        case "filter":
            return (
                <FilterAltIcon
                    className={`${className}`}
                    onClick={onClick}
                    style={{
                        fontSize: fontSize || "92px",
                    }}
                />
            );
        case "search":
            return (
                <SearchIcon
                    className={`${className}`}
                    onClick={onClick}
                    style={{
                        fontSize: fontSize || "92px",
                    }}
                />
            );
        default:
            return null;
    }
};

export default Icons;
