import Link from "next/link";
import React from "react";
import routes from "../routes";
import { IFirebaseImage } from "../types";
import ImageWithFallback from "./ImageWithFallback";

interface Props {
    title: string;
    image: IFirebaseImage | undefined;
    id: string;
}

const StudioItem = ({ title, image, id }: Props) => {
    return (
        <Link href={routes.studio(id).as}>
            <div className="border-primary-light-border border-2 shadow-xl rounded-md p-4 m-4 mb-6">
                <div className="text-xl">{title}</div>
                {image && (
                    <ImageWithFallback
                        title={title}
                        image={image}
                        fit="contain"
                        layout="responsive"
                        containerClassname="w-full p-3"
                        size={{
                            width: 300,
                            height: 300,
                        }}
                    />
                )}
            </div>
        </Link>
    );
};

export default StudioItem;
