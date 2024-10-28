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
  Section,
  Share,
  Share2,
  SquareArrowOutUpRight,
} from "lucide-react";
import { useRouter } from "next/navigation";
import FormUi from "../_components/FormUi";
import { number } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { FormListType, jsonFormType } from "@/data/type";
import ThemeController from "../_components/ThemeController";
import FormBuilder from "../_components/FormBuilder";
export default function EditForm({
  params: { formId },
}: {
  params: { formId: number };
}) {
  const { user } = useUser();
  const [jsonForm, setJsonForm] = useState<any[]>([]);
  const [upadeTrigger, setUpdateTrigger] = useState(Number);
  const [loading, setLoading] = useState(true);
  const [record, setRecord] = useState<any>([]);
  const [selectedBackground, setSelectedBackground] = useState<any>();
  const router = useRouter();

  // fetch json from from db
  useEffect(() => {
    if (user) {
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

          if (result.length > 0) {
            setRecord(result[0]);
            setJsonForm(JSON.parse(result[0].jsonForm));
            setSelectedBackground(result[0].background);
          } else {
            console.warn("No form found");
          }
        } catch (error) {
          console.error("Error fetching form data", error);
        } finally {
          setLoading(false);
        }
      };
      fetchFormData();
    }
  }, [user, formId]);

  // update field to database
  useEffect(() => {
    if (upadeTrigger) {
      setJsonForm(jsonForm);
      updateDB();
    }
  }, [upadeTrigger]);

  // update formField
  const onFieldUpdate = (value: any, index: number) => {
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
            // @ts-ignore
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
      (item: any, index: number) => index != removeIndex
    );
    // @ts-ignore
    jsonForm.questions = result;
    setUpdateTrigger(Date.now());
  };
  // share form
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

  return (
    <section className="py-10">
      <div>
        <div className="md:px-20 px-6 flex md:flex-row flex-col md:items-center justify-between">
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
                <Button className="bg-slate-700 hover:bg-slate-800 flex items-center gap-2.5">
                  <SquareArrowOutUpRight className="size-4" />
                  Live Preview
                </Button>
              </Link>
              <AlertDialog>
                <AlertDialogTrigger>
                  <Button
                    type="button"
                    className="bg-slate-700 hover:bg-slate-800 flex items-center gap-2.5"
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
                          className=""
                          // @ts-ignore
                          defaultValue={`http://localhost:3000/aiform/${record?.id}`}
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
                    <AlertDialogAction onClick={() => copyUrl(record?.id)}>
                      Copy
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          )}
        </div>
        <div>
          <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-8 gap-0 bg-[url(/paper.svg)] md:px-20 px-0">
            <div className="col-span-1">
              <div className="border p-6 border-white/15 rounded-md mt-20">
                <ThemeController
                  selectedBackground={(value:any) => {
                    updateThemeController(value, "background");
                    setSelectedBackground(value);
                  }}
                />
              </div>
            </div>
            <div
              className="col-span-2 mt-20 p-20 rounded-lg"
              style={{ backgroundImage: selectedBackground }}
            >
              <FormUi
                jsonForm={jsonForm}
                loading={loading}
                onFieldUpdate={onFieldUpdate}
                deleteField={(index: number) => deleteField(index)}
              />
            </div>
            {/* form builder */}
            {/* <div className="col-span-1 mt-20 ">
              <FormBuilder />
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
}
