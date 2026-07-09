import type { Metadata, Viewport } from 'next'
import './globals.css'
import './reintegration-overrides.css'

export const metadata: Metadata = {
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
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
