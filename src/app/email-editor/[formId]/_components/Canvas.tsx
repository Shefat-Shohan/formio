import { useDragAndDropLayoutContext } from "@/app/context/DragAndDropLayoutElementContext";
import { useEmailContext } from "@/app/context/EmailTemplateContext";
import { useScreenSize } from "@/app/context/screenSizeContext";
import { ElementLayoutProps } from "@/data/type";
import { useEffect, useState } from "react";
import ColumnLayout from "./DraggableLayoutElements/ColumnLayout";
import { ScrollArea } from "@/components/ui/scroll-area";
const Canvas = () => {
  const { screenSize } = useScreenSize();
  const { dragElementLayout } = useDragAndDropLayoutContext();
  const { emailTemplate, setEmailTemplate } = useEmailContext();
  const [dragOver, setDragOver] = useState(false);

  // method runs for onDrag over of an element
  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(true);
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
    <ScrollArea className="h-[80vh]">
      <div className="mt-20 flex justify-center">
        <div
          onDragOver={onDragOver}
          onDrop={onDraopOverHandler}
          className={`bg-[#212121] p-6 w-full max-w-2xl ${
            screenSize == "desktop" ? "max-w-2xl" : "max-w-lg"
          }
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
      </div>
      </ScrollArea>
  );
};

export default Canvas;
