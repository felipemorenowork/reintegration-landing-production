"use client"

import Script from "next/script"

const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
const cloudflareAnalyticsToken = process.env.NEXT_PUBLIC_CF_WEB_ANALYTICS_TOKEN

export function Analytics() {
  return (
    <>
      {gaMeasurementId ? (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`} strategy="afterInteractive" />
          <Script id="google-analytics" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];\nfunction gtag(){dataLayer.push(arguments);}\ngtag('js', new Date());\ngtag('config', '${gaMeasurementId}', { anonymize_ip: true });`}
          </Script>
        </>
      ) : null}
      {cloudflareAnalyticsToken ? (
        <Script
          defer
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon={JSON.stringify({ token: cloudflareAnalyticsToken })}
          strategy="afterInteractive"
        />
      ) : null}
    </>
  )
}

export function trackEvent(eventName: string, parameters: Record<string, string> = {}) {
  if (typeof window === "undefined") return

  window.gtag?.("event", eventName, parameters)
}

declare global {
  interface Window {
    gtag?: (command: "event", eventName: string, parameters?: Record<string, string>) => void
  }
}
