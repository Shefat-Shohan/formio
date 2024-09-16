import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import cn from "../../utils/cn";

const inter = Inter({ subsets: ["latin"] });

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
<html lang="en" className="scroll-smooth">
  <body className={cn(inter.className, "bg-black text-white antialiased")}>{children}</body>
</html>
  );
}
