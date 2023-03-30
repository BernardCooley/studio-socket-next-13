/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import "./styles.scss";
import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import Canvas from "../../../../components/Canvas";

interface Props {}

const Studios = ({}: Props) => {
    return (
        <Box className="bernard container">
            <Canvas />
        </Box>
    );
};

export default Studios;
