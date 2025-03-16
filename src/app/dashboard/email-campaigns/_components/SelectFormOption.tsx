"use client";
import { useEffect, useState } from "react";
import { and, eq } from "drizzle-orm";
import SelectForm from "@/app/dashboard/ai-insights/_components/SelecForm";
import { aiSentiment, emailCampaign } from "../../../../../configs/schema";
import { db } from "../../../../../configs";
import {
  EmailCampaignType,
  parsedBackSentimentType,
  SentimentType,
} from "@/data/type";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import PreviewSentiment from "./PreviewSentiment";
import CreateCampaign from "./CreateCampaign";
import { useUser } from "@clerk/nextjs";
import { Calendar, Contact2, Ellipsis, EllipsisVertical } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import { motion } from "framer-motion";
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
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
export default function SelectFormOption() {
  const [selectedFormId, setSelectedFormId] = useState<number | undefined>();
  const [sentimentResponse, SetSentimentResponse] = useState<SentimentType[]>(
    []
  );
  const [parsedBackSentiment, setParsedbackSentiment] =
    useState<parsedBackSentimentType | null>(null);
  const [selectedEmails, setSelectedEmails] = useState<string[]>([]);
  const [getEmailCampaign, setGetEmailCampaign] = useState<EmailCampaignType[]>(
    []
  );
  const { user } = useUser();
  const [editCampaignTitle, setEditCampaignTitle] = useState<string>();
  const [selectedCampaign, setSelectedCammpaign] = useState<Number | null>(
    null
  );
  // connect db and get the sentiment analysis
  const handleSelectOption = async (formId: number) => {
    const result = await db
      .select()
      .from(aiSentiment)
      .where(eq(aiSentiment.formRef, formId));

    if (!result || result.length === 0) {
      SetSentimentResponse([]);
      setParsedbackSentiment(null);
    }
    // @ts-ignore
    SetSentimentResponse(result);
  };

  // UseEffect to parse sentimentResponse when it changes
  useEffect(() => {
    if (sentimentResponse.length > 0) {
      try {
        setParsedbackSentiment(
          JSON.parse(sentimentResponse[0].sentimentResponse)
        );
      } catch (error) {
        console.error("Error parsing sentimentResponse:", error);
      }
    }
  }, [sentimentResponse]);

  // selcet all the email.

  const allSelected =
    selectedEmails.length === parsedBackSentiment?.emails.length;

  // select all email at once
  const toggleSelectAll = () => {
    if (selectedCampaign === null) {
      toast("Please select a campaign to assign emails.");
      return;
    }

    if (allSelected) {
      setSelectedEmails([]);
    } else {
      setSelectedEmails(parsedBackSentiment?.emails || []);
    }
  };

  // select email from the list
  const toggleCheckbox = (email: string) => {
    if (selectedCampaign !== null) {
      setSelectedEmails((prev) =>
        prev.includes(email)
          ? prev.filter((e) => e !== email)
          : [...prev, email]
      );
    } else {
      toast("plase select a campaign to assign email.");
    }
  };

  useEffect(() => {
    user && getAllCampaign();
  }, [selectedFormId]);
  const getAllCampaign = async () => {
    try {
      const response = await db
        .select()
        .from(emailCampaign)
        .where(
          and(
            //@ts-ignore
            eq(
              emailCampaign.createdBy,
              user?.primaryEmailAddress?.emailAddress
            ),
            //@ts-ignore
            eq(emailCampaign.formRef, selectedFormId)
          )
        );
      if (!response || response.length === 0) {
        setGetEmailCampaign([]);
      }

      //@ts-ignore
      setGetEmailCampaign(response);
    } catch (error) {
      console.log("Databse error", error);
    }
  };

  // truccate campaign title
  const truncateTitle = (text: string, maxLenght: number) => {
    if (text.length <= maxLenght) return text;
    return text.slice(0, text.lastIndexOf(" ", maxLenght)) + "...";
  };

  // delete campaign data
  const handleDeleteCampaign = async (campaignId: number) => {
    const existingId = await db.query.emailCampaign.findFirst({
      where: eq(emailCampaign.id, campaignId),
    });
    if (!existingId) {
      throw new Error("Campaign not found.");
    }
    await db.delete(emailCampaign).where(eq(emailCampaign.id, campaignId));
    getAllCampaign();
    toast("Campaign deleted successfully.");
  };

  // update campaign details
  const updateCampaign = async (campaignID: number) => {
    try {
      await db
        .update(emailCampaign)
        .set({ title: editCampaignTitle })
        .where(eq(emailCampaign.id, campaignID));
      getAllCampaign();
      toast("Campaign updated successfully.");
    } catch (error) {
      console.log("Database error.", error);
    }
  };
  // selected campaign and handle select email on click
  const handleSelectedCampaign = (id: number) => {
    setSelectedCammpaign((prev) => {
      if (prev === id) {
        setSelectedEmails([]); // rest email list on double click
        return null;
      }
      return id;
    });
  };

  return (
    <div>
      <div className="flex md:justify-start flex-col md:flex-row gap-4 md:gap-4 items-start">
        <SelectForm
          setSelectedFormId={setSelectedFormId}
          handleSelectOption={handleSelectOption}
        />
        <PreviewSentiment parsedBackSentiment={parsedBackSentiment} />
      </div>
      {sentimentResponse.length > 0 ? (
        <div className="mt-6 grid lg:grid-cols-2 grid-cols-1 gap-10">
          {/* show all the emails and the overall sentiment analysis */}
          <div className="h-full ">
            <div className="">
              <ScrollArea className="lg:h-[70dvh] md:h-[40dvh] h-[40dvh]">
                <Table>
                  <TableHeader>
                    <TableRow className="border-white/50">
                      <TableHead className="text-white">
                        <Checkbox
                          className="border-white"
                          checked={allSelected}
                          onCheckedChange={toggleSelectAll}
                        />
                      </TableHead>
                      <TableHead className="text-white">Email</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {parsedBackSentiment?.emails.map((email, index) => (
                      <TableRow key={index} className="border-white/15">
                        <TableCell className="font-medium">
                          <Checkbox
                            className="border-white"
                            checked={selectedEmails.includes(email)}
                            onCheckedChange={() => toggleCheckbox(email)}
                          />
                        </TableCell>
                        <TableCell>{email}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </div>
          </div>
          {/* show all the campaing created by the user */}
          <div>
            <div className="flex flex-col items-start md:flex-row gap-4">
              <Button
                disabled={selectedEmails.length == 0}
                className={`border border-white/15 hover:bg-[#3b3b3b] ${
                  selectedEmails.length > 0 ? "bg-[#424242]" : "bg-transparent"
                }`}
              >
                + Add to campaign
              </Button>
              {/* create campaign module */}
              <CreateCampaign
                formRef={selectedFormId}
                getAllCampaign={getAllCampaign}
              />
            </div>
            <ScrollArea className="h-[50dvh] lg:h-[65dvh]">
              <div className="group">
                {getEmailCampaign?.length > 0 ? (
                  getEmailCampaign?.map((item, id) => (
                    <motion.div
                      onClick={() => handleSelectedCampaign(id)}
                      key={id}
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: id * 0.2 }}
                      className="my-4"
                    >
                      <div
                        className={`border p-4 ${
                          selectedCampaign == id
                            ? "border-[#c098ff]/50"
                            : "border-white/15"
                        }  rounded-lg flex flex-col gap-4 cursor-pointer`}
                      >
                        <div className="flex justify-between items-center">
                          <div className="flex gap-2 items-center">
                            <Calendar className="size-5" />
                            <p className="text-sm">
                              created <span>{item.createdAt}</span>
                            </p>
                          </div>
                          <div className="flex gap-2 items-center">
                            <Contact2 className="size-5" />
                            <p className="text-sm">
                              {item.assignedCustomer}
                              <span> customer added</span>
                            </p>
                          </div>
                        </div>
                        <div className="flex justify-between lg:items-center lg:flex-row flex-col items-start lg:gap-0 gap-3">
                          <h2 className="font-bold text-lg">
                            {truncateTitle(item.title, 25)}
                          </h2>
                          <div className="flex items-center gap-3">
                            {/* add delete and edit action */}

                            <Popover>
                              <PopoverTrigger className="opacity-0 group-hover:opacity-100 group-hover:trnsition-durtion-400">
                                <EllipsisVertical className="size-4 text-white " />
                              </PopoverTrigger>
                              <PopoverContent className="bg-[#2F2F2F] border border-white/15 max-w-40">
                                <div>
                                  {/* delete action icons */}
                                  <AlertDialog>
                                    <AlertDialogTrigger className="flex justify-strt gap-4 hover:bg-[#424242] w-full p-2 rounded">
                                      <span className="text-white/70 text-sm">
                                        Delete
                                      </span>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent className="bg-[#2F2F2F] border-white/15">
                                      <AlertDialogHeader>
                                        <AlertDialogTitle className="text-white">
                                          Are you absolutely sure?
                                        </AlertDialogTitle>
                                        <AlertDialogDescription className="text-white/70">
                                          This action cannot be undone. This
                                          will permanently delete your campaign
                                          and email template data from our
                                          servers.
                                        </AlertDialogDescription>
                                      </AlertDialogHeader>
                                      <AlertDialogFooter>
                                        <AlertDialogCancel className="text-white/70 text-sm font-normal bg-transparent border border-white/15 hover:bg-[#424242] hover:text-white/70 px-6 py-2 rounded-full">
                                          Cancel
                                        </AlertDialogCancel>
                                        {/* @ts-ignore */}
                                        <AlertDialogAction
                                          onClick={() =>
                                            handleDeleteCampaign(item.id)
                                          }
                                          className="px-6 py-2 rounded-full bg-red-500 hover:bg-red-600"
                                        >
                                          Delete
                                        </AlertDialogAction>
                                      </AlertDialogFooter>
                                    </AlertDialogContent>
                                  </AlertDialog>
                                  {/* share action icons */}
                                  <AlertDialog>
                                    <AlertDialogTrigger className="flex justify-strt gap-4 hover:hover:bg-[#424242] w-full p-2 rounded">
                                      <span className="text-white/70 text-sm">
                                        Edit
                                      </span>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent className="bg-[#2F2F2F] border-white/15">
                                      <AlertDialogHeader>
                                        <AlertDialogTitle className="text-white">
                                          Update campaign title
                                        </AlertDialogTitle>
                                        <AlertDialogDescription className="text-sm text-white/80">
                                          What is the name of your campaign.
                                          <Input
                                            type="text"
                                            placeholder="Campaign name"
                                            className="my-3 text-gray-800 font-semibold"
                                            value={editCampaignTitle}
                                            defaultValue={item.title}
                                            onChange={(e) =>
                                              setEditCampaignTitle(
                                                e.target.value
                                              )
                                            }
                                          />
                                        </AlertDialogDescription>
                                      </AlertDialogHeader>
                                      <AlertDialogFooter>
                                        <AlertDialogCancel className="text-white/70 text-sm font-normal px-6 py-2 bg-transparent border border-white/15 hover:hover:bg-[#424242] hover:text-white/70 rounded-full">
                                          Cancel
                                        </AlertDialogCancel>
                                        {/* @ts-ignore */}
                                        <AlertDialogAction
                                          onClick={() =>
                                            updateCampaign(item.id)
                                          }
                                          className="px-6 py-2 bg-[#8A43FC] rounded-full hover:bg-[#8A43FC]"
                                        >
                                          Update
                                        </AlertDialogAction>
                                      </AlertDialogFooter>
                                    </AlertDialogContent>
                                  </AlertDialog>
                                </div>
                              </PopoverContent>
                            </Popover>
                            <Link href={`/email-editor/${item.id}`}>
                              <Button className="bg-[#8A43FC] hover:bg-[#a167ff]">
                                Edit Email
                              </Button>
                            </Link>
                            <Button className="bg-[#424242] hover:bg-[#3b3b3b]">
                              Send
                            </Button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <p className="mt-4">create a new campaign.</p>
                )}
              </div>
            </ScrollArea>
          </div>
        </div>
      ) : (
        <h2 className="pt-6">No data show.</h2>
      )}
    </div>
  );
}
