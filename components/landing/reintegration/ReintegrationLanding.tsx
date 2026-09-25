"use client"

import { useEffect, useState, type FormEvent } from "react"
import { trackEvent } from "../../../app/analytics"
import {
  contactEmail,
  ctaLabel,
  diagnosticSteps,
  entryDoors,
  faqEntries,
  heroOptions,
  impactOutcomes,
  sprintDeliverables,
  technicalBoundaries,
} from "./content"

export function ReintegrationLanding() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return

      const cta = event.target.closest<HTMLAnchorElement>('a[href="#formulario"]')
      if (cta) {
        trackEvent("cta_clicked", {
          location: cta.className || "landing",
          cta_label: cta.textContent?.trim() || "critical_result_diagnostic",
        })
      }
    }

    document.addEventListener("click", onClick)
    return () => document.removeEventListener("click", onClick)
  }, [])

  return (
    <main className="ri-landing ri-product-landing">
      <SiteNav />
      <HeroSection />
      <EntryDoorsSection />
      <DiagnosticSection />
      <SprintSection />
      <ImpactSection />
      <FAQSection />
      <ContactSection />
    </main>
  )
}

function SiteNav() {
  return (
    <nav className="ri-pr-nav" aria-label="Navegación principal">
      <a className="ri-pr-brand" href="#inicio" aria-label="Re-integration">
        <img src="/brand/reintegration-logo.jpg" alt="Re-integration" />
      </a>
      <div className="ri-pr-nav-meta" aria-hidden="true">
        <span>Trabajo real</span>
        <span>Decisiones visibles</span>
      </div>
      <a className="ri-pr-nav-cta" href="#formulario">{ctaLabel}</a>
    </nav>
  )
}

function HeroSection() {
  const hero = heroOptions[0]

  return (
    <section className="ri-pr-hero" id="inicio">
      <div className="ri-pr-hero-grid">
        <article className="ri-pr-hero-copy">
          <p className="ri-pr-eyebrow">{hero.eyebrow}</p>
          <h1>
            <span>{hero.headline[0]}</span>
            <span>{hero.headline[1]}</span>
            <strong>{hero.headline[2]}</strong>
          </h1>
          <p className="ri-pr-hero-lede">{hero.lede}</p>
          <div className="ri-pr-hero-actions">
            <a className="ri-pr-button ri-pr-button-dark" href="#formulario">{ctaLabel}</a>
            <a className="ri-pr-text-link" href="#diagnostico">Ver el recorrido <span aria-hidden="true">↓</span></a>
          </div>
        </article>

        <div className="ri-pr-hero-artifact" aria-label="Ilustración editorial conceptual de trabajo humano más IA">
          <div className="ri-pr-artifact-rule" aria-hidden="true" />
          <figure className="ri-pr-hero-artwork">
            <img
              src="/brand/hero-human-ai-conductor-v2.webp"
              alt="Ilustración editorial de una persona conduciendo cuatro rutas de trabajo: contexto, IA, criterio humano y aprendizaje compartido."
              width={1024}
              height={1536}
              fetchPriority="high"
            />
            <figcaption>ILUSTRACIÓN EDITORIAL / TRABAJO HUMANO + IA</figcaption>
          </figure>
        </div>
      </div>
    </section>
  )
}

function EntryDoorsSection() {
  return (
    <section className="ri-pr-doors" id="puertas">
      <header className="ri-pr-section-head ri-pr-section-head-dark">
        <p className="ri-pr-eyebrow">PUNTO DE PARTIDA</p>
        <h2>Dos situaciones.<span>Un mismo producto.</span></h2>
        <p>La IA nombra el momento actual. El punto de partida es el resultado que el equipo necesita mejorar.</p>
      </header>
      <div className="ri-pr-door-grid">
        {entryDoors.map((door) => (
          <article className="ri-pr-door-card" key={door.index}>
            <span>{door.index}</span>
            <h3>{door.title}</h3>
            <p className="ri-pr-door-prompt">{door.prompt}</p>
            <p>{door.body}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

function SprintSection() {
  return (
    <section className="ri-pr-sprint" id="diseno">
      <div className="ri-pr-sprint-grid">
        <article className="ri-pr-sprint-copy">
          <p className="ri-pr-eyebrow">02 / EL SPRINT</p>
          <h2>Después convertimos la decisión.<span>En trabajo distinto.</span></h2>
          <p>Con el frente que salió del Diagnóstico, diseñamos un resultado prioritario, una decisión recurrente y la información que el equipo necesita para responder.</p>
          <p className="ri-pr-sprint-note">El Sprint termina con una forma acordada de trabajar y un primer ciclo para aprender si el cambio contribuye al resultado elegido.</p>
        </article>
        <div className="ri-pr-deliverables" aria-label="Entregables del Sprint">
          {sprintDeliverables.map((item) => (
            <article className="ri-pr-deliverable" key={item.index}>
              <span>{item.index}</span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function DiagnosticSection() {
  return (
    <section className="ri-pr-diagnostic" id="diagnostico">
      <header className="ri-pr-section-head">
        <p className="ri-pr-eyebrow">01 / LA PUERTA DE ENTRADA</p>
        <h2>Primero identificamos el resultado crítico.<span>Y dónde vale la pena intervenir.</span></h2>
      </header>
      <div className="ri-pr-diagnostic-grid">
        <div className="ri-pr-diagnostic-steps" aria-label="Pasos del diagnóstico">
          {diagnosticSteps.map((step) => (
            <article className="ri-pr-diagnostic-step" key={step.index}>
              <span>{step.index}</span>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </article>
          ))}
        </div>
        <article className="ri-pr-diagnostic-record">
          <div className="ri-pr-record-topline">
            <span>NOTA / DECISIÓN</span>
            <span>DIAGNÓSTICO</span>
          </div>
          <p className="ri-pr-record-kicker">Al cierre queda claro</p>
          <h3>Dónde intervenir primero.</h3>
          <ul>
            <li>El resultado que importa.</li>
            <li>La hipótesis que vale la pena probar.</li>
            <li>El frente prioritario y el siguiente paso.</li>
          </ul>
          <p>Puede concluir que IA no es pertinente o que la restricción requiere otra especialidad. Esa también es una salida útil.</p>
          <a className="ri-pr-button ri-pr-button-purple" href="#formulario">{ctaLabel}</a>
        </article>
      </div>
    </section>
  )
}

function ImpactSection() {
  return (
    <section className="ri-pr-impact" id="resultados">
      <header className="ri-pr-section-head ri-pr-section-head-impact">
        <p className="ri-pr-eyebrow">RESULTADOS EN EL TRABAJO</p>
        <h2>No terminamos con un análisis.<span>El trabajo tiene que cambiar.</span></h2>
        <p>Definimos señales desde el inicio —respuesta, calidad, retrabajo, capacidad o decisiones— y cerramos el Sprint con una prueba que el equipo puede revisar.</p>
      </header>
      <div className="ri-pr-impact-grid" aria-label="Cambios que busca el Sprint">
        {impactOutcomes.map((outcome) => (
          <article className="ri-pr-impact-card" key={outcome.index}>
            <span>{outcome.index}</span>
            <h3>{outcome.title}</h3>
            <p>{outcome.body}</p>
          </article>
        ))}
      </div>
      <aside className="ri-pr-technical-boundary" id="limites">
        <p>NOTA DE ALCANCE / RESPONSABILIDAD HUMANA</p>
        <div>
          <h3>La solución puede incluir IA y un proveedor técnico.<br />Nuestro trabajo es hacer que el equipo pueda usarla con criterio.</h3>
          <ul>
            {technicalBoundaries.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>
      </aside>
    </section>
  )
}

function FAQSection() {
  return (
    <section className="ri-pr-faq" id="preguntas">
      <div className="ri-pr-faq-grid">
        <header className="ri-pr-section-head">
          <p className="ri-pr-eyebrow">PREGUNTAS FRECUENTES</p>
          <h2>Lo que diseñamos.<span>Y lo que dejamos fuera.</span></h2>
        </header>
        <div className="ri-pr-faq-list">
          {faqEntries.map((entry) => (
            <details className="ri-pr-faq-item" key={entry.question}>
              <summary><h3>{entry.question}</h3></summary>
              <p>{entry.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

function ContactSection() {
  const [submitted, setSubmitted] = useState(false)
  const [started, setStarted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState("")
  // Formspark form IDs are public; the environment variable remains available for previews.
  const formsparkFormId = process.env.NEXT_PUBLIC_FORMSPARK_FORM_ID?.trim() || "2nSg9GLsk"

  const handleFormFocus = () => {
    if (started) return
    setStarted(true)
    trackEvent("form_started", { form_name: "critical_result_diagnostic" })
  }

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (submitting) return
    setError("")

    const form = event.currentTarget
    const fields = new FormData(form)
    const payload = {
      name: String(fields.get("name") || "").trim(),
      email: String(fields.get("email") || "").trim(),
      company: String(fields.get("company") || "").trim(),
      result: String(fields.get("result") || "").trim(),
      currentSituation: String(fields.get("currentSituation") || "").trim(),
      _honeypot: String(fields.get("_honeypot") || ""),
      source: "landing-re-integration",
    }

    setSubmitting(true)
    trackEvent("form_submit_attempted", { form_name: "critical_result_diagnostic" })

    const controller = new AbortController()
    const timeout = window.setTimeout(() => controller.abort(), 15000)

    try {
      const response = await fetch(`https://submit-form.com/${formsparkFormId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
        signal: controller.signal,
      })

      if (!response.ok) throw new Error(`Form submission failed: ${response.status}`)

      setSubmitted(true)
      trackEvent("form_submitted", { form_name: "critical_result_diagnostic" })
    } catch {
      setError("No pudimos confirmar el envío. Tus datos siguen aquí; inténtalo otra vez o escríbenos por email.")
      trackEvent("form_submission_failed", { form_name: "critical_result_diagnostic" })
    } finally {
      window.clearTimeout(timeout)
      setSubmitting(false)
    }
  }

  return (
    <section className="ri-pr-final" id="formulario">
      <div className="ri-pr-final-grid">
        <header className="ri-pr-final-copy">
          <p className="ri-pr-eyebrow">SIGUIENTE PASO</p>
          <h2>¿Qué resultado necesita mejorar tu equipo?<span>Empecemos por el Diagnóstico.</span></h2>
          <p>La conversación de encaje es breve y sin costo. El Diagnóstico es una intervención pagada y acotada para decidir dónde tiene sentido intervenir.</p>
        </header>

        <aside className="ri-pr-form-panel" aria-label="Formulario para solicitar un diagnóstico">
          <div className="ri-pr-form-head">
            <span>FORMULARIO / 06</span>
            <h3>Solicitar Diagnóstico de un resultado crítico.</h3>
          </div>
          {submitted ? (
            <div className="ri-pr-form-confirmation" role="status">
              <p className="ri-pr-eyebrow">ENVÍO CONFIRMADO</p>
              <h4>Gracias. Revisaremos tu caso.</h4>
              <p>Si el Diagnóstico tiene sentido para el resultado que describes, te escribiremos al correo indicado.</p>
            </div>
          ) : (
            <form data-ri-form onFocus={handleFormFocus} onSubmit={handleFormSubmit} aria-busy={submitting}>
              <label>Nombre<input name="name" autoComplete="name" placeholder="Tu nombre" required maxLength={100} /></label>
              <label>Email<input name="email" type="email" autoComplete="email" placeholder="nombre@empresa.com" required maxLength={254} /></label>
              <label>Empresa<input name="company" autoComplete="organization" placeholder="Nombre de la empresa" required maxLength={150} /></label>
              <label>¿Qué resultado quieres mejorar?<textarea name="result" placeholder="Ej. responder cotizaciones antes, entregar a tiempo o reducir retrabajo." required minLength={15} maxLength={800} /></label>
              <label>¿Qué ocurre hoy que lo está frenando? <span className="ri-pr-optional">(opcional)</span><textarea name="currentSituation" placeholder="Cuéntanos brevemente qué pasa ahora. No hace falta tener un diagnóstico." maxLength={1200} /></label>
              <div className="ri-pr-honeypot" aria-hidden="true"><label>Deja este campo vacío<input name="_honeypot" tabIndex={-1} autoComplete="off" /></label></div>
              {error ? <p className="ri-pr-form-error" role="alert">{error} <a href={`mailto:${contactEmail}`}>{contactEmail}</a></p> : null}
              <button className="ri-pr-form-submit" type="submit" disabled={submitting}>{submitting ? "Enviando solicitud…" : ctaLabel}</button>
              <p>Usamos esta información solo para revisar el encaje y responderte. El envío se procesa con <a href="https://formspark.io/legal/privacy-policy/" target="_blank" rel="noopener noreferrer">Formspark</a>.</p>
            </form>
          )}
          <div className="ri-pr-secondary-note">La conversación inicial es breve y sin costo; el Diagnóstico se propone solo si hay encaje.</div>
        </aside>
      </div>
      <footer className="ri-pr-footer-line">
        <span>Re-integration / Trabajo humano + IA</span>
        <span>Trabajo real. Decisiones visibles.</span>
        <a href={`mailto:${contactEmail}`}>Contacto: {contactEmail}</a>
      </footer>
    </section>
  )
}
