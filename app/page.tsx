import * as d3 from "d3";
import { Axis, Orient } from "d3-axis-for-react";
import Link from "next/link";

type LinePlotProps = {
  data: Array<number>;
  width?: number;
  height?: number;
  marginTop?: number;
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
};

function LinePlot({
  data,
  width = 640,
  height = 400,
  marginTop = 20,
  marginRight = 20,
  marginBottom = 30,
  marginLeft = 40,
}: LinePlotProps) {
  const x = d3.scaleLinear(
    [0, data.length - 1],
    [marginLeft, width - marginRight]
  );
  const [minY, maxY] = d3.extent(data) as unknown as [number, number];
  const y = d3.scaleLinear([minY, maxY], [height - marginBottom, marginTop]);
  const line = d3.line((_, i) => x(i), y);
  return (
    <svg width={width} height={height}>
      <g transform={`translate(0,${height - marginBottom})`}>
        <Axis scale={x} />
      </g>
      <g transform={`translate(${marginLeft},0)`}>
        <Axis scale={y} orient={Orient.left} />
      </g>
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

export default function Page() {
  return (
    <div className="flex flex-col space-y-5">
      <div>
        <Link
          href="/client-component"
          className="border rounded-md border-black p-2"
        >
          Client Component
        </Link>
      </div>
      <LinePlot data={[1, 4, 3, 2, 8]} />
    </div>
  );
}
