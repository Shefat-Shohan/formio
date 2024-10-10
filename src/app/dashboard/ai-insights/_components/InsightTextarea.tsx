"use client";
import { Textarea } from "../../../../components/ui/textarea";

export default function InsightTextarea({ inSightResponse }: { inSightResponse: string[] }) {
  return (
    <Textarea
      placeholder="Generate suggestions"
      className="bg-transparent border-white/30 min-h-72"
      defaultValue={inSightResponse}
    />
  );
}