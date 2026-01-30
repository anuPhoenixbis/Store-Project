import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import Container from "@/components/global/Container";
import Providers from "./providers";



export const metadata: Metadata = {
  title: "Store App",
  description: "Store Web app made by nextjs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`antialiased`}
      >
        {/* wrapping the providers around the entire app; right now it only holds the theme but we will add more providers later */}
        <Providers>
            {/* here the main layout will always show the navbar on top and the container will hold the children in this case the rest of the app */}
          <Navbar/>
          <Container className="py-20">
            {children}
          </Container>
        </Providers>
      </body>
    </html>
  );
}
