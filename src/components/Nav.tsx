"use client";

import { MoonIcon, SunIcon, GithubIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export default function Nav() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const isDark = savedTheme === "dark";
    setIsDarkMode(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  const toggleTheme = () => {
    const newTheme = isDarkMode ? "light" : "dark";
    setIsDarkMode(!isDarkMode);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background-ultra/90 backdrop-blur-md px-4">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <a className="mr-6 flex items-center space-x-2" href="/">
            <span className="hidden sm:inline-block text-lg font-bold">
              ShadeMaker
            </span>
          </a>
        </div>
        <div className="flex flex-1 items-center justify-between gap-x-2 md:justify-end">
          <nav className="flex items-center space-x-1">
            <Button variant="ghost" size="icon" onClick={toggleTheme}>
              <SunIcon className="h-5 w-5 transition-all dark:rotate-90 dark:scale-0" />
              <MoonIcon className="absolute h-5 w-5 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a
                href="https://github.com/MFM-347/ShadeMaker"
                target="_blank"
                rel="noopener noreferrer"
              >
                <GithubIcon className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </a>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}
