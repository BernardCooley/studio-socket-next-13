import Image from "next/legacy/image";
import React, { useEffect, useState } from "react";
import { IFirebaseImage } from "../types";

interface Props {
    image?: IFirebaseImage;
    title: string;
    fit?: "contain" | "cover" | "fill";
    layout?: "fill" | "fixed" | "intrinsic" | "responsive";
    containerClassname?: string;
    imageClassname?: string;
    fallbackImage?: string;
    size?: {
        width: number;
        height: number;
    };
}

const ImageWithFallback = ({
    image,
    title,
    fit = "contain",
    layout = "fill",
    containerClassname = "",
    imageClassname = "",
    fallbackImage = "/assets/images/fallbackImage.png",
    size,
}: Props) => {
    const [src, setSrc] = useState<string | undefined>(image?.url);

    useEffect(() => {
        setSrc(image?.url);
    }, [image]);

    return (
        <div key={title} className={`${containerClassname}`}>
            <Image
                objectFit={fit}
                src={src ? src : fallbackImage}
                alt={title}
                layout={layout}
                className={imageClassname}
                onError={() => setSrc(fallbackImage)}
                height={size?.height}
                width={size?.width}
            ></Image>
        </div>
    );
};

export default ImageWithFallback;
