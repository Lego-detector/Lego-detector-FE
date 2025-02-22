import "@/app/globals.css"
import ThemeProvider from "@/modules/home/_components/ThemeProvider";
import Layout from "@/modules/home/_components/Layout";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 dark:bg-gray-900">
        <ThemeProvider>
          <Layout>{children}</Layout>
        </ThemeProvider>
      </body>
    </html>
  );
}
