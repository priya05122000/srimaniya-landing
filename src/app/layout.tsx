import ClientLayout from "./ClientLayout";
import "./globals.css";

// Removed unused Geist font imports and variables

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
