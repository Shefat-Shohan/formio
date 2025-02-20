import { ElementLayoutProps } from "@/data/type";
import React, { createContext, useContext, useEffect, useState } from "react";

type EmailTemplateTypes = {
  emailTemplate: ElementLayoutProps[];
  setEmailTemplate: React.Dispatch<React.SetStateAction<ElementLayoutProps[]>>;
};

export const EmailTemplateContext = createContext<
  EmailTemplateTypes | undefined
>(undefined);

export const useEmailContext = () => {
  const context = useContext(EmailTemplateContext);
  if (!context) {
    throw new Error(
      "useEmailContext must be used within a EmailTemplateContextProvider"
    );
  }
  return context;
};

export const EmailTemplateContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [emailTemplate, setEmailTemplate] = useState<ElementLayoutProps[]>([]);
  return (
    <EmailTemplateContext.Provider value={{ emailTemplate, setEmailTemplate }}>
      {children}
    </EmailTemplateContext.Provider>
  );
};
