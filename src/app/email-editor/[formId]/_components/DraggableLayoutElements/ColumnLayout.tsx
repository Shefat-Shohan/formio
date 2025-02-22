import { useDragAndDropLayoutContext } from "@/app/context/DragAndDropLayoutElementContext";
import { useEmailContext } from "@/app/context/EmailTemplateContext";
import { ElementLayoutProps, ElementsListProps } from "@/data/type";
import { useState } from "react";
import ButtonElement from "../ElementComponent/ButtonElement";
import TextElement from "../ElementComponent/TextElement";
import ImageElement from "../ElementComponent/ImageElement";
import LogoElement from "../ElementComponent/LogoElement";
import DividerElement from "../ElementComponent/DividerElement";
import { useSelectedElementContext } from "@/app/context/SelectedElementContext";

type dragOverTypes = {
  index: number;
  columnId?: number;
};

const ColumnLayout = ({ layout }: { layout: ElementLayoutProps }) => {
  const [dragOver, setDragOver] = useState<dragOverTypes | null>(null);
  const { emailTemplate, setEmailTemplate } = useEmailContext();
  const { dragElementLayout } = useDragAndDropLayoutContext();
  const { selectedElement, setSelectedElement } = useSelectedElementContext();
  // on drag of an element to column
  const onDragOverHandle = (
    e: React.DragEvent<HTMLDivElement>,
    index: number
  ) => {
    e.preventDefault();
    setDragOver({
      index: index,
      columnId: layout?.id,
    });
  };

  // on drop elements handler
  const onDropHandler = () => {
    const index = dragOver?.index;
    setEmailTemplate((prevItem) =>
      prevItem?.map((col) =>
        col.id === layout?.id
          ? { ...col, [index]: dragElementLayout?.dragElements }
          : col
      )
    );
    setDragOver(null);
  };
  // get element component.

  const getElementComponent = (element: ElementsListProps) => {
    if (element?.type == "Button") return <ButtonElement {...element} />;
    if (element?.type == "Text") return <TextElement {...element} />;
    if (element?.type == "Image") return <ImageElement {...element} />;
    if (element?.type == "Logo") return <LogoElement {...element} />;
    if (element?.type == "Divider") return <DividerElement {...element} />;
    return element?.type;
  };

  return (
    <div>
      <div
        className="grid gap-0"
        style={{ gridTemplateColumns: `repeat(${layout?.numberOfCol}, 1fr)` }}
      >
        {Array.from({ length: layout.numberOfCol }).map((_, index) => (
          <div
            onDragOver={(e) => onDragOverHandle(e, index)}
            onDrop={onDropHandler}
            key={index}
            className={`p-2 flex items-center justify-center cursor-pointer ${
              selectedElement?.layout?.id == layout?.id &&
              selectedElement?.index == index
                ? "border border-blue-400"
                : " "
            } ${!layout?.[index]?.type ? "bg-[#2F2F2F] border" : ""} ${
              index == dragOver?.index && dragOver?.columnId
                ? "bg-gray-800"
                : ""
            }`}
            onClick={() => setSelectedElement({ layout: layout, index: index })}
          >
            {getElementComponent(layout?.[index]) ?? (
              <span className="text-xs">Add Element</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ColumnLayout;
