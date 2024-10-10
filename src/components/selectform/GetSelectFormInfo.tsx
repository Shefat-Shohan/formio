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

type insightResponse = {
  createdBy: string;
  formRef: number;
  id: number;
  inSightResponse: string;
};

export default function GetSelectFormInfo() {
  const [response, setResponse] = useState([]);
  const [feedbackInsight, setFeedbackInsight] = useState([]);
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
      const postData = prepareAiData();
      const feedbackInsightdata = await GenerateAIForm(postData);
      const insightText =
        feedbackInsightdata["candidates"][0]["content"]["parts"][0]["text"];

      // check if the ai insigh is already exist in the database based on the action update or insert the data
      if (insightText) {
        const existingInsight = await db
          .select()
          .from(aiInsight)
          .where(eq(aiInsight.formRef, selectedFormId))
          .limit(1);

        if (existingInsight.length > 0 && existingInsight[0].inSightResponse) {
          await db.update(aiInsight).set({
            inSightResponse: insightText,
          });
        } else {
          // @ts-ignore
          await db.insert(aiInsight).values({
            inSightResponse: insightText,
            createBy: user?.primaryEmailAddress?.emailAddress,
            formRef: selectedFormId,
          });
        }
        toast.success("Ai insight generated successfully");
        getAiInsight(selectedFormId);
      } else {
        toast.error("Couldn't get the insight");
      }
    } catch (error) {
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

  const inSightResponse = feedbackInsight.map(
    (item: insightResponse) => item.inSightResponse
  );

  return (
    <div>
      <div className="flex md:justify-between flex-col md:flex-row gap-4 md:gap-0 items-start">
        <SelectForm
          setSelectedFormId={setSelectedFormId}
          handleSelectOption={handleSelectOption}
        />
        <Button
          onClick={generateAiInsight}
          className="bg-gradient-to-r from-[#8C44FF] to-[#390f81] hover:brightness-110"
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
