"use client";

import { useSession } from "next-auth/react";
import React, { useEffect, useRef, useState } from "react";
import {
    getDocumentsWhere,
    getFirebaseData,
    getFirebaseImage,
} from "../../../firebase/functions";
import { IFirebaseImage, Studio } from "../../../types";
import { studiosRef } from "../../../firebase/firebaseRefs";
import routes from "../../../routes";
import { testStudios } from "../../../testData/testData";
import Icons from "../../../icons";
import { useRouter } from "next/navigation";
import StudioList from "../../../components/StudioList";
import { useNavContext } from "../../../contexts/NavContext";

interface Props {}

const Studios = ({}: Props) => {
    // TODO: test when db is back up
    const router = useRouter();
    const { environment } = useNavContext();
    const { data: user } = useSession();
    const [allStudios, setAllStudios] = useState<Studio[]>([]);
    const [userStudios, setUserStudios] = useState<Studio[]>([]);
    const scrollElement = useRef<HTMLDivElement>(null);

    useEffect(() => {
        fetchStudios();
    }, []);

    useEffect(() => {
        fetchUserStudioImages();
    }, [userStudios]);

    useEffect(() => {
        fetchUserStudios();
    }, [user]);

    const fetchUserStudios = async () => {
        if (environment === "prod") {
            if (user?.user) {
                const studios = await getDocumentsWhere(
                    studiosRef,
                    "userId",
                    "==",
                    user.user.id
                );
                if (studios) {
                    setUserStudios(studios as Studio[]);
                }
            }
        } else {
            setUserStudios(testStudios);
        }
    };

    const fetchStudios = async () => {
        if (environment === "prod") {
            const studios = await getFirebaseData(studiosRef, 20);
            if (studios) {
                setAllStudios(studios as Studio[]);
            }
        } else {
            setAllStudios(testStudios);
        }
    };

    const getImage = async (studioId: string) => {
        try {
            const image = await getFirebaseImage("studios", `${studioId}.png`);
            return image;
        } catch (err) {
            return null;
        }
    };

    const fetchUserStudioImages = async () => {
        if (userStudios.length > 0) {
            userStudios.forEach(async (studio) => {
                const image = await getImage(studio.id);
                if (image) {
                    studio.image = image;
                }
            });
        }
    };

    const scroll = (toLeft: boolean) => {
        if (scrollElement.current) {
            scrollElement.current.scrollTo({
                behavior: "smooth",
                left: toLeft ? 600 : -600,
            });
        }
    };

    return (
        <div className="relative overflow-hidden h-screen">
            <Icons
                iconType="add"
                className="fixed bottom-4 right-4 border-8 text-primary-light bg-primary rounded-full z-50"
                fontSize="142px"
                href={routes.addStudio().as}
            />
            <div
                ref={scrollElement}
                className="w-full flex snap-mandatory snap-x mx:auto overflow-y-scroll"
            >
                <StudioList
                    iconType="right"
                    onScrollClick={() => scroll(true)}
                    studios={userStudios}
                    title="Your studios"
                />
                <StudioList
                    iconType="left"
                    onScrollClick={() => scroll(false)}
                    studios={allStudios}
                    title="Community studios"
                />
            </div>
        </div>
    );
};

export default Studios;
