# Landing Re-integration

Landing pública de Re-integration para la oferta vigente: **Diseñamos cómo tu equipo puede mejorar un resultado con IA**.

## Archivos principales

- `ReintegrationLanding.tsx`: estructura de la página, CTA final y analítica de interacción.
- `content.ts`: copy estructurado de la oferta, puertas de entrada, Sprint, Diagnóstico y límites.
- `../../../app/reintegration-product-refresh.css`: sistema visual de la oferta vigente. Se importa al final para ganar prioridad sobre estilos heredados.
- `../../../app/page.tsx`: monta la landing.
- `../../../app/layout.tsx`: importa los estilos y define los metadatos públicos.

## Orden de secciones

1. Hero: resultado de negocio + IA, acompañado de una ilustración editorial conceptual; no representa un caso ni una implementación de cliente.
2. Dos puertas de entrada.
3. Diagnóstico de un resultado crítico: identifica el frente que vale la pena intervenir.
4. Producto principal: Sprint sobre ese frente de trabajo crítico.
5. Resultados de trabajo buscados y límites técnicos compactos.
6. Formulario de solicitud.

## CTA y seguimiento

La landing está conectada al formulario público de Formspark `2nSg9GLsk`, propiedad de `felipe@re-integration.org`. `NEXT_PUBLIC_FORMSPARK_FORM_ID` permite cambiar el destino en previews, pero no es necesario para producción. El formulario pide:

- Nombre.
- Email.
- Empresa.
- Resultado de negocio que la empresa quiere mejorar.
- Situación actual que lo frena (opcional).

El envío se hace por `fetch` con JSON. Solo una respuesta HTTP satisfactoria muestra la confirmación y dispara `form_submitted`; un error conserva lo escrito y ofrece reintentar o escribir por email. Hay un campo trampa (`_honeypot`) y Formspark debe mantener activo su filtro automático de spam. Una respuesta HTTP satisfactoria no sustituye comprobar en la bandeja que llegó una solicitud humana: el filtro puede apartar falsos positivos.

La conversación inicial es breve y sin costo. El Diagnóstico es una intervención pagada y acotada; su precio se gestiona en conversación, no como tarifa pública de la landing.

## Límites del sitio

La landing no presenta a Re-integration como proveedor de implementación técnica directa. Una solución puede incluir IA y un proveedor especializado; Re-integration diseña el trabajo, las responsabilidades, las validaciones y la prueba. Mantiene fuera ingeniería industrial y la certificación de infraestructura, ciberseguridad, datos, privacidad o cumplimiento legal.

## Descubrimiento orgánico y búsqueda con IA

- `app/layout.tsx` contiene metadatos, `Organization`, `WebSite`, `Service` y `FAQPage` en JSON-LD. El marcado debe reflejar siempre el contenido visible de la landing.
- `app/robots.ts` deja el sitio rastreable y declara acceso explícito a `OAI-SearchBot` y `ChatGPT-User` sin cambiar la política existente para otros rastreadores.
- `public/llms.txt` resume la oferta y sus límites para lectores automatizados. No incluye precios porque no están publicados en la landing.
- La primera página busca explicar con claridad la intersección entre consultoría de IA, diseño del trabajo y resultados de negocio, mientras delimita un frente operativo concreto para el Diagnóstico y el Sprint. No se debe convertir en una promesa de automatización técnica ni de ROI.

## Puertas antes del despliegue

1. El formulario de Formspark `2nSg9GLsk` ya existe bajo `felipe@re-integration.org`; el filtro automático está activo, `_honeypot` es un nombre reconocido por Formspark y el aviso por email está activo para ese correo. Si se agrega Turnstile más adelante, verificar que el token se valida en Formspark antes de habilitarlo.
2. Prueba interna autorizada el 24 de septiembre de 2026: la landing mostró confirmación y los cinco campos llegaron a la bandeja de Formspark. Falta verificar el aviso en el correo de destino y probar el estado de error/reintento sin crear más solicitudes. No contar el evento `form_submitted` como lead cualificado.
3. No cerrar ni eliminar el Google Form anterior hasta que la ruta nueva esté probada y el despliegue aprobado; después revisar si conviene cerrarlo para detener el spam persistente en su URL pública.
4. Tras desplegar, comprobar respuesta HTTP, canonical, `robots.txt`, `sitemap.xml`, metadatos y tarjeta Open Graph en el dominio real. El build local no confirma que DNS, hosting e indexación estén correctos.
5. Verificar propiedad en Google Search Console y solicitar indexación de la URL canónica. Permitir `OAI-SearchBot` facilita el acceso de ChatGPT Search, pero no garantiza aparición ni citas.
