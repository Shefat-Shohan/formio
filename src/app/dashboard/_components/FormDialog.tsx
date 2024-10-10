import { GenerateAIForm } from "@/components/config/AiModel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { prompt, promtSuggestion } from "@/data";
import { useUser } from "@clerk/nextjs";
import { FormEvent, useEffect, useState } from "react";
import { db } from "../../../../configs";
import { JsonForm } from "../../../../configs/schema";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";


export default function FormDialog() {
  const [open, setOpen] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [indexOfPrompt, setIndexOfPrompt] = useState(0);
  const { user } = useUser();
  const router = useRouter();
  let moment = require("moment");

  useEffect(() => {
    const interval = setTimeout(() => {
      setIndexOfPrompt((prevIndex) => (prevIndex + 1) % promtSuggestion.length);
    }, 1000);
    return () => clearInterval(interval);
  }, [promtSuggestion.length]);

  const slideVariants = {
    hidden: { y: "100%", opacity: 0 },
    visable: { y: 0, opacity: 1 },
    exit: { y: "-100%", opacity: 0 },
  };

  // prompt length check+
  const isValidLength = (prompt: string): boolean => {
    return prompt.length >= 20 && prompt.length <= 500;
  };

  // alphabet cehck
  const isValidLanguage = (prompt: string): boolean => {
    const regex = /^[a-zA-Z\s]+$/;
    return regex.test(prompt);
  };

  // meaningfull content check
  const containsFeedbackKeywords = (prompt: string): boolean => {
    const feedbackKeywords = [
      "feedback",
      "review",
      "experience",
      "improvement",
      "form",
      "survey",
      "rating",
      "customer service",
      "support",
      "suggestions",
      "response",
      "comments",
      "opinions",
      "performance",
      "satisfaction",
      "assessment",
      "evaluation",
      "user interface",
      "usability",
      "product",
      "service",
      "design",
      "features",
      "interaction",
    ];

    const lowerCasePrompt = prompt.toLowerCase();

    // Check if any of the feedback-related keywords are present
    return feedbackKeywords.some((keyword) =>
      lowerCasePrompt.includes(keyword)
    );
  };

  // spam or repetition check
  const hasRepetitiveCharacters = (prompt: string): boolean => {
    return /(.)\1{4,}/.test(prompt);
  };

  // combone all cehcks
  const sanityCheckPrompt = (prompt: string): boolean => {
    if (!isValidLength(prompt)) {
      console.error("Prompt is too short or too long");
      return false;
    }

    if (!containsFeedbackKeywords(prompt)) {
      console.error("No valid keywork found");
      return false;
    }

    // if (!isValidLanguage(prompt)) {
    //   console.error("Prompt contains invalid characters");
    //   return false;
    // }

    if (hasRepetitiveCharacters(prompt)) {
      console.error("Prompt contain repetitive characters.");
      return false;
    }

    return true;
  };

  // generate the form data and insert to db
  const generateForm = async (e: FormEvent) => {
    e.preventDefault();
    if (!sanityCheckPrompt(userInput)) {
      alert("Please enter a valid propmt");
      return;
    } else {
      setLoading(true);
      const postData = "Description:" + userInput + prompt;
      const data = await GenerateAIForm(postData);
      //connect to db
      if (data["candidates"][0]["content"]["parts"][0]["text"]) {
        const response = await db
          .insert(JsonForm)
          // @ts-ignore
          .values({
            jsonForm: data["candidates"][0]["content"]["parts"][0]["text"],
            createBy: user?.primaryEmailAddress?.emailAddress,
            createdAt: moment().format("DD/MM/YYYY"),
          })
          .returning({ id: JsonForm.id });

        if (response[0].id) router.push(`/edit-form/${response[0].id}`);
        setLoading(false);
      }
      setOpen(false);
      setLoading(false);
    }
  };

  return (
    <div>
      <Button
        className="bg-gradient-to-r from-[#8C44FF] to-[#390f81] hover:brightness-110"
        onClick={() => setOpen(true)}
      >
        + Generate form
      </Button>
      <Dialog open={open}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-black pb-2">
              Create a new form
            </DialogTitle>
            <DialogDescription>
              <AnimatePresence>
                <motion.textarea
                  key={indexOfPrompt}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ duration: 0.5 }}
                  className="h-24 resize-none w-full border border-black/15 rounded-lg p-2"
                  onChange={(event) => setUserInput(event.target.value)}
                  required
                  minLength={20}
                  placeholder={promtSuggestion[indexOfPrompt]}
                />
              </AnimatePresence>
              <div className="flex gap-2 justify-end pt-4">
                <Button disabled={loading} onClick={generateForm}>
                  {loading ? (
                    <span className="animate-pulse">Genegating...</span>
                  ) : (
                    "Generate form"
                  )}
                </Button>
                <Button onClick={() => setOpen(false)} variant="outline">
                  Cancle
                </Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// generate youtube newsletter form