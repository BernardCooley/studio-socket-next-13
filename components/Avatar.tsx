import React from "react";
import ImageWithFallback from "./ImageWithFallback";

interface Props {
    image: string;
    containerClassname?: string;
    buttonClassname?: string;
    onClick: () => void;
}

const Avatar = ({
    image,
    containerClassname,
    buttonClassname,
    onClick,
}: Props) => {
    return (
        <div
            className={`w-full flex flex-col justify-center relative items-center ${containerClassname}`}
        >
            <ImageWithFallback
                containerClassname="w-full aspect-square relative"
                title="avatar"
                image={{ name: "", url: image }}
                imageClassname="rounded-full"
                fit="cover"
                size={{
                    width: 200,
                    height: 200,
                }}
            />
            <button
                onClick={onClick}
                className={`relative bottom-9 border-2 rounded-full text-xl ${buttonClassname}`}
            >
                Delete
            </button>
        </div>
    );
};

export default Avatar;
