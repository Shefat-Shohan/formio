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
import { eq } from "drizzle-orm";
import { JsonForm } from "../../../../../configs/schema";

export default function SelectForm({
  setSelectedFormId,
  handleSelectOption,
}: {
  setSelectedFormId: any;
  handleSelectOption: (id: any) => void;
}) {
  const [formList, setFormList] = useState<any>([]);
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

  const formdata = formList.map((form: any) => {
    return { id: form.id, jsonForm: JSON.parse(form?.jsonForm) };
  });

  return (
    <Select
      onValueChange={(value) => {
        const selectedValue = formdata.find(
          (item: any) => item.jsonForm.name === value
        );
        setSelectedFormId(selectedValue?.id);
        handleSelectOption(selectedValue?.id);
      }}
    >
      <SelectTrigger className="bg-transparent border-white/15 max-w-[280px]">
        <SelectValue
          placeholder={formdata[0]?.jsonForm.name || "No form found"}
        />
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
