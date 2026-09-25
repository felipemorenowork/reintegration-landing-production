# Re-integration Landing

Proyecto limpio de la landing publica de Re-integration, separado de la app interna de publicaciones/consultoria.

## Comandos

```bash
npm install
npm run dev
npm run build
```

Con `npm run build`, Next genera la version estatica en la carpeta `out`.

## Opciones de publicacion

- Cloudflare Pages: conectar GitHub y usar `npm run build`, carpeta de salida `out`.
- Netlify: conectar GitHub y usar `npm run build`, carpeta de salida `out`.
- Hostinger: correr `npm run build` y subir el contenido de `out`.
- Vercel: tambien funciona, aunque para esta landing estatica no es obligatorio.

## Dominio

El dominio `re-integration.org` puede seguir comprado en Squarespace. Solo hay que cambiar los DNS para apuntarlo al hosting elegido.

## Medición

La landing deja preparados dos servicios gratuitos y complementarios:

- Cloudflare Web Analytics para ver visitas y páginas consultadas.
- Google Analytics 4 para ver clics en CTA, inicio y envío del formulario del Diagnóstico.

Antes de publicar en Cloudflare Pages, agrega estas variables de entorno en `Settings` > `Environment variables` para producción y preview:

```text
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

Para activar Cloudflare Web Analytics, abre el proyecto en Cloudflare Pages, entra en `Metrics` y selecciona `Enable` bajo `Web Analytics`. No necesitas pegar un token: Cloudflare añadirá la medición automáticamente en el siguiente despliegue.

No se envían datos personales del formulario a Google Analytics. El nuevo formulario (`2nSg9GLsk`) usa Formspark como bandeja y fuente de verdad de las solicitudes aceptadas; sus avisos están activos para `felipe@re-integration.org`. Una prueba interna autorizada el 24 de septiembre de 2026 confirmó la recepción de los cinco campos en la bandeja; el aviso por email aún no se ha verificado en destino. El Google Form anterior permanece intacto y la web publicada no se ha cambiado. El ID público ya está incluido en la landing; `NEXT_PUBLIC_FORMSPARK_FORM_ID` es un override opcional para previews. Las solicitudes nuevas de la próxima versión no aparecerán en la hoja de Google anterior.

La publicación también genera automáticamente `robots.txt` y `sitemap.xml` para `https://re-integration.org`.
