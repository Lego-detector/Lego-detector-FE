"use client";

import React, { createContext, useState, useContext, ReactNode } from 'react';

interface QuotaContextType {
  quota: number;
  setQuota: (quota: number) => void;
}

const QuotaContext = createContext<QuotaContextType | undefined>(undefined);

interface QuotaProviderProps {
  children: ReactNode;
}

export const QuotaProvider: React.FC<QuotaProviderProps> = ({ children }) => {
  const [quota, setQuota] = useState<number>(0);

  return (
    <QuotaContext.Provider value={{ quota, setQuota }}>
      {children}
    </QuotaContext.Provider>
  );
};

export const useQuota = (): QuotaContextType => {
  const context = useContext(QuotaContext);
  if (!context) {
    throw new Error('useQuota must be used within a QuotaProvider');
  }
  return context;
};
