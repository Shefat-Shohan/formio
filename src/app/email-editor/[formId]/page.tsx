"use client";
import EditorHeader from "./_components/EditorHeader";
import ElementsSideBar from "./_components/ElementsSideBar";
import Canvas from "./_components/Canvas";
import Settings from "./_components/Settings";
import { ScreenSizeProvider } from "@/app/context/screenSizeContext";
import { DragAndDropLayoutProvider } from "@/app/context/DragAndDropLayoutElementContext";
import { EmailTemplateContextProvider } from "@/app/context/EmailTemplateContext";
import { SelectedElementProvide } from "@/app/context/SelectedElementContext";

type Props = {
  params: {
    formId: number;
  };
};

const Editor = ({ params: { formId } }: Props) => {
  return (
    <ScreenSizeProvider>
      <DragAndDropLayoutProvider>
        <EmailTemplateContextProvider>
          <SelectedElementProvide>
            <div className="h-screen">
              <EditorHeader />
              <div className="grid grid-cols-5">
                <ElementsSideBar />
                <div className="col-span-3 bg-[#171717]">
                  <Canvas />
                </div>
                <div>
                  <Settings />
                </div>
              </div>
            </div>
          </SelectedElementProvide>
        </EmailTemplateContextProvider>
      </DragAndDropLayoutProvider>
    </ScreenSizeProvider>
  );
};

export default Editor;
