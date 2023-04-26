import React from "react";
import { getSimpleBezierPath } from "reactflow";
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
}: ICustomEdge) {
    const [edgePath] = getSimpleBezierPath({
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
            />
            <path
                className="react-flow__edge-path"
                style={{ strokeWidth: 5 }}
                d={edgePath}
            />
            <text>
                <textPath
                    onClick={() => console.log("rstjsryjyr")}
                    href={`#${id}`}
                    style={{ fontSize: "18px" }}
                    startOffset="50%"
                >
                    {data.label}
                </textPath>
            </text>
        </>
    );
}
