import {
  ChevronDown,
  ChevronRight,
  Edit,
  EllipsisVertical,
  Share,
  Trash,
} from "lucide-react";
import Link from "next/link";

import { useUser } from "@clerk/nextjs";
import { db } from "../../../../configs";
import { aiInsight, JsonForm, userResponses } from "../../../../configs/schema";
import { and, eq } from "drizzle-orm";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { jsonFormProps } from "@/data/type";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useQueryClient } from "@tanstack/react-query";

const FormCard: React.FC<jsonFormProps> = ({
  jsonForm,
  formRecord,
  refreshData,
}) => {
  const { user } = useUser();
  const queryClient = useQueryClient();
  // delete form
  const handleDelete = async (formId: number) => {
    try {
      await db
        .update(JsonForm)
        .set({ isDeleted: true })
        .where(
          and(
            // @ts-ignore
            eq(JsonForm.createBy, user?.primaryEmailAddress?.emailAddress),
            // @ts-ignore
            eq(JsonForm.id, formId)
          )
        );
      console.log("Database updated. Now invalidating query...");

      await queryClient.invalidateQueries({ queryKey: ["formList"] });

      console.log("Query invalidated. It should now refetch...");
      toast("Form deleted successfully.");
    } catch (error) {
      toast("Couldn't delete the form and related data.");
      console.error("Couldn't delete the form and related data", error);
    }
  };

  // copy form url
  const copyUrl = (formId: Number) => {
    const formLink = `https://formio-ten.vercel.app/aiform/${formId}`;
    navigator.clipboard
      .writeText(formLink)
      .then(() => {
        toast("Link copied");
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };
  const paragraph = jsonForm?.description.slice(0, 100);

  return (
    <div className="flex flex-wrap">
      <div className="border flex flex-col flex-grow rounded-lg px-6 py-6 border-white/15 h-full min-w-[250px] group bg-[#212121]">
        <div className="flex items-start gap-3 lg:gap-4 justify-between">
          {/* form title */}
          <div className="max-w-sm">
            <h2 className="text-sm md:text-lg font-semibold text-white/90">
              {jsonForm?.name}
            </h2>
            <p className="mt-2 text-sm font-normal text-white/50 ">
              {paragraph}...
            </p>
          </div>
          {/* form button module */}
          <div className="flex flex-col md:gap-10 gap-20">
            <Popover>
              <PopoverTrigger className="opacity-0 group-hover:opacity-100 group-hover:trnsition-durtion-400">
                <EllipsisVertical className="size-4 text-white " />
              </PopoverTrigger>
              <PopoverContent className="bg-[#2F2F2F] border border-white/15">
                <div>
                  {/* delete action icons */}
                  <AlertDialog>
                    <AlertDialogTrigger className="flex justify-strt gap-4 hover:bg-[#424242] w-full p-2 rounded">
                      <span className="text-white/70 text-sm">Delete</span>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="bg-[#2F2F2F] border-white/15">
                      <AlertDialogHeader>
                        <AlertDialogTitle className="text-white">
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-white/70">
                          This action cannot be undone. This will permanently
                          delete your form and remove your data from our
                          servers.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel className="text-white/70 text-sm font-normal bg-transparent border border-white/15 hover:bg-[#424242] hover:text-white/70 px-6 py-2 rounded-full">
                          Cancel
                        </AlertDialogCancel>
                        {/* @ts-ignore */}
                        <AlertDialogAction
                          className="px-6 py-2 rounded-full bg-red-500 hover:bg-red-600"
                          // @ts-ignore
                          onClick={() => handleDelete(formRecord[0].id)}
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                  {/* share action icons */}
                  <AlertDialog>
                    <AlertDialogTrigger className="flex justify-strt gap-4 hover:hover:bg-[#424242] w-full p-2 rounded">
                      <span className="text-white/70 text-sm">Share</span>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="bg-[#2F2F2F] border-white/15">
                      <AlertDialogHeader>
                        <AlertDialogTitle className="text-white">
                          Share your form
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-gray-400">
                          Share your form to your customer or your client to get
                          feedback.
                          <div className="pt-6">
                            <Input
                              disabled
                              // @ts-ignore
                              className="text-white bg-transparent border-white/25"
                              defaultValue={`https://formio-ten.vercel.app/aiform/${formRecord[0].id}`}
                              type="text"
                            />
                          </div>
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel className="text-white/70 text-sm font-normal bg-transparent border border-white/15 hover:hover:bg-[#424242] hover:text-white/70 rounded-full">
                          Cancel
                        </AlertDialogCancel>
                        {/* @ts-ignore */}
                        <AlertDialogAction
                          className="px-6 py-2 bg-[#8A43FC] rounded-full hover:bg-[#8A43FC]"
                          onClick={() => copyUrl(formRecord[0].id)}
                        >
                          Copy
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </PopoverContent>
            </Popover>
            {/* edit button */}
            {/* @ts-ignore */}
            <Link className="" href={`/edit-form/${formRecord[0].id}`}>
              <Edit className="size-4 transition-colors " />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormCard;

// bg-gradient-to-r from-[#8A43FC]  to-[#260B54]
