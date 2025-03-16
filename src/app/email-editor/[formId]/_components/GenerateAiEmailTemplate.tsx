import { aiContentGeneration } from "@/app/actions/geminiAiModel";
import { useEmailContext } from "@/app/context/EmailTemplateContext";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import AiEmailTemplatePrompt from "@/data/Prompt";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";

const GenerateAiEmailTemplate = ({ campaignId }: { campaignId: number }) => {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState<string>();
  const { emailTemplate, setEmailTemplate } = useEmailContext();
  const [loading, setLoading] = useState(false);

  // generate ai email template

  const generateEmailTemplate = async () => {
    if (!inputValue) return;
    const postData = AiEmailTemplatePrompt.EMAIL_PROMPT + inputValue;
    if (postData) {
      try {
        setLoading(true);
        const response = await aiContentGeneration(postData);
        setEmailTemplate(response);
        setLoading(false);
        setOpen(false);
      } catch (error) {
        setLoading(false);
        console.log("LLM response error.");
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button className="border border-white/15 bg-transparent hover:bg-white hover:text-black transition-colors">
          Generate Email
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-[#2F2F2F] border-white/15">
        <DialogHeader>
          <DialogTitle className="text-white">
            Create email template
          </DialogTitle>
          <DialogDescription className="text-sm text-white/80">
            Describre about your email template.
            <Textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="What this email template all about"
              className="my-3 text-white font-semibold bg-transparent border-white/15 placeholder:text-white lg:max-h-96 lg:min-h-40"
            />
            <Button
              onClick={generateEmailTemplate}
              className="w-full bg-[#171717] hover:bg-[#1a1a1a]"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <LoaderCircle className="animate-spin" />
                  <span>Generating email</span>
                </div>
              ) : (
                "Generate template"
              )}
            </Button>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default GenerateAiEmailTemplate;
