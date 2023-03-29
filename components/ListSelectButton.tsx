import { Button } from "@chakra-ui/react";
import React from "react";

interface Props {
    onClick: () => void;
    name: string;
    active: boolean;
    roundedSide: "left" | "right";
    width: string;
}

const ListSelectButton = ({
    onClick,
    name,
    active,
    roundedSide,
    width,
}: Props) => {
    return (
        <Button
            width={width}
            _hover={{
                bg: "brand.primary",
                color: "brand.primary-light",
            }}
            onClick={onClick}
            border="brand.primary"
            borderWidth={1}
            size="xs"
            fontSize="16px"
            variant={active ? "primary" : "ghost"}
            roundedLeft={roundedSide === "left" ? "full" : "0"}
            roundedRight={roundedSide === "right" ? "full" : "0"}
            borderRight={roundedSide === "left" ? "0" : "1px"}
            borderLeft={roundedSide === "right" ? "0" : "1px"}
            h={4}
        >
            {name}
        </Button>
    );
};

export default ListSelectButton;
