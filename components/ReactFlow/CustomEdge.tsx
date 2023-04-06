import React from "react";
import { getBezierPath } from "reactflow";
import { ICustomEdge } from "../../bff/types";

export default function CustomEdge({
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    style = {},
    data,
    markerEnd,
}: ICustomEdge) {
    console.log("🚀 ~ file: CustomEdge.tsx:29 ~ data:", data);
    const [edgePath] = getBezierPath({
        sourceX,
        sourceY,
        sourcePosition,
        targetX,
        targetY,
        targetPosition,
    });

    return (
        <>
            <path
                id={id}
                style={style}
                className="react-flow__edge-path"
                d={edgePath}
                markerEnd={markerEnd}
            />
            <text>
                <textPath
                    onClick={() => console.log("rstjsryjyr")}
                    href={`#${id}`}
                    style={{ fontSize: "24px" }}
                    dominant-baseline="auto"
                    baseline-shift="10px"
                    startOffset="50%"
                    textAnchor="middle"
                >
                    Test edge
                </textPath>
            </text>
        </>
    );
}
