import { useUser } from "@clerk/nextjs";
import { db } from "../../../../configs";
import { JsonForm } from "../../../../configs/schema";
import { desc, eq } from "drizzle-orm";
import { useEffect, useState } from "react";
import FormCard from "./FormCard";
import { formListType } from "@/data/type";

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
    setFormList(result);
    setLoading(false);
  };
  return (
    <div className="overflow-x-scroll md:overflow-hidden">
      <hr className="border-white/15 mb-10" />
      {loading ? (
        ""
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {formList.map((form, index) => (
            <div key={index}>
              <FormCard
                jsonForm={JSON.parse(form.jsonForm)}
                formRecord={[form]}
                refreshData={getActiveUserFormList}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
