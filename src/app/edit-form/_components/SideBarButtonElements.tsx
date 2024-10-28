import { Button } from "@/components/ui/button";
import { FormElement } from "./FormElements";
import { useDraggable } from "@dnd-kit/core";
import { isDragActive } from "framer-motion";
import { cn } from "@/lib/utils";

function SideBarButtonElements({ formElement }: { formElement: FormElement }) {
  const { label, icon: Icon } = formElement.designerBtnElement;
  const draggable = useDraggable({
    id: `designer-btn-${formElement.type}`,
    data: {
      type: formElement.type,
      isDesignerBtnElement: true,
    },
  });
  return (
    <Button
      ref={draggable.setNodeRef}
      variant="default"
      className={cn(
        "flex flex-col gap-2 h-[120px] w-[120px] cursor-grab",
        draggable.isDragging && "ring-2 ring-primary "
      )}
      {...draggable.listeners}
      {...draggable.attributes}
    >
      <Icon className="size-8 text-white/70" />
      <p className="text-xs">{label}</p>
    </Button>
  );
}

export function SideBarButtonElementsDragOverlay({
  formElement,
}: {
  formElement: FormElement;
}) {
  const { label, icon: Icon } = formElement.designerBtnElement;
  const draggable = useDraggable({
    id: `designer-btn-${formElement.type}`,
    data: {
      type: formElement.type,
      isDesignerBtnElement: true,
    },
  });
  return (
    <Button
      variant="default"
      className={"flex flex-col gap-2 h-[120px] w-[120px] cursor-grab"}
    >
      <Icon className="size-8 text-white/70 cursor-grab" />
      <p className="text-xs">{label}</p>
    </Button>
  );
}

export default SideBarButtonElements;
