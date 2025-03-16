"use server";
import { and, eq, InferSelectModel } from "drizzle-orm";
import { db } from "../../../configs";
import { emailCampaign } from "../../../configs/schema";

type EmailTemplate = InferSelectModel<typeof emailCampaign>;
const getEmailTemplate = async (
  campaignId: number,
  email: string
): Promise<EmailTemplate> => {
  try {
    const response = await db
      .select()
      .from(emailCampaign)
      .where(
        and(
          eq(emailCampaign.id, campaignId),
          eq(emailCampaign.createdBy, email)
        )
      )
      .limit(1);

    if (!response.length) {
      throw new Error("Email template not found");
    }

    return response[0];
  } catch (error) {
    console.error("Error fetching email template:", error);
    throw new Error("Failed to fetch email template");
  }
};

export default getEmailTemplate;
