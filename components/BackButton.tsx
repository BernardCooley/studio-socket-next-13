import React from "react";
import ImageWithFallback from "./ImageWithFallback";

interface Props {
    onClick: () => void;
    top?: string;
    left?: string;
    height?: string;
    width?: string;
}

const BackButton = ({ onClick, top = "4", left = "4" }: Props) => {
    return (
        <div
            className={`absolute top-${top} left-${left} h-10 w-8`}
            onClick={onClick}
        >
            <ImageWithFallback
                title=""
                image={{
                    url: "/assets/icons/back.png",
                    name: "Back",
                }}
                fit="contain"
                layout="responsive"
                containerClassname="w-full"
                size={{
                    width: 32,
                    height: 32,
                }}
            />
        </div>
    );
};

export default BackButton;
