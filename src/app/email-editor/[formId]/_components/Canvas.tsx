"use client";
import { useDragAndDropLayoutContext } from "@/app/context/DragAndDropLayoutElementContext";
import { useEmailContext } from "@/app/context/EmailTemplateContext";
import { useScreenSize } from "@/app/context/screenSizeContext";
import { ElementLayoutProps } from "@/data/type";
import { useRef, useState } from "react";
import ColumnLayout from "./DraggableLayoutElements/ColumnLayout";
import { ScrollArea } from "@/components/ui/scroll-area";

const Canvas = () => {
  const { screenSize } = useScreenSize();
  const { dragElementLayout } = useDragAndDropLayoutContext();
  const { emailTemplate, setEmailTemplate } = useEmailContext();
  const dropZoneRef = useRef<HTMLDivElement>(null);
  const [dragOver, setDragOver] = useState(false);

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
      <ScrollArea
        className={`h-[80dvh] w-full no-scrollbar ${
          screenSize == "desktop" ? "max-w-2xl" : "max-w-lg"
        }`}
      >
        <div
          ref={dropZoneRef}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDraopOverHandler}
          className={`bg-[#212121] p-6 
          ${dragOver ? "bg-[#8A43FC]" : ""}`}
        >
          {emailTemplate.length > 0 ? (
            emailTemplate.map((layout, index) => (
              <div key={index}>{getLayoutComponent(layout)}</div>
            ))
          ) : (
            <h2 className="p-4 text-center border bg-[#2F2F2F] border-dashed border-white/15">
              Add layout
            </h2>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default Canvas;
