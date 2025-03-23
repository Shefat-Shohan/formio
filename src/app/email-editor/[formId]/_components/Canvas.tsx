"use client";
import { useDragAndDropLayoutContext } from "@/app/context/DragAndDropLayoutElementContext";
import { useEmailContext } from "@/app/context/EmailTemplateContext";
import { useScreenSize } from "@/app/context/screenSizeContext";
import { ElementLayoutProps } from "@/data/type";
import { useRef, useState } from "react";
import ColumnLayout from "./DraggableLayoutElements/ColumnLayout";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useHTMLEmailTempalte } from "@/app/context/HtmlEmailTemplate";

const Canvas = () => {
  const { screenSize } = useScreenSize();
  const { dragElementLayout } = useDragAndDropLayoutContext();
  const { emailTemplate, setEmailTemplate } = useEmailContext();
  const [dragOver, setDragOver] = useState(false);
  const { dropZoneRef, getHTMLEmailTemplate } = useHTMLEmailTempalte();
  // method runs for onDrag over of an element
  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(true);
  };
  const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
  };

  // method runs for onDrop of an element
  const onDraopOverHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    if (dragElementLayout?.dragLayout) {
      // @ts-ignore
      setEmailTemplate((prev) => [...prev, dragElementLayout?.dragLayout]);
    }
  };
  // layout component

  const getLayoutComponent = (layout: ElementLayoutProps) => {
    if (layout?.type == "column") {
      return <ColumnLayout layout={layout} />;
    }
  };

  return (
    <div className="flex justify-center items-center my-14">
      <div
        className={`h-[80dvh] w-full overflow-x-hidden overflow-y-auto hide_scrollbar ${
          screenSize == "desktop" ? "max-w-2xl" : "max-w-lg"
        }`}
      >
        <div
          ref={dropZoneRef}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDraopOverHandler}
          className={`bg-white p-6 max-w-2xl
          ${dragOver ? "bg-red-500" : ""}`}
        >
          {emailTemplate.length > 0 ? (
            emailTemplate.map((layout, index) => (
              <div key={index}>{getLayoutComponent(layout)}</div>
            ))
          ) : (
            <h2 className="p-4 text-center border border-dashed bg-gray-200 border-white/15 text-black">
              Add layout
            </h2>
          )}
        </div>
      </div>
    </div>
  );
};

export default Canvas;
