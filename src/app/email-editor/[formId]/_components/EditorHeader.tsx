import LogoIcon from "@/assets/logo.svg";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Monitor, Smartphone } from "lucide-react";
import { useScreenSize } from "@/app/context/screenSizeContext";
import { useRouter } from "next/navigation";
import { useEmailContext } from "@/app/context/EmailTemplateContext";
import { db } from "../../../../../configs";
import { eq } from "drizzle-orm";
import { emailCampaign } from "../../../../../configs/schema";
import { toast } from "sonner";
import GenerateAiEmailTemplate from "./GenerateAiEmailTemplate";

const EditorHeader = ({ campaignId }: { campaignId: number }) => {
  const router = useRouter();
  const { screenSize, setScreenSize } = useScreenSize();
  const { emailTemplate } = useEmailContext();
  const handleClick = () => {
    router.back();
  };

  const saveEmailTemplate = async (campaignId: number) => {
    const stringifyEmailTemplate = JSON.stringify(emailTemplate);
    const existingEmailTemplate = await db.query.emailCampaign.findFirst({
      where: eq(emailCampaign.id, campaignId),
    });
    if (!existingEmailTemplate) {
      throw new Error("Email Campaign not found.");
    }
    await db
      .update(emailCampaign)
      .set({ emailTemplate: stringifyEmailTemplate })
      .where(eq(emailCampaign.id, campaignId));
    toast("Email Template is saved.");
    console.log("emailTemplate", emailTemplate);
  };

  return (
    <div className="lg:p-3 p-2 border-b border-white/15 flex justify-between items-center relative">
      <div className="flex items-center gap-2">
        <Link
          onClick={handleClick}
          href={""}
          className={`border size-10 rounded-lg inline-flex justify-center items-center border-white/15`}
        >
          <LogoIcon className="size-6" />
        </Link>
        {/* <span>Formio</span> */}
      </div>
      <div className="gap-3 lg:flex hidden absolute left-1/2 transform -translate-x-1/2">
        <Button
          onClick={() => setScreenSize("desktop")}
          variant="outline"
          className={`border-none hover:bg-transparent ${
            screenSize == "desktop"
              ? "bg-[#7C34F0] hover:bg-[#7C34F0] text-white"
              : "bg-transparent text-black"
          }`}
        >
          <span className="text-white flex gap-2 items-center">
            <Monitor /> Desktop
          </span>
        </Button>
        <Button
          onClick={() => setScreenSize("mobile")}
          variant="outline"
          className={`border-none hover:bg-transparent ${
            screenSize == "mobile"
              ? "bg-[#7C34F0] hover:bg-[#7C34F0] text-white"
              : "bg-transparent text-black"
          }`}
        >
          <span className="text-white flex gap-2 items-center">
            <Smartphone /> Mobile
          </span>
        </Button>
      </div>
      <div className="flex lg:gap-4 gap-1">
        <GenerateAiEmailTemplate campaignId={campaignId} />
        <Button
          onClick={() => saveEmailTemplate(campaignId)}
          className="bg-[#8A43FC] hover:bg-[#7C34F0] sm:text-xs"
        >
          Save Template
        </Button>
      </div>
    </div>
  );
};

export default EditorHeader;
