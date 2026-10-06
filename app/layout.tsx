import type { ReactNode } from "react";
import "./globals.css";

export const metadata = {
  title: "Premium Auto Zimbabwe | Curated Automotive",
  description: "A cinematic premium automotive showroom experience for Zimbabwe.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
