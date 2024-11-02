import { Button } from "@/components/ui/button";
import { Edit, Share, Trash } from "lucide-react";
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
import { JsonForm } from "../../../../configs/schema";
import { and, eq } from "drizzle-orm";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { jsonFormProps } from "@/data/type";

const FormCard: React.FC<jsonFormProps> = ({
  jsonForm,
  formRecord,
  refreshData,
}) => {
  const { user } = useUser();
  // delete form
  const handledelete = async (formId: Number) => {
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
      <div className="border flex flex-col flex-grow rounded-lg p-4 border-white/15 h-full min-w-[250px]">
        <div className="flex items-center justify-between">
          <h2 className="text-md md:text-lg lg:text-xl font-semibold max-w-sm">
            {jsonForm?.name}
          </h2>
          <AlertDialog>
            <AlertDialogTrigger>
              <Trash className="size-4 text-red-400" />
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle className="text-black/80">
                  Are you absolutely sure?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your form and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="text-black">
                  Cancel
                </AlertDialogCancel>
                {/* @ts-ignore */}
                <AlertDialogAction
                  onClick={() => handledelete(formRecord[0].id)}
                >
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
        <p className="mt-2 text-sm text-gray-400 mb-4">
          {jsonForm?.description}
        </p>
        <hr className="py-2 border-white/15" />
        <div className="flex justify-between items-center mt-auto">
          <AlertDialog>
            <AlertDialogTrigger>
              <Button
                type="button"
                variant="secondary"
                className="inline-flex gap-2 items-center"
              >
                <Share className="size-4" /> <span>Share</span>
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle className="text-black/80">
                  Share your form
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Share your form to your customer or your client to get
                  feedback.
                  <div className="pt-4 w-">
                    <Input
                      disabled
                      // @ts-ignore
                      defaultValue={`http://localhost:3000/aiform/${formRecord[0].id}`}
                      type="text"
                    />
                  </div>
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="text-black">
                  Cancel
                </AlertDialogCancel>
                {/* @ts-ignore */}
                <AlertDialogAction onClick={() => copyUrl(formRecord[0].id)}>
                  Copy
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          {/* @ts-ignore */}
          <Link href={`/edit-form/${formRecord[0].id}`}>
            <Button
              type="button"
              variant="secondary"
              className="inline-flex gap-2 items-center"
            >
              <Edit className="size-4" /> <span>Edit</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FormCard;
