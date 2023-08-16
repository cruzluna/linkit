// "use client"; // root layoud cannot be set to a client component
// https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#root-layout-required:~:text=The%20root%20layout%20is%20a%20Server%20Component%20by%20default%20and%20can%20not%20be%20set%20to%20a%20Client%20Component.
import "./globals.css";
import { Inter } from "next/font/google";
// import { ThemeProvider } from "@material-tailwind/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "notespace",
  description: "create your own notespace",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // <ThemeProvider>
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
    // </ThemeProvider>
  );
}
