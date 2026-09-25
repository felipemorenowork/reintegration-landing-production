import type { Metadata, Viewport } from 'next'
import { faqEntries } from '../components/landing/reintegration/content'
import './globals.css'
import './reintegration-overrides.css'
import './reintegration-product-refresh.css'

const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
const siteUrl = 'https://re-integration.org'
const siteTitle = 'Consultoría de IA para resultados de negocio | Re-integration'
const siteDescription =
  'Consultoría de IA y diseño del trabajo para mejorar resultados de negocio. Empezamos con el Diagnóstico de un resultado crítico y una prueba medible.'

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${siteUrl}/#organization`,
      name: 'Re-integration',
      url: siteUrl,
      email: 'felipe@re-integration.org',
      logo: `${siteUrl}/brand/reintegration-logo.jpg`,
      description: siteDescription,
    },
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      name: 'Re-integration',
      url: siteUrl,
      inLanguage: 'es',
    },
    {
      '@type': 'Service',
      '@id': `${siteUrl}/#servicio`,
      name: 'Diseñamos cómo tu equipo puede mejorar un resultado con IA',
      description:
        'Consultoría de IA y diseño organizacional para mejorar un resultado de negocio mediante el rediseño del trabajo humano más IA.',
      provider: { '@id': `${siteUrl}/#organization` },
      audience: {
        '@type': 'BusinessAudience',
        audienceType: 'Dueños-gerentes y líderes de Operaciones',
      },
      availableLanguage: 'es',
      url: siteUrl,
    },
    {
      '@type': 'FAQPage',
      mainEntity: faqEntries.map(({ question, answer }) => ({
        '@type': 'Question',
        name: question,
        acceptedAnswer: { '@type': 'Answer', text: answer },
      })),
    },
  ],
}

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
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
    title: siteTitle,
    description: siteDescription,
    images: [{ url: '/brand/re-integration-og.png', width: 1200, height: 630, alt: 'Re-integration: diseñamos cómo tu equipo puede mejorar un resultado con IA' }],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/brand/re-integration-og.png'],
  },
  title: siteTitle,
  description: siteDescription,
  keywords: [
    'consultoría de IA',
    'IA para empresas',
    'resultados de negocio',
    'mejora de procesos con IA',
    'rediseño de procesos con IA',
    'implementación de IA en empresas',
    'diseño del trabajo',
    'adopción de IA',
    'diseño organizacional',
  ],
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
  themeColor: '#fcfaf4',
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, '\\u003c'),
          }}
        />
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
