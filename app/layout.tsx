import { GeistSans } from "geist/font/sans";
import "./globals.css";

// WAGMI and Tanstack-query providers
import { Providers } from "./providers";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "MintableLite",
  description: "The next generation NFT marketplace",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="retro" className={GeistSans.className}>
      <body className="">
        <main className="min-h-screen flex flex-col items-center">
          <Providers>
            <NavBar />
            {children}
            <Footer />
          </Providers>
        </main>
      </body>
    </html>
  );
}
