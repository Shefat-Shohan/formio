import { createContext, useContext, useState } from "react";

type ScreenSizeContextType = {
  screenSize: string;
  setScreenSize: React.Dispatch<React.SetStateAction<string>>;
};

const ScreenSizeContext = createContext<ScreenSizeContextType | undefined>(undefined);

export const useScreenSize = () => {
  const context = useContext(ScreenSizeContext);
  if (!context) {
    throw new Error("useScreenSize must be used within a ScreenSizeProvider");
  }
  return context;
};

export const ScreenSizeProvider = ({ children }: { children: React.ReactNode }) => {
  const [screenSize, setScreenSize] = useState("desktop");

  return (
    <ScreenSizeContext.Provider value={{ screenSize, setScreenSize }}>
      {children}
    </ScreenSizeContext.Provider>
  );
};
