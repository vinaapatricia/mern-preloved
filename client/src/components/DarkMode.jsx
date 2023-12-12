/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import darkPng from "../../images/website/dark-mode-button.png";
import lightPng from "../../images/website/light-mode-button.png";

const DarkMode = () => {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );

  const elementRef = useRef(document.documentElement);

  useEffect(() => {
    const element = elementRef.current;

    if (theme === "dark") {
      element.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      element.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  return (
    <div className="relative">
      <img
        src={lightPng}
        alt="light"
        onClick={() => setTheme((data) => (data === "dark" ? "light" : "dark"))}
        className={`w-12 cursor-pointer drop-shadow-[1px_1px_1px_rgba(0,0,0,0.1)] transition-all duration-300 absolute right-0 z-10 ${
          theme === "dark" ? "opacity-0" : "opacity-100"
        }`}
      />
      <img
        src={darkPng}
        alt="dark"
        onClick={() => setTheme((data) => (data === "dark" ? "light" : "dark"))}
        className="w-12 cursor-pointer drop-shadow-[1px_1px_2px_rgba(0,0,0,0.5)] duration-300"
      />
    </div>
  );
};

export default DarkMode;
