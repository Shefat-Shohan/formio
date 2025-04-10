"use client";
import { and, eq } from "drizzle-orm";
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
import { db } from "../../../../configs";
import { JsonForm } from "../../../../configs/schema";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  SendHorizonal,
  Share,
  SlidersHorizontal,
  SquareArrowOutUpRight,
} from "lucide-react";
import { useRouter } from "next/navigation";
import FormUi from "../_components/FormUi";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { QuestionType } from "@/data/type";
import ThemeController from "../_components/ThemeController";
import { easeInOut, easeOut, motion } from "framer-motion";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import updateFormFieldPrompts from "@/data/updateFormFieldPrompts";
import { aiContentGeneration } from "@/app/actions/geminiAiModel";

export default function EditForm({ formId }: { formId: number }) {
  const { user } = useUser();
  const [jsonForm, setJsonForm] = useState([]);
  const [upadeTrigger, setUpdateTrigger] = useState(Number);
  const [loading, setLoading] = useState(true);
  const [record, setRecord] = useState<any>({
    background: undefined,
    createAt: new Date(),
    createBy: "",
    id: 0,
    jsonForm: "",
    style: "",
  });
  const [selectedBackground, setSelectedBackground] = useState<any>();
  const [updateFormInput, setUpdateFormInput] = useState<string>("");
  const router = useRouter();

  // fetch json form
  useEffect(() => {
    user && fetchFormData();
  }, [user, formId]);

  // fetch all form data
  const fetchFormData = async () => {
    setLoading(true);
    try {
      const result = await db
        .select()
        .from(JsonForm)
        .where(
          and(
            eq(JsonForm.id, formId),
            // @ts-ignore
            eq(JsonForm.createBy, user?.primaryEmailAddress?.emailAddress)
          )
        );

      if (result.length == 0) {
        return router.push("/not-found");
      } else {
        setRecord(result[0]);
        setJsonForm(JSON.parse(result[0].jsonForm));
        setSelectedBackground(result[0].background);
      }
    } catch (error) {
      console.error("Error fetching form data", error);
    } finally {
      setLoading(false);
    }
  };
  // update field to database
  useEffect(() => {
    if (upadeTrigger) {
      setJsonForm(jsonForm);
      updateDB();
    }
  }, [upadeTrigger]);

  // update formField
  const onFieldUpdate = (
    value: { label: string; placeholder: string },
    index: number
  ) => {
    // @ts-ignore
    jsonForm.questions[index].label = value.label;
    // @ts-ignore
    jsonForm.questions[index].placeholder = value.placeholder;
    setUpdateTrigger(Date.now());
  };
  //update to db
  const updateDB = async () => {
    try {
      const result = await db
        .update(JsonForm)
        .set({
          // @ts-ignore
          jsonForm: jsonForm,
        })
        .where(
          and(
            eq(JsonForm.id, record.id),
            // @ts-ignore
            eq(JsonForm.createBy, user?.primaryEmailAddress?.emailAddress)
          )
        )
        .returning({ id: JsonForm.id });

      toast("Field Updated successfully!!!");
    } catch (error) {
      console.error("Failed to update the field:", error);
      toast("Failed to update the field!");
    }
  };

  const deleteField = (removeIndex: number) => {
    // @ts-ignore
    const result = jsonForm?.questions.filter(
      (item: QuestionType, index: number) => index != removeIndex
    );
    // @ts-ignore
    jsonForm.questions = result;
    setUpdateTrigger(Date.now());
  };

  // share form
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

  // update theme controller
  const updateThemeController = async (value: string, columnName: string) => {
    try {
      const result = await db
        .update(JsonForm)
        .set({
          [columnName]: value,
        })
        .where(
          and(
            // @ts-ignore
            eq(JsonForm.id, record.id),
            // @ts-ignore
            eq(JsonForm.createBy, user?.primaryEmailAddress?.emailAddress)
          )
        );
    } catch (error) {
      toast("Failed to update the theme");
      console.error(error);
    }
  };
  // update form info using ai
  const updateFormDataHandler = async () => {
    if (!updateFormInput) {
      toast("Please describe what you want to update.");
      return;
    }

    try {
      setLoading(true);
      // create the prompt to send to LLM
      const postData =
        updateFormFieldPrompts.UPDATE_FORM_PROMPT +
        updateFormInput +
        JSON.stringify(jsonForm);
      if (postData) {
        const response = await aiContentGeneration(postData);
        //updated data to database
        const result = await db
          .update(JsonForm)
          .set({
            jsonForm: response,
          })
          .where(
            and(
              eq(JsonForm.id, record.id),
              // @ts-ignore
              eq(JsonForm.createBy, user?.primaryEmailAddress?.emailAddress)
            )
          );
      }
      setUpdateFormInput("");
      fetchFormData();
      toast("Form updated successfully");
      setLoading(false);
    } catch (error) {
      toast("Couldn't update the form");
      setLoading(false);
      console.log(error);
    }
  };
  return (
    <motion.section
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.3, ease: easeOut }}
      className="py-10"
    >
      <div>
        <div className="md:px-20 px-4 flex md:flex-row flex-col md:items-center justify-between">
          <h2
            onClick={() => router.push("/dashboard")}
            className="inline-flex items-center gap-2 my-5 cursor-pointer text-white/70 hover:text-white transition-colors"
          >
            <ArrowLeft className="" /> Back
          </h2>
          {loading ? (
            ""
          ) : (
            <div className="flex gap-4">
              {/* @ts-ignore */}
              <Link href={`/aiform/${record?.id}`} target="_blank">
                <Button className="border border-white/20 bg-transparent hover:bg-white hover:text-black transition-all duration-100 ease-in flex items-center gap-2.5">
                  <SquareArrowOutUpRight className="size-4" />
                  Live Preview
                </Button>
              </Link>

              {/* share form url */}
              <AlertDialog>
                <AlertDialogTrigger>
                  <Button
                    type="button"
                    className="bg-[#8A43FC] hover:bg-[#5A28AB] flex items-center gap-2.5 transition-colors duration-300 ease-out"
                  >
                    <Share className="size-4" /> <span>Share</span>
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-[#2F2F2F] border-white/15">
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-white">
                      Share your form
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-white/70">
                      Share your form to your customer or your client to get
                      feedback.
                      <div className="pt-4 w-">
                        <Input
                          disabled
                          className="text-white bg-transparent border-white/25"
                          // @ts-ignore
                          defaultValue={`https://formio-ten.vercel.app/aiform/${record?.id}`}
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
                      className="px-6 py-2 rounded-full bg-[#8A43FC] hover:bg-[#8A43FC]"
                      onClick={() => copyUrl(record?.id)}
                    >
                      Copy
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          )}
        </div>
        <div>
          <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-8 gap-0 md:px-20 px-4 relative">
            <div className="col-span-1 lg:mt-20 mt-10 lg:h-[75dvh] flex flex-col justify-between lg:gap-0 gap-6">
              <div className="border border-white/15 rounded-lg p-4">
                <ThemeController
                  selectedBackground={(value: any) => {
                    updateThemeController(value, "background");
                    setSelectedBackground(value);
                  }}
                />
              </div>

              <div className="relative flex flex-col h-48">
                <Textarea
                  disabled={loading}
                  value={updateFormInput}
                  onChange={(e) => setUpdateFormInput(e.target.value)}
                  placeholder="Tell formio what you want to edit..."
                  className="bg-transparent border-white/25 placeholder:text-white/70 h-full resize-none scrollbar-hide"
                />
                <button
                  disabled={loading}
                  onClick={updateFormDataHandler}
                  className="absolute bottom-4 right-4 bg-white rounded-full p-2 h-9 w-9"
                >
                  <SendHorizonal className="cursor-pointer text-[#171717]" />
                </button>
              </div>
            </div>

            <div
              className="col-span-2 lg:mt-20  mt-10 p-4 lg:p-20 md:p-10 border border-white/15 rounded-lg h-[75dvh] overflow-y-scroll scrollbar-hide relative"
              style={{
                backgroundImage: selectedBackground,
              }}
            >
              <FormUi
                jsonForm={jsonForm}
                loading={loading}
                onFieldUpdate={onFieldUpdate}
                deleteField={(index: number) => deleteField(index)}
              />
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
