'use client'

import ThemeProvider from "./theme_provider"

function providers({children}:{children: React.ReactNode}) {
  return (
    <>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      {children}
    </ThemeProvider>
    </>
  )
}

export default providers