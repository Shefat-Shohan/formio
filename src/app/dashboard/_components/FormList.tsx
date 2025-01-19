import { useUser } from "@clerk/nextjs";
import { db } from "../../../../configs";
import { JsonForm } from "../../../../configs/schema";
import { desc, eq } from "drizzle-orm";
import { Suspense, useEffect, useState } from "react";
import FormCard from "./FormCard";
import { formListType } from "@/data/type";
import dynamic from "next/dynamic";
import { ErrorBoundary } from "react-error-boundary";
import { Heading1 } from "lucide-react";

export default function FormList() {
  const [formList, setFormList] = useState<formListType>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    user && getActiveUserFormList();
  }, [user]);

  const getActiveUserFormList = async () => {
    setLoading(true);
    const result = await db
      .select()
      .from(JsonForm)
      // @ts-ignore
      .where(eq(JsonForm.createBy, user?.primaryEmailAddress?.emailAddress))
      .orderBy(desc(JsonForm.id));
    // @ts-ignore
    setFormList(result);
    setLoading(false);
  };
  const FormCard = dynamic(() => import("./FormCard"));
  return (
    <div className="overflow-x-scroll md:overflow-hidden">
      <hr className="border-white/15 mb-10" />
      {loading ? (
        "loading..."
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {formList.map((form, index) => (
            <div key={index}>
              <ErrorBoundary
                fallback={<h1>Something went wrong. Please retry.</h1>}
              >
                <Suspense fallback={<h1>Loadin...</h1>}>
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
