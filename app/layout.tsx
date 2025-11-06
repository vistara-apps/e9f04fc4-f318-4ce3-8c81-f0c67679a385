import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./components/Providers";

export const metadata: Metadata = {
  title: "YieldSense - Intelligent BSC DeFi Yield Optimization",
  description: "Maximize returns on BSC with automated vaults, risk-adjusted strategies, and tokenized liquidity positions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
