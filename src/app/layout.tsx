import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import cn from "../../utils/cn";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";
const inter = Inter({ subsets: ["latin"], });

export const metadata: Metadata = {
  title: "Formio",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className="scroll-smooth" suppressHydrationWarning>
        <head>
          <link rel="icon" href="" />
        </head>
        <body
          className={cn(inter.className, "bg-black text-[#ececec] antialiased")}
        >
          {children}
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
