import { Outlet } from "react-router-dom";
import LightDarkSwitch from "./lightDarkSwitch"; 
import Global from "../styles/global";
import Footer from "./footer";
import { useState, useEffect } from "react";


export default function MainPage() {

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
    <main>
       <LightDarkSwitch onDarkModeChange={handleDarkModeChange} darkMode={isDarkMode} />
      <Global />
      <Outlet />
      <Footer />
    </main>
  );
}
