"use client";

import { Button } from "@/components/ui/button";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant='outline'
      size='xs'
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark" ? (
        <SunIcon className='h-5 w-5 ' />
      ) : (
        <MoonIcon className='h-5 w-5' />
      )}
    </Button>
  );
};

export default ThemeSwitcher;
