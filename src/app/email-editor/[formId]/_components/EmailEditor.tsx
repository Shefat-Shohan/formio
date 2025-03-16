import React, { useEffect, useState } from "react";
import EditorHeader from "./EditorHeader";
import { Plus, SettingsIcon } from "lucide-react";
import ElementsSideBar from "./ElementsSideBar";
import Settings from "./Settings";
import Canvas from "./Canvas";
import { useEmailContext } from "@/app/context/EmailTemplateContext";
import { easeInOut, easeOut, motion } from "framer-motion";
import { useUser } from "@clerk/nextjs";
import { db } from "../../../../../configs";
import { and, eq } from "drizzle-orm";
import { emailCampaign } from "../../../../../configs/schema";
import { useRouter } from "next/navigation";
import getEmailTemplate from "@/app/actions/getEmailTemplate";
import { parse } from "path";
import { EmailCampaignType } from "@/data/type";

const EmailEditor = ({ campaignId }: { campaignId: number }) => {
  const [activeComponent, setActiveComponent] = useState("elements"); // Default to 'elements'
  const [emailTemplateResponse, setEmailTempalteResponse] =
    useState<EmailCampaignType>();
  const { emailTemplate, setEmailTemplate } = useEmailContext();
  const router = useRouter();
  const { user } = useUser();
  const handleSettingPanel = () => {
    setActiveComponent("settings"); // Show settings when clicked
  };

  const handleElementBarPanel = () => {
    setActiveComponent("elements"); // Show elements when clicked
  };

  // get email tempalte from databse
  useEffect(() => {
    const fetchEmailTemplate = async () => {
      const email = user?.primaryEmailAddress?.emailAddress;
      if (!email) {
        return;
      }
      try {
        const template = await getEmailTemplate(campaignId, email);

        if (!template) {
          router.push("/");
        } else {
          //@ts-ignore
          setEmailTempalteResponse(template);
        }
      } catch (error) {
        console.error(error);
        router.push("/");
      }
    };
    fetchEmailTemplate();
  }, [campaignId, user, router]);

  // parse the string email data to a valid json format
  useEffect(() => {
    if (emailTemplateResponse) {
      const validateEmailTemplate = emailTemplateResponse?.emailTemplate;
      const parsedEmailTemplate = validateEmailTemplate
        ? JSON.parse(validateEmailTemplate)
        : null;
      setEmailTemplate(parsedEmailTemplate);
    }
  }, [emailTemplateResponse, setEmailTemplate]);
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: easeInOut }}
      className="h-screen relative"
    >
      <EditorHeader campaignId={campaignId} />
      <div className="flex">
        <div className="flex">
          <div className="flex flex-col lg:gap-2 gap-1 border-r border-white/15 lg:px-2 lg:pt-4 md:p-3 p-2 cursor-pointer">
            <SettingsIcon
              onClick={handleSettingPanel}
              className="hover:bg-[#2F2F2F] p-2 lg:size-10 size-8 rounded"
            />
            <Plus
              onClick={handleElementBarPanel}
              className="hover:bg-[#2F2F2F] p-2 lg:size-10 size-8 rounded"
            />
          </div>
          <div className=" border-r border-white/15">
            {activeComponent === "elements" && <ElementsSideBar />}
            {activeComponent === "settings" && <Settings />}
          </div>
        </div>
        <div className={` bg-[#171717] h-full px-2 w-full`}>
          <Canvas />
        </div>
      </div>
    </motion.div>
  );
};
export default EmailEditor;
