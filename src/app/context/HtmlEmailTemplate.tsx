import React, { createContext, useContext, useState } from "react";

type HTMLEmailTemplateContextType = {
  htmlEmailTemplate: string;
  setHtmlEmailTemplate: React.Dispatch<React.SetStateAction<string>>;
};

const HTMLEmailTemplateContext = createContext<
  HTMLEmailTemplateContextType | undefined
>(undefined);

export const useHTMLEmailTemplate = () => {
  const context = useContext(HTMLEmailTemplateContext);
  if (!context) {
    throw new Error(
      "useHtmltemplate must be used within an HTMLTemplateProvider"
    );
  }
  return context;
};

export const HTMLTemplateProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [htmlEmailTemplate, setHtmlEmailTemplate] = useState<string>("");

  return (
    <HTMLEmailTemplateContext.Provider
      value={{ htmlEmailTemplate, setHtmlEmailTemplate }}
    >
      {children}
    </HTMLEmailTemplateContext.Provider>
  );
};
