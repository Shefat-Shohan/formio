import GetSelectFormInfo from "@/components/selectform/GetSelectFormInfo";
import React from "react";

export default function page() {
  return (
    <div className="py-10 md:px-10 px-4 w-full">
      <div>
        <h1 className="font-bold md:text-3xl text-xl">Ai Insights</h1>
        <hr className="border-white/15 my-10" />
        <GetSelectFormInfo />
      </div>
    </div>
  );
}
