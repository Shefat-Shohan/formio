"use client";
import FormDialog from "./FormDialog";
import FormList from "./FormList";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const CreateForm = () => {
  return (
    <div className="md:px-10 px-4 w-full">
      <div className="flex justify-between gap-6 items-center">
        <h2 className="font-bold md:text-3xl text-xl">Dashboard</h2>
        <FormDialog />
      </div>
      <div className="mt-10">
        <FormList />
        {/* <div>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div> */}
      </div>
    </div>
  );
};

export default CreateForm;
