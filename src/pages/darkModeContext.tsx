// darkModeContext.tsx

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface DarkModeContextProps {
  isDarkMode: boolean;
  handleDarkModeChange: () => void;
}

const DarkModeContext = createContext<DarkModeContextProps | undefined>(undefined);

interface DarkModeProviderProps {
  children: ReactNode;
}

export const DarkModeProvider: React.FC<DarkModeProviderProps> = ({ children }) => {
  const storedDarkMode = localStorage.getItem("isDarkMode");
  const initialDarkMode = storedDarkMode ? JSON.parse(storedDarkMode) : false;
  const [isDarkMode, setDarkMode] = useState(initialDarkMode);

  const handleDarkModeChange = () => {
    setDarkMode((prevDarkMode: any) => !prevDarkMode);
  };

  useEffect(() => {
    localStorage.setItem("isDarkMode", isDarkMode.toString());
  }, [isDarkMode]);

  return (
    <DarkModeContext.Provider value={{ isDarkMode, handleDarkModeChange }}>
      {children}
    </DarkModeContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useDarkMode = () => {
  const context = useContext(DarkModeContext);
  if (!context) {
    throw new Error('useDarkMode must be used within a DarkModeProvider');
  }
  return context;
};
