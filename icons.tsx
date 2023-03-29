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
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import Image from "next/image";
import VerticalAlignTopIcon from "@mui/icons-material/VerticalAlignTop";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import PlaylistRemoveIcon from "@mui/icons-material/PlaylistRemove";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

export const deviceIcons = {
    Turntable: "/assets/icons/devices/turntable.png",
    Speaker: "/assets/icons/devices/speaker.png",
    "DJ Mixer": "/assets/icons/devices/dj_mixer.png",
    Headphones: "/assets/icons/devices/headphones.png",
    Sequencer: "/assets/icons/devices/sequencer.png",
    Sampler: "/assets/icons/devices/sampler.png",
    Synthesizer: "/assets/icons/devices/synthesizer.png",
    "Signal Distribution": "/assets/icons/devices/signal_distribution.png",
    Effect: "/assets/icons/devices/effect.png",
    EQ: "/assets/icons/devices/eq.png",
    Accessory: "/assets/icons/devices/accessory.png",
    "Amplifier, Pre": "/assets/icons/devices/amplifier.png",
    "Amplifier, Power": "/assets/icons/devices/amplifier.png",
    "Amplifier, Integrated": "/assets/icons/devices/amplifier.png",
    "Amplifier, Phono": "/assets/icons/devices/amplifier.png",
    "Amplifier, Headphone": "/assets/icons/devices/amplifier.png",
    "Amplifier, Guitar": "/assets/icons/devices/amplifier.png",
    "Amplifier, Microphone": "/assets/icons/devices/amplifier.png",
    "Amplifier, Bass": "/assets/icons/devices/amplifier.png",
    "Drum Machine": "/assets/icons/devices/drum_machine.png",
    "Enclosure / Casing": "/assets/icons/devices/case.png",
    "Mixing Desk": "/assets/icons/devices/mixing_desk.png",
    Dynamics: "/assets/icons/devices/dynamics.png",
    CD: "/assets/icons/devices/cd.png",
    "Audio Interface": "/assets/icons/devices/audio_interface.png",
    "Instrument Tuner": "/assets/icons/devices/tuner.png",
    "Turntable Cartridge": "/assets/icons/devices/turntable_accessory.png",
    "Turntable Stylus": "/assets/icons/devices/turntable_accessory.png",
    "Turntable Tonearm": "/assets/icons/devices/turntable_accessory.png",
    "Turntable Accessory": "/assets/icons/devices/turntable_accessory.png",
    "Turntable Spare Part": "/assets/icons/devices/turntable_accessory.png",
    "Digital Recorder": "/assets/icons/devices/recorder.png",
    "Power Supply": "/assets/icons/devices/power_supply.png",
    "Control Surface": "/assets/icons/devices/control_surface.png",
    "Media Player": "/assets/icons/devices/media_player.png",
    "Cassette Deck": "/assets/icons/devices/cassette_deck.png",
    "Tape Machine": "/assets/icons/devices/tape_machine.png",
    Cable: "/assets/icons/devices/cable.png",
    "Radio Receiver": "/assets/icons/devices/radio_receiver.png",
    Minidisc: "/assets/icons/devices/minidisc.png",
    Microphone: "/assets/icons/devices/microphone.png",
    Receiver: "/assets/icons/devices/receiver.png",
    "Synchronizer / Clock Generator":
        "/assets/icons/devices/clock_generator.png",
    Crossover: "/assets/icons/devices/crossover.png",
    "Radio Tuner": "/assets/icons/devices/radio_tuner.png",
    "Media & Data Storage": "/assets/icons/devices/storage.png",
    "8-track deck": "/assets/icons/devices/8_track_deck.png",
    "Digital-to-Analog Converter (DAC)": "/assets/icons/devices/converter.png",
    "Analog-to-Digital Converter (ADC)": "/assets/icons/devices/converter.png",
};

export const DeviceIcon = ({
    name,
    className = "",
}: {
    name: string;
    className?: string;
}) => {
    return (
        <div className={className}>
            <Image
                src={
                    deviceIcons[name as keyof typeof deviceIcons] ||
                    "/assets/icons/devices/devices_default.png"
                }
                alt=""
                fill
                style={{
                    objectFit: "contain",
                }}
            />
        </div>
    );
};

interface Props {
    iconType: string;
    className?: string;
    onClick?: () => void;
    fontSize: string;
    href?: string;
    styles?: React.CSSProperties;
}

interface IconProps {
    children: ReactNode;
}

interface IIcons {
    [key: string]: JSX.Element;
}

const Icons = ({
    styles,
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
            ...{
                fontSize: fontSize,
            },
            ...styles,
        },
        className: className ? className : "",
        onClick: onClick,
    };

    const icons: IIcons = {
        close: <CloseIcon {...attributes} />,
        account: <Person2Icon {...attributes} />,
        deleteAccount: <PersonRemoveIcon {...attributes} />,
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
        chevronUp: <ExpandLessIcon {...attributes} />,
        add: <AddIcon {...attributes} />,
        edit: <EditIcon {...attributes} />,
        tick: <DoneIcon {...attributes} />,
        filter: <FilterAltIcon {...attributes} />,
        search: <SearchIcon {...attributes} />,
        back: <ArrowBackIcon {...attributes} />,
        password: <PasswordIcon {...attributes} />,
        toTop: <VerticalAlignTopIcon {...attributes} />,
        addToList: <PlaylistAddIcon {...attributes} />,
        removeFromList: <PlaylistRemoveIcon {...attributes} />,
        error: <ErrorOutlineIcon {...attributes} />,
        info: <InfoOutlinedIcon {...attributes} />,
    };

    return <Icon>{icons[iconType]}</Icon>;
};

export default Icons;
