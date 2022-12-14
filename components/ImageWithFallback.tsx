import Image from "next/legacy/image";
import React from "react";
import { IFirebaseImage } from "../types";
import FallbackImage from "../public/assets/images/fallbackImage.png";

interface Props {
    image?: IFirebaseImage;
    title: string;
    fit?: "contain" | "cover" | "fill";
    layout?: "fill" | "fixed" | "intrinsic" | "responsive";
    containerClassname?: string;
    imageClassname?: string;
    size?: {
        width: number;
        height: number;
    };
    onClick?: () => void;
}

const ImageWithFallback = ({
    image,
    title,
    fit = "contain",
    layout = "fill",
    containerClassname = "",
    imageClassname = "",
    size = {
        width: 200,
        height: 200,
    },
    onClick,
}: Props) => {
    return (
        <div key={title} className={containerClassname} onClick={onClick}>
            <Image
                objectFit={fit}
                src={image ? image.url : FallbackImage}
                alt={title}
                layout={layout}
                className={imageClassname}
                height={size.height}
                width={size.width}
            ></Image>
        </div>
    );
};

export default ImageWithFallback;
