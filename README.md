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
- Google Analytics 4 para ver clics en CTA, inicio y envío del formulario, y uso del método FLOW.

Antes de publicar en Cloudflare Pages, agrega estas variables de entorno en `Settings` > `Environment variables` para producción y preview:

```text
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

Para activar Cloudflare Web Analytics, abre el proyecto en Cloudflare Pages, entra en `Metrics` y selecciona `Enable` bajo `Web Analytics`. No necesitas pegar un token: Cloudflare añadirá la medición automáticamente en el siguiente despliegue.

No se envían datos personales del formulario a Google Analytics. Google Forms y Sheets siguen siendo la fuente de verdad de las solicitudes recibidas.

La publicación también genera automáticamente `robots.txt` y `sitemap.xml` para `https://re-integration.org`.
