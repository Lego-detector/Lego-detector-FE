import "@/app/globals.css"
import ThemeProvider from "@/shared/components/providers/ThemeProvider";
import Layout from "@/modules/home/_components/Layout";
import QueryProvider from "@/shared/components/queryProvider";
import AuthProvider from "@/modules/home/_contexts/AuthContext";

export const metadata = {
  title: 'LEGO DETECTOR',
  description: 'LEGO Detector web application.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ThemeProvider>
          <QueryProvider>
              <AuthProvider>
                <Layout>
                  {children}
                </Layout>
              </AuthProvider>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
