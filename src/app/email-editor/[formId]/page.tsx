"use client";
import { ScreenSizeProvider } from "@/app/context/screenSizeContext";
import { DragAndDropLayoutProvider } from "@/app/context/DragAndDropLayoutElementContext";
import { EmailTemplateContextProvider } from "@/app/context/EmailTemplateContext";
import { SelectedElementProvide } from "@/app/context/SelectedElementContext";
import EmailEditor from "./_components/EmailEditor";
import { EmailTemplateProvider } from "@/app/context/HtmlEmailTemplate";

type Props = {
  params: {
    formId: number;
  };
};

const Editor = ({ params: { formId } }: Props) => {
  const campaignId = formId;
  return (
    <ScreenSizeProvider>
      <DragAndDropLayoutProvider>
        <EmailTemplateContextProvider>
          <SelectedElementProvide>
            <EmailTemplateProvider>
              <EmailEditor campaignId={campaignId} />
            </EmailTemplateProvider>
          </SelectedElementProvide>
        </EmailTemplateContextProvider>
      </DragAndDropLayoutProvider>
    </ScreenSizeProvider>
  );
};

export default Editor;
