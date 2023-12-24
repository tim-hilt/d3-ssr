"use client";

import * as d3 from "d3";
import { useEffect, useRef } from "react";

type LinePlotProps = {
  data: Array<number>;
  width?: number;
  height?: number;
  marginTop?: number;
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
};

export default function LinePlot({
  data,
  width = 640,
  height = 400,
  marginTop = 40,
  marginRight = 20,
  marginBottom = 30,
  marginLeft = 40,
}: LinePlotProps) {
  const gx = useRef(null);
  const gy = useRef(null);
  const x = d3.scaleLinear(
    [0, data.length - 1],
    [marginLeft, width - marginRight]
  );
  const [minY, maxY] = d3.extent(data) as unknown as [number, number];
  const y = d3.scaleLinear([minY, maxY], [height - marginBottom, marginTop]);
  const line = d3.line((d, i) => x(i), y);
  // @ts-ignore
  useEffect(() => void d3.select(gx.current).call(d3.axisBottom(x)), [gx, x]);
  // @ts-ignore
  useEffect(() => void d3.select(gy.current).call(d3.axisLeft(y)), [gy, y]);
  return (
    <svg width={width} height={height}>
      <text
        x={width / 2}
        y={0 + marginTop / 2}
        textAnchor="middle"
        fontSize="16px"
      >
        Client Component
      </text>
      <g ref={gx} transform={`translate(0,${height - marginBottom})`} />
      <g ref={gy} transform={`translate(${marginLeft},0)`} />
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        d={line(data) as string}
      />
      <g fill="white" stroke="currentColor" strokeWidth="1.5">
        {data.map((d, i) => (
          <circle key={i} cx={x(i)} cy={y(d)} r="2.5" />
        ))}
      </g>
    </svg>
  );
}
