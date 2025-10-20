import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "lOGIN PAGE",
  description: "login page for next js app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="PT-br">
      <body >
        {children}
      </body>
    </html>
  );
}
