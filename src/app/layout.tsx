
import type {Metadata} from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Diffraction Works | Photography & Code',
  description: 'The creative portfolio of Diffraction Works featuring open-source projects and professional photography.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&family=Space+Grotesk:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased bg-background text-foreground scroll-smooth">
        {children}
      </body>
    </html>
  );
}
