import { GenerateEmailTemplateModel } from "@/components/config/AiEmailTempleteGenerator";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { prompt } = await req.json();
  try {
    const result = await GenerateEmailTemplateModel.sendMessage(prompt);

    let emailTemplate: string;
    if (result && result.text) {
      emailTemplate = result.text;
    } else if (result && result.content) {
      emailTemplate = result.content;
    } else if (result && result.message) {
      emailTemplate = result.message;
    } else {
      return NextResponse.json(
        { error: "unexpected result format from LLM." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        message: "Template generated successfully!",
        emailTemplate: emailTemplate,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Couldn't fetch the data", error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
