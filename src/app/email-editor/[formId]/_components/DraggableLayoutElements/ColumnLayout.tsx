import { useDragAndDropLayoutContext } from "@/app/context/DragAndDropLayoutElementContext";
import { useEmailContext } from "@/app/context/EmailTemplateContext";
import { ElementLayoutProps, ElementsListProps } from "@/data/type";
import { useEffect, useRef, useState } from "react";
import ButtonElement from "../ElementComponent/ButtonElement";
import TextElement from "../ElementComponent/TextElement";
import ImageElement from "../ElementComponent/ImageElement";
import LogoElement from "../ElementComponent/LogoElement";
import DividerElement from "../ElementComponent/DividerElement";
import { useSelectedElementContext } from "@/app/context/SelectedElementContext";
import ParagraphElement from "../ElementComponent/ParagraphElement";
import { AlignJustify, X } from "lucide-react";

type dragOverTypes = {
  index: number;
  columnId?: number;
};

export type LayoutTypes = {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  index?: number;
  id: number;
  label: string;
  numberOfCol: 2;
  type: string;
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
    if (dragElementLayout?.dragLayout) return;
    const index = dragOver?.index;
    setEmailTemplate((prevItem) =>
      prevItem?.map((col) =>
        col.id === layout?.id && index !== undefined
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
    if (element?.type == "Paragraph") return <ParagraphElement {...element} />;
    // @ts-ignore
    if (element?.type == "Image") return <ImageElement {...element} />;
    // @ts-ignore
    if (element?.type == "Logo") return <LogoElement {...element} />;
    if (element?.type == "Divider") return <DividerElement {...element} />;
    return element?.type;
  };

  // delete selected element or layout
  const deleteLayout = (layoutId: number | undefined) => {
    const updatedemailTemplate = emailTemplate?.filter(
      (item) => item.id != layoutId
    );
    setEmailTemplate(updatedemailTemplate);
    setSelectedElement([]);
  };

  // Handle sorting functionality
  const handleSortStart = (
    e: React.MouseEvent<HTMLDivElement>,
    layoutId: number
  ) => {
    // Prevent default browser behaviors
    e.preventDefault();

    // Initial mouse position
    const startY = e.clientY;

    // Find the current index of the layout
    const currentIndex = emailTemplate.findIndex(
      (item) => item.id === layoutId
    );
    if (currentIndex === -1) return;

    // Create a visual feedback element
    const ghost = document.createElement("div");
    ghost.style.position = "fixed";
    ghost.style.zIndex = "9999";
    ghost.style.pointerEvents = "none";
    ghost.style.opacity = "0.6";
    ghost.style.background = "#7C34F0";
    ghost.style.width = "100px";
    ghost.style.height = "20px";
    ghost.style.left = `${e.clientX}px`;
    ghost.style.top = `${e.clientY}px`;
    document.body.appendChild(ghost);

    // Tracking variable for current position
    let newIndex = currentIndex;
    let lastY = startY;

    // Mouse move handler for the sorting
    const handleMouseMove = (moveEvent: MouseEvent) => {
      // Move the ghost element
      ghost.style.left = `${moveEvent.clientX}px`;
      ghost.style.top = `${moveEvent.clientY}px`;

      // Calculate direction and displacement
      const deltaY = moveEvent.clientY - lastY;
      lastY = moveEvent.clientY;

      // Find all layout elements (we need their positions)
      const layoutElements = document.querySelectorAll("[data-layout-id]");
      const layoutPositions = Array.from(layoutElements).map((el) => {
        const rect = el.getBoundingClientRect();
        const id = Number(el.getAttribute("data-layout-id"));
        return { id, top: rect.top, bottom: rect.bottom };
      });

      // Determine if we've moved over another layout
      for (let i = 0; i < layoutPositions.length; i++) {
        const pos = layoutPositions[i];
        if (pos.id === layoutId) continue;

        // If mouse is over this layout
        if (moveEvent.clientY >= pos.top && moveEvent.clientY <= pos.bottom) {
          const targetIndex = emailTemplate.findIndex(
            (item) => item.id === pos.id
          );

          // If we found a valid target, and it's different from current position
          if (targetIndex !== -1 && targetIndex !== newIndex) {
            // Update the state to move the item
            setEmailTemplate((prev) => {
              // Clone the array
              const updated = [...prev];
              // Remove from current position
              const [item] = updated.splice(newIndex, 1);
              // Insert at new position
              updated.splice(targetIndex, 0, item);
              return updated;
            });

            // Update tracking variable
            newIndex = targetIndex;
            break;
          }
        }
      }
    };

    // Mouse up handler to clean up
    const handleMouseUp = () => {
      // Remove the ghost element
      document.body.removeChild(ghost);

      // Remove event listeners
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    // Add event listeners for tracking mouse movement
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };
  return (
    <div className="relative" data-layout-id={layout.id}>
      <table
        className={`${
          selectedElement?.layout?.id == layout?.id &&
          "border border-dashed border-blue-600"
        }`}
        style={{
          width: "100%",
          borderCollapse: "collapse",
          textAlign: "center",
        }}
      >
        <tr>
          {Array.from({ length: layout.numberOfCol }).map((_, index) => (
            <td
              key={index}
              onDragOver={(e) => onDragOverHandle(e, index)}
              onDrop={onDropHandler}
              className={`p-2 cursor-pointer ${
                selectedElement?.layout?.id == layout?.id &&
                selectedElement?.index == index
                  ? "border border-dashed border-blue-400"
                  : ""
              } ${
                !layout?.[index]?.type
                  ? "bg-gray-200 border border-dashed border-gray-400"
                  : ""
              } `}
              style={{
                width: `${100 / layout.numberOfCol}%`, // Dynamic column width
                boxSizing: "border-box",
              }}
              onClick={() =>
                setSelectedElement({ layout: layout, index: index })
              }
            >
              {getElementComponent(layout?.[index]) ?? (
                <span className="text-xs text-black">Add Element</span>
              )}
            </td>
          ))}
        </tr>
        {/* @ts-ignore */}
        {selectedElement?.layout?.id == layout?.id && (
          <div className="absolute -right-6 bg-[#171717] rounded-full flex flex-col gap-3 ">
            <div className="flex flex-col items-center gap-3">
              <X
                className="cursor-pointer size-6 p-1 rounded-xl hover:bg-[#212121] hover:scale-105 hover:text-red-500 transition-all"
                onClick={() => deleteLayout(layout?.id)}
              />
              <div className="flex flex-col">
                <div
                  className="cursor-move p-1 rounded-xl hover:bg-[#7C32121214F0] hover:scale-105 transition-all"
                  // @ts-ignore
                  onMouseDown={(e) => handleSortStart(e, layout.id)}
                  title="Drag to reorder"
                >
                  <AlignJustify className="cursor-pointer size-4 rounded-xl hover:text-white hover:scale-105  transition-all" />
                </div>
              </div>
            </div>
          </div>
        )}
      </table>
    </div>
  );
};

export default ColumnLayout;
