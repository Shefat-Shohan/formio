"use client";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { db } from "../../../../configs";
import { JsonForm } from "../../../../configs/schema";
import { eq } from "drizzle-orm";
import UserResponses from "./_components/UserResponses";
import { formListType } from "../_components/FormList";

export default function Responses() {
  const [formList, setFormList] = useState<formListType>([]);
  const { user } = useUser();
  useEffect(() => {
    user && getActiveUserResponsesList();
  }, [user]);

  const getActiveUserResponsesList = async () => {
    const result = await db
      .select()
      .from(JsonForm)
      // @ts-ignore
      .where(eq(JsonForm.createBy, user?.primaryEmailAddress?.emailAddress));
    setFormList(result);
  };
  return (
    <div className="py-10 md:px-10 px-4 w-full">
      <h1 className="font-bold md:text-3xl text-xl">Responses</h1>
      <hr className="border-white/15 my-10" />
      <div>
        <UserResponses formList={formList} />
      </div>
    </div>
  );
}
