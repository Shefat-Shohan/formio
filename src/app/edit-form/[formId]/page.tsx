import CartLoadingSkelaton from "@/app/dashboard/_components/CardtLoadingSkelaton";
import { Divide } from "lucide-react";
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
        <Suspense fallback={<div>loading..</div>}>
          <EditForm formId={formId} />
        </Suspense>
      </ErrorBoundary>
    </>
  );
}
