import { NextRequest, NextResponse } from "next/server";
import { and, eq, inArray } from "drizzle-orm";
import { currentUser, auth } from "@clerk/nextjs/server";
import { db } from "../../../../configs";
import { JsonForm, userResponses } from "../../../../configs/schema";

export async function GET(request: NextRequest) {
  const { userId } = auth();
  const user = await currentUser();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Get active user's form list
    const formList = await db
      .select()
      .from(JsonForm)
      .where(
        and(
          // @ts-ignore
          eq(JsonForm.createBy, user?.emailAddresses?.[0]?.emailAddress),
          eq(JsonForm.isDeleted, false)
        )
      );

    const formIds = formList.map((form) => form.id);

    // Get unprocessed user responses
    const responses = await db
      .select()
      .from(userResponses)
      .where(
        and(
          inArray(userResponses.formRef, formIds),
          eq(userResponses.isProcessed, false)
        )
      )
      .limit(20);

    return NextResponse.json({ response: responses });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Internal Server Error",
        details: error,
      },
      { status: 500 }
    );
  }
}
