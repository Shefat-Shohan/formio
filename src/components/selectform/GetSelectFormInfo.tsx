"use client";
import { useState } from "react";
import { toast } from "sonner";
import { feedbackPrompt } from "@/data";
import { and, eq } from "drizzle-orm";
import { GenerateAIForm } from "@/components/config/AiModel";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import InsightTextarea from "@/app/dashboard/ai-insights/_components/InsightTextarea";
import SelectForm from "@/app/dashboard/ai-insights/_components/SelecForm";
import { aiInsight, userResponses } from "../../../configs/schema";
import { db } from "../../../configs";
import { responseType } from "@/data/type";

type feedbackInsightType = {
  createBy: string;
  formRef: number | null;
  id: number;
  inSightResponse: string;
}[];

export default function GetSelectFormInfo() {
  const [response, setResponse] = useState<responseType>([]);
  const [feedbackInsight, setFeedbackInsight] = useState<feedbackInsightType>(
    []
  );
  const [selectedFormId, setSelectedFormId] = useState<number | undefined>();
  const [loading, setLoading] = useState(false);
  const { user } = useUser();

  const handleSelectOption = async (formId: number) => {
    const result = await db
      .select()
      .from(userResponses)
      .where(eq(userResponses.formRef, formId));
    getAiInsight(formId);
    setResponse(result);
  };

  const parsedFeedbackArray = response.map((item) =>
    JSON.parse(item.jsonResponse)
  );

  // prepare ai prompt
  const prepareAiData = () => {
    return feedbackPrompt + JSON.stringify(parsedFeedbackArray);
  };

  // generate ai insight and update to db.
  const generateAiInsight = async () => {
    setLoading(true);

    try {
      if (!selectedFormId) {
        toast.error("No form selected");
        return;
      }

      const postData = prepareAiData();
      const feedbackInsightData = await GenerateAIForm(postData);

      const insightText =
        feedbackInsightData?.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!insightText) {
        toast.error("Couldn't get the insight");
        return;
      }

      // Check if the AI insight exists in the database
      const [existingInsight] = await db
        .select()
        .from(aiInsight)
        .where(eq(aiInsight.formRef, selectedFormId))
        .limit(1);

      const operation = existingInsight?.inSightResponse
        ? db.update(aiInsight).set({ inSightResponse: insightText })
        : db
            .insert(aiInsight)
            // @ts-ignore
            .values({
              inSightResponse: insightText,
              createBy: user?.primaryEmailAddress?.emailAddress,
              formRef: selectedFormId,
            });

      await operation;
      toast.success("AI insight generated successfully");
      getAiInsight(selectedFormId);
    } catch (error) {
      console.error("Error generating AI insight:", error);
      toast.error("Error generating AI insight");
    } finally {
      setLoading(false);
    }
  };

  // getting the insight from the db
  const getAiInsight = async (formId: number | undefined) => {
    const result = await db
      .select()
      .from(aiInsight)
      // @ts-ignore
      .where(eq(aiInsight.formRef, formId));
    setFeedbackInsight(result);
  };

  const inSightResponse = feedbackInsight.map((item) => item.inSightResponse);

  return (
    <div>
      <div className="flex md:justify-start flex-col md:flex-row gap-4 md:gap-4 items-start">
        <SelectForm
          setSelectedFormId={setSelectedFormId}
          handleSelectOption={handleSelectOption}
        />
        <Button
          onClick={generateAiInsight}
          className="bg-[#8A43FC] hover:bg-[#7c34f0] px-3 py-2  transition-all sm:text-xs md:text-sm md:px-6 md:py-2"
        >
          {loading ? "Generating Insight..." : "Generate Ai Insights"}
        </Button>
      </div>
      <div className="mt-8">
        <InsightTextarea inSightResponse={inSightResponse} />
      </div>
    </div>
  );
}
