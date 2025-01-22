import Link from "next/link";
import React from "react";
export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-semibold">Oooops...</h1>
      <h2 className="">That page cannot be found.</h2>
      <p>
        Go back to
        <Link href={"/"} className="font-bold text-[#8A43FC]">
          Homepage
        </Link>
      </p>
    </div>
  );
}
