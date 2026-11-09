import React, { createContext, useContext, useState, useEffect } from 'react';
import { STATUS as defaultStatus, foundation, fullName, LOGO_PATH } from '../data/foundation';

type FoundationStatus = "general" | "public_interest";

interface FoundationContextType {
  status: FoundationStatus;
  setStatus: (status: FoundationStatus) => void;
  isPublicInterest: boolean;
  currentFullName: string;
  foundation: typeof foundation;
  logoPath: string;
  textSize: "normal" | "large";
  setTextSize: (size: "normal" | "large") => void;
}

const FoundationContext = createContext<FoundationContextType | undefined>(undefined);

export const FoundationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [textSize, setTextSize] = useState<"normal" | "large">("normal");

  useEffect(() => {
    if (textSize === "large") {
      document.documentElement.classList.add("text-size-large");
    } else {
      document.documentElement.classList.remove("text-size-large");
    }
  }, [textSize]);

  const currentFullName = fullName("general");
  const isPublicInterest = false;
  const status: FoundationStatus = "general";
  const setStatus = (_newStatus: FoundationStatus) => {};

  return (
    <FoundationContext.Provider
      value={{
        status,
        setStatus,
        isPublicInterest,
        currentFullName,
        foundation,
        logoPath: LOGO_PATH,
        textSize,
        setTextSize
      }}
    >
      {children}
    </FoundationContext.Provider>
  );
};

export const useFoundation = (): FoundationContextType => {
  const context = useContext(FoundationContext);
  if (!context) {
    throw new Error('useFoundation must be used within a FoundationProvider');
  }
  return context;
};
