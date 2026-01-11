import "./globals.css";
import Navbar from "./components/Navbar";
import { Geist, Geist_Mono, Montserrat } from "next/font/google";
import Footer from "./components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata = {
  title: "Restaurant-v0.2 Premium template for resturants",
  description: "A modern, high-performance restaurant web template designed for owners who want more than just a beautiful site, they want real reservations, brand presence, and scalability ----Created by Unique Uo",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${montserrat.variable} overflow-x-hidden w-full antialiased font-sans`}
      >
        <Navbar />
        {children}
        <Footer/>
      </body>
    </html>
  );
}
