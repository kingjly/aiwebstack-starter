import "./globals.css";
import { TRPCProvider } from "@/lib/provider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen bg-gray-50 text-gray-900 antialiased">
        <TRPCProvider>{children}</TRPCProvider>
      </body>
    </html>
  );
}

