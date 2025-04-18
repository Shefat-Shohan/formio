import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { db } from "../../../../../configs";
import { emailCampaign } from "../../../../../configs/schema";
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

const CreateCampaign = ({
  formRef,
  getAllCampaign,
  sentimentType,
}: {
  formRef: number | undefined;
  sentimentType: string;
  getAllCampaign: () => void;
}) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [open, setOpen] = useState(false);
  const { user } = useUser();
  // create a campaign and store to database.

  const createCampaign = async () => {
    if (!formRef || !inputValue) return;
    // @ts-ignore
    await db.insert(emailCampaign).values({
      subject: inputValue,
      createdAt: new Date().toLocaleString(),
      createdBy: user?.primaryEmailAddress?.emailAddress,
      formRef: formRef,
      sentimentType: sentimentType,
    });
    getAllCampaign();
    setInputValue("");
    setOpen(false);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button className="border border-white/15 bg-transparent hover:bg-white hover:text-black transition-colors">
          + create campaign
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-[#2F2F2F] border-white/15">
        <DialogHeader>
          <DialogTitle className="text-white">
            Create a new campaign
          </DialogTitle>
          <DialogDescription className="text-sm text-white/80">
            What is the subject of your campaign.
            <Input
              type="text"
              placeholder="Campaign name"
              className="mt-5 mb-3 text-gray-800 font-semibold"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <Button
              className="w-full bg-[#8A43FC] hover:bg-[#A167FF]"
              onClick={createCampaign}
            >
              Create Campaign
            </Button>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCampaign;
