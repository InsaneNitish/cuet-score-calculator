"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeProvider({ children, ...props }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <NextThemesProvider 
      attribute="class"
      themes={['light', 'dark', 'earthy', 'ocean', 'slatet']}
      value={{
        light: 'light',
        dark: 'dark',
        earthy: 'earthy',
        ocean: 'ocean',
        slatet: 'slatet'
      }}
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}
