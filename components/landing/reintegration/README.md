# Re-integration Landing

Landing final de Re-integration / FLOW.

## Archivos principales

- `ReintegrationLanding.tsx`: estructura React, interacciones, CTA final y secciones.
- `content.ts`: copy estructurado de secciones, frames, lentes FLOW, pasos, FAQ y URL del Google Forms.
- `../../../app/reintegration-overrides.css`: estilos finales específicos de esta landing. Está importado después de `globals.css` para ganar prioridad sobre estilos heredados.
- `../../../app/page.tsx`: monta la landing.
- `../../../app/layout.tsx`: importa `reintegration-overrides.css`.

## Orden de secciones

1. Hero
2. Auditoría del mal entorno
3. La capa debajo
4. FLOW lee el entorno
5. Chequeo de Coordinación
6. Formulario + FAQ

## Interacciones

- Hero: canvas animado aprobado.
- Sección 2: frames por scroll sticky.
- Sección 4: hover/focus/click en desktop; auto-ciclo en mobile/touch.
- Sección final: CTA real hacia Google Forms para capturar solicitudes.

## CTA y seguimiento recomendado

Opcion simple y gratis implementada:

1. Google Form conectado desde `content.ts`:
   - `googleFormUrl`
2. Campos recomendados en Google Forms:
   - Nombre
   - Email
   - Empresa
   - ¿Qué cuesta coordinar hoy?
3. Conectar respuestas a Google Sheets desde la pestaña de respuestas.
4. Activar notificaciones de nuevas respuestas.

Para seguimiento comercial mínimo en Sheets:

- Agregar columnas manuales: `Estado`, `Fuente`, `Fecha contacto`, `Próximo paso`, `Notas`.
- Estados sugeridos: `Nuevo`, `Contactado`, `Calificado`, `No fit`, `Agendado`.
- Fuente inicial: `Landing Re-integration`.

## Publicación sin costo extra

Ruta recomendada:

1. Subir el proyecto a GitHub.
2. Publicar con GitHub Pages si se convierte a sitio estático.
3. Apuntar el dominio comprado en Squarespace al sitio publicado mediante DNS.

Nota importante: este proyecto Next tiene rutas API en `app/api`. Para GitHub Pages conviene exportar una versión estática de la landing o crear un repo limpio solo para esta landing. Si se quiere evitar ese ajuste, Vercel Free suele ser más directo para Next, también con dominio propio.

## Checklist antes de publicar

- `npm run build`
- Revisar desktop, tablet y mobile.
- Revisar que todos los CTA principales apunten a `#formulario`.
- Probar link del Google Forms.
- Configurar dominio.
- Probar formulario en producción.
