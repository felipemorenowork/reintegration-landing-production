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
