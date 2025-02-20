import { ElementLayoutProps } from "@/data/type";
import { createContext, useContext, useState } from "react";

type SelectedElementType = {
  selectedElement: ElementLayoutProps[];
  setSelectedElement: React.Dispatch<
    React.SetStateAction<ElementLayoutProps[]>
  >;
};

export const selectedElementContext = createContext<
  SelectedElementType | undefined
>(undefined);

export const useSelectedElementContext = () => {
  const context = useContext(selectedElementContext);
  if (!context) {
    throw new Error(
      "useSelectedElementContext must be used within a SelectedElementProvide."
    );
  }
  return context;
};

export const SelectedElementProvide = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [selectedElement, setSelectedElement] = useState<ElementLayoutProps[]>(
    []
  );

  return (
    <selectedElementContext.Provider
      value={{ selectedElement, setSelectedElement }}
    >
      {children}
    </selectedElementContext.Provider>
  );
};
