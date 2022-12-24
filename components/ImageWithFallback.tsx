import Image from "next/legacy/image";
import React, { useEffect, useState } from "react";
import { IFirebaseImage } from "../types";

interface Props {
    image?: IFirebaseImage | void;
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
    const [errorOverlay, setErrorOverlay] = useState<string>("");

    useEffect(() => {
        setSrc(image?.url);
    }, [image]);

    useEffect(() => {
        if (src) {
            setErrorOverlay("");
        } else {
            setErrorOverlay("Image not found");
        }
    }, [src]);

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
            {errorOverlay.length > 0 && (
                <div className="absolute text-xl w-10/12 text-center bg-primary text-primary-light top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full py-2">
                    {errorOverlay}
                </div>
            )}
        </div>
    );
};

export default ImageWithFallback;
