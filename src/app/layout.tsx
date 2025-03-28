import "@/app/globals.css"
// import ThemeProvider from "@/shared/components/providers/ThemeProvider";
// import Layout from "@/modules/home/_components/Layout";
import QueryProvider from "@/shared/components/queryProvider";

export const metadata = {
  title: 'LEGO DETECTOR',
  description: 'LEGO Detector web application.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-gray-50 dark:bg-gray-900" suppressHydrationWarning>
        {/* <ThemeProvider> */}
          <QueryProvider>
            {/* <Layout> */}
              {children}
            {/* </Layout> */}
          </QueryProvider>
        {/* </ThemeProvider> */}
      </body>
    </html>
  );
}
