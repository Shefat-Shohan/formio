import { createContext, useContext, useRef } from "react";

const EmailTemplateContext = createContext<{
  getHTMLEmailTemplate: () => string | undefined;
  dropZoneRef: React.RefObject<HTMLDivElement>;
} | null>(null);

export const useHTMLEmailTempalte = () => {
  const context = useContext(EmailTemplateContext);
  if (!context) {
    throw new Error(
      "useHTMLEmailTempalte must be used within an EmailTemplateProvider"
    );
  }
  return context;
};

export const EmailTemplateProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const dropZoneRef = useRef<HTMLDivElement>(null);
  const getHTMLEmailTemplate = () => {
    return dropZoneRef.current?.innerHTML;
  };
  return (
    <EmailTemplateContext.Provider
      value={{ getHTMLEmailTemplate, dropZoneRef }}
    >
      {children}
    </EmailTemplateContext.Provider>
  );
};
