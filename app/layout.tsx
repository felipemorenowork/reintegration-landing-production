import type { Metadata, Viewport } from 'next'
import './globals.css'
import './reintegration-overrides.css'

const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

export const metadata: Metadata = {
  metadataBase: new URL('https://re-integration.org'),
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: '/',
    siteName: 'Re-integration',
  },
  twitter: {
    card: 'summary',
  },
  title: 'Re-integration · Entorno de coordinación',
  description:
    'Rediseñamos el entorno donde tu equipo coordina, decide y comparte criterio para convertir IA, capacitación y herramientas en capacidad real.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: 'white',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="es"
      className="light bg-background"
      style={{
        '--font-geist-sans': 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        '--font-geist-mono': '"SFMono-Regular", Consolas, "Liberation Mono", monospace',
        '--font-fraunces': 'Georgia, "Times New Roman", serif',
      } as React.CSSProperties}
    >
      <head>
        {gaMeasurementId ? (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`} />
            <script
              id="google-analytics"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  window.gtag = function gtag(){window.dataLayer.push(arguments);};
                  window.gtag('js', new Date());
                  window.gtag('config', '${gaMeasurementId}', { anonymize_ip: true });
                `,
              }}
            />
          </>
        ) : null}
      </head>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
