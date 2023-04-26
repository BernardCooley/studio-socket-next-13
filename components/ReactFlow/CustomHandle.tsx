import { Box } from "@chakra-ui/react";
import React, { useState } from "react";
import { Handle, Position } from "reactflow";

interface Props {
    type: "source" | "target";
    label: string;
    id: string;
}

const CustomHandle = ({ type, label, id }: Props) => {
    const [hovered, setHovered] = useState(false);

    return (
        <Box display="flex" justifyContent="center" width="30px">
            {hovered && (
                <Box
                    top={type === "source" ? 2 : "unset"}
                    bottom={type === "target" ? 2 : "unset"}
                    position="absolute"
                    fontSize="xs"
                    overflow="auto"
                    textAlign="center"
                >
                    {label}
                </Box>
            )}
            <Handle
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                type={type}
                position={Position.Bottom}
                id={id}
                isConnectable={true}
                style={{
                    ...(type === "source" ? { bottom: -14 } : { bottom: 2 }),
                    ...{
                        left: "unset",
                        width: "10px",
                        height: "10px",
                        transform: "unset",
                        border: "none",
                    },
                    ...(hovered
                        ? { backgroundColor: "black" }
                        : { backgroundColor: "#9498A0" }),
                }}
            />
        </Box>
    );
};

export default CustomHandle;
