import Link from "next/link";
import LinePlot from "./line-plot";

export default function Page() {
  return (
    <div className="flex flex-col space-y-5">
      <div>
        <Link href="/" className="border rounded-md border-black p-2">
          Go To Server Component
        </Link>
      </div>
      <LinePlot data={[1, 4, 3, 2, 8]} />
    </div>
  );
}
