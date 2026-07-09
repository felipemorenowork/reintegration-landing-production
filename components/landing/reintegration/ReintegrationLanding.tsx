"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { BarChart3, Bot, GraduationCap, Users, Wrench } from "lucide-react"
import { auditFrames, checkSteps, ctaLabel, flowLenses, googleFormEntries, googleFormResponseUrl } from "./content"

type AuditMode = (typeof auditFrames)[number]["mode"]
type FlowLens = (typeof flowLenses)[number]["id"]

export function ReintegrationLanding() {
  return (
    <main className="ri-landing">
      <SiteNav />
      <HeroSection />
      <AuditSection />
      <LayerRevealSection />
      <FlowMethodSection />
      <CoordinationCheckSection />
      <FaqCtaSection />
    </main>
  )
}

function SiteNav() {
  return (
    <nav className="ri-nav" aria-label="Navegación principal">
      <a className="ri-brand ri-brand-logo" href="#inicio" aria-label="Re-integration">
        <img src="/brand/reintegration-logo.jpg" alt="Re-integration" />
      </a>
      <a className="ri-nav-cta" href="#formulario">{ctaLabel}</a>
    </nav>
  )
}

function HeroSection() {
  return (
    <section className="ri-hero ri-hero-approved" id="inicio">
      <HeroCanvas />
      <div className="ri-hero-trails" aria-hidden="true">
        <svg viewBox="0 0 900 700" preserveAspectRatio="none">
          <path className="trail trail-a" d="M30 124 C255 70 410 505 860 444" />
          <path className="trail trail-b" d="M0 338 C290 272 495 370 915 95" />
          <path className="trail trail-c" d="M208 -28 C332 190 335 502 512 742" />
          <path className="trail trail-d" d="M380 -44 C435 215 550 472 770 720" />
          <path className="trail trail-e" d="M68 638 C315 358 590 300 928 650" />
          <path className="trail trail-f" d="M160 52 C420 172 560 250 872 220" />
        </svg>
      </div>
      <div className="ri-hero-frame">
        <article className="ri-hero-copy" aria-label="Hero Re-integration">
          <p className="ri-kicker">Diseño de entornos de coordinación</p>
          <h1>
            <span className="soft">No cambias cómo trabaja un equipo</span>
            <span className="main">pidiéndole más voluntad.</span>
            <span className="flow">Lo cambias rediseñando el entorno.</span>
          </h1>
          <p className="ri-hero-lede">Para que coordinar bien sea más fácil que volver al caos.</p>
          <div className="ri-hero-actions">
            <a className="ri-primary-btn" href="#formulario">{ctaLabel}</a>
            <a className="ri-secondary-link" href="#flow">Ver cómo funciona FLOW</a>
          </div>
        </article>
        <div className="ri-hero-note">Mueve el cursor sobre las trayectorias.</div>
      </div>
    </section>
  )
}

type Point = { x: number; y: number }

function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const pointerRef = useRef({ x: -9999, y: -9999, active: false })

  useEffect(() => {
    const canvas = canvasRef.current
    const section = canvas?.closest(".ri-hero")
    const ctx = canvas?.getContext("2d", { alpha: true })
    if (!canvas || !section || !ctx) return
    const heroCanvas = canvas
    const heroSection = section as HTMLElement
    const context = ctx

    const colors = {
      navy: [23, 53, 74],
      violet: [106, 41, 227],
      cloud: [252, 250, 244],
    }
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let width = 0
    let height = 0
    let time = 0
    let raf = 0
    let ghostGaps: Array<{ x: number; y: number; color: number[]; born: number; radius: number }> = []

    function rgba(rgb: number[], alpha: number) {
      return `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${alpha})`
    }

    function mix(a: number, b: number, t: number) {
      return a + (b - a) * t
    }

    function cubic(p0: Point, p1: Point, p2: Point, p3: Point, t: number) {
      const u = 1 - t
      return {
        x: u ** 3 * p0.x + 3 * u ** 2 * t * p1.x + 3 * u * t ** 2 * p2.x + t ** 3 * p3.x,
        y: u ** 3 * p0.y + 3 * u ** 2 * t * p1.y + 3 * u * t ** 2 * p2.y + t ** 3 * p3.y,
      }
    }

    function makeTrail(seed: number, variant: number) {
      const topStart = variant % 3 === 0
      const leftStart = variant % 3 === 1
      const lean = Math.sin(seed * 9.1)
      const sweep = Math.cos(seed * 6.7)
      let p0: Point
      let p3: Point

      if (topStart) {
        p0 = { x: mix(width * -0.12, width * 0.76, seed), y: -height * mix(0.12, 0.48, seed) }
        p3 = { x: mix(width * 0.22, width * 1.16, 1 - seed), y: height * mix(0.72, 1.22, seed) }
      } else if (leftStart) {
        p0 = { x: -width * mix(0.04, 0.24, seed), y: mix(height * 0.04, height * 0.75, seed) }
        p3 = { x: width * mix(0.72, 1.22, seed), y: mix(height * 0.12, height * 0.9, 1 - seed) }
      } else {
        p0 = { x: mix(width * 0, width * 1.1, seed), y: -height * 0.2 }
        p3 = { x: mix(width * -0.1, width * 1.08, 1 - seed), y: height * 1.14 }
      }

      return {
        p0,
        p1: { x: width * (0.12 + seed * 0.82 + lean * 0.18), y: height * (0.02 + Math.abs(sweep) * 0.54) },
        p2: { x: width * (0.2 + (1 - seed) * 0.72 - lean * 0.12), y: height * (0.34 + Math.abs(lean) * 0.72) },
        p3,
        phase: seed,
        speed: mix(0.000018, 0.000044, (seed * 7.3) % 1),
        color: colors.violet,
        alpha: variant % 3 === 0 ? 0.42 : 0.34,
        thickness: variant % 4 === 0 ? 1.45 : 1.16,
      }
    }

    let trails: ReturnType<typeof makeTrail>[] = []

    function animatePoint(point: Point, trail: ReturnType<typeof makeTrail>, index: number) {
      const cx = width * 0.58
      const cy = height * 0.46
      const wave = time * (0.00011 + index * 0.000004) + trail.phase * Math.PI * 2
      const direction = time * (0.000055 + index * 0.000003) + trail.phase * 4.6
      const angle = Math.sin(time * 0.000082) * 0.58 + Math.sin(direction) * 0.09
      const scaleX = 1 + Math.sin(direction * 0.58) * 0.055
      const scaleY = 1 + Math.cos(direction * 0.64) * 0.075
      const x = point.x - cx
      const y = point.y - cy

      return {
        x: cx + x * scaleX * Math.cos(angle) - y * scaleY * Math.sin(angle) + Math.sin(wave) * (54 + index * 7),
        y: cy + x * scaleX * Math.sin(angle) + y * scaleY * Math.cos(angle) + Math.cos(wave * 0.82) * (42 + index * 5),
      }
    }

    function resize() {
      const rect = heroCanvas.getBoundingClientRect()
      width = Math.max(rect.width, 1)
      height = Math.max(rect.height, 1)
      heroCanvas.width = Math.floor(width * dpr)
      heroCanvas.height = Math.floor(height * dpr)
      context.setTransform(dpr, 0, 0, dpr, 0, 0)
      trails = Array.from({ length: 6 }, (_, i) => makeTrail((i + 1) / 8, i))
    }

    function distanceToPointer(point: Point) {
      const pointer = pointerRef.current
      return Math.hypot(point.x - pointer.x, point.y - pointer.y)
    }

    function drawTrail(trail: ReturnType<typeof makeTrail>, index: number) {
      const samples = width < 760 ? 390 : 560
      const drift = Math.sin(time * trail.speed + trail.phase * Math.PI * 2) * 0.022
      const offset = (time * trail.speed * 0.42 + trail.phase) % 1
      const p0 = animatePoint(trail.p0, trail, index)
      const p1 = animatePoint(trail.p1, trail, index)
      const p2 = animatePoint(trail.p2, trail, index)
      const p3 = animatePoint(trail.p3, trail, index)

      for (let i = 0; i < samples; i++) {
        if ((i + Math.floor(offset * samples)) % 12 > 7) continue
        const t1 = Math.max(0, Math.min(1, i / samples + drift))
        const t2 = Math.max(0, Math.min(1, t1 + 0.00125))
        if (t1 <= 0 || t1 >= 1) continue
        const pA = cubic(p0, p1, p2, p3, t1)
        const pB = cubic(p0, p1, p2, p3, t2)
        const field = pointerRef.current.active ? Math.max(0, 1 - distanceToPointer(pA) / 118) : 0
        if (field > 0.18 && Math.random() < 0.012) {
          ghostGaps.push({ x: pA.x, y: pA.y, color: trail.color, born: time, radius: 12 + field * 34 })
        }
        const flowPulse = 0.82 + Math.sin(t1 * Math.PI * 14 + time * 0.0018 + trail.phase * 10) * 0.18
        const alpha = Math.max(0, trail.alpha * flowPulse * (1 - field * 0.88))
        if (alpha <= 0.012) continue
        context.beginPath()
        context.moveTo(pA.x, pA.y)
        context.lineTo(pB.x, pB.y)
        context.strokeStyle = rgba(trail.color, alpha)
        context.lineWidth = trail.thickness * (0.74 + flowPulse * 0.46)
        context.lineCap = "round"
        context.stroke()
      }
    }

    function drawGhosts() {
      ghostGaps = ghostGaps.filter((gap) => time - gap.born < 900)
      for (const gap of ghostGaps) {
        const age = (time - gap.born) / 900
        const gradient = context.createRadialGradient(gap.x, gap.y, 0, gap.x, gap.y, gap.radius)
        gradient.addColorStop(0, rgba(colors.cloud, 0.24 * (1 - age)))
        gradient.addColorStop(0.45, rgba(gap.color, 0.035 * (1 - age)))
        gradient.addColorStop(1, rgba(colors.cloud, 0))
        context.fillStyle = gradient
        context.beginPath()
        context.arc(gap.x, gap.y, gap.radius, 0, Math.PI * 2)
        context.fill()
      }
    }

    function drawVisibleField() {
      const curves = [
        { p0: { x: width * 0.08, y: height * 0.2 }, p1: { x: width * 0.34, y: height * 0.12 }, p2: { x: width * 0.62, y: height * 0.82 }, p3: { x: width * 0.94, y: height * 0.7 }, alpha: 0.34 },
        { p0: { x: width * 0.02, y: height * 0.48 }, p1: { x: width * 0.42, y: height * 0.4 }, p2: { x: width * 0.66, y: height * 0.5 }, p3: { x: width * 1.08, y: height * 0.22 }, alpha: 0.26 },
        { p0: { x: width * 0.24, y: -height * 0.04 }, p1: { x: width * 0.36, y: height * 0.28 }, p2: { x: width * 0.42, y: height * 0.74 }, p3: { x: width * 0.58, y: height * 1.08 }, alpha: 0.3 },
        { p0: { x: width * 0.42, y: -height * 0.08 }, p1: { x: width * 0.48, y: height * 0.34 }, p2: { x: width * 0.62, y: height * 0.7 }, p3: { x: width * 0.86, y: height * 1.02 }, alpha: 0.22 },
        { p0: { x: width * 0.12, y: height * 0.86 }, p1: { x: width * 0.44, y: height * 0.5 }, p2: { x: width * 0.7, y: height * 0.42 }, p3: { x: width * 1.03, y: height * 0.88 }, alpha: 0.24 },
      ]

      context.save()
      context.setLineDash([16, 18])
      context.lineCap = "round"
      context.lineWidth = width < 760 ? 1.15 : 1.35
      context.lineDashOffset = -time * 0.045
      curves.forEach((curve, index) => {
        const drift = Math.sin(time * 0.0007 + index) * 18
        context.beginPath()
        context.moveTo(curve.p0.x, curve.p0.y + drift)
        context.bezierCurveTo(curve.p1.x, curve.p1.y - drift, curve.p2.x, curve.p2.y + drift * 0.6, curve.p3.x, curve.p3.y - drift)
        context.strokeStyle = rgba(colors.violet, curve.alpha)
        context.stroke()
      })
      context.restore()
    }

    function render(now: number) {
      time = now
      context.fillStyle = rgba(colors.cloud, 1)
      context.fillRect(0, 0, width, height)
      drawVisibleField()
      trails.forEach(drawTrail)
      drawGhosts()
      raf = requestAnimationFrame(render)
    }

    const onPointerMove = (event: Event) => {
      const pointerEvent = event as PointerEvent
      const rect = heroCanvas.getBoundingClientRect()
      pointerRef.current = { x: pointerEvent.clientX - rect.left, y: pointerEvent.clientY - rect.top, active: true }
    }
    const onPointerLeave = () => {
      pointerRef.current.active = false
    }

    resize()
    raf = requestAnimationFrame(render)
    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(heroCanvas)
    window.addEventListener("resize", resize)
    heroSection.addEventListener("pointermove", onPointerMove)
    heroSection.addEventListener("pointerleave", onPointerLeave)

    return () => {
      cancelAnimationFrame(raf)
      resizeObserver.disconnect()
      window.removeEventListener("resize", resize)
      heroSection.removeEventListener("pointermove", onPointerMove)
      heroSection.removeEventListener("pointerleave", onPointerLeave)
    }
  }, [])

  return <canvas className="ri-hero-canvas" ref={canvasRef} aria-hidden="true" />
}

function AuditSection() {
  return (
    <section className="ri-audit2" id="auditoria">
      <div className="ri-audit2-grid" aria-hidden="true" />
      <div className="ri-audit2-grain" aria-hidden="true" />
      <div className="ri-audit2-scanlines" aria-hidden="true" />
      <div className="ri-audit2-stage">
        {auditFrames.map((frame, index) => (
          <div className={`ri-audit2-frame frame-${index + 1}`} key={frame.code}>
            <article className="ri-audit2-copy">
              <div className="ri-audit2-overline">
                <span className="ri-audit2-kicker">{frame.kicker}</span>
                <span className="ri-audit2-step-code">{frame.code}</span>
              </div>
              <h2>{frame.headline[0]}<span className="ri-audit2-italic">{frame.headline[1]}</span></h2>
              <p>{frame.body}</p>
              <div className="ri-audit2-stats">
                <div><b>{frame.statA}</b><span>{frame.statALabel}</span><small>{frame.statADetail}</small></div>
                <div><b>{frame.statB}</b><span>{frame.statBLabel}</span><small>{frame.statBDetail}</small></div>
              </div>
            </article>
            <AuditVisual mode={frame.mode} code={frame.code} ghost={frame.ghost} frameIndex={index} localProgress={0.65} />
          </div>
        ))}
      </div>
    </section>
  )
}

function AuditVisual({
  mode,
  code,
  ghost,
  frameIndex,
  localProgress,
}: {
  mode: AuditMode
  code: string
  ghost: string
  frameIndex: number
  localProgress: number
}) {
  const modules = useMemo(() => Array.from({ length: 18 }, (_, index) => ({ x: 84 + (index % 9) * 82, y: 94 + Math.floor(index / 9) * 116 })), [])
  const intensity = 0.18 + localProgress * 0.82

  return (
    <div className="ri-audit2-visual" aria-label="Auditoria visual de senales de coordinacion">
      <div className="ri-audit2-fig">{code}</div>
      <div className="ri-audit2-ghost">{ghost}</div>
      <div className="ri-audit2-corner tl" aria-hidden="true" />
      <div className="ri-audit2-corner tr" aria-hidden="true" />
      <div className="ri-audit2-corner bl" aria-hidden="true" />
      <div className="ri-audit2-corner br" aria-hidden="true" />
      <svg
        className="ri-audit2-svg"
        viewBox="0 0 900 560"
        aria-hidden="true"
        style={{ "--ri-audit2-dash": -(frameIndex * 50 + localProgress * 70) } as React.CSSProperties}
      >
        <text x="84" y="60" className="ri-audit2-caption">ENTORNO OBSERVADO</text>
        <text x="714" y="60" className="ri-audit2-caption hot">FRICCION</text>
        <path className="ri-audit2-thread ambient" d="M80 430 C220 352 334 390 468 290 S658 172 824 130" />
        {modules.map((item, index) => (
          <g key={`${item.x}-${item.y}`}>
            <rect className="ri-audit2-module" x={item.x} y={item.y} width="68" height="78" />
            <text x={item.x + 6} y={item.y + 15} className="ri-audit2-caption">M{String(index + 1).padStart(2, "0")}</text>
            <AuditMark index={index} mark="a" x={item.x + 14} y={item.y + 54} mode={mode} frameIndex={frameIndex} intensity={intensity} />
            <AuditMark index={index} mark="b" x={item.x + 37} y={item.y + 54} mode={mode} frameIndex={frameIndex} intensity={intensity} />
          </g>
        ))}
        <AuditModeSvg2 mode={mode} />
      </svg>
      <div className="ri-audit2-progress" aria-hidden="true"><span /></div>
    </div>
  )
}

function AuditMark({
  index,
  mark,
  x,
  y,
  mode,
  frameIndex,
  intensity,
}: {
  index: number
  mark: "a" | "b"
  x: number
  y: number
  mode: AuditMode
  frameIndex: number
  intensity: number
}) {
  const seed = (index * 7 + (mark === "a" ? 0 : 11) + frameIndex * 13) % 36
  const isTeal = mode === "memory" && seed > 24
  const isWarn = seed < 8 + frameIndex * 2 && !isTeal
  const isQuiet = seed > 28 && frameIndex > 0
  const transform = isWarn ? `scale(${1 + intensity * 0.22}) rotate(45deg)` : "scale(1)"

  return (
    <rect
      className={`ri-audit2-mark${isWarn ? " warn" : ""}${isTeal ? " teal" : ""}`}
      x={x}
      y={y}
      width="12"
      height="12"
      style={{ opacity: isQuiet ? 0.18 : 0.92, transform }}
    />
  )
}

function AuditModeSvg2({ mode }: { mode: AuditMode }) {
  return (
    <>
      <g className={mode === "router" ? "ri-audit2-mode active" : "ri-audit2-mode"}>
        <circle cx="450" cy="270" r="34" /><circle cx="450" cy="270" r="8" />
        <path d="M122 134 C220 170 310 214 450 270" /><path d="M190 344 C285 324 344 306 450 270" />
        <path d="M698 134 C612 182 540 224 450 270" /><path d="M770 344 C650 330 552 308 450 270" />
        <text x="397" y="332">LIDER COMO ROUTER</text>
      </g>
      <g className={mode === "meetings" ? "ri-audit2-mode active" : "ri-audit2-mode"}>
        <path d="M205 162 C308 84 462 84 567 164 S680 330 565 420 S294 472 206 348 S102 230 205 162" />
        <path d="M292 208 C374 150 510 158 578 234 S610 366 514 396 S312 372 292 208" />
        <rect x="350" y="300" width="198" height="44" />
        <text x="336" y="278">REUNIONES PARA PEGAR LO ROTO</text>
      </g>
      <g className={mode === "ai" ? "ri-audit2-mode active violet" : "ri-audit2-mode violet"}>
        <path d="M96 112 C304 208 462 126 806 216" /><path d="M126 412 C278 260 590 390 782 120" />
        <circle cx="214" cy="172" r="16" /><circle cx="582" cy="214" r="16" /><circle cx="704" cy="392" r="16" />
        <text x="322" y="492">MAS OUTPUT · MISMO CRITERIO DISPERSO</text>
      </g>
      <g className={mode === "training" ? "ri-audit2-mode active" : "ri-audit2-mode"}>
        <path d="M118 140 C256 116 356 116 496 140" /><path d="M130 398 C280 430 478 428 704 386" />
        <line x1="116" y1="274" x2="780" y2="274" />
        <text x="116" y="254">VIERNES · ENTUSIASMO</text><text x="116" y="302">LUNES · MISMO ENTORNO</text>
        <text x="546" y="430">EL SISTEMA EMPUJA DE VUELTA</text>
      </g>
      <g className={mode === "client" ? "ri-audit2-mode active" : "ri-audit2-mode"}>
        <path d="M104 180 C242 204 300 300 430 302 S612 254 740 346" /><path d="M740 346 C786 370 810 402 826 452" />
        <rect x="710" y="332" width="132" height="74" />
        <text x="731" y="362">CLIENTE</text><text x="731" y="382">ESPERA</text>
        <text x="414" y="492">LA FRICCION INTERNA SE VE AFUERA</text>
      </g>
      <g className={mode === "memory" ? "ri-audit2-mode active teal" : "ri-audit2-mode teal"}>
        <circle cx="452" cy="280" r="76" /><circle cx="452" cy="280" r="18" />
        <path d="M452 280 C344 210 250 180 132 166" /><path d="M452 280 C352 342 264 372 144 398" />
        <path d="M452 280 C556 204 642 170 774 152" /><path d="M452 280 C570 340 656 376 790 404" />
        <text x="340" y="382">MEMORIA OPERATIVA</text><text x="286" y="404">EL CRITERIO DEJA DE VIVIR EN UNA CABEZA</text>
      </g>
      <g className={mode === "overview" ? "ri-audit2-mode active teal" : "ri-audit2-mode teal"}>
        <text x="92" y="502">SEIS FUGAS · UNA CAUSA DEBAJO</text>
        <text x="92" y="522">El entorno decide cuanta capacidad llega al trabajo real</text>
      </g>
    </>
  )
}

function AuditVisualLegacy({
  mode,
  code,
  ghost,
  frameIndex,
  localProgress,
}: {
  mode: AuditMode
  code: string
  ghost: string
  frameIndex: number
  localProgress: number
}) {
  const modules = useMemo(() => Array.from({ length: 18 }, (_, index) => ({ x: 84 + (index % 9) * 82, y: 94 + Math.floor(index / 9) * 116 })), [])
  const intensity = 0.18 + localProgress * 0.82
  return (
    <div className="ri-audit-visual" aria-label="Auditoría visual de señales de coordinación">
      <div className="ri-fig">{code}</div><div className="ri-ghost">{ghost}</div><div className="ri-corners" aria-hidden="true" />
      <svg className="ri-audit-svg" viewBox="0 0 900 560" aria-hidden="true">
        <text x="84" y="60" className="ri-svg-caption">ENTORNO OBSERVADO</text>
        <text x="714" y="60" className="ri-svg-caption hot">FRICCIÓN</text>
        <path className="ri-thread ambient" d="M80 430 C220 352 334 390 468 290 S658 172 824 130" />
        {modules.map((item, index) => (
          <g key={`${item.x}-${item.y}`}>
            <rect className="ri-module" x={item.x} y={item.y} width="68" height="78" />
            <text x={item.x + 6} y={item.y + 15} className="ri-svg-caption">M{String(index + 1).padStart(2, "0")}</text>
            <rect className={`ri-mark ${(index * 7 + mode.length * 3) % 5 === 0 ? "warn" : ""}`} x={item.x + 14} y={item.y + 54} width="12" height="12" />
            <rect className={`ri-mark ${mode === "memory" && index % 3 === 0 ? "teal" : ""}`} x={item.x + 37} y={item.y + 54} width="12" height="12" />
          </g>
        ))}
        <AuditModeSvg mode={mode} />
      </svg>
      <div className="ri-progress-line" aria-hidden="true"><span /></div>
    </div>
  )
}

function AuditModeSvg({ mode }: { mode: AuditMode }) {
  return (
    <>
      <g className={mode === "router" ? "ri-mode active" : "ri-mode"}><circle cx="450" cy="270" r="34" /><path d="M122 134 C220 170 310 214 450 270" /><path d="M698 134 C612 182 540 224 450 270" /><text x="397" y="332">LÍDER COMO ROUTER</text></g>
      <g className={mode === "meetings" ? "ri-mode active" : "ri-mode"}><path d="M205 162 C308 84 462 84 567 164 S680 330 565 420 S294 472 206 348 S102 230 205 162" /><path d="M292 208 C374 150 510 158 578 234 S610 366 514 396 S312 372 292 208" /><text x="336" y="278">REUNIONES PARA PEGAR LO ROTO</text></g>
      <g className={mode === "ai" ? "ri-mode active violet" : "ri-mode violet"}><path d="M96 112 C304 208 462 126 806 216" /><path d="M126 412 C278 260 590 390 782 120" /><circle cx="214" cy="172" r="16" /><circle cx="582" cy="214" r="16" /><circle cx="704" cy="392" r="16" /><text x="322" y="492">MÁS OUTPUT · MISMO CRITERIO DISPERSO</text></g>
      <g className={mode === "training" ? "ri-mode active" : "ri-mode"}><line x1="116" y1="274" x2="780" y2="274" /><path d="M130 398 C280 430 478 428 704 386" /><text x="116" y="254">VIERNES · ENTUSIASMO</text><text x="116" y="302">LUNES · MISMO ENTORNO</text></g>
      <g className={mode === "client" ? "ri-mode active" : "ri-mode"}><path d="M104 180 C242 204 300 300 430 302 S612 254 740 346" /><rect x="710" y="332" width="132" height="74" /><text x="731" y="362">CLIENTE</text><text x="414" y="492">LA FRICCIÓN INTERNA SE VE AFUERA</text></g>
      <g className={mode === "memory" ? "ri-mode active teal" : "ri-mode teal"}><circle cx="452" cy="280" r="76" /><circle cx="452" cy="280" r="18" /><path d="M452 280 C344 210 250 180 132 166" /><path d="M452 280 C570 340 656 376 790 404" /><text x="340" y="382">MEMORIA OPERATIVA</text></g>
      <g className={mode === "overview" ? "ri-mode active teal" : "ri-mode teal"}><text x="92" y="502">SEIS FUGAS · UNA CAUSA DEBAJO</text><text x="92" y="522">El entorno decide cuánta capacidad llega al trabajo real</text></g>
    </>
  )
}

function LayerRevealSection() {
  const nodes = [["IA", "node-ia", Bot], ["Herramientas", "node-tools", Wrench], ["Reuniones", "node-meetings", Users], ["Cursos", "node-courses", GraduationCap], ["Decisiones", "node-decisions", BarChart3]] as const
  return (
    <section className="ri-layer" id="capa">
      <div className="ri-grain" aria-hidden="true" />
      <article className="ri-layer-copy">
        <p className="ri-kicker">La capa debajo</p>
        <h2>No falta otra pieza.<span>Falta la capa que las conecta.</span></h2>
        <p>IA, reuniones, capacitación y herramientas no fallan por separado. Fallan cuando el entorno no tiene reglas, criterio ni memoria operativa.</p>
        <div>La coordinación mejora cuando el entorno empieza a guiar el trabajo.</div>
      </article>
      <div className="ri-layer-film" aria-label="La capa de coordinación conecta el sistema">
        <div className="ri-fig">FIG. 03-A</div><div className="ri-ghost light">CAPA</div>
        <div className="ri-system">
          <svg viewBox="0 0 760 520" aria-hidden="true">
            <ellipse cx="380" cy="218" rx="310" ry="166" /><ellipse cx="380" cy="218" rx="188" ry="96" />
            <path d="M380 62 C380 112 380 148 380 182" /><path d="M630 150 C532 158 448 176 380 204" /><path d="M628 304 C520 276 450 250 380 226" /><path d="M132 304 C238 276 312 250 380 226" /><path d="M130 150 C232 158 312 176 380 204" /><path className="teal" d="M124 438 C280 406 480 406 636 438" /><path className="teal" d="M380 268 C380 322 380 380 380 438" />
          </svg>
          {nodes.map(([label, className, Icon]) => <div className={`ri-layer-node ${className}`} key={label}>{label !== "IA" && <Icon aria-hidden="true" size={24} />}{label}</div>)}
          <div className="ri-team">Equipo</div>
          <div className="ri-base"><span>Entorno de coordinación</span><b>Reglas, criterio, ownership y memoria operativa.</b></div>
        </div>
      </div>
    </section>
  )
}

function FlowMethodSection() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const [active, setActive] = useState<FlowLens>("flow")
  const [autoCycle, setAutoCycle] = useState(false)
  const activeLens = flowLenses.find((lens) => lens.id === active) ?? flowLenses[0]

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const activateLens = (event: Event) => {
      const target = event.target as Element | null
      const trigger = target?.closest<HTMLElement>("[data-flow-lens]")
      const next = trigger?.dataset.flowLens as FlowLens | undefined
      const nextLens = flowLenses.find((lens) => lens.id === next)?.id

      if (!trigger || !section.contains(trigger) || !nextLens) return
      setActive(nextLens)
    }

    section.addEventListener("pointerover", activateLens)
    section.addEventListener("click", activateLens)
    section.addEventListener("focusin", activateLens)

    return () => {
      section.removeEventListener("pointerover", activateLens)
      section.removeEventListener("click", activateLens)
      section.removeEventListener("focusin", activateLens)
    }
  }, [])

  useEffect(() => {
    const mobileQuery = window.matchMedia("(max-width: 720px), (pointer: coarse)")
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)")

    const update = () => {
      setAutoCycle(mobileQuery.matches && !motionQuery.matches)
    }

    update()
    mobileQuery.addEventListener("change", update)
    motionQuery.addEventListener("change", update)

    return () => {
      mobileQuery.removeEventListener("change", update)
      motionQuery.removeEventListener("change", update)
    }
  }, [])

  useEffect(() => {
    if (!autoCycle) return

    const interval = window.setInterval(() => {
      setActive((current) => {
        const currentIndex = flowLenses.findIndex((lens) => lens.id === current)
        const nextIndex = (currentIndex + 1) % flowLenses.length
        return flowLenses[nextIndex].id
      })
    }, 1700)

    return () => window.clearInterval(interval)
  }, [autoCycle])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    section.dataset.nativeFlow = active
    section.querySelectorAll<HTMLElement>("[data-flow-lens]").forEach((item) => {
      item.classList.toggle("native-active", item.dataset.flowLens === active)
    })
    section.querySelectorAll<HTMLElement>(".ri-flow-caption span").forEach((item, index) => {
      item.classList.toggle("native-active", flowLenses[index]?.id === active)
    })
  }, [active])

  return (
    <section className="ri-flow" id="flow" data-state={active} ref={sectionRef}>
      <div className="ri-grain" aria-hidden="true" />
      <header className="ri-flow-head"><h2>FLOW lee el entorno.<span>Encuentra dónde se pierde capacidad.</span></h2><div className="ri-fig">FIG. 04-A</div></header>
      <div className="ri-flow-body">
        <div className="ri-lenses" aria-label="Lentes de lectura FLOW">
          {flowLenses.map((lens) => <button className={active === lens.id ? "ri-lens active" : "ri-lens"} data-flow-lens={lens.id} key={lens.id} type="button" onClick={() => setActive(lens.id)} onFocus={() => setActive(lens.id)} onPointerEnter={() => setActive(lens.id)}><span>{lens.index}</span><b>{lens.title}</b><em>{lens.subtitle}</em><p>{lens.body}</p></button>)}
        </div>
        <div className="ri-flow-visual" aria-label="Visual de capas FLOW">
          <div className="ri-dot-metrics" aria-hidden="true"><div><b>04</b><span>lentes</span></div><div><b>01</b><span>entorno</span></div></div>
          <div className="ri-tile-field">
            <span className="ri-axis x" /><span className="ri-axis y" /><span className="ri-ring" />
            {flowLenses.map((lens) => <button className={`ri-key ${lens.id} ${active === lens.id ? "active" : ""}`} data-flow-lens={lens.id} key={lens.id} type="button" onClick={() => setActive(lens.id)} onFocus={() => setActive(lens.id)} onPointerEnter={() => setActive(lens.id)}><span>{lens.id === "memory" ? "Memoria" : lens.title}</span></button>)}
            <div className="ri-center-chip"><b>FLOW</b><i /></div>
          </div>
          <div className="ri-flow-caption" aria-live="polite">
            {flowLenses.map((lens) => <span className={activeLens.id === lens.id ? "active" : ""} key={lens.id}>{lens.caption}</span>)}
          </div>
          <div className="ri-objective">Intervenimos <strong>solo donde hace sentido</strong>.<br />Priorizamos el rediseño que devuelve <strong>capacidad operativa real</strong> desde el primer día.</div>
        </div>
      </div>
      <script
        dangerouslySetInnerHTML={{
          __html: `(() => {
  const script = document.currentScript;
  const root = script && script.closest(".ri-flow");
  if (!root || root.dataset.flowBinder === "ready") return;
  root.dataset.flowBinder = "ready";
  const ids = ["flow", "load", "order", "memory"];
  const activate = (id) => {
    if (!ids.includes(id)) return;
    root.dataset.nativeFlow = id;
    root.querySelectorAll("[data-flow-lens]").forEach((item) => {
      item.classList.toggle("native-active", item.getAttribute("data-flow-lens") === id);
    });
    root.querySelectorAll(".ri-flow-caption span").forEach((item, index) => {
      item.classList.toggle("native-active", ids[index] === id);
    });
  };
  activate(root.getAttribute("data-state") || "flow");
  root.addEventListener("pointerover", (event) => {
    const trigger = event.target && event.target.closest("[data-flow-lens]");
    if (trigger) activate(trigger.getAttribute("data-flow-lens"));
  });
  root.addEventListener("focusin", (event) => {
    const trigger = event.target && event.target.closest("[data-flow-lens]");
    if (trigger) activate(trigger.getAttribute("data-flow-lens"));
  });
  root.addEventListener("click", (event) => {
    const trigger = event.target && event.target.closest("[data-flow-lens]");
    if (trigger) activate(trigger.getAttribute("data-flow-lens"));
  });
})();`,
        }}
      />
    </section>
  )
}

function CoordinationCheckSection() {
  return (
    <section className="ri-check" id="chequeo">
      <div className="ri-dark-grain" aria-hidden="true" /><div className="ri-rails" aria-hidden="true"><i /><i /><i /><i /><i /></div>
      <header className="ri-check-head"><h2>Antes de rediseñar.<span>Hacemos visible dónde intervenir.</span></h2><div className="ri-fig">FIG. 05-A</div></header>
      <div className="ri-check-body">
        <article className="ri-check-copy">
          <p className="ri-kicker dark">Chequeo de Coordinación</p>
          <p>No empezamos con una transformación grande. Empezamos con una lectura corta del entorno diario: dónde se atasca el trabajo, qué criterio se repite y qué dependencia está frenando al equipo.</p>
          <p>El punto no es vender más actividad. Es ubicar la intervención que puede devolver <strong>capacidad operativa real</strong> primero.</p>
          <div>Un primer movimiento claro antes de cualquier rediseño mayor.</div>
          <a href="#formulario">{ctaLabel}</a>
        </article>
        <div className="ri-check-stage" aria-label="Pasos del chequeo de coordinación">
          <div className="ri-check-cards">{checkSteps.map((step) => <article className={`ri-check-card ${step.tone}`} key={step.index}><b>{step.index}</b><h3>{step.title}</h3><p>{step.body}</p></article>)}</div>
        </div>
      </div>
    </section>
  )
}

function FaqCtaSection() {
  const [submitted, setSubmitted] = useState(false)

  return (
    <section className="ri-final" id="formulario">
      <div className="ri-grain" aria-hidden="true" />
      <header className="ri-final-head"><h2>¿Listo para ver dónde se atasca?<span>Solicita un Chequeo de Coordinación.</span></h2><div className="ri-fig">FIG. 06-A</div></header>
      <div className="ri-final-body">
        <aside className="ri-form-panel" aria-label="Formulario de chequeo">
          <div className="ri-form-head"><p className="ri-kicker">Siguiente paso</p><h3>Solicitar Chequeo de Coordinación.</h3><p>Cuéntanos qué se está volviendo pesado de coordinar. Respondemos con el siguiente paso, no con una secuencia eterna.</p></div>
          <form
            action={googleFormResponseUrl}
            data-ri-form
            method="post"
            target="ri-google-form-target"
            onSubmit={() => {
              window.setTimeout(() => setSubmitted(true), 600)
            }}
          >
            <input type="hidden" name="fvv" value="1" />
            <input type="hidden" name="pageHistory" value="0" />
            <label>Nombre<input name={googleFormEntries.name} autoComplete="name" placeholder="Tu nombre" required /></label>
            <label>Email<input name={googleFormEntries.email} type="email" autoComplete="email" placeholder="nombre@empresa.com" required /></label>
            <label>Empresa<input name={googleFormEntries.company} autoComplete="organization" placeholder="Nombre de la empresa" required /></label>
            <label>¿Qué cuesta coordinar hoy?<textarea name={googleFormEntries.coordinationPain} placeholder="Ej. demasiadas aprobaciones, reuniones largas, decisiones que vuelven al líder..." required /></label>
            <button className="ri-form-submit" type="submit">{ctaLabel}</button>
            <div className="ri-success" data-ri-success hidden={!submitted} role="status">Solicitud enviada. Te responderemos pronto.</div>
            <p>Registramos la solicitud y guardamos el seguimiento sin sacarte de esta página.</p>
            <p>Sin spam. Usamos esta información solo para entender si el chequeo tiene sentido para tu equipo.</p>
          </form>
          <iframe className="ri-hidden-frame" name="ri-google-form-target" title="Envio de formulario" aria-hidden="true" />
          <div className="ri-secondary-note">Respuestas centralizadas en Google Forms y seguimiento simple en Sheets.</div>
        </aside>
      </div>
      <script
        dangerouslySetInnerHTML={{
          __html: `(() => {
  const script = document.currentScript;
  const root = script && script.closest(".ri-final");
  if (!root || root.dataset.formBinder === "ready") return;
  root.dataset.formBinder = "ready";
  const form = root.querySelector("[data-ri-form]");
  const success = root.querySelector("[data-ri-success]");
  if (!form || !success) return;
  form.addEventListener("submit", () => {
    window.setTimeout(() => {
      success.hidden = false;
      success.textContent = "Solicitud enviada. Te responderemos pronto.";
    }, 650);
  });
})();`,
        }}
      />
      <footer className="ri-footer-line"><span>Re-integration / FLOW</span><span>No otro curso. No otra herramienta. El entorno debajo de todo.</span></footer>
    </section>
  )
}
