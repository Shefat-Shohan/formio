import { ElementLayoutProps, ElementsListProps } from "@/data/type";
import { createContext, useContext, useState } from "react";

// Define the type for the state
type DragState = {
  dragLayout?: ElementLayoutProps & { id: number };
  dragElements?: ElementsListProps & { id: number };
};

// Define the context type
type DragContextType = {
  dragElementLayout: DragState;
  setDragElementLayout: React.Dispatch<React.SetStateAction<DragState>>;
};

// Create context with proper type
export const DragAndDropLayoutContext = createContext<
  DragContextType | undefined
>(undefined);

// Custom hook for using context
export const useDragAndDropLayoutContext = () => {
  const context = useContext(DragAndDropLayoutContext);
  if (!context) {
    throw new Error(
      "useDragAndDropLayout must be used within a DragAndDropLayoutProvider."
    );
  }
  return context;
};
// a default svg just to set default type
const DefaultIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <circle cx="12" cy="12" r="10" />
  </svg>
);
// Default layout value
const defaultLayout: ElementLayoutProps = {
  label: "1 Column",
  type: "column",
  numberOfCol: 1,
  icon: DefaultIcon,
};

const defaulElements: ElementsListProps = {
  icon: DefaultIcon,
  label: "Button",
  type: "Button",
  content: "Sample Button",
  url: "#",

  style: {
    // @ts-ignore
    textAlign: "center",
    backgroundColor: "#007bff",
    color: "#ffffff",
    padding: "10px",
    width: "auto",
    fontSize: "16px",
    borderRadius: "0px",
    fontWeight: "normal",
    objectFit: "contain",
  },
  outerStyle: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
};

// Provider component
export const DragAndDropLayoutProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [dragElementLayout, setDragElementLayout] = useState<DragState>({
    dragLayout: {
      ...defaultLayout,
      id: Date.now(),
    },
    dragElements: {
      ...defaulElements,
      id: Date.now(),
    },
  });

  return (
    <DragAndDropLayoutContext.Provider
      value={{ dragElementLayout, setDragElementLayout }}
    >
      {children}
    </DragAndDropLayoutContext.Provider>
  );
};
