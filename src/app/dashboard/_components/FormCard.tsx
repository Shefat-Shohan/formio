import { Button } from "@/components/ui/button";
import {
  ChevronDown,
  ChevronRight,
  Edit,
  EllipsisVertical,
  Share,
  Trash,
} from "lucide-react";
import Link from "next/link";
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
import { useUser } from "@clerk/nextjs";
import { db } from "../../../../configs";
import {
  aiInsight,
  aiNewsletter,
  JsonForm,
  userResponses,
} from "../../../../configs/schema";
import { and, eq } from "drizzle-orm";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { jsonFormProps } from "@/data/type";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const FormCard: React.FC<jsonFormProps> = ({
  jsonForm,
  formRecord,
  refreshData,
}) => {
  const { user } = useUser();
  // delete form
  const handleDelete = async (formId: Number) => {
    try {
      const result = await db.delete(JsonForm).where(
        and(
          // @ts-ignore
          eq(JsonForm.id, formId),
          // @ts-ignore
          eq(JsonForm.createBy, user?.primaryEmailAddress?.emailAddress)
        )
      );
      if (result) {
        toast("Form deleted successfully.");
        refreshData();
      }
    } catch (error) {
      toast("Couldn't delete the form.");
      console.error("Couldn't delete the form", error);
    }
  };

  // copy form url
  const copyUrl = (formId: Number) => {
    const formLink = `http://localhost:3000/aiform/${formId}`;
    navigator.clipboard
      .writeText(formLink)
      .then(() => {
        toast("Link copied");
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  return (
    <div className="flex flex-wrap">
      <div className="border flex flex-col flex-grow rounded-lg p-4 border-white/15 h-full min-w-[250px] group">
        <div className="flex items-start justify-between mb-4">
          <div className="max-w-sm">
            <h2 className="text-md md:text-lg font-semibold text-white/90">
              {jsonForm?.name}
            </h2>
            <p className="mt-1.5 text-sm text-gray-400 ">
              {jsonForm?.description}
            </p>
          </div>
          <div>
            <Popover>
              <PopoverTrigger className="opacity-0 group-hover:opacity-100 group-hover:trnsition-durtion-400">
                <EllipsisVertical className="size-4 text-white " />
              </PopoverTrigger>
              <PopoverContent className="bg-black border border-white/15">
                <div>
                  {/* delete action icons */}
                  <AlertDialog>
                    <AlertDialogTrigger className="flex justify-strt gap-4 hover:bg-gray-600 w-full p-2 rounded">
                      <span className="text-white/70 text-sm">Delete</span>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="bg-black border-white/15">
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
                        <AlertDialogCancel className="text-white/70 text-sm font-normal bg-transparent border border-white/15 hover:bg-transparent hover:text-white/70 px-6 py-2">
                          Cancel
                        </AlertDialogCancel>
                        {/* @ts-ignore */}
                        <AlertDialogAction
                          className="px-6 py-2 bg-red-500 hover:bg-red-600"
                          // @ts-ignore
                          onClick={() => handleDelete(formRecord[0].id)}
                        >
                          Continue
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                  {/* share action icons */}
                  <AlertDialog>
                    <AlertDialogTrigger className="flex justify-strt gap-4 hover:bg-gray-600 w-full p-2 rounded">
                      <span className="text-white/70 text-sm">Share</span>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="bg-black border-white/15">
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
                              defaultValue={`http://localhost:3000/aiform/${formRecord[0].id}`}
                              type="text"
                            />
                          </div>
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel className="text-white/70 text-sm font-normal bg-transparent border border-white/15 hover:bg-transparent hover:text-white/70">
                          Cancel
                        </AlertDialogCancel>
                        {/* @ts-ignore */}
                        <AlertDialogAction
                          className="px-6 py-2 bg-[#8A43FC] hover:bg-[#8A43FC]"
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
          </div>
        </div>
        <div className="bg-white/10 hover:bg-[#8A43FC] p-3 rounded mt-4 group-icon relative overflow-hidden text-white font-semibold">
          {/* @ts-ignore */}
          <Link
            className="flex items-center justify-center gap-2 w-full relative z-10"
            href={`/edit-form/${formRecord[0].id}`}
          >
            <span className="text-md font-normal">Edit</span>
            <Edit className="size-4 transition-colors " />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FormCard;

// bg-gradient-to-r from-[#8A43FC]  to-[#260B54]
