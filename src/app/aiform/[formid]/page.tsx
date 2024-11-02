"use client";
import React, { useEffect, useState } from "react";
import { db } from "../../../../configs";
import { JsonForm } from "../../../../configs/schema";
import { eq } from "drizzle-orm";
import FormUi from "@/app/edit-form/_components/FormUi";
import { Settings } from "lucide-react";
import Link from "next/link";

export default function LiveAiForm({
  params: { formid },
}: {
  params: { formid: number };
}) {
  const [jsonRecord, setJsonRecord] = useState<any>({
    background: undefined,
    createAt: new Date(),
    createBy: "",
    id: 0,
    jsonForm: "",
    style: "",
  });
  const [jsonForm, setJsonForm] = useState([]);
  const [loading, setLoading] = useState(true);
  // evoke the function
  useEffect(() => {
    formid && GetFormData();
  }, [formid]);
  //fetch database
  const GetFormData = async () => {
    setLoading(true);
    try {
      const result = await db
        .select()
        .from(JsonForm)
        .where(eq(JsonForm.id, Number(formid)));
      setJsonRecord(result[0]);
      setJsonForm(JSON.parse(result[0].jsonForm));
    } catch (err) {
      console.log("Failed to fetch form data.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <section
      className="py-20 min-h-[100vh]"
      style={{
        backgroundImage: jsonRecord.background 
      }}
    >
      <div className="container">
        <FormUi
          jsonForm={jsonForm}
          editable={false}
          loading={loading}
          formId={jsonRecord.id}
        />
      </div>
      <div>
        <div
          className="
        bg-gradient-to-r from-[#200F3C] to-[#34254C] px-4 py-2 rounded-full fixed bottom-2 md:bottom-10 left-6"
        >
          <Link href="/" className="inline-flex items-center gap-2">
            <Settings className="size-4" />
            <span className="text-sm">Build your own ai form</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
