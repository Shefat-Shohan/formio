"use client";
import EditorHeader from "./_components/EditorHeader";
import ElementsSideBar from "./_components/ElementsSideBar";
import Canvas from "./_components/Canvas";
import Settings from "./_components/Settings";
import { ScreenSizeProvider } from "@/app/context/screenSizeContext";
import { DragAndDropLayoutProvider } from "@/app/context/DragAndDropLayoutElementContext";
import { EmailTemplateContextProvider } from "@/app/context/EmailTemplateContext";
import { SelectedElementProvide } from "@/app/context/SelectedElementContext";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

type Props = {
  params: {
    formId: number;
  };
};

const Editor = ({ params: { formId } }: Props) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };
  return (
    <ScreenSizeProvider>
      <DragAndDropLayoutProvider>
        <EmailTemplateContextProvider>
          <SelectedElementProvide>
            <div className="h-screen relative">
              <EditorHeader />
              <div className="grid grid-cols-5">
                <div className="col-span-1">
                  <ElementsSideBar />
                </div>
                <motion.div
                  style={{ gridColumn: isOpen ? "span 3" : "span 4" }}
                  initial={false}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className={` bg-[#171717] h-full px-2`}
                >
                  <Canvas />
                </motion.div>
                <div className={`${isOpen ? "block" : "hidden"}`}>
                  <Settings />
                </div>
              </div>
              <span
                onClick={handleClick}
                className="hover:bg-[black] rounded-full inline-flex p-2 absolute bottom-6 right-6 cursor-pointer"
              >
                {isOpen ? (
                  <ChevronLeft className=" h-5 w-5 text-white/75" />
                ) : (
                  <ChevronRight className=" h-5 w-5 text-white/75" />
                )}
              </span>
            </div>
          </SelectedElementProvide>
        </EmailTemplateContextProvider>
      </DragAndDropLayoutProvider>
    </ScreenSizeProvider>
  );
};

export default Editor;
