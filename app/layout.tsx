import './globals.css';

import { Toaster } from 'sonner';

import { Providers } from '@/providers/providers';

const DEFAULT_TOASTER_DURATION = 3500;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
          <Toaster position="bottom-center" richColors expand={true} duration={DEFAULT_TOASTER_DURATION} />
        </Providers>
      </body>
    </html>
  );
}
