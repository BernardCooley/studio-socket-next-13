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
import DoneIcon from "@mui/icons-material/Done";
import LogoutIcon from "@mui/icons-material/Logout";
import PasswordIcon from "@mui/icons-material/Password";

interface Props {
    iconType: string;
    className?: string;
    onClick?: () => void;
    fontSize: string;
    href?: string;
}

interface IconProps {
    children: ReactNode;
}

interface IIcons {
    [key: string]: JSX.Element;
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

    const attributes = {
        style: {
            fontSize: fontSize,
        },
        className: className ? className : "",
        onClick: onClick,
    };

    const icons: IIcons = {
        close: <CloseIcon {...attributes} />,
        account: <Person2Icon {...attributes} />,
        logout: <LogoutIcon {...attributes} />,
        menu: <MenuIcon {...attributes} />,
        showPassword: <VisibilityIcon {...attributes} />,
        hidePassword: <VisibilityOffIcon {...attributes} />,
        warning: <WarningAmberIcon {...attributes} />,
        formLoading: <AutorenewIcon {...attributes} />,
        accountCreated: <HowToRegIcon {...attributes} />,
        signIn: <LoginIcon {...attributes} />,
        searching: <PlagiarismIcon {...attributes} />,
        keyboard: <PianoIcon {...attributes} />,
        sort: <FilterListIcon {...attributes} />,
        chevronRight: <ArrowForwardIosIcon {...attributes} />,
        chevronLeft: <ArrowBackIosNewIcon {...attributes} />,
        chevronDown: <KeyboardArrowDownIcon {...attributes} />,
        add: <AddIcon {...attributes} />,
        edit: <EditIcon {...attributes} />,
        tick: <DoneIcon {...attributes} />,
        filter: <FilterAltIcon {...attributes} />,
        search: <SearchIcon {...attributes} />,
        back: <ArrowBackIcon {...attributes} />,
        password: <PasswordIcon {...attributes} />,
    };

    return <Icon>{icons[iconType]}</Icon>;
};

export default Icons;
