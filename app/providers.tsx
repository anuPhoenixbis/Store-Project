'use client'

import { Toaster } from "@/components/ui/sonner"
import ThemeProvider from "./theme_provider"

function providers({children}:{children: React.ReactNode}) {
  return (
    <>
    <Toaster/>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      {children}
    </ThemeProvider>
    </>
  )
}

export default providers