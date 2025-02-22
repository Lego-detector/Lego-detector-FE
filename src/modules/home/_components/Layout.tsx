import { Navbar } from "./Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300">{children}</main>
      <footer className="text-center py-4 bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
        © {new Date().getFullYear()} MyApp. All rights reserved.
      </footer>
    </div>
  );
}