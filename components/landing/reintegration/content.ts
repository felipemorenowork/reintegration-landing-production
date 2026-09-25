export const ctaLabel = "Solicitar Diagnóstico de un resultado crítico"

export const contactEmail = "felipe@re-integration.org"

export const heroOptions = [
  {
    id: "resultado",
    name: "Resultado crítico · recomendada",
    eyebrow: "REDISEÑO DEL TRABAJO / HUMANO + IA",
    headline: ["Diseñamos cómo tu equipo", "puede mejorar un", "resultado con IA."],
    lede: "Consultoría de IA y diseño del trabajo para mejorar un resultado de negocio: rediseñamos cómo tu equipo decide, comparte información y valida trabajo, sin perder responsabilidad humana.",
    artifact: "resultado",
  },
  {
    id: "equipo",
    name: "Decisiones del equipo",
    eyebrow: "TRABAJO REAL / DECISIONES VISIBLES",
    headline: ["Tu equipo no necesita", "más IA aislada.", "Necesita decidir mejor con ella."],
    lede: "Definimos qué cambia en el trabajo, qué juicio sigue siendo humano y cómo el equipo aprende de cada excepción.",
    artifact: "decisiones",
  },
  {
    id: "roles",
    name: "Roles humano + IA",
    eyebrow: "ROLES / DECISIONES / RESULTADOS",
    headline: ["Cuando la IA cambia el trabajo,", "los roles también", "tienen que cambiar."],
    lede: "Diseñamos responsabilidades, decisiones e información alrededor de un resultado que el equipo debe poder responder.",
    artifact: "roles",
  },
] as const

export const entryDoors = [
  {
    index: "01",
    title: "Mejorar un resultado de negocio.",
    prompt: "Necesito entregar, responder, producir o decidir mejor; no sé dónde intervenir.",
    body: "Revisamos dónde se concentra la restricción y si cambiar una decisión, la información, la coordinación o el uso de IA puede aportar.",
  },
  {
    index: "02",
    title: "Incorporar IA con orden.",
    prompt: "Ya usamos o queremos escalar IA, pero no sabemos cómo funcionará el equipo.",
    body: "Definimos qué trabajo cambia, qué controles humanos hacen falta y cómo evitar que la adopción de IA se vuelva individual y dispersa.",
  },
] as const

export const sprintDeliverables = [
  {
    index: "01",
    title: "Diseño del trabajo crítico.",
    body: "Resultado, actividades, decisiones, información, validaciones, excepciones y puntos donde se pierde contexto.",
  },
  {
    index: "02",
    title: "Acuerdos de operación humano + IA.",
    body: "Quién decide, valida, corrige, detiene o escala; qué puede usarse, qué debe comprobarse y cómo se registra un caso nuevo.",
  },
  {
    index: "03",
    title: "Primer ciclo de aprendizaje.",
    body: "Responsable, señales de resultado y una revisión para decidir qué regla se mantiene, cambia o se detiene.",
  },
] as const

export const diagnosticSteps = [
  {
    index: "01",
    title: "Conversación de encaje.",
    body: "Resultado, contexto, sponsor y evidencia disponible. Es breve y sin costo.",
  },
  {
    index: "02",
    title: "Sesión de diagnóstico.",
    body: "Una sesión de trabajo y revisión de la evidencia existente; no entrevistas extensas al equipo.",
  },
  {
    index: "03",
    title: "Nota de decisión.",
    body: "Resultado, hipótesis, fricciones, frente prioritario y siguiente prueba —o el límite claro si IA no es la respuesta.",
  },
] as const

export const impactOutcomes = [
  {
    index: "01",
    title: "Decisiones que no vuelven siempre al gerente.",
    body: "El equipo sabe qué puede resolver, qué evidencia necesita y cuándo una excepción sí debe escalar.",
  },
  {
    index: "02",
    title: "Menos reuniones para reconstruir el estado del trabajo.",
    body: "La información, las prioridades y los acuerdos quedan visibles donde el equipo realmente trabaja.",
  },
  {
    index: "03",
    title: "Una respuesta al cliente que refleja la coordinación interna.",
    body: "Cuando el equipo comparte criterio y contexto, la entrega deja de depender de perseguir respuestas entre áreas.",
  },
  {
    index: "04",
    title: "Aprendizaje que queda después de una excepción.",
    body: "Cada corrección puede convertirse en una regla, una validación o una señal que mejora el siguiente caso.",
  },
] as const

export const faqEntries = [
  {
    question: "¿Qué hace Re-integration?",
    answer: "Somos una consultoría de IA enfocada en el diseño organizacional y del trabajo. Rediseñamos decisiones, información y validaciones en un proceso crítico para mejorar un resultado de negocio concreto, con responsabilidad humana y una prueba medible.",
  },
  {
    question: "¿Cómo abordamos la mejora de procesos con IA?",
    answer: "Primero identificamos el resultado de negocio y el trabajo que lo limita. Después diseñamos decisiones, información, validaciones y responsabilidades en un frente concreto. La IA entra si aporta, y el Sprint deja una prueba medible para ajustar el proceso.",
  },
  {
    question: "¿La IA siempre es parte de la solución?",
    answer: "No. El Diagnóstico puede concluir que la IA no es pertinente o que la restricción requiere otra especialidad. Llegar a ese límite con claridad también es una salida útil.",
  },
  {
    question: "¿Qué incluye el Diagnóstico de un resultado crítico?",
    answer: "Incluye una conversación de encaje breve y sin costo, una sesión de diagnóstico, revisión de evidencia disponible y una nota de decisión que recomienda el frente prioritario o un límite claro.",
  },
  {
    question: "¿Re-integration acompaña la implementación de IA?",
    answer: "Diseñamos el trabajo, las responsabilidades y la prueba que una implementación de IA necesita. Si el caso requiere desarrollo o integración, esa parte técnica la realiza un proveedor especializado con quien podemos coordinar.",
  },
] as const

export const technicalBoundaries = [
  "Diseñamos el trabajo, las responsabilidades y la prueba. La implementación técnica puede realizarse con un proveedor especializado cuando el caso lo requiere.",
  "No sustituimos ingeniería industrial ni certificamos infraestructura, ciberseguridad, datos, privacidad o cumplimiento legal.",
] as const
