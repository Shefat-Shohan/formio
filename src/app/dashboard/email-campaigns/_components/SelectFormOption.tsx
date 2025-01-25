"use client";
import { useState } from "react";
import { toast } from "sonner";
import { newsletterPropmt } from "@/data";
import { and, eq } from "drizzle-orm";
import { GenerateAIForm } from "@/components/config/AiModel";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import SelectForm from "@/app/dashboard/ai-insights/_components/SelecForm";
import { aiInsight, aiNewsletter } from "../../../../../configs/schema";
import { db } from "../../../../../configs";
import RichTextEditor from "./RichTextEditor";

type aiInsightResponseType = {
  createBy: string;
  formRef: Number | null;
  id: Number;
  inSightResponse: string;
}[];

type newsletterType = {
  createBy: string;
  formRef: Number | null;
  id: Number;
  newsletterResponse: string;
}[];

export default function SelectFormOption() {
  const [aiInsightResponse, setAiInsightResponse] =
    useState<aiInsightResponseType>([]);
  const [content, setContent] = useState<string>("");
  const [newsletter, setNewsletter] = useState<newsletterType>([]);
  const [selectedFormId, setSelectedFormId] = useState<number | undefined>();
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  // connect db and get the ai insight
  const handleSelectOption = async (formId: number) => {
    const result = await db
      .select()
      .from(aiInsight)
      .where(
        and(
          eq(aiInsight.formRef, formId),
          // @ts-ignore
          eq(aiInsight.createBy, user?.primaryEmailAddress?.emailAddress)
        )
      );
    getNewsletter(formId);
    setAiInsightResponse(result);
  };

  // prepare ai prompt
  const prepareAiData = () => {
    return newsletterPropmt + aiInsightResponse?.[0]?.inSightResponse;
  };

  // generate ai insight and update to db.
  const generateAiNewsletter = async () => {
    setLoading(true);

    try {
      if (!selectedFormId) {
        toast.error("No form selected");
        return;
      }

      const postData = prepareAiData();
      const response = await GenerateAIForm(postData);

      const campaignsData =
        response?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!campaignsData) {
        toast.error("Couldn't get the newsletter");
        return;
      }

      // Check if the AI insight exists in the database
      const [existingNewsletter] = await db
        .select()
        .from(aiNewsletter)
        .where(eq(aiNewsletter.formRef, selectedFormId))
        .limit(1);

      const operation = existingNewsletter?.newsletterResponse
        ? db.update(aiNewsletter).set({ newsletterResponse: campaignsData })
        : db
            .insert(aiNewsletter)
            // @ts-ignore
            .values({
              newsletterResponse: campaignsData,
              createBy: user?.primaryEmailAddress?.emailAddress,
              formRef: selectedFormId,
            });

      await operation;
      toast.success("Newsletter generated successfully");
    } catch (error) {
      console.error("Error generating newsletter:", error);
      toast.error("Error generating newsletter");
    } finally {
      setLoading(false);
    }
  };

  // get the selected form ai Insight
  const getNewsletter = async (formId: number | undefined) => {
    const result = await db
      .select()
      .from(aiNewsletter)
      // @ts-ignore
      .where(eq(aiNewsletter.formRef, formId));
    setNewsletter(result);
  };

  const getNewsletterResponse = newsletter?.map(
    (item: any) => item.newsletterResponse
  )[0];

  // handle content change
  const handleContentChange = async (newsletterEdit: string) => {
    try {
      await db
        .update(aiNewsletter)
        .set({
          newsletterResponse: newsletterEdit,
        })
        //@ts-ignore
        .where(eq(aiNewsletter.formRef, selectedFormId));
    } catch (error) {
      console.log("Error updating newsletter:", error);
    }
  };

  return (
    <div>
      <div className="flex md:justify-start flex-col md:flex-row gap-4 md:gap-4 items-start">
        <SelectForm
          setSelectedFormId={setSelectedFormId}
          handleSelectOption={handleSelectOption}
        />
        <Button
          onClick={generateAiNewsletter}
          className="bg-[#8A43FC] hover:bg-[#7c34f0] px-3 py-2  transition-all sm:text-xs md:text-sm md:px-6 md:py-2"
        >
          {loading ? "Generating Newsletter..." : "Generate Ai Newsletter"}
        </Button>
      </div>
      <div className="mt-8">
        <form>
          <RichTextEditor
            initialContent={getNewsletterResponse}
            onChange={(newContent: string) => handleContentChange(newContent)}
          />
        </form>
      </div>
    </div>
  );
}
