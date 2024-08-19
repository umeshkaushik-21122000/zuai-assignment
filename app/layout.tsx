import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Notifications from "@/components/CompositeComonent/Notification";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Zu-Ai",
  description: "Front End Assignment",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Notifications />
        {children}
      </body>
    </html>
  );
}