import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { Alkatra } from "next/font/google";
import Provider from "./provider";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

const alkatra = Alkatra({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={alkatra.className}>
          <Provider>{children}</Provider>
        </body>
      </html>
    </ClerkProvider>
  );
}
