"use client";
import { elementColumnMoudle, elementsList } from "@/data";
import React from "react";
import EmelentLayoutCard from "./EmelentLayoutCard";
import { useDragAndDropLayoutContext } from "@/app/context/DragAndDropLayoutElementContext";
import { ElementLayoutProps } from "@/data/type";
import { ScrollArea } from "@/components/ui/scroll-area";

const ElementsSideBar = () => {
  const { setDragElementLayout } = useDragAndDropLayoutContext();
  const onDragLayoutStart = (layout: ElementLayoutProps) => {
    setDragElementLayout({
      dragLayout: {
        ...layout,
        id: Date.now(),
      },
    });
  };
  // drag elements
  const onDragElementStart = (elements: any) => {
    setDragElementLayout({
      dragElements: {
        ...elements,
        id: Date.now(),
      },
    });
  };
  return (
    // layout
    <div className="p-5 h-full">
      <ScrollArea className="h-[90vh]">
        <h2 className="font-bold text-lg">Layouts</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-3">
          {elementColumnMoudle.map((layout) => (
            <div
              key={layout.numberOfCol}
              draggable
              onDragStart={() => onDragLayoutStart(layout)}
            >
              <EmelentLayoutCard layout={layout} />
            </div>
          ))}
        </div>
        {/* elements */}
        <div className="mt-6">
          <h2 className="font-bold text-lg">Elements</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-3">
            {elementsList.map((elements, index) => (
              <div key={index}>
                <div draggable onDragStart={() => onDragElementStart(elements)}>
                  {/* @ts-ignore */}
                  <EmelentLayoutCard layout={elements} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default ElementsSideBar;
