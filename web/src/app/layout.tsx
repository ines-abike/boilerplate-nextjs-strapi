import type { Metadata } from "next";
import "./globals.css";
import Header from "../components/layout/Header";
import { Playfair_Display, Poppins } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-playfair",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "700"], 
  variable: "--font-poppins",
});
export const metadata: Metadata = {
  title: "Heritage",
  description: "Heritage restaurant management system",
};

export default function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props;
  return (
    <html lang="en" className={`${playfair.variable} ${poppins.variable}`}>
      <body className="font-poppins text-black-400"> 
        <Header />
        <main className="bg-gray-50 min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
