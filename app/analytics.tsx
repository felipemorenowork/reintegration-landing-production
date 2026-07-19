"use client"

export function trackEvent(eventName: string, parameters: Record<string, string> = {}) {
  if (typeof window === "undefined") return

  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, parameters)
    return
  }

  window.dataLayer?.push(["event", eventName, parameters])
}

declare global {
  interface Window {
    gtag?: (command: "event", eventName: string, parameters?: Record<string, string>) => void
    dataLayer?: unknown[][]
  }
}
