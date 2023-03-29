import { Center } from "@chakra-ui/react";
import React from "react";
import Icons from "../icons";

interface Props {
    showButton?: boolean;
    positionY: "top" | "bottom";
    positionX: "left" | "right";
    iconType: string;
    onIconClick: () => void;
    fontSize?: string;
}

const FloatingIconButton = ({
    showButton = true,
    positionX,
    positionY,
    iconType,
    onIconClick,
    fontSize = "30px",
}: Props) => {
    return (
        <>
            {showButton && (
                <Center
                    bottom={positionY === "bottom" ? 2 : undefined}
                    top={positionY === "top" ? 2 : undefined}
                    right={positionX === "right" ? 2 : undefined}
                    left={positionX === "left" ? 2 : undefined}
                    color="brand.primary-light"
                    bg="brand.primary"
                    shadow="2xl"
                    pos="fixed"
                    rounded="full"
                    p="8px"
                    _hover={{
                        cursor: "pointer",
                    }}
                >
                    <Icons
                        iconType={iconType}
                        fontSize={fontSize}
                        onClick={onIconClick}
                    />
                </Center>
            )}
        </>
    );
};

export default FloatingIconButton;
