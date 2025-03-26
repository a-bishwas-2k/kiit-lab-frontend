import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Providers from "./provider";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "KIIT-LAB",
  description: "Lab for KIIT students",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" >
      <body className="bg-[#141313]">
        <Providers>
        {/* <div className="h-[5vh]">
        <Navbar/>
        </div> */}

        <div className="h-[100vh] overflow-y-auto w-full">
      {children}

        </div>
        <ToastContainer className=""  />
        {/* <Toaster/> */}
        </Providers>
      </body>
    </html>
  );
}
