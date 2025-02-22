import { ReactNode } from "react";
import { Navbar } from "@/modules/home/_components";
import "@/app/globals.css";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <body>
        <div className="flex flex-col sm:flex-row h-screen">
          <Navbar />
          <main className="flex flex-col items-center p-6 min-h-screen w-screen bg-gray-300">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
