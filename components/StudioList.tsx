import React from "react";
import Icons from "../icons";
import { Studio } from "../types";
import PageTitle from "./PageTitle";
import StudioItem from "./StudioItem";

interface Props {
    studios: Studio[];
    onScrollClick: () => void;
    title: string;
    iconType: "left" | "right";
}

const StudioList = ({ studios, onScrollClick, title, iconType }: Props) => {
    return (
        <div className="snapScrollPane mb-20">
            <div className="flex items-center">
                <PageTitle title={title} />
                <Icons
                    iconType={`chevron${
                        iconType === "right" ? "Right" : "Left"
                    }`}
                    className={`absolute ${iconType}-2`}
                    onClick={onScrollClick}
                />
            </div>
            {studios.map((studio) => (
                <StudioItem
                    key={studio.id}
                    id={studio.id}
                    image={studio.image}
                    title={studio.title}
                />
            ))}
        </div>
    );
};

export default StudioList;
