import CartLoadingSkelaton from "@/app/dashboard/_components/CartLoadingSkelaton";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

export default function page({
  params: { formId },
}: {
  params: { formId: number };
}) {
  const EditForm = dynamic(() => import("./EditForm"), {
    loading: () => <p>Loading...</p>,
  });
  return (
    <>
      <ErrorBoundary fallback={<h1>Something went wrong. Please retry.</h1>}>
        <EditForm formId={formId} />
      </ErrorBoundary>
    </>
  );
}
