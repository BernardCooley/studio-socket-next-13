import { useRouter } from "next/navigation";
import React from "react";
import Icons from "../icons";

const BackButton = () => {
    const router = useRouter();

    return (
        <div className={`absolute h-10 w-8 clickEffectPrimary`}>
            <Icons iconType="back" onClick={() => router.back()} />
        </div>
    );
};

export default BackButton;
