export const ctaLabel = "Solicitar Chequeo de Coordinación"

export const contactEmail = "felipe@re-integration.org"

export const googleFormUrl =
  "https://docs.google.com/forms/d/e/1FAIpQLSfJzaBx5rg7zEYn3xCnj9sKXry3gnAayRcnJiYCwHNwIcwkqQ/viewform?usp=dialog"

export const googleFormResponseUrl =
  "https://docs.google.com/forms/d/e/1FAIpQLSfJzaBx5rg7zEYn3xCnj9sKXry3gnAayRcnJiYCwHNwIcwkqQ/formResponse"

export const googleFormEntries = {
  name: "entry.1350892399",
  email: "entry.1849915413",
  company: "entry.726640234",
  coordinationPain: "entry.1988325392",
} as const

export const auditFrames = [
  {
    mode: "overview",
    code: "FIG. 02-A",
    ghost: "COSTO",
    kicker: "Auditoría de sistemas de trabajo · foco de crecimiento",
    headline: ["Excelente talento.", "Operación costosa."],
    body: "La falta de velocidad no siempre viene de falta de capacidad. A veces viene de un entorno mal diseñado: personas brillantes resolviendo urgencias, improvisando procesos y buscando información básica para poder avanzar.",
    statA: "6",
    statALabel: "fugas de rentabilidad",
    statADetail: "Fricciones diarias que actúan como un impuesto silencioso sobre la capacidad del equipo.",
    statB: "1",
    statBLabel: "causa raíz",
    statBDetail: "El entorno de coordinación determina la velocidad a la que el negocio puede escalar.",
  },
  {
    mode: "training",
    code: "FIG. 02-B",
    ghost: "LUNES",
    kicker: "Síntoma 01 · el lunes vuelve el sistema",
    headline: ["La capacitación enseña.", "El entorno decide."],
    body: "Un curso puede abrir criterio, lenguaje y motivación. Pero si el lunes el equipo vuelve a los mismos canales, urgencias, aprobaciones y reglas invisibles, el entorno anterior recupera el control.",
    statA: "1",
    statALabel: "lunes de regreso",
    statADetail: "El día en que el sistema real prueba si algo cambió.",
    statB: "0",
    statBLabel: "transferencia sostenida",
    statBDetail: "La habilidad nueva no sobrevive si el entorno no la sostiene.",
  },
  {
    mode: "ai",
    code: "FIG. 02-C",
    ghost: "IA",
    kicker: "Síntoma 02 · tecnología sin estructura",
    headline: ["Automatizar el caos", "acelera las pérdidas."],
    body: "La IA puede producir más documentos, respuestas y reportes. Pero si el criterio, las decisiones y la información siguen dispersos, la tecnología aumenta volumen sin convertirlo en capacidad real.",
    statA: "++",
    statALabel: "ruido operativo",
    statADetail: "Más output que el equipo debe revisar, corregir o ignorar.",
    statB: "0",
    statBLabel: "escala real",
    statBDetail: "La herramienta acelera tareas individuales, no la coordinación del sistema.",
  },
  {
    mode: "router",
    code: "FIG. 02-D",
    ghost: "LÍDER",
    kicker: "Síntoma 03 · falta de autonomía real",
    headline: ["Liderar no es", "gestionar el tráfico."],
    body: "El equipo no toma más iniciativa cuando el entorno premia la validación constante. Si cada duda pequeña debe pasar por el líder, la autonomía se vuelve discurso y la dependencia se vuelve cultura.",
    statA: "1",
    statALabel: "embudo operativo",
    statADetail: "La proactividad se apaga esperando confirmación.",
    statB: "N",
    statBLabel: "consultas de validación",
    statBDetail: "La falta de criterios compartidos bloquea el empoderamiento real.",
  },
  {
    mode: "client",
    code: "FIG. 02-E",
    ghost: "CLIENTE",
    kicker: "Síntoma 04 · calidad del trabajo entregado",
    headline: ["Lo que pasa adentro", "se refleja afuera."],
    body: "No puedes pedir excelencia hacia el cliente si el equipo trabaja con traspasos rotos, contexto incompleto y presión constante por corregir fallas internas. La experiencia externa copia la coordinación interna.",
    statA: "!",
    statALabel: "errores de entrega",
    statADetail: "Fallas visibles causadas por información perdida dentro del flujo.",
    statB: "?",
    statBLabel: "desgaste de frontline",
    statBDetail: "Personas dando explicaciones por problemas que el entorno produjo.",
  },
  {
    mode: "meetings",
    code: "FIG. 02-F",
    ghost: "JUNTAS",
    kicker: "Síntoma 05 · coordinación de emergencia",
    headline: ["Demasiadas reuniones.", "Muy poco sistema."],
    body: "Cuando el entorno no muestra prioridades, responsables, avances y criterios, la empresa compensa con reuniones. El calendario se convierte en el sistema operativo que nadie diseñó.",
    statA: "∞",
    statALabel: "estatus repetido",
    statADetail: "La misma información se reconstruye en vivo porque no existe visibilidad suficiente.",
    statB: "+",
    statBLabel: "carga de coordinación",
    statBDetail: "Más tiempo alineando el trabajo que avanzándolo.",
  },
  {
    mode: "memory",
    code: "FIG. 02-G",
    ghost: "CRITERIO",
    kicker: "Síntoma 06 · riesgo de continuidad",
    headline: ["Si tu experto se va,", "¿qué deja de funcionar?"],
    body: "Cuando el criterio vive en dos o tres cabezas, la empresa no es dueña de su conocimiento operativo. Cada ausencia, renuncia o cambio de rol vuelve frágil una parte del negocio.",
    statA: "10x",
    statALabel: "costo de retrabajo",
    statADetail: "Tiempo perdido repitiendo explicaciones, buscando archivos y reconstruyendo contexto.",
    statB: "↓",
    statBLabel: "valor del sistema",
    statBDetail: "El negocio vale menos cuando depende de personas clave y no de memoria operativa.",
  },
] as const

export const flowLenses = [
  {
    id: "flow",
    index: "01",
    title: "Flujo",
    subtitle: "Donde se detiene el trabajo.",
    body: "Detecta en qué punto se corta el avance, se pierde contexto o una decisión vuelve a subir.",
    caption: "donde se detiene el trabajo",
  },
  {
    id: "load",
    index: "02",
    title: "Carga",
    subtitle: "El costo invisible de coordinar.",
    body: "Mide qué ruido, búsqueda, interrupción o retrabajo consume energía antes de que el equipo produzca.",
    caption: "ruido, búsqueda e interrupción",
  },
  {
    id: "order",
    index: "03",
    title: "Orden",
    subtitle: "Los acuerdos que faltan.",
    body: "Aclara qué decisiones, límites, criterios y responsabilidades necesitan dejar de resolverse caso por caso.",
    caption: "decisiones, límites y acuerdos",
  },
  {
    id: "memory",
    index: "04",
    title: "Memoria operativa",
    subtitle: "El criterio que debe quedar en el sistema.",
    body: "Define qué aprendizaje, contexto y criterio debe dejar de vivir en cabezas individuales.",
    caption: "criterio que deja de vivir en cabezas",
  },
] as const

export const checkSteps = [
  {
    tone: "observe",
    index: "01 / observar",
    title: "El entorno real.",
    body: "Reuniones, handoffs, decisiones, aprobaciones y memoria operativa tal como funcionan hoy.",
  },
  {
    tone: "map",
    index: "02 / mapear",
    title: "La fricción que se repite.",
    body: "Dónde se pierde contexto, qué vuelve a preguntarse y qué depende de pocas personas.",
  },
  {
    tone: "prioritize",
    index: "03 / priorizar",
    title: "El primer rediseño.",
    body: "No todo a la vez. Solo el punto donde cambiar el entorno libera más capacidad.",
  },
  {
    tone: "clarity",
    index: "04 / salir con claridad",
    title: "Qué hacer primero.",
    body: "Un mapa simple: qué rediseñar, por qué importa y cuál es el siguiente movimiento.",
  },
] as const

export const faqs = [
  {
    question: "¿Esto es consultoría tradicional?",
    answer: "No vendemos un informe para que se quede guardado. El chequeo busca ubicar una intervención concreta sobre el entorno de trabajo: reglas, criterio, loops, handoffs y memoria operativa.",
  },
  {
    question: "¿Tengo que cambiar mis herramientas?",
    answer: "No necesariamente. Re-integration no empieza reemplazando software. Primero mira cómo se coordina el trabajo debajo de las herramientas que ya existen.",
  },
  {
    question: "¿Implementan IA?",
    answer: "IA puede ser una puerta de entrada, pero no somos implementadores de IA. Si la IA no tiene criterio, ownership y memoria operativa alrededor, solo acelera el desorden.",
  },
  {
    question: "¿Para qué tipo de equipo aplica?",
    answer: "Para equipos donde ya hay talento, pero la coordinación depende demasiado de reuniones, aprobaciones, líderes saturados o criterio que vive en pocas personas.",
  },
  {
    question: "¿Qué recibo después del chequeo?",
    answer: "Claridad sobre dónde intervenir primero, por qué ese punto importa y qué tipo de rediseño puede devolver capacidad operativa real.",
  },
] as const
