import React, { ReactNode } from "react";
import ImageWithFallback from "./ImageWithFallback";

interface Props {
    image: string;
    containerClassname?: string;
    icon: ReactNode;
    imageClassname?: string;
    fit?: "cover" | "contain" | "fill";
}

const Avatar = ({
    image = "",
    containerClassname,
    icon,
    imageClassname = "rounded-full",
    fit = "cover",
}: Props) => {
    return (
        <div
            className={`w-full flex flex-col justify-center relative items-center ${containerClassname}`}
        >
            <ImageWithFallback
                containerClassname="w-full aspect-square relative"
                title="avatar"
                image={{ name: "", url: image }}
                imageClassname={imageClassname}
                fit={fit}
                size={{
                    width: 200,
                    height: 200,
                }}
            />
            {icon}
        </div>
    );
};

export default Avatar;
