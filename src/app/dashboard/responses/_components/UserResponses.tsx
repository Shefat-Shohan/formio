"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useRef, useState } from "react";
import { db } from "../../../../../configs";
import { userResponses } from "../../../../../configs/schema";
import { eq } from "drizzle-orm";
import { DataTable } from "./data-table";
import { Button } from "@/components/ui/button";
import * as XLSX from "xlsx";
import { formListType, responseType } from "@/data/type";

export default function UserResponses({
  formList,
}: {
  formList: formListType;
}) {
  const [response, setResponse] = useState<responseType>([]);
  const [getCurrentFormId, setGetCurrentFormId] = useState<Number>();
  const formdata = formList.map((form: any) => {
    return { id: form.id, jsonForm: JSON.parse(form?.jsonForm) };
  });
  // get the selected form
  const handleResponse = async (formId: number) => {
    const result = await db
      .select()
      .from(userResponses)
      .where(eq(userResponses.formRef, formId));
    setResponse(result);
  };

  // Parse the JSON strings
  const parsedFeedbackArray = response.map((item) =>
    JSON.parse(item.jsonResponse)
  );

  const data = parsedFeedbackArray.map((feedbackObj) => {
    const result: any = {};

    Object.entries(feedbackObj).forEach(([key, value]) => {
      result[key] = value;
    });
    return result;
  });

  // assign object accessorkey for table
  const columns =
    data.length > 0
      ? Object.keys(data[0]).map((key) => ({
          accessorKey: key,
          header: key,
        }))
      : [];
  // export feedback data
  const exportData = () => {
    const workSheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, workSheet, "Sheet1");
    XLSX.writeFile(workbook, "Reaponses.xlsx");
  };

  // get all the active user formList
  
  return (
    <section>
      <div>
        <div className="flex justify-start flex-col gap-4 md:flex-row md:gap-4">
          <Select
            onValueChange={(value) => {
              // get selected id
              const selectedValue = formdata.find(
                (item) => item.jsonForm.name === value
              );
              // setGetCurrentFormId(selectedValue?.id);
              handleResponse(selectedValue?.id);
            }}
          >
            <SelectTrigger className="max-w-[280px] bg-transparent border-white/15 w-full">
              <SelectValue placeholder="Select form" />
            </SelectTrigger>
            <SelectContent className="text-white bg-[#2F2F2F] border border-white/15 pb-1.5">
              {formdata.map((item, index: number) => (
                <SelectItem
                  onClick={() => handleResponse(item.id)}
                  key={index}
                  value={item.jsonForm.name}
                >
                  {item.jsonForm.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="">
            <Button
              onClick={exportData}
              className="bg-[#8A43FC] hover:bg-[#7c34f0] px-3 py-2  transition-all sm:text-xs md:text-sm md:px-6 md:py-2"
            >
              Export Response
            </Button>
          </div>
        </div>
        <div className="mt-10">
          <DataTable columns={columns} data={data} />
        </div>
      </div>
    </section>
  );
}
