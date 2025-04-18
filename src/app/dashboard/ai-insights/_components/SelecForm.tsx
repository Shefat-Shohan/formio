"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { db } from "../../../../../configs";
import { and, eq } from "drizzle-orm";
import { JsonForm } from "../../../../../configs/schema";
import { log } from "node:console";

export default function SelectForm({
  setSelectedFormId,
  handleSelectOption,
}: {
  setSelectedFormId: any;
  handleSelectOption: (id: any) => void;
}) {
  const [formList, setFormList] = useState<any>([]);
  const [selectedValue, setSelectedValue] = useState<string | undefined>();
  const { user } = useUser();

  useEffect(() => {
    if (user) getActiveUserResponsesList();
  }, [user]);

  const getActiveUserResponsesList = async () => {
    const result = await db
      .select()
      .from(JsonForm)
      // @ts-ignore
      .where(
        and(
          // @ts-ignore
          eq(JsonForm.createBy, user?.primaryEmailAddress?.emailAddress),
          eq(JsonForm.isDeleted, false)
        )
      );
    setFormList(result);
  };

  const formdata = formList.map((form: any) => ({
    id: form.id,
    jsonForm: JSON.parse(form?.jsonForm),
  }));

  // select the first option when formdata is populated
  useEffect(() => {
    if (formdata.length > 0 && !selectedValue) {
      const firstItem = formdata[0];
      setSelectedFormId(firstItem.id);
      handleSelectOption(firstItem.id);
      setSelectedValue(firstItem.jsonForm.name);
    }
  }, [formdata]);
  
console.log("formdata",formdata);

  return (
    <Select
      value={selectedValue}
      onValueChange={(value) => {
        const selectedItem = formdata.find(
          (item: any) => item.jsonForm.name === value
        );
        setSelectedFormId(selectedItem?.id);
        handleSelectOption(selectedItem?.id);
        setSelectedValue(value);
      }}
    >
      <SelectTrigger className="bg-transparent border-white/15 max-w-[280px]">
        <SelectValue placeholder="Select form" />
      </SelectTrigger>
      <SelectContent className="text-white bg-[#2F2F2F] border-white/15">
        {formdata.map((item: any, index: number) => (
          <SelectItem key={index} value={item.jsonForm.name}>
            {item.jsonForm.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
