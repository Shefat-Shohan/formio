import { useUser } from "@clerk/nextjs";
import { db } from "../../../../configs";
import { JsonForm } from "../../../../configs/schema";
import { and, desc, eq } from "drizzle-orm";
import { Suspense, useEffect, useState } from "react";
import { formListType } from "@/data/type";
import dynamic from "next/dynamic";
import { ErrorBoundary } from "react-error-boundary";
import CartLoadingSkelaton from "./CardtLoadingSkelaton";
import CardLoadingSkelaton from "./CardtLoadingSkelaton";

export default function FormList() {
  const [formList, setFormList] = useState<formListType>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    user && getActiveUserFormList();
  }, [user]);

  const getActiveUserFormList = async () => {
    try {
      setLoading(true);
      const result = await db
        .select()
        .from(JsonForm)
        .where(
          and(
            // @ts-ignore
            eq(JsonForm.createBy, user?.primaryEmailAddress?.emailAddress),
            eq(JsonForm.isDeleted, false)
          )
        )
        .orderBy(desc(JsonForm.id));

      // Ensure the result is always an array and handle cases where it's undefined or null
      const formList = Array.isArray(result) ? result : [];
      // @ts-ignore
      setFormList(formList);
    } catch (error) {
      console.error("Error fetching active user forms:", error);
      // @ts-ignore
      setFormList([]);
    } finally {
      setLoading(false);
    }
  };

  const FormCard = dynamic(() => import("./FormCard"));
  return (
    <div className="">
      <hr className="border-white/15 mb-10" />
      {loading ? (
        <CardLoadingSkelaton />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-6 md:gap-4">
          {formList.map((form, index) => (
            <div key={index}>
              <ErrorBoundary
                fallback={<h1>Something went wrong. Please retry.</h1>}
              >
                <Suspense fallback={<CardLoadingSkelaton />}>
                  <FormCard
                    jsonForm={JSON.parse(form.jsonForm)}
                    formRecord={[form]}
                    refreshData={getActiveUserFormList}
                  />
                </Suspense>
              </ErrorBoundary>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
