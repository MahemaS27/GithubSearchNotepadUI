import "./globals.css";
import "@radix-ui/themes/styles.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="p-4">{children}</body>
    </html>
  );
}
