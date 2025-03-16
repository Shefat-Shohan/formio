"use client"
import CreateForm from "./_components/CreateForm";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
export default function page() {
  const queryClient = new QueryClient();
  return (
    <section className="py-10">
      <QueryClientProvider client={queryClient}>
        <CreateForm />
      </QueryClientProvider>
    </section>
  );
}
