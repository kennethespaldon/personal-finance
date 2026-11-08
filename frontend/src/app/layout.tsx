import { Geist, Geist_Mono } from "next/font/google";
import SideNav from "@/src/components/SideNav";
import { type Metadata } from "next";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Personal Finance",
    default: "Personal Finance",
  },
  description:
    "A personal budgeting app for tracking expenses, managing budgets, and building better financial habits.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full">
        <div>
          <SideNav />
        </div>

        <div>{children}</div>
      </body>
    </html>
  );
}
