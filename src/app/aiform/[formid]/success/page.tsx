'use client';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Success() {
  return (
    <div className="container mt-20">
      <Alert className="bg-slate-600 text-white border-white/15">
        <AlertTitle>Success</AlertTitle>
        <AlertDescription>
          Your answer is recorded successfully. Thank you for submitting the
          form!
        </AlertDescription>
      </Alert>
    </div>
  );
}
