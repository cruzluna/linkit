import "./globals.css";
import { dark } from "@clerk/themes";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { ReduxProvider } from "@/redux/provider";

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
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        variables: {
          colorInputText: "black",
        },
      }}
    >
      <html lang="en">
        <body className={inter.className}>
          <ReduxProvider>
            {children}
          </ReduxProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
