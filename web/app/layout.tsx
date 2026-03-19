import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/layout/Header";

export const metadata: Metadata = {
  title: "Heritage",
  description: "Heritage restaurant management system",
};

export default function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props;
  return (
    <html>
      <body>
        <Header />
      <main className="bg-gray-50 min-h-screen">
          {children}
      </main>
      </body>
    </html>
  );
}
