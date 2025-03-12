import type { Metadata } from 'next';

import Layout from '@/lib/components/layout';
import { Toaster } from '@/lib/components/ui/toaster';
import { fontSans } from '@/lib/styles/fonts';
import { cn } from '@/lib/styles/utils';

import '@/lib/styles/globals.css';

const APP_NAME = 'WhatsApp Link Helper';
const APP_DESCRIPTION = 'WhatsApp Link Helper / Generator';

export const metadata: Metadata = {
  title: APP_NAME,
  description: APP_DESCRIPTION,
  viewport: {
    width: 'device-width',
    initialScale: 1,
  },
  applicationName: APP_NAME,
  appleWebApp: {
    capable: true,
    title: APP_NAME,
    statusBarStyle: 'default',
  },
  formatDetection: {
    telephone: false,
  },
  themeColor: '#FFFFFF',
  openGraph: {
    url: 'https://wa.sznm.dev',
    title: APP_NAME,
    description: APP_DESCRIPTION,
    images: {
      url: 'https://og.sznm.dev/api/generate?heading=WhatsApp%20Link%20Helper&text=https://wa.sznm.dev',
      alt: `${APP_NAME} og-image`,
    },
  },
  twitter: {
    creator: '@sozonome',
    card: 'summary_large_image',
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable
        )}
      >
        <Layout>
          <div className="flex-1">{children}</div>
        </Layout>
        <Toaster />
      </body>
    </html>
  );
};

export default RootLayout;
