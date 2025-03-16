import { resend } from "@/lib/resend";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handleEmail(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not found" });
  }

  try {
    const { campaign, recipients } = req.body;
    const emailProises = recipients.map(async (recipient: string) => {
      return resend.emails.send({
        from: "",
        to: recipient,
        subject: campaign.title,
        html: campaign.htmlEmailFormat,
      });
    });
    await Promise.all(emailProises);
    return res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending emails:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
}
